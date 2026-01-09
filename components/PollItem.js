import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PollItem({poll}) {
    console.log(poll)
  return (
    <View style={styles.item}>
      <Text style={styles.question}>{poll.question}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    item:{
        padding: 8,
        margin:3,
        backgroundColor: 'cyan',
        borderColor: 'blue',
        borderWidth: 2,
        borderRadius: 8
    },
    question:{
        fontSize: 20
    }
})