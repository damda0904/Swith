import React,{useState,useEffect} from 'react'
import { StyleSheet, View, ScrollView, Text, TextInput, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native";
import Ionic from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Axios from 'axios'

const SignupInfo = (props) => {
    const navigation = useNavigation();

    // const getPhotos = async () => {
    //     const { assets: photos } = await MediaLibrary.getAssetsAsync();
    //     setPhotos(photos);
    //     // 첫번째 사진 선택을 기본값으로
    // };

    // //접근 권한 확인

    // const getIOSPermissions = async () => {
    //     // 유저가 준 권한이 있는지 확인한다.
    //     const { accessPrivileges, canAskAgain } =
    //     await MediaLibrary.getPermissionsAsync();
    //     // 권한이 없고 요청을 할 수 있다면,
    //     if (accessPrivileges === "none" && canAskAgain) {
    //     // 권한 요청
    //     const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
    //     if (accessPrivileges !== "none") {
    //         getPhotos();
    //     }
    //     // 권한이 이미 있으면, 사진을 가져옴
    //     } else if (accessPrivileges !== "none") {
    //         getPhotos();
    //     // 권한 없음
    //     } else {
    //     // 다시 권한 확인;
    //         getPermissions();
    //     }
    // };
    // const getAndroidPermissions = async () => {
    //     const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    //     if (status === "undetermined" && canAskAgain) {
    //         const { status } = await MediaLibrary.requestPermissionsAsync();
    //     if (status !== "undetermined") {
    //         getPhotos();
    //     }
    //     } else if (status !== "undetermined") {
    //         getPhotos();
    //     } else {
    //         getAndroidPermissions();
    //     }
    // };

    // useEffect(() => {
    //     if (Platform.OS === "ios") {
    //         getIOSPermissions();
    //     } else {
    //         getAndroidPermissions();
    //     }
    // }, []);

    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [major,setMajor] = useState('')
    const [profileImage,setProfileImage] = useState(null)
    const [studentId,setStudentId] = useState('')

    const submitSignup = () => {
        let signupInfo = {
            email:props.email,
            password:password,
            username:username,
            major:major,
            studentId:parseInt(studentId)
        }

        
        Axios.post('http://localhost:8080/user/signup',signupInfo)
        .then((response)=>{
            if(response.data.success === true){
                alert('회원가입이 완료되었습니다.')
                navigation.push('Login')
            }else{
                alert('비밀번호를 확인해주세요')
            }
        }).catch((error)=>{
            alert(error)
        })
    }

    // const pickImage = async() => {
    //     const {status_roll} = await ImagePicker.PermissionStatus.askA
    // }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.back}>
                <Ionic name="arrow-back" style={{fontSize:25,color:'black',position:'absolute'}}/>
            </TouchableOpacity>
            <View style={styles.inputItemBox}>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>비밀번호</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'비밀번호를 입력하세요.'}
                        onChangeText={(password)=>setPassword(password)}
                        value={password}
                    />
                </View>
            </View>
            <View style={styles.inputItemBox}>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>프로필 사진(선택)</Text>
                    <Image 
                        source={require('../../../../assets/logo.png')}
                        style={styles.profileImage}
                    />
                    {/* {profileImage == null ? 
                        <Image 
                            source={require('../../../../assets/logo.png')}
                            style={styles.profileImage}
                        />
                        : <Image 
                            source={{uri:profileImage}}
                            style={styles.profileImage}
                        />
                    } */}
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>닉네임</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'ex)청파동물만두'}
                        onChangeText={(username)=>setUsername(username)}
                        value={username}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>학과</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'ex)IT공학전공'}
                        onChangeText={(major)=>setMajor(major)}
                        value={major}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>학번</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'ex)1713974'}
                        onChangeText={(studentId)=>setStudentId(studentId)}
                        value={studentId}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={()=>submitSignup()}>
                <Text style={styles.next}>완료</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black',
    paddingHorizontal:20,
  },
  back:{
    position:'absolute',
    top:80,
    left:20
  },
  inputItemBox:{
      width:400,
      backgroundColor:'#ffffff',
      marginBottom:15,
      alignItems:'flex-start',
      justifyContent:'center',
      paddingVertical:25,
  },
  inputItem:{
      width:'100%',
      alignItems:'flex-start',
      justifyContent:'center',
      left:10,
      margin:5
  },
  inputLabel:{
      fontSize:14,
      left:5,
      marginBottom:5
  },
  profileImage:{
      width:100,
      height:100,
      resizeMode:'cover',
      marginBottom:15
  },
  textInput:{
    width:'90%',
    height:45,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#dcdcdc',
    backgroundColor:'#f5f5f5',
    color:'black',
    paddingVertical:5,
    paddingHorizontal:15,
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
    marginTop:10
      
  },
  next:{
      fontSize:18,
      color:'white',
      fontWeight:'600'
  }
});

export default SignupInfo
