import React,{useState,useEffect} from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView} from 'react-native'
import MyStudyList from '../screenComponents/Main/MyStudyList';
import Axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    let title=["카카오 코테 뿌시기","아침 운동 모임","토익 스터디"]
    let endDate=["2021.11.10","2021.12.09","2021.12.30"]
    let startDate=["2021.10.10","2021.10.09","2021.9.30"]


    const [token,setToken] = useState('');
    AsyncStorage.getItem('token')
    .then((value)=>setToken(value));


    useEffect(()=>{
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        Axios.get('http://localhost:8080/user/myGroups',config)
        .then(response=>{
            if(response.data.success === true){
                setMyStudy(response.data.group)
            }else{
                setErrorText('아이디와 비밀번호를 다시 확인해주세요.');
                alert('아이디와 비밀번호를 다시 확인해주세요.');
            }
        }).catch((error)=>{
        })
    },[])

    const [searchKeyword,setSearchKeyword] = useState('')
    const [searchAllList,setSearchAllList] = useState([])
    const searchAllStudy = (keyword) => {
        Axios.get(`http://localhost:8080/group?category=${keyword}&keyword=${keyword}`)
        .then(response=>{
            if(response.data.success === true){
                alert('success get study list')
                setSearchAllList(response.data.group)
                console.warn(response.data.group)
            }else{
                alert('해당하는 스터디가 없네요!'+response.status);
            }
        }).catch((error)=>{
            alert(error)
            console.warn(error)
        })
    }

    const [myStudy,setMyStudy] = useState([])
    const renderMyStudyGroup = myStudy.map((group,index)=>{
        return(
            <TouchableOpacity key={index} onPress={()=>
                    navigation.push('Detail')
                    // navigation.navigate('Detail',{...group})
                }>
                <MyStudyList 
                    key={index} 
                    title={group[index].title} 
                    startDate={group[index].startDate} 
                    endDate={group[index].endDate}
                />
            </TouchableOpacity>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.SearchSection}>
                    <TextInput
                        placeholder="전체 스터디를 검색해보세요!"
                        style={styles.searchInput}
                        onChangeText={(searchKeyword)=>setSearchKeyword(searchKeyword)}
                        onSubmitEditing={()=>searchAllStudy(searchKeyword)}
                    />
                </View>
                <View style={styles.myStudy}>
                    <Text style={styles.myStudyTitle}>눈송이님이 참여한 스터디</Text>
                    <ScrollView style={{width:'100%'}} horizontal={true}>
                        <MyStudyList 
                            onPress={()=>navigation.push('SearchMajor')}
                            title={title[0]} 
                            startDate={startDate[0]} 
                            endDate={endDate[0]}
                            img={require('../../../assets/kakao.jpeg')}
                        />
                        <MyStudyList 
                            onPress={()=>navigation.push('SearchMajor')}
                            title={title[1]} 
                            startDate={startDate[1]} 
                            endDate={endDate[1]}
                            img={require('../../../assets/running.jpeg')}
                        />
                        {/* {renderMyStudyGroup} */}
                    </ScrollView>
                </View>
                <View style={styles.myStudy}>
                    <Text style={styles.myStudyTitle}>모집중인 스터디 찾아보기</Text>
                    <View style={styles.category}>
                        <TouchableOpacity style={styles.categoryItem} onPress={()=>navigation.push('SearchMajor')}>
                            <Text style={styles.categoryName}>전공</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} onPress={()=>navigation.push('SearchJob')}>
                            <Text style={styles.categoryName}>취업</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} onPress={()=>navigation.push('SearchEng')}>
                            <Text style={styles.categoryName}>어학</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} onPress={()=>navigation.push('SearchCert')}>
                            <Text style={styles.categoryName}>자격증</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} onPress={()=>navigation.push('SearchExam')}>
                            <Text style={styles.categoryName}>고시/공무원</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} onPress={()=>navigation.push('SearchSelf')}>
                            <Text style={styles.categoryName}>자기계발</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} onPress={()=>navigation.push('SearchHabit')}>
                            <Text style={styles.categoryName}>습관</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} onPress={()=>navigation.push('SearchEtc')}>
                            <Text style={styles.categoryName}>기타</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.largeButton} onPress={()=>navigation.push('RegisterStudy')}>
                    <Text style={styles.largeButtonText}>스터디 모집하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black',
    width:'100%',
  },
  SearchSection:{
    marginVertical:5,
    justifyContent:'center',
    alignItems:'center',
  },
  searchInput:{
    width:'95%',
    height:40,
    borderRadius:50,
    borderWidth:1,
    borderColor:'#dcdcdc',
    backgroundColor:'#f5f5f5',
    color:'black',
    paddingVertical:10,
    paddingHorizontal:20,
    margin:5
  },
  myStudy:{
    width:'95%',
    margin:10,
    justifyContent:'center',
    alignItems:'flex-start',
    paddingBottom:20,
    borderBottomColor:'#e9e9e9',
    borderBottomWidth:1
  },
  myStudyTitle:{
    left:7,
    marginBottom:10,
    fontSize:18,
    fontWeight:'bold'
  },
  category:{
    flexWrap:'wrap',
    flexDirection:'row',
    width:'100%',
  },
  categoryItem:{
      width:80,
      height:80,
      borderRadius:10,
      backgroundColor:'#EEF5FF',
      borderWidth:1,
      borderColor:'#589BFF',
      justifyContent:'center',
      alignItems:'center',
      margin:5
  },
  categoryName:{
      fontSize:12,
      color:'#202020'
  },
  largeButton:{
    width:'90%',
    height:50,
    borderRadius:100,
    backgroundColor:'#589BFF',
    justifyContent:'center',
    alignItems:'center',
    left:18,
    marginBottom:20,
    marginTop:5
  },
  largeButtonText:{
    fontSize:16,
    fontWeight:'600',
    color:'#fff'
  }
});
export default HomeScreen
