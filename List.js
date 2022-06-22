import { StyleSheet,ScrollView,TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'

const List = ({Stations,number,setnumber}) => {
 [number,setnumber] = useState(number)


  return (
    <View>
      
      <Text>List</Text>
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  station:{
    width:'100%',
   
    borderColor:'#000',
    borderWidth:1,
    marginVertical:3,
    padding:10,
    borderRadius:10
  },
  name:{
    fontSize:24,
    fontWeight:'bold',
  }
})