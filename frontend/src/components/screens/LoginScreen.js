import React,{useState} from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen= () => {
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [errorText,setErrorText] = useState('');

    const navigation = useNavigation();

    const submitLogin = () => {
        let loginInfo = {
            email:userEmail,
            password:userPassword
        };

        Axios.post('http://localhost:8080/user/login',loginInfo)
        .then(response=>{
            if(response.data.success === true){
            // 유저 이메일 저장하기!
                AsyncStorage.setItem('token',response.data.token);
                navigation.replace('Main');
            }else{
                setErrorText('아이디와 비밀번호를 다시 확인해주세요.');
                alert('아이디와 비밀번호를 다시 확인해주세요.');
            }
        }).catch((error)=>{
            alert(error)
            console.warn(error)
        })
    }

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/logo.png')}
                style={styles.logo}
            />
            <TextInput
                style={styles.textInput}
                placeholder={'숙명 이메일을 입력하세요.'}
                onChangeText={(userEmail)=>setUserEmail(userEmail)}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.textInput}
                placeholder={'비밀번호를 입력하세요.'}
                onChangeText={(userPassword)=>setUserPassword(userPassword)}
                autoCapitalize="none"
            />
            <Text style={styles.errorText}>{errorText}</Text>
            <TouchableOpacity style={styles.loginButton} onPress={()=>submitLogin()}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
            <Text
                style={styles.signup} 
                onPress={()=>navigation.push('Signup')}>
                    회원가입
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black',
    width:'100%'
  },
  logo:{
      width:100,
      resizeMode:'contain',
      marginBottom:30
  },
  signup:{
      color:'#303030',
      marginTop:15,
      fontSize:13
  },
  textInput:{
    width:'90%',
    height:50,
    borderRadius:50,
    borderWidth:1,
    borderColor:'#dcdcdc',
    backgroundColor:'#f5f5f5',
    color:'black',
    paddingVertical:10,
    paddingHorizontal:20,
    margin:5
  },
  errorText:{
      fontSize:12,
      color:'red',
      marginTop:5
  },
  loginButton:{
    width:350,
    height:55,
    borderRadius:50,
    backgroundColor:'#589BFF',
    color:'white',
    fontWeight:'bold',
    paddingVertical:15,
    paddingHorizontal:20,
    marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:18,
  }
});

export default LoginScreen
