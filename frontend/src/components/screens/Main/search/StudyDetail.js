import React,{useState,useEffect} from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from "@react-navigation/native";
import Ionic from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import FlipCard from "react-native-flip"
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudyDetail = ({route,navigation}) => {
    // const group = route.params

    // const [groupinfo,setGroupInfo] = useState({})
    // const [leading,setLeading] = useState(false)
    // const [following,setFollowing] = useState(false)

    //token
    // const [token,setToken] = useState('');
    // AsyncStorage.getItem('token')
    // .then((value)=>setToken(value));

    // const config = {
    //     headers:{"Authorization": `Bearer ${token}`}
    // };

    // useEffect(()=>{
    //     Axios.get(`http://localhost:8080/group/info/${group._id}`,config)
    //     .then(response=>{
    //         if(response.data.success === true){
    //             alert('success get study info')
    //             console.warn(groupinfo.group)
    //             setGroupInfo(response.data.group)
    //         }else{
    //             alert(`해당 스터디는 접근할 수 없습니다.${response.status}`);
    //         }
    //     }).catch((error)=>{
    //         alert(error)
    //         console.warn(error)
    //     })
    // },[])

    const front = () => {
        return(
            <View style={styles.card}>
                <Image style={styles.cardImage} source={require('../../../../../assets/logo.png')}/>
            </View>
        )
    }
    const back = () => {
        return(
            <View style={styles.card}>
                <Text>back</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView horizontal={false}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
                            <Ionic name="arrow-back" style={{fontSize:25,color:'white',marginBottom:15}}/>
                        </TouchableOpacity>
                        <Text style={styles.date}>2021.09.13~2021.11.03</Text>
                        <Text style={styles.title}>카카오 코테 뿌시기 스터디</Text>
                        <Text style={styles.person}>5명이 참여중입니다!</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Image style={styles.mainImage} source={require('../../../../../assets/logo.png')}/>
                    </View>
                </View>

                <View style={styles.weekGoal}>
                    <Text style={styles.week}>Week 1</Text>
                    <Text style={styles.weekSentence}>이번 주 공통 스터디 목표는</Text>
                    <Text style={styles.ourGoal}>"Http,Https 차이 공부하기"</Text>
                </View>

                <View style={styles.confirm}>
                    <Text style={styles.subtitle}>스터디원들의{"\n"}이번 주 스터디 인증</Text>
                    <ScrollView horizontal={true} contentContainerStyle={styles.confirmList}>
                        <View style={styles.confirmCard}>
                            <Image style={styles.confirmImage} source={require('../../../../../assets/logo.png')}/>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>백준 5문제 풀이</Text>
                            </View>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>잔디심기</Text>
                            </View>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>알고리즘 공부</Text>
                            </View>
                        </View>

                        <View style={styles.confirmCard}>
                            <Image style={styles.confirmImage} source={require('../../../../../assets/logo.png')}/>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>네트워크 공부</Text>
                            </View>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>잔디심기</Text>
                            </View>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>복습</Text>
                            </View>
                        </View>

                        <View style={styles.confirmCard}>
                            <Image style={styles.confirmImage} source={require('../../../../../assets/logo.png')}/>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>카카오 기출 문제 풀이</Text>
                            </View>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>프로젝트</Text>
                            </View>
                        </View>

                        <View style={styles.confirmCard}>
                            <Image style={styles.confirmImage} source={require('../../../../../assets/logo.png')}/>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>백준 5문제 풀이</Text>
                            </View>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>알고리즘 공부</Text>
                            </View>
                        </View>

                        <View style={styles.confirmCard}>
                            <Image style={styles.confirmImage} source={require('../../../../../assets/logo.png')}/>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>백준 5문제 풀이</Text>
                            </View>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>잔디심기</Text>
                            </View>
                            <View style={styles.checklist}>
                                <View style={styles.checkbox}></View>
                                <Text style={styles.checktodo}>알고리즘 공부</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
                <View style={styles.messageNav}>
                    <Text style={styles.subtitle}>스터디 중 궁금한게 있으신가요?</Text>
                    <TouchableOpacity style={styles.messageButton}>
                        <Text style={styles.messageButtonTxt}>그룹 채팅방에 질문하러 가기!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    header:{
        width:'100%',
        padding:20,
        height:205,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#589BFF'
    },
    headerLeft:{
        width:'70%',
        top:-10
    },
    headerRight:{
        width:'30%',
        alignItems:'flex-end'
    },
    date:{
        color:'white',
        fontSize:13,
        marginBottom:5
    },
    title:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:25,
    },
    person:{
        color:'white',
        fontSize:14
    },
    mainImage:{
        width:80,
        height:80,
        borderRadius:100,
        backgroundColor:'#CACACA'
    },
    weekGoal:{
        alignItems:'center',
        paddingVertical:30,
        borderBottomWidth:1,
        borderBottomColor:'#dadada'
    },
    week:{
        fontSize:18,
        fontWeight:'bold'
    },
    subtitle:{
        fontSize:19,
        fontWeight:'600',
        lineHeight:28
    },
    ourGoal:{
        color:'#2B7FFF',
        fontWeight:'bold',
        fontSize:18
    },
    weekSentence:{
        fontSize:11,
        marginTop:6,
        marginBottom:12
    },
    confirm:{
        height:400,
        backgroundColor:'white',
        justifyContent:'center',
        padding:20
    },
    confirmList:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:350,
    },
    confirmCard:{
        width:180,
        height:'75%',
        borderWidth:1,
        borderRadius:15,
        borderColor:'#dbdbdb',
        alignItems:'center',
        paddingVertical:10,
        marginHorizontal:7
    },
    confirmImage:{
        height:150,
        width:'90%',
        borderRadius:10,
        backgroundColor:'#f1f1f1',
    },
    checklist:{
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        marginTop:10
    },
    checkbox:{
        width:15,
        height:15,
        borderRadius:5,
        backgroundColor:'#2B7FFF',
        marginRight:10
    },
    messageNav:{
        marginTop:17,
        backgroundColor:'#fff',
        padding:20,
        justifyContent:'space-between',
        alignItems:'stretch'
    },
    messageButton:{
        marginTop:20,
        width:'100%',
        backgroundColor:'#2B7FFF',
        borderRadius:15,
        height:100,
        justifyContent:'center',
        alignItems:'center'
    },
    messageButtonTxt:{
        fontSize:18,
        color:'white',
        fontWeight:'bold'
    }
})
export default StudyDetail
