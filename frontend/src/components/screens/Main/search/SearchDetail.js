import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet,Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionic from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native";
import Axios from 'axios';

const SearchDetail = ({route,navigation}) => {
    const group = route.params

    const [groupinfo,setGroupInfo] = useState({})
    const [leading,setLeading] = useState(false)
    const [following,setFollowing] = useState(false)

    useEffect(()=>{
        Axios.get(`http://localhost:8080/group/${group._id}`)
        .then(response=>{
            if(response.data.success === true){
                alert('success get study info')
                setGroupInfo(response.data.group)
                console.warn(groupinfo.participants.length)
                setLeading(response.data.leading)
                setFollowing(response.data.following)
            }else{
                alert(`해당 스터디는 접근할 수 없습니다.${response.status}`);
            }
        }).catch((error)=>{
            alert(error)
            console.warn(error)
        })
    },[])
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionic name="arrow-back" style={{fontSize:25,color:'white',position:'absolute',left:-100,top:-10}}/>
                </TouchableOpacity>
                <Text style={styles.title}>{groupinfo.group.title}</Text>
            </View>
            <View style={styles.desc}>
                <View style={styles.info}>
                    <Text style={styles.infoLeft}>기간</Text>
                    <Text style={styles.infoRight}>{groupinfo.group.startDate} ~ {groupinfo.group.endDate}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoLeft}>인원</Text>
                    <Text style={styles.infoRight}>{groupinfo.group.personnel}명</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoLeft}>비대면/대면</Text>
                    <Text style={styles.infoRight}>{groupinfo.group.faceToFace ? '대면' : '비대면'}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoLeft}>모집상태</Text>
                    <Text style={styles.infoRight}>{groupinfo.group.recruit ? '모집중' : '모집완료'}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoDesc}>
                        {groupinfo.group.description}
                    </Text>
                </View>
            </View>
            <View style={styles.person}>
                <Text style={styles.personCountTitle}>지금까지 {groupinfo.participants.length}명이 참여했어요!</Text>
                <ScrollView horizontal style={styles.personWrapper}>
                    <View style={styles.personProfile}>
                        <Image style={styles.personImage} source={require('../../../../../assets/logo.png')}/>
                        <Text style={styles.personName}>김민지</Text>
                    </View>
                    <View style={styles.personProfile}>
                        <Image style={styles.personImage} source={require('../../../../../assets/logo.png')}/>
                        <Text style={styles.personName}>김민지</Text>
                    </View>
                    <View style={styles.personProfile}>
                        <Image style={styles.personImage} source={require('../../../../../assets/logo.png')}/>
                        <Text style={styles.personName}>김민지</Text>
                    </View>
                    <View style={styles.personProfile}>
                        <Image style={styles.personImage} source={require('../../../../../assets/logo.png')}/>
                        <Text style={styles.personName}>김민지</Text>
                    </View>
                    <View style={styles.personProfile}>
                        <Image style={styles.personImage} source={require('../../../../../assets/logo.png')}/>
                        <Text style={styles.personName}>김민지</Text>
                    </View>
                    <View style={styles.personProfile}>
                        <Image style={styles.personImage} source={require('../../../../../assets/logo.png')}/>
                        <Text style={styles.personName}>김민지</Text>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.participate} onPress={()=>alert('신청완료')}>
                <Text style={{fontSize:16,color:'white',fontWeight:'600'}}>신청하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'flex-start',
        height:'100%',
        width:'100%',
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:80,
        width:'100%',
        backgroundColor:'#589BFF'
    },
    title:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    desc:{
        width:'100%',
        alignItems:'flex-start',
        paddingVertical:20,
        paddingHorizontal:15,
        backgroundColor:'white'
    },
    info:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:5
    },
    infoLeft:{
        color:"#696969",
        fontSize:13
    },
    infoRight:{
        color:"#222222",
        fontSize:13,
        marginLeft:10
    },
    infoDesc:{
        marginTop:18,
        lineHeight:19
    },
    person:{
        width:'100%',
        alignItems:'flex-start',
        paddingVertical:20,
        paddingHorizontal:15,
        backgroundColor:'white',
        marginVertical:10,
    },
    personCountTitle:{
        fontSize:18,
        fontWeight:'600'
    },
    personProfile:{
        alignItems:'center',
        marginTop:20,
        marginBottom:10,
        marginRight:15
    },
    personImage:{
        width:60,
        height:60,
        borderRadius:100,
        backgroundColor:'#cacaca',
    },
    personName:{
        fontSize:13,
        marginTop:13
    },
    personWrapper:{
        flexDirection:'row',
    },
    participate:{
        width:250,
        height:50,
        borderRadius:100,
        backgroundColor:'#589BFF',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    }
})
export default SearchDetail
