import React from 'react';
import { Input, Button } from '@ui-kitten/components';
import { 
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ToastAndroid
  } from 'react-native';

import Constants from 'expo-constants';

import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ADD_SERIE = gql`
  mutation(
    $title: String,
    $description: String,
    $url: String,
    $popularity: Float,
    $tags: [String]) {
      createSerie(
      title:$title,
      description:$description,
      url: $url,
      popularity:$popularity,
      tags:$tags
    )  {
      _id
      title
      description
      url
      popularity
      tags
      createdAt
      updatedAt
    }
  }`

const FETCH_SERIES = gql`
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




const InputSerie= () => {

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [popularity, setPopularity] = React.useState(0);
  const [tags, setTags] = React.useState('');
  const [url, setUrl] = React.useState('')

  const [createSerie, {error, loading, data}] = useMutation(ADD_SERIE,{
    update: (cache, { data: {createSerie} }) => {
      const {series} = cache.readQuery({ query: FETCH_SERIES })
      cache.writeQuery({
        query: FETCH_SERIES,
        data: {series: [...series, createSerie]}
      })
      setTitle('')
      setDescription('')
      setUrl('')
      setPopularity(0)
      setTags('')
      ToastAndroid.showWithGravityAndOffset(
        'New Serie Favourite Created',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        50,
        100,
      );
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={{margin: 7}}>
        <Text style={{fontSize: 20, alignItems: "center", marginBottom: 10}}>Add Your Favourite Series</Text>
        <Input
          label='Title'
          placeholder='Title'
          value={title}
          onChangeText={setTitle}
        />
        <Input
          label='Description'
          placeholder='Description'
          value={description}
          onChangeText={setDescription}
        />
        <Input
          label='URL'
          placeholder='URL'
          value={url}
          onChangeText={setUrl}
        />
        <Input
          label='Popularity'
          placeholder='Popularity'
          keyboardType={'numeric'}
          value={popularity}
          onChangeText={setPopularity}
        />
        <Input
          label='Tag'
          placeholder='Tag'
          value={tags}
          onChangeText={setTags}
        />

        <Button 
          appearance='outline' 
          status='danger' 
          style={{marginTop: 10}}
          onPress={() => createSerie({
            variables: {title, description, url, popularity: Number(popularity), tags}
        })}
        >SUBMIT</Button>
      </View>

    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex:2,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#F4EFD3'
  },
})

export default InputSerie