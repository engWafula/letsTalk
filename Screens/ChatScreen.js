import React, { useState } from 'react'
import { useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { View,StyleSheet,Text} from 'react-native'
import {Avatar} from 'react-native-elements'
import { FontAwesome,Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
import { db ,auth} from '../firebase'
import firebase from 'firebase'
export default function ChatScreen({navigation,route}){
    const [input,setInput]=useState("")
   const [messages,setMessages]= useState([])
    useLayoutEffect(()=>{
      navigation.setOptions({
          title:' Chat',
          headerAlign:"left",
          headerTitle:()=>(
              <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Avatar rounded 
            source={{uri:messages[0]?.data.photoURL}}/>
                  <Text style={{color:"white",marginLeft:10,fontWeight:"800"}}>{route.params.channelName}</Text>
              </View>
          ),
          headerRight:()=>(
              <View style={{flexDirection:'row',justifyContent:'space-between',width:80,marginRight:15}}>
                  <TouchableOpacity>
                       <FontAwesome name="video-camera" size={24} color="white"/>
                  </TouchableOpacity>
                  <TouchableOpacity>
                       <Ionicons name="call" size={24} color="white"/>
                  </TouchableOpacity>
                 
              </View>
          )

      })
    },[navigation,messages])
    const send=()=>{
           Keyboard.dismiss() 
           db.collection("chats").doc(route.params.id).collection("messages").add({
               timestamp:firebase.firestore.FieldValue.serverTimestamp(),
               message:input,
               displayName:auth.currentUser.displayName,
               email:auth.currentUser.email,
               photoURL:auth.currentUser.photoURL
           })
           setInput('')
    }
    useLayoutEffect(()=>{
    const   unsbscribe=  db.collection("chats").doc(route.params.id).collection("messages")
    .orderBy('timestamp','asc').onSnapshot(snapshot=>
                setMessages(snapshot.docs.map(
                    doc=>({
                        id:doc.id,
                        data:doc.data()
                    })
                ))
    )
  return unsbscribe
    },[route])
 return (
 <SafeAreaView  style={{flex:1,backgroundColor:'white'}}>
      <StatusBar style='light' backgroundColor='#1A237E' />
       <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"}
                  keyboardVerticalOffset={90}
                  style={styles.container}
                  >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <>
                  <ScrollView contentContainerStyle={{paddingTop:15,overflow:"hidden"}}>
                   {messages.map(({id,data})=>(
                               data.email===auth.currentUser.email? (
                                   <View key={id} style={styles.receiver}>
                                        {/* <Avatar source={{uri:data.photoURL}} rounded size={30}
                                        position='absolute'
                                        bottom={-15}
                                        /> */}
                                        <Text style={styles.receiverText}>{data.message}</Text>
                                        {/* <Text style={styles.receiverName}>{data.displayName}</Text> */}
                                        {/* <Text style={styles.receiverName}>{data.displayName}</Text>       */}
                                                                     </View>
                               ):(
                                   <View  key={id}  style={styles.sender}>
                                   {/* <Avatar/> */}
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.email}
                                            {/* <Text>{data.timestamp}</Text> */}
                                        </Text>
                                        {/* <Text style={styles.senderName}>{data.displayName}</Text> */}
                                   </View>
                               )

                   ))}
                  </ScrollView>
                  
                     <View style={styles.footer}>
                     <TextInput placeholder="Type a message" style={styles.input}
                     value={input}
                     onChangeText={text=>setInput(text)}
                     onSubmitEditing={send}
                     />
                     <TouchableOpacity onPress={send} activeOpacity={0.5}>
                       <Ionicons name="send" size={24} color="#3F51B5"/>
                     </TouchableOpacity>
                     </View>
                     </>
                     </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
                  
 </SafeAreaView>
)
}
const styles = StyleSheet.create({
container:{
        flex:1,
        
},
sender:{
    padding:15,
    backgroundColor:"#3F51B5",
    alignSelf:'flex-start',
    borderRadius:10,
    marginRight:15,
    marginBottom:20,
    maxWidth:'80%',
    position:'relative',
    margin:15
},
senderText:{
    color:"white",
    fontWeight:"500",
    marginLeft:10,
    marginBottom:15
},
senderName:{
    fontSize:10,
    color:"yellow",
    paddingRight:10,
    left:10
},
receiverText:{
    color:"black",
    fontWeight:"500",
    marginLeft:10,
    marginBottom:15
},
receiver:{
    padding:15,
    backgroundColor:"#ECECEC",
    alignSelf:'flex-end',
    borderRadius:10,
    marginRight:15,
    marginBottom:20,
    maxWidth:'80%',
    position:'relative'

},
footer:{
         flexDirection:'row',
         alignItems:'center',
         width:'100%',
         padding:12,
     
},
input:{
bottom:0,
height:40,
flex:1,
marginRight:15,
borderColor:"transparent",
backgroundColor:"#ECECEC",
//borderWidth:1,
padding:10,
color:"gray",
borderRadius:30

}
}
)