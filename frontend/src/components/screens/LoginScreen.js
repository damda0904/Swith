import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const LoginScreen= () => {
    return (
        <View style={styles.container}>
            <Text>Sign in!</Text>
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

export default LoginScreen
