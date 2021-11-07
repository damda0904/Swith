import React from 'react'
import { View, Text,StyleSheet,SafeAreaView } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native";

const MyStudyScreen = () => {
    const navigation = useNavigation();
    const todoStudy = [{
        title:'카카오 코테 뿌시기',
        week:3,
        checklist:['카카오 100% 초콜릿 먹기','백준 문제 풀이','1일 1커밋','네트워크 복습']
    },{
        title:'아침 운동 꾸준히 해봐요',
        week:3,
        checklist:['간단한 스트레칭','조깅 30분','단백질 챙기기']
    }]

    const todoCard = todoStudy.map((todoGroup,index) => {
        let checklist = todoGroup.checklist;
        return(
            <TouchableOpacity style={styles.todoCard} key={index}>
                <Text style={styles.studyTitle}>{todoGroup.title}</Text>
                <Text style={styles.week}>{todoGroup.week}주차 째 진행 중</Text>
                {checklist.map((todo,index)=>{
                    return(
                        <View style={styles.checklist} key={index}>
                            <View style={styles.checkbox}></View>
                            <Text style={styles.checktodo}>{todo}</Text>
                        </View>
                    )
                })}
                <TouchableOpacity style={styles.confirmBtn} onPress={()=>navigation.push('ConfirmStudy')}>
                    <Text style={styles.buttonText}>인증하러 가기</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>이번 주 TODO</Text>
            <ScrollView>
                {todoCard}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        backgroundColor: '#f1f1f1',
        alignItems: 'stretch',
        justifyContent: 'center',
        color:'black'
    },
    header:{
        fontSize:25,
        fontWeight:'bold',
        marginVertical:20,
        marginHorizontal:20
    },
    todoCard:{
        marginHorizontal:20,
        width:350,
        backgroundColor:'white',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#dbdbdb',
        padding:30,
        alignItems:'stretch',
        marginVertical:10
    },
    studyTitle:{
        fontSize:18,
        fontWeight:'bold'
    },
    week:{
        fontSize:12,
        color:'#6a6a6a',
        marginVertical:10,
        paddingBottom:15
    },
    checklist:{
        width:'90%',
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


export default MyStudyScreen
