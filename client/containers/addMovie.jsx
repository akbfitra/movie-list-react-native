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

const ADD_MOVIE = gql`
  mutation(
    $title: String,
    $description: String,
    $url: String,
    $popularity: Float,
    $tags: [String]) {
      createMovie(
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

const FETCH_MOVIES = gql`
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




const InputMovie= () => {

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [popularity, setPopularity] = React.useState(0);
  const [tags, setTags] = React.useState('');
  const [url, setUrl] = React.useState('')

  const [createMovie, {error, loading, data}] = useMutation(ADD_MOVIE,{
    update: (cache, { data: {createMovie} }) => {
      const {movies} = cache.readQuery({ query: FETCH_MOVIES })
      cache.writeQuery({
        query: FETCH_MOVIES,
        data: {movies: [...movies, createMovie]}
      })
      setTitle('')
      setDescription('')
      setUrl('')
      setPopularity(0)
      setTags('')
      ToastAndroid.showWithGravityAndOffset(
        'New Movie Favourite Created',
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
        <Text style={{fontSize: 20, alignItems: "center", marginBottom: 10}}>Add Your Favourite Film</Text>
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
          onPress={() => createMovie({
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

export default InputMovie