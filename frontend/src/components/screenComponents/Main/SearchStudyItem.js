import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const SearchStudyItem = (props) => {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={require('../../../../assets/logo.png')}/>
            <View style={styles.studyInfo}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.desc}><Text style={styles.desc}>{props.desc}</Text></View>
                <View style={styles.bottomInfo}>
                    <Text style={styles.bottomInfoLeft}>기간</Text>
                    <Text style={styles.bottomInfoRight}>{props.startDate}~{props.endDate}</Text>
                </View>
                <View style={styles.bottomInfo}>
                    <Text style={styles.bottomInfoLeft}>인원</Text>         
                    <Text style={styles.bottomInfoRight}>{props.person}명</Text>
                </View>
                <View style={styles.bottomInfo}>
                    <Text style={styles.bottomInfoLeft}>비대면/대면</Text>    
                    <Text style={styles.bottomInfoRight}>{props.offline ? '대면' : '비대면'}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#dbdbdb',
        height:154,
        padding:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    image:{
        width:140,
        height:125,
        resizeMode:'cover',
        backgroundColor:'#cacaca'
    },
    studyInfo:{
        width:'70%',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        left:25
    },
    title:{
        fontSize:16,
        fontWeight:'bold'
    },
    desc:{
        fontSize:12,
        paddingVertical:3,
        borderBottomWidth:1,
        width:'100%',
        borderBottomColor:'#e0e0e0',
        marginBottom:5
    },
    bottomInfo:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingVertical:3,
    },
    bottomInfoLeft:{
        fontSize:10,
        color:'#7c7c7c',
        marginRight:10
    },
    bottomInfoRight:{
        fontSize:10,
        alignItems:'flex-start'
    }
})

export default SearchStudyItem
