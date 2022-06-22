import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Playing({stations}) {
  return (
    <View>
       <View style={styles.anime}></View>
      <View style={styles.details}>
        <Text style={styles.name}>{stations.name}</Text>
        <View style={styles.clock}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  anime:{
    height:150,
    width:'100%',
    backgroundColor:'#DDD'
  },
  details:{
    padding:10,
    backgroundColor:'#fbb'
  },
  clock:{
    backgroundColor:'#bccd00',
    height:100,
    width:'100%'
  },
  name:{
    fontSize:24,
    fontWeight:'600'
  }
})