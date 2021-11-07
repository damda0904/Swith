import React from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
const ConfirmStudy = () => {
    const navigation = useNavigation();
    const checklist = ['카카오 100% 초콜릿 먹기','백준 문제 풀이','1일 1커밋','네트워크 복습']
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
                    <Ionic name="arrow-back" style={{fontSize:25,color:'black',left:15}}/>
                </TouchableOpacity>
                <Text style={styles.title}>카카오 코테 뿌시기</Text>
                <Text style={styles.week}>1주차 인증하기</Text>
            </View>

            <View style={styles.confirm}>
                <Image style={styles.confirmImage} source={require('../../../../../assets/study.jpeg')}/>
                <View style={styles.todolist}>
                    <View style={styles.checklist} >
                        <View style={styles.checkbox}></View>
                        <Text style={styles.checktodo}>카카오 100% 초콜릿 먹기</Text>
                    </View>
                    <View style={styles.checklist} >
                        <View style={styles.checkbox}></View>
                        <Text style={styles.checktodo}>백준 문제 풀이</Text>
                    </View>
                    <View style={styles.checklist} >
                        <View style={styles.checkbox}></View>
                        <Text style={styles.checktodo}>1일 1커밋</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.confirmBtn} onPress={()=>navigation.push('Main')}>
                    <Text style={styles.buttonText}>인증!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        color:'black'
    },
    header:{
        marginTop:150
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        marginVertical:10,
        marginHorizontal:20
    },
    week:{
        fontSize:13,
        marginHorizontal:21
    },
    confirm:{
        margin:20,
        width:350,
        height:'100%'
    },
    confirmImage:{
        width:350,
        height:350,
        backgroundColor:'#efefef'
    },
    checklist:{
        width:'50%',
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
    },
    checkbox:{
        width:15,
        height:15,
        borderRadius:3,
        backgroundColor:'#2B7FFF',
        marginRight:10
    },
    checktodo:{
        fontSize:15
    },
    confirmBtn:{
        width:'100%',
        height:50,
        borderRadius:50,
        marginTop:50,
        backgroundColor:'#2B7FFF',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        color:'white',
        fontWeight:'bold'
    }
});
export default ConfirmStudy
