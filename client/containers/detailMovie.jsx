import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Image,
  ScrollView,
  SafeAreaView,
  Button,
  ToastAndroid,
  Modal
} from 'react-native';

import Constants from 'expo-constants';
import {
  Spinner,Input
} from '@ui-kitten/components';

import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const MOVIES_DETAIL = gql`
  query($id: String) {
    moviedetail(id: $id) {
      _id
      title
      description
      url
      popularity
      tags
      createdAt
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
  }`

const DELETE_MOVIE = gql`
  mutation($id: ID) {
    deleteMovie(
      id:$id,
    ){
      _id
      title
      description
      url
      popularity
      tags
      createdAt
    }
  }`

const UPDATE_MOVIE = gql`
  mutation(
    $id: ID
    $title: String,
    $description: String,
    $url: String,
    $popularity: Float,
    $tags: [String]) {
      updateMovie(
      id: $id
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

const Detail = ({navigation}) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [popularity, setPopularity] = useState(0);
  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('');
  const [ id, setId ] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  let { loading, error, data } = useQuery( MOVIES_DETAIL, { variables:  {id:navigation.state.params.id} })

  let [deleteMovie] = useMutation(DELETE_MOVIE,{
    refetchQueries: () => [{query: FETCH_MOVIES}]
  })
  
  let [updateMovie] = useMutation(UPDATE_MOVIE,{
    refetchQueries: ()=> [{query: FETCH_MOVIES}]
  })

  if(loading){ 
    return (
      <View>
        <Spinner status='primary'/>
        <Text>Loading ....</Text>
      </View>
      )}
  if(error) {
    return <Text>error</Text>
  } 
  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.card}>
      <Image source={{uri: data.moviedetail.url}} style={{ height:300, width:400, resizeMode: 'contain', position: 'relative'}} />
      
      <View style= {styles.fontBack}>
        <Text style={styles.font}>{data.moviedetail.title}</Text>
      </View>
    </View>
    

    <ScrollView>
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={{marginTop: 22}}>
        <View>
          <View style={{margin: 7}}>
            <Text style={{fontSize: 20, alignItems: "center", marginBottom: 10}}>Edit your Favourite Movies</Text>
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
          </View>
          
          <View style={{marginTop: 20, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{width: '40%'}}>
              <Button
                title="OK"
                onPress={() => {updateMovie({
                  variables: {id:id,title, description, url, popularity: Number(popularity), tags}
                })
                setModalVisible(false)
                ToastAndroid.showWithGravityAndOffset(
                  'Movie Updated',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                  );
                }}
              />
            </View>
            <View style={{width: '40%'}}>
              <Button
                title="CANCEL"
                color='grey'
                onPress={() => {setModalVisible(false)}}
              />
            </View>
          </View>
        
        </View>
      </View>
    </Modal>

      <View style={styles.detail}>

        <Text style={{ textAlign: "center", backgroundColor: '#fbe3b9' }}> Description </Text>
        <View style={{ padding: 5, margin: 5, backgroundColor: '#e5dfdf'}}>
          <Text style={{ textAlign: "center" }}>
            {data.moviedetail.description}
          </Text>
        </View>

        <Text style={{ textAlign: "center", backgroundColor: '#fbe3b9' }}> Detail </Text>
        <View style={{ padding: 5, margin: 5, backgroundColor: '#f4efd3', flexDirection: "row"}}>
          <View style={{width: '100%'}}>
            <Text style={{ textAlign:'center'}}>
              Popularity : {data.moviedetail.popularity} <Ionicons/>
              <Ionicons 
                name = 'md-star'
                size = {
                  15
                }
              />
            </Text> 
              {
                data.moviedetail.tags.map( tag => {
                  return (
                    <View key={tag} style={{margin: 4, alignItems: 'center', backgroundColor: 'red', opacity: 0.4, width: '100%'}}>
                      <Text style={{fontSize: 15}} >{tag}</Text>
                    </View>
                  )
                })
              }
            <View style={{ marginTop: 20, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
            <View>
            
            <Button title='EDIT'
              onPress={() => {
                setModalVisible(true)
                setTitle(data.moviedetail.title)
                setDescription(data.moviedetail.description)
                setPopularity(String(data.moviedetail.popularity))
                setUrl(data.moviedetail.url)
                setTags(data.moviedetail.tags[0])
                setId(data.moviedetail._id)
                } 
              }
            >
            </Button>

            </View>
            <Button 
              title='Delete' 
              color='grey'
              onPress={() => {deleteMovie({
                variables: {
                    id: data.moviedetail._id
                      }
                    }
                  )
                  navigation.navigate('Home')
                } 
              }
              >
              
            </Button>
          </View>
          </View>
        </View>       
      </View>
      
    </ScrollView>
    </SafeAreaView>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex:2,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#F4EFD3'
  },
  card: {
    height: 300,
  },
  font: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  fontBack: { 
    backgroundColor: '#fbe3b9',
    marginHorizontal: 10,
    position: 'absolute',
    left: 10,
    right:10,
    bottom: 10,
    padding: 5,
    opacity: 0.8,
    borderRadius: 5
  },
  detail: {
    backgroundColor: '#fffdf9',
    padding: 2,
    margin: 2
  }
  
});

// Detail.navigationOptions = () => ({
//   title: 'Detail Card'
// })

export default Detail