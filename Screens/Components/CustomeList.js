import React, { useState,useEffect} from 'react'
import { View,StyleSheet } from 'react-native'
import { ListItem,Avatar } from 'react-native-elements'
import { db } from '../../firebase'
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons'

export default function CustomeList({id, channelName,enterChat}) {
    const [cmessage,setMessage]=useState([])
    useEffect(()=>{
        const   unsbscribe=  db.collection("chats").doc(id).collection("messages")
        .orderBy('timestamp','asc').onSnapshot(snapshot=>
                    setMessage(snapshot.docs.map(
                        doc=>(doc.data())
                    ))
        )
      return unsbscribe
        })
 return (
 <View style={styles.container}>
 <ListItem key={id} bottomDivider onPress={()=>enterChat(id,channelName)}>
 <MaterialIcons name="groups" size={50} color="gray"
     rounded
     source={{uri:cmessage?.[0]?.photoURL ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCYNno4LywuOUSwtYDeJELOtwdtVW-LSl_0Q&usqp=CAU"}}
     
     />
     <ListItem.Content>
         <ListItem.Title style={{fontWeight:'800' ,color:'black'}}>
             {channelName}
         </ListItem.Title>
         <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            {cmessage?.[0]?.displayName}: {cmessage?.[0]?.message}
         </ListItem.Subtitle>
     </ListItem.Content>
 </ListItem>
 </View>
)
}
const styles = StyleSheet.create({
container:{

}
}
)