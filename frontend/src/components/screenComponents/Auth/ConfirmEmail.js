import React,{useState} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/native";
import Ionic from "react-native-vector-icons/Ionicons";

const ConfirmEmail = () => {
    const navigation = useNavigation();
    const [confirmCode,setConfirmCode] = useState(false)
    const [confirm,setConfirm] = useState(false)
    const [successMsg,setSuccessMsg] = useState('')

    Axios.post('http://127.0.0.1:8080/user/authEmail',confirmCode)
    .then(response=>{
    if(response.data.code === confirmCode){
    // 유저 이메일 저장하기!
        setSuccessMsg('인증되었습니다.')
        setConfirm(true)
    }else{
        setSuccessMsg('인증번호를 다시 입력해주세요.');
        setConfirm(false)
        alert(response.status);
    }
    }).catch((error)=>{
        alert(error)
        console.warn(error)
    })
    
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={()=>navigation.push('InputEmail')} style={styles.back}>
                <Ionic name="arrow-back" style={{fontSize:25,color:'black'}}/>
            </TouchableOpacity>

            <Text style={styles.largeHeader}>
                메일로 발송된{"\n"}인증번호를{"\n"}입력해주세요
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(confirmCode)=>setConfirmCode(confirmCode)}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.nextButton} onPress={()=>navigation.push('SignupInfo')}>
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
    top:80,
    left:20
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
    marginTop:100
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

export default ConfirmEmail
