import React,{useState,useEffect} from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity,ScrollView } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchStudyItem from '../../../screenComponents/Main/SearchStudyItem'
import Axios from 'axios'
import { createStackNavigator } from "@react-navigation/stack";
import SearchDetail from './SearchDetail';

const SearchEngStudy = () => {

    const navigation = useNavigation();
    const Stack = createStackNavigator();

    const [searchList,setSearchList] = useState([])

    const Detail = (id) => {
        return (
            <Stack.Navigator>
                <Stack.Screen 
                    name="SearchDetail" 
                    children={({navigation})=>
                        <SearchDetail id={id} navigation={navigation}/>} 
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        )
    }

    const category = '어학'
    useEffect(()=>{
        Axios.get(`http://localhost:8080/group?category=${category}`)
        .then(response=>{
            if(response.data.success === true){
                setSearchList(response.data.group)
            }else{
                alert(`아직 ${category} 스터디가 없네요!`);
            }
        }).catch((error)=>{
            alert(error)
            console.warn(error)
        })
    },[])

    const [searchKeyword,setSearchKeyword] = useState('')

    const searchStudy = (keyword) => {
        Axios.get(`http://localhost:8080/group?category=${category}&keyword=${keyword}`)
        .then(response=>{
            if(response.data.success === true){
                alert('success get study list')
                setSearchList(response.data.group)
                console.warn(searchList)
            }else{
                alert('해당하는 스터디가 없네요!');
            }
        }).catch((error)=>{
            alert(error)
            console.warn(error)
        })
    }

    const renderStudyGroup = searchList.map((group,index)=>{
        return(
            
            <TouchableOpacity key={index} onPress={()=>
                    navigation.navigate('SearchDetail',{...group})
                }>
                <SearchStudyItem
                    title={group.title} 
                    desc={group.description} 
                    startDate={group.startDate} 
                    endDate={group.endDate} 
                    person={group.personnel} 
                    offline={group.faceToFace}
                    keyword={group.keyword}
                    participants={group.participants}
                    leader={group.leader}
                    recruit={group.recruit}
                />
            </TouchableOpacity>
        )
    })
    


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
                        <Ionic name="arrow-back" style={{fontSize:25,color:'black'}}/>
                    </TouchableOpacity>
                    <Text style={styles.category}>{category}</Text>
                </View>
                <TextInput
                    placeholder="찾고싶은 스터디를 검색해보세요!"
                    style={styles.searchInput}
                    onChangeText={(searchKeyword)=>setSearchKeyword(searchKeyword)}
                    onSubmitEditing={()=>searchStudy(searchKeyword)}
                />
                <ScrollView horizontal={false} contentContainerStyle={styles.studyList}>
                    {renderStudyGroup}
                </ScrollView>
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
