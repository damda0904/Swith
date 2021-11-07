import React,{useState} from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import InputEmail from '../screenComponents/Auth/InputEmail';
import ConfirmEmail from '../screenComponents/Auth/ConfirmEmail';
import SignupInfo from '../screenComponents/Auth/SignupInfo';
import { createStackNavigator } from "@react-navigation/stack";

const SignUpScreen = () => {
    const Stack = createStackNavigator();

    const [email,setEmail] = useState('');
    const [isConfirm,setIsConfirm] = useState(false)
    
   

    return (
        <Stack.Navigator>
            <Stack.Screen name="InputEmail" children={({navigation})=><InputEmail setEmail={setEmail} navigation={navigation}/>} options={{headerShown: false}}/>
            <Stack.Screen name="ConfirmEmail" children={({navigation})=><ConfirmEmail email={email} setIsConfirm={setIsConfirm} navigation={navigation}/>} options={{headerShown: false}}/>
            <Stack.Screen name="SignupInfo" children={({navigation})=><SignupInfo email={email} navigation={navigation}/>} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        color:'black',
        paddingHorizontal:20
    },
});

export default SignUpScreen
