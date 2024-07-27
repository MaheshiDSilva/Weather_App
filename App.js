/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState,useCallback} from 'react';
import { StyleSheet } from 'react-native';
import {
  // StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';

import axios from 'axios';

const styles=StyleSheet.create({
  root:{
      flex:1,
  },
  image:{
    flex:1,
    flexDirection:'column',
  },

  TextInput:{
    borderBottomWidth:3,
    padding:5,
    paddingLeft:15,
    paddingVertical:20,
    marginVertical:100,
    marginHorizontal:10,
    backgroundColor:"#fff",
    fontSize:19,
    color:"#181717",
    borderRadius:16,
    borderBottomColor:"#df8e00",

  },
  infoView:{
    alignItems:"center",
  },
  cityCountryText:{
    color:"#fff",
    fontSize:40,
    fontWeight:'bold',
  },
  dateText:{
    color:"#fff",
    fontSize:22,
    marginVertical:10,
  },
  tempText:{
    fontSize:45,
    color:"#fff",
    marginVertical:10,
  },
  minMaxText:{
    fontSize:22,
    color:"#fff",
    marginVertical:10,
    fontWeight:'500',
  },
});

const App=()=> {
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[data,setData]=useState([]);

  const api={
    key:'55a7d0f6d412e912fc97aad3991dcbe7',
    baseUrl:'https://api.openweathermap.org/data/2.5/'
  };

  const fetchDataHandler=useCallback(()=>{
    setLoading(true);
    setInput("");
    axios({
      method:"GET",
      url:`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`
    })
    .then(res=>{
      console.log(res.data);
      setData(res.data)
  })
  .catch(e=>console.dir(e))
  .finally(()=>setLoading(false))

  },[api.key,input]);

  return (
    <View style={styles.root}>
     <ImageBackground source={require('./assets/heroimage.jpg')}
     resizeMode='cover'
     style={styles.image}>

      <View>
        <TextInput placeholder='Enter city name and press return...'
        onChangeText={text=>setInput(text)}
        value={input}
        placeholderTextColor={"#000"}
        style={styles.TextInput}
        onSubmitEditing={fetchDataHandler}
        ></TextInput>
      </View>
      {loading && (
        <View>
        <ActivityIndicator size={"large"} color="#000"/>
        </View>
        )}
        {data && 
        <View style={styles.infoView}>
          <Text style={styles.cityCountryText}>
            {`${data?.name}, ${data?.sys?.country}`}
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleString()}
          </Text>
          <Text style={styles.tempText}>
            {`${Math.round(data?.main?.temp)}°C`}
          </Text>
          <Text style={styles.minMaxText}>
            {`Min ${Math.round(data?.main?.temp_min)}°C / Max ${Math.round(data?.main?.temp_max)}°C`}
          </Text>
          </View>}

     </ImageBackground>
    </View>
  );
}

export default App;
