import React,{useState,useEffect} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
        AsyncStorage.getItem('user_id').then((value) =>
            //Home <-> Auth 위치 바꿔야함!
            navigation.replace(value === null ? 'Home' : 'Auth'),
        );
        }, 3000);
    }, []);
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/splash.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black'
  },
});

export default SplashScreen
