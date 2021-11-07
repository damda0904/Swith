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

    //token
    const [token,setToken] = useState('');
    AsyncStorage.getItem('token')
    .then((value)=>setToken(value));

    const [category,setCategory] = useState('') //카테고리
    const [mainImage,setMainImage] = useState(null) //이미지
    const [title,setTitle] = useState('') //제목
    const [description,setDescription] = useState('') //설명
    const [startDate,setStartDate] = useState(null) //날짜
    const [endDate,setEndDate] = useState(null) //종료날짜
    const [keyword,setKeyword] = useState([]) //키워드
    const [facetoface,setFacetoface] = useState(false) //대면 여부
    const [personnel,setPersonnel] = useState(0) //인원

    const submitRegisterStudy = async() => {
        let studyInfo = {
            category:category,
            mainImage:mainImage,
            title:title,
            description:description,
            startDate:new Date(startDate),
            endDate:new Date(endDate),
            keyword:keyword,
            faceToFace:facetoface,
            personnel:personnel
        }

        //headers
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        Axios.post('http://localhost:8080/group/', studyInfo, config)
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
                        onChangeText={(title)=>setTitle(title)}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>목표 및 설명</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'스터디에 대한 설명을 작성해주세요.'}
                        multiline
                        numberOfLines={8}
                        onChangeText={(description)=>setDescription(description)}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>기간</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'시작 날짜를 YYYY-MM-DD 형태로 작성해주세요.'}
                        onChangeText={(startDate)=>setStartDate(startDate)}
                    />
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'종료 날짜를 YYYY-MM-DD 형태로 작성해주세요.'}
                        onChangeText={(endDate)=>setEndDate(endDate)}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>인원</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'인원을 작성해주세요.'}
                        onChangeText={(personnel)=>setPersonnel(personnel)}
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
                        onChangeText={(keyword)=>setKeyword(keyword)}
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
