import React, { useLayoutEffect, useState } from 'react'
import { View,StyleSheet ,Text} from 'react-native'
import {Button,Input,Image} from  'react-native-elements'
import Icon from  'react-native-vector-icons/FontAwesome'
import { FontAwesome,Ionicons } from '@expo/vector-icons'
import { Linking } from 'react-native'
import { db } from '../firebase'
export default function AddChannel({navigation}) {
    const [input,setInput]=useState()
    useLayoutEffect(()=>{
           navigation.setOptions({
               title:'Add New Channel '
           })
    },[navigation])
    const createChannel = async ()=>{
         await  db.collection('chats').add({
            channelName:input
         }).then(()=>{
             navigation.goBack()
         }).catch(error=>alert(error))
    }
 return (
 <View style={styles.container}>
<Input placeholder='Enter Channel Name' value={input} type='text'
onChangeText={text=>setInput(text)}
leftIcon={<Icon name='wechat' type='antdesign' size={24} color="black" 
onSubmitEditing={createChannel}
/>}
/>
<Button disabled={!input} title='Create new Channel' onPress={createChannel }  buttonStyle={{backgroundColor:"#3F51B5"}}/>
<View style={{position: 'relative', left: 0, right: 0, bottom: 0,marginTop:400,alignItems:"center"}}>
    <Text style={{color:'gray',marginBottom:10}}>Contact us:</Text>
        <View style={{flexDirection:'row',padding:10,marginBottom:15}}>
            
            <FontAwesome name='envelope' size={20} color="#3F51B5"        
            onPress={() => Linking.openURL('mailto:wafulaallan5@gmail.com?subject=&body=') }  />
        <Text style={{marginLeft:5,marginTop:5}} 
        onPress={() => Linking.openURL('mailto:wafulaallan5@gmail.com?subject=&body=') }>wafulaallan5@gmail.com</Text>
        </View>
        <Text style={{color:'gray'}}>Version 1.0.0 </Text></View>
 </View>
)
}
const styles = StyleSheet.create({
container:{
padding:30,
//backgroundColor:"white "
} 
}
)