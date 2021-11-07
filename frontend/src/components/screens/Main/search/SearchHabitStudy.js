import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchStudyItem from '../../../screenComponents/Main/SearchStudyItem'

const SearchHabitStudy = () => {

    const navigation = useNavigation();

    let title = "제목"
    let desc = "내용내용"
    let startDate = "2021.09.20"
    let endDate = "2021.11.20"
    let person = 5
    let offline = "대면"
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
                        <Ionic name="arrow-back" style={{fontSize:25,color:'black'}}/>
                    </TouchableOpacity>
                    <Text style={styles.category}>습관</Text>
                </View>
                <TextInput
                    placeholder="찾고싶은 스터디를 검색해보세요!"
                    style={styles.searchInput}
                />
                <View style={styles.studyList}>
                    <SearchStudyItem title={title} desc={desc} startDate={startDate} endDate={endDate} person={person} offline={offline}/>
                    <SearchStudyItem title={title} desc={desc} startDate={startDate} endDate={endDate} person={person} offline={offline}/>
                    <SearchStudyItem title={title} desc={desc} startDate={startDate} endDate={endDate} person={person} offline={offline}/>
                    <SearchStudyItem title={title} desc={desc} startDate={startDate} endDate={endDate} person={person} offline={offline}/>
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
export default SearchHabitStudy
