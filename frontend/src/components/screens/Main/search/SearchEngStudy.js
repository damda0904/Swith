import React,{useState,useEffect} from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchStudyItem from '../../../screenComponents/Main/SearchStudyItem'
import Axios from 'axios'

const SearchEngStudy = () => {

    const navigation = useNavigation();

    let title = "제목"
    let desc = "내용내용"
    let startDate = "2021.09.20"
    let endDate = "2021.11.20"
    let person = 5
    let offline = "대면"

    const [searchKeyword,setSearchKeyword] = useState('')
    const [searchList,setSearchList] = useState([])

    useEffect(()=>{
        Axios.get(`http://localhost:8080/group?category='어학'`)
        .then(response=>{
            if(response.data.success === true){
                alert('success get study list')
                setSearchList(response.data.group)
                console.warn(searchList)
            }else{
                alert('아직 자격증 스터디가 없네요!'+response.status);
            }
        }).catch((error)=>{
            alert(error)
            console.warn(error)
        })
    },[])

    const renderStudyGroup = searchList.map((group,index)=>{
        return(
            <SearchStudyItem key={index}
                title={group.title} 
                desc={group.desc} 
                startDate={group.startDate} 
                endDate={group.endDate} 
                person={group.person} 
                offline={group.offline}
            />
        )
    })
    


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
                        <Ionic name="arrow-back" style={{fontSize:25,color:'black'}}/>
                    </TouchableOpacity>
                    <Text style={styles.category}>어학</Text>
                </View>
                <TextInput
                    placeholder="찾고싶은 스터디를 검색해보세요!"
                    style={styles.searchInput}
                />
                <View style={styles.studyList}>
                    {renderStudyGroup}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    wrapper:{
        width:'95%',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    header:{
        left:5,
        top:5
    },
    category:{
        fontSize:35,
        fontWeight:'bold',
        marginVertical:15
    },
    searchInput:{
        width:'100%',
        height:40,
        borderRadius:50,
        borderWidth:1,
        borderColor:'#dcdcdc',
        backgroundColor:'#f5f5f5',
        color:'black',
        paddingVertical:10,
        paddingHorizontal:20,
        marginVertical:10
    },
})
export default SearchEngStudy
