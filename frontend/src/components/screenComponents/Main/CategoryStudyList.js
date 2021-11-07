import React,{useState} from 'react'
import { View, Text } from 'react-native'
import Axios from 'axios'

const CategoryStudyList = (category,keyword) => {

    const [searchList,setSearchList] = useState([])
    Axios.get(`http://localhost:8080/group?category=${category}&keyword=${keyword}`)
    .then(response=>{
        if(response.data.success === true){
            alert('success get study list')
            setSearchList(response.data.group)
            console.warn(searchAllList)
        }else{
            alert('아직 자격증 스터디가 없네요!'+response.status);
        }
    }).catch((error)=>{
        alert(error)
        console.warn(error)
    })

    return searchList
}

export default CategoryStudyList

