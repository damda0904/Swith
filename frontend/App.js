import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import Axios from 'axios';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//components
//splash
import SplashScreen from './src/components/screens/SplashScreen';

//auth
import SignupScreen from './src/components/screens/SignupScreen';
import LoginScreen from './src/components/screens/LoginScreen';

//search study at homestack
//home
import HomeScreen from './src/components/screens/HomeScreen';
//search category navigation
import SearchCertStudy from './src/components/screens/Main/search/SearchCertStudy';
import SearchEngStudy from './src/components/screens/Main/search/SearchEngStudy';
import SearchEtcStudy from './src/components/screens/Main/search/SearchEtcStudy';
import SearchHabitStudy from './src/components/screens/Main/search/SearchHabitStudy';
import SearchJobStudy from './src/components/screens/Main/search/SearchJobStudy';
import SearchMajorStudy from './src/components/screens/Main/search/SearchMajorStudy';
import SearchSelfStudy from './src/components/screens/Main/search/SearchSelfStudy';
import SearchExamStudy from './src/components/screens/Main/search/SearchExamStudy';
//내가 참여한 스터디 그룹 화면
import StudyDetail from './src/components/screens/Main/search/StudyDetail';
//스터디 모집하기
import RegisterStudy from './src/components/screens/Main/search/RegisterStudy';


//my study TODO
import MyStudyScreen from './src/components/screens/Main/mystudy/MyStudyScreen';
import ConfirmStudy from './src/components/screens/Main/mystudy/ConfirmStudy';

//noticification
import NoticeScreen from './src/components/screens/Main/noticification/NoticeScreen';

//mypage
import ProfileScreen from './src/components/screens/Main/mypage/MypageScreen';
import SearchDetail from './src/components/screens/Main/search/SearchDetail';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const MyStudyStack = createStackNavigator();
const NotiStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Auth = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const HomeStackScreen = () => {
  return(
    <Stack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchMajor" component={SearchMajorStudy} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchCert" component={SearchCertStudy} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchEtc" component={SearchEtcStudy} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchEng" component={SearchEngStudy} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchHabit" component={SearchHabitStudy} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchJob" component={SearchJobStudy} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchSelf" component={SearchSelfStudy} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchExam" component={SearchExamStudy} options={{headerShown: false}}/>
      <HomeStack.Screen name="SearchDetail" component={SearchDetail} options={{headerShown: false}}/>
      <HomeStack.Screen name="Detail" component={StudyDetail} options={{headerShown: false}}/>
      <HomeStack.Screen name="RegisterStudy" component={RegisterStudy} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const MyStudyStackScreen = () => {
  return(
    <Stack.Navigator>
      <MyStudyStack.Screen name="MyStudyTodo" component={MyStudyScreen} options={{headerShown: false}}/>
      <MyStudyStack.Screen name="ConfirmStudy" component={ConfirmStudy} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const NotiStackScreen = () => {
  return(
    <Stack.Navigator>
      <NotiStack.Screen name="Notice" component={NoticeScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const ProfileStackScreen = () => {
  return(
    <Stack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}



const MainTabScreen = () => {
  return(
    <Tab.Navigator 
      initialRouteName="HomeStack" 
      options={{headerShown: false}}
      screenOptions={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle:{
            height:80
          },
          backgroundColor:'#000',
          tabBarIcon:({focused,size,colour})=>{
            let iconName;
            if(route.name === 'HomeStack'){
              iconName= focused?"home" : "home-outline";
            }else if(route.name === 'MyStudyStack'){
              iconName= focused?"layers" : "layers-outline";
            }else if(route.name === 'NotiStack'){
              iconName= focused? "notifications" : "notifications-outline";
            }else if(route.name === 'ProfileStack'){
              iconName= focused? "ios-person-circle" : "ios-person-outline";
            }

            return <Ionic name={iconName} size={30} color={colour}/>
          }
        })}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{headerShown: false}}/>
      <Tab.Screen name="MyStudyStack" component={MyStudyStackScreen} options={{headerShown: false}}/>
      <Tab.Screen name="NotiStack" component={NotiStackScreen} options={{headerShown: false}}/>
      <Tab.Screen name="ProfileStack" component={ProfileStackScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={MainTabScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black'
  },
});

export default App