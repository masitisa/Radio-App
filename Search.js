import { StyleSheet, Text, View, Image, Button,Alert } from 'react-native';
import {useState} from 'react'

export default function Food({}) {
  const [Items, SetItems] = useState(0);
  function AddItem(){
    SetItems(Items + 1);

    
    
  }
  function DeleteItem(){
    if(Items > 0){
      SetItems(Items - 1);
      
    }else{
      Alert.alert('no '  + ' is oreder')
    }

    
  }
  return (
    <View style={styles.contact}>
      <Text>{Items}</Text>
     
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <View>
          </View>
        </View>



        <View style={styles.Buttons}>
          <Button title="Add order" onPress={AddItem} />
          <Button title="Delete " onPress={DeleteItem} />
        </View>
      </View>
  
  );
}

const styles = StyleSheet.create({
  contact: {
    margin: 20,
    padding: 10,
    
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    width:'95%'
  },
  details: {
    marginLeft: 20,
  },
  image: {
    height: 100,
    width: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  Buttons:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:14
  }
}) 