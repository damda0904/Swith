import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import {useNavigation} from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyStudyList = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.push("Detail")}>
            <Image style={styles.image} source={require('../../../../assets/logo.png')}/>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.date}>{props.startDate}~{props.endDate}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#f1f1f1',
    width:165,
    height:254,
    padding:15,
    margin:5,
    ...Platform.select({
        ios: {
            shadowColor: '#bdbdbd',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10
        },
        android: {
            elevation: 10,
        },
    }),
  },
  image:{
      width:131,
      height:162,
      resizeMode:'cover'
  },
  title:{
      fontSize:14,
      marginTop:17
  },
  date:{
      fontSize:10,
      marginTop:6
  }
});
export default MyStudyList
