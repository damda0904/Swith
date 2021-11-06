import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';

export default function App() {

  Axios.get('http://127.0.0.1:8080/test')
    .then(response=>{
      if(response.status == 200){
        console.warn(response.data.message)
      }else{
        console.warn(response.status)
      }
    }).catch((error)=>{
      console.warn(error)
    })
    
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
