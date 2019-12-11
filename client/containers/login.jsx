import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View, 
  Button,
  ImageBackground
} from 'react-native';

const login = ({navigation}) => {
  return (
    <ImageBackground style= { styles.bg } source={{uri: "https://images.all-free-download.com/images/graphiclarge/movie_poster_background_art_vector_530172.jpg"}}>
      <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{ flex: 1 , width: 300, justifyContent: 'center'}}>
          <Button
            title = 'Masuk'
            color = 'black'
            onPress = {
              () => navigation.navigate('Home')
            }
          />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})



export default login
