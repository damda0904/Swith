import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from "@react-navigation/native";
import Ionic from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import FlipCard from "react-native-flip"

const StudyDetail = () => {
    const navigation = useNavigation();

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

                <ScrollView horizontal={true} style={styles.confirmList}>
                    <Text style={styles.subtitle}>이번 주의 스터디 인증</Text>
                </ScrollView>
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
        fontSize:16,
        fontWeight:'600'
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
    }
})
export default StudyDetail
