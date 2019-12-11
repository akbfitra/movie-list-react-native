import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View, 
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Constants from 'expo-constants';
import MovieCard from '../component/moviefav'
import SeriesCard from '../component/seriesfav'

export default function Home({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        style={{width:420, height:250, resizeMode:'cover'}}
        source={{uri: 'https://image.freepik.com/free-vector/now-showing-movie-cinema-poster-banner-background_7102-277.jpg'}} />
      <Text style={styles.title}> List Your Favourite Movies </Text>
        <MovieCard/>
      <Text style={styles.title}> List Your Favourite Series</Text>
        <SeriesCard/>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:2,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#F4EFD3'
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
});