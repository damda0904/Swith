import React from 'react'
import { StyleSheet, View, Text, TextInput  } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native";

const InputEmail = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={()=>navigation.push('Login')}>
                <Ionic name="arrow-back" style={{fontSize:25,color:'black'}}/>
            </TouchableOpacity>

            <Text style={styles.largeHeader}>
                숙명 구글 메일을{"\n"}입력하세요
            </Text>
            <Text style={styles.example}>
                메일 형식){"\n"}
                ID@sookmyung.ac.kr 또는{"\n"}
                ID@sm.ac.kr 형식
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'ex)noonsong@sookmyung.ac.kr'}
                    onChangeText={(email)=>setEmail(email)}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.nextButton} onPress={()=>navigation.push('ConfirmEmail')}>
                    <Text style={styles.next}>다음</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    color:'black',
    paddingHorizontal:20,
    width:'100%',
  },
  back:{
    position:'absolute',
    top:-80
  },
  inputContainer:{
    width:'100%',
    justifyContent:'space-between',
    alignItems:'stretch'
  },
  largeHeader:{
      left:5,
      fontSize:40,
      lineHeight:50
  },
  example:{
      left:10,
      lineHeight:18,
      fontSize:12,
      color:'#777777',
      marginTop:25,
      marginBottom:80
  },
  textInput:{
    width:'100%',
    height:50,
    borderRadius:20,
    borderWidth:1,
    borderColor:'#dcdcdc',
    backgroundColor:'#f5f5f5',
    color:'black',
    paddingVertical:10,
    paddingHorizontal:20,
    margin:5
  },
  nextButton:{
    color:'white',
    width:'100%',
    height:50,
    paddingVertical:10,
    paddingHorizontal:20,
    backgroundColor:'#589BFF',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    marginTop:150
      
  },
  next:{
      fontSize:18,
      color:'white',
      fontWeight:'600'
  }
});


export default InputEmail
