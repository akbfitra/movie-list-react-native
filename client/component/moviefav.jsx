import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Text
} from 'react-native';

import {
  Spinner,
} from '@ui-kitten/components';

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { withNavigation } from 'react-navigation';

const QUERY_FILMS = gql`
  query {
    movies {
      _id
      title
      description
      url
      popularity
      tags
      createdAt
      updatedAt
    }
  }
`

const CardMovie = ({navigation}) => {
  const { loading, error, data } = useQuery(QUERY_FILMS)

  if(loading){ 
    return (
      <View>
        <Spinner status='primary'/>
        <Text>Loading ....</Text>
      </View>
      )}
  if(error) {
    console.log(error)
    return <Text>error</Text>
  }
  return (
    <SafeAreaView>
      <ScrollView horizontal={true} >
        {
          data.movies.map(movie=>{
            return (
              <View key={movie._id}>
                <TouchableHighlight onPress={()=>navigation.navigate('MovieDetail',{id: movie._id})}>
                  <Image source={{uri: movie.url}} style={{height: 220, width: 200, resizeMode: 'contain'}}/>
                </TouchableHighlight>
              </View>
            ) 
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  headerImage: {
    height: 200,
    width: 500,
    resizeMode: "cover"
  },
});

export default withNavigation(CardMovie) 