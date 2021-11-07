import React,{useState,useEffect} from 'react'
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity,Image } from 'react-native'
import {useNavigation} from "@react-navigation/native";
import Ionic from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import SelectDropdown from 'react-native-select-dropdown'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterStudy = () => {
    const navigation = useNavigation();
    const categories = ['전공','취업','어학','자격증','고시/공무원','자기계발','습관','기타']
    const ftf_options = ['대면','비대면']
    
    //const submitRegisterStudy = () => {
        // let studyInfo = {
        //     email:userEmail,
        //     password:userPassword
        // };

        

        // AsyncStorage.getItem('token').then((value)=>{
        //     Axios.post('http://localhost:8080/group/',studyInfo,{headers:{
        //         Authorization: `Bearer ${token}`,
        //     }})
        //     .then(response=>{
        //         if(response.data.success === true){
        //         // 유저 이메일 저장하기!
        //             alert('success')
        //             AsyncStorage.setItem('user_id',userEmail); 
        //             AsyncStorage.setItem('token',response.data.token); 
        //             navigation.replace('Main');
        //         }else{
        //             setErrorText('아이디와 비밀번호를 다시 확인해주세요.');
        //             alert(response.status);
        //         }
        //     }).catch((error)=>{
        //         alert(error)
        //         console.warn(error)
        //     })
        // })
    //}


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

    const [category,setCategory] = useState('') //카테고리
    const [mainImage,setMainImage] = useState(null) //이미지
    const [title,setTitle] = useState('') //제목
    const [description,setDescription] = useState('') //설명
    const [startDate,setStartDate] = useState(null) //날짜
    const [endDate,setEndDate] = useState(null) //종료날짜
    const [keyword,setKeyword] = useState([]) //키워드
    const [facetoface,setFacetoface] = useState(false) //대면 여부
    const [personnel,setPersonnel] = useState(0) //인원

    // const pickImage = async() => {
    //     const {status_roll} = await ImagePicker.PermissionStatus.askA
    // }

    const submitRegisterStudy = async() => {
        const token = localStorage.getItem('token')

        let studyInfo = {
            category:category,
            mainImage:mainImage,
            title:title,
            description:description,
            startDate:new Date('2021-04-25'),
            endDate:new Date('2021-11-25'),
            keyword:keyword,
            faceToFace:facetoface,
            personnel:personnel
        }

        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        Axios.post('http://localhost:8080/group/',studyInfo,config)
        .then((response)=>{
            if(response.data.success === true){
                alert('success post')
                navigation.push('Main')
            }else{
                alert(`fail post:${response.status}`)
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={()=>navigation.push('Home')} style={styles.back}>
                <Ionic name="arrow-back" style={{fontSize:25,color:'black'}}/>
            </TouchableOpacity>
            <View style={styles.inputItemBox}>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>카테고리</Text>
                    <SelectDropdown
                        style={styles.selectBox}
                        data={categories}
                        onSelect={(selectedItem)=>setCategory(selectedItem)}
                        buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
                        rowTextForSelection={(item, index) => {return item}}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>간판 이미지</Text>
                    
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>제목</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'스터디 제목을 입력하세요.'}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>목표 및 설명</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'스터디에 대한 설명을 작성해주세요.'}
                        
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>기간</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'기간을 작성해주세요.'}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>인원</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'인원을 작성해주세요.'}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>대면/비대면</Text>
                    <SelectDropdown
                        style={styles.selectBox}
                        data={ftf_options}
                        onSelect={(selectedItem)=>{
                            if (selectedItem === '대면'){
                                setFacetoface(true)
                            }else{
                                setFacetoface(false)
                            }
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
                        rowTextForSelection={(item, index) => {return item}}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>키워드</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'키워드를 작성해주세요.'}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={()=>submitRegisterStudy()}>
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
  selectBox:{
    width:'90%',
    height:40,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#dcdcdc',
    backgroundColor:'#f5f5f5',
    color:'black',
    paddingVertical:5,
    paddingHorizontal:15,
    margin:5
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
    height:40,
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
export default RegisterStudy
