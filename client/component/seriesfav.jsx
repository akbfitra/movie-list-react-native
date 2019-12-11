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

import { withNavigation } from 'react-navigation';

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const QUERY_FILMS = gql`
    query {
      series {
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
          data.series.map(serie=>{
            return (
              <View key={serie._id}>
                  <TouchableHighlight onPress={()=>navigation.navigate('SerieDetail',{id: serie._id})}>
                    <Image source={{uri: serie.url}} style={{height: 220, width: 200, resizeMode: 'contain'}}/>
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