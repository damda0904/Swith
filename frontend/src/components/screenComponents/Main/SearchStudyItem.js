import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const SearchStudyItem = (props) => {
    return (
        <View style={styles.card}>
            <Image/>
            <View style={styles.studyInfo}>
                <Text>{props.title}</Text>
                <Text>{props.desc}</Text>
                <Text>{props.startDate}</Text>
                <Text>{props.endDate}</Text>
                <Text>{props.person}</Text>
                <Text>{props.offline}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SearchStudyItem
