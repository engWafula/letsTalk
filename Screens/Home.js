import React ,{useEffect, useLayoutEffect, useState} from 'react'
import { ScrollView } from 'react-native'
import { View,StyleSheet,Text,SafeAreaView } from 'react-native'
import CustomeList from './Components/CustomeList'
import {Avatar} from   'react-native-elements'
import { auth,db } from '../firebase'
import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
//import Login from  '../Screens/Login'
import {AntDesign,SimpleLineIcons,FontAwesome5} from  '@expo/vector-icons'
//import AddChannel from '../Screens/AddChannel';

export default function Home({navigation}) {
    const [chats,setChats]=useState([]) 

    useEffect(() => {
  const unsubscribe= db.collection("chats") .onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => (
            {
              id: doc.id,
              data: doc.data(),
            }
          )))
        ))
        return unsubscribe
      }, [])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"LETS TALK",
            headerStyle:{backgroundColor:"#3F51B5"},
             headerTitleMarginLeft:5,
            headerTitleStyle:{color:"white"},
            headerTintColor:{color:""},
            headerLeft:()=>(
                <View style={{marginLeft:20}}>
                    {/* <TouchableOpacity>
                    <Avatar rounded source={{uri:auth?.currentUser?.photoURL}} onPress={SignOut}/>
                    </TouchableOpacity> */}
                </View>
        ),
        headerRight:()=>(
             <View style={styles.headerRight}>
                 <TouchableOpacity activeOpacity={0.5} style={{flexDirection:'column'}}>
                        <FontAwesome5 name='plus' size={24} color='white' 
                        onPress={()=>navigation.navigate('AddChannel')}/>
                        <Text style={{color:"white",textAlign:'center',alignItems:'center'}}>new</Text>
                 </TouchableOpacity>
                 <TouchableOpacity activeOpacity={0.5}   >
                      
                        <FontAwesome5 name='user-circle' size={24} color='white'
                        onPress={()=>navigation.navigate('ProfileScreen')}
                        />
                        <Text style={{color:"white",textAlign:'center',alignItems:'center'}}>profile</Text>
                        
                 </TouchableOpacity>
             </View>
        )
        })
       },[navigation])
   const SignOut=()=>{
       auth.signOut().then(()=>{
           navigation.replace('Login')
       })
   }

   const enterChat=(id,channelName)=>{
          navigation.navigate('Chat',{id,channelName})
   }


 return (
 <SafeAreaView style={styles.container}>
    <StatusBar style='light' backgroundColor='#1A237E' />
<ScrollView style={{ height:'100%'}}>
{chats.map(({id,data:{ channelName}})=>(
  
   <CustomeList key={id} id={id}  channelName={ channelName}  enterChat={enterChat} />)
)}
   
</ScrollView>
 </SafeAreaView>
)
}
const styles = StyleSheet.create({
    headerRight:{
    
   flexDirection:'row',
   width:80,
   marginRight:20,
   justifyContent:'space-between'
}
}
)