import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>home</Text>
        </View>
    )
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
export default HomeScreen
