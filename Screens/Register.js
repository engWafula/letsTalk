import React ,{useLayoutEffect, useState} from 'react'
import {auth} from "../firebase"
import { View,StyleSheet ,Text,KeyboardAvoidingView,ImageBackground} from 'react-native'
import {Button,Input,Image} from  'react-native-elements'
import { FontAwesome,Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native'

export default function Register({navigation}) {
    const [name,setName]=useState( '')
    const [email,setEmail]=useState( '')
    const [password,setPassword]=useState( '')
    const [image,setImage]=useState( '')
    useLayoutEffect(()=>{
     navigation.setOptions({
         headerBackTitle:"ABC"
     })
    },[navigation])


    const Register=()=>{
        
        auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
        
          authUser.user.updateProfile({
              displayName:name,
              photoURL:image 
          })
        }).catch(error=>alert(error.message))

    }




 return (
    
    
<ImageBackground blurRadius={2} style={styles.container} resizeMode="cover" source={require('../assets/bac.jpg')}>
<StatusBar style='light' backgroundColor='#1A237E' />
     <Text style={{marginBottom:50,fontSize:25}}>Create A Lets Talk Account</Text>
<View style={styles.inputContainer}>

 <Input placeholder='Full Name' autoFocus type='text' value={name} 
 onChangeText={text=>setName(text)}/>

 <Input placeholder='Email'  type='email' value={email} onChangeText={text=>setEmail(text)}/>

 <Input placeholder='Password' secureTextEntry  type='password' value={password} 
 onChangeText={text=>setPassword(text)} />

 <Input placeholder='Profile Picture Url(Optional)'  type='text' value={image}
 onSubmitEditing={Register}
  onChangeText={text=>setImage(text)}/>
</View>

    <Button    buttonStyle={{backgroundColor:"#3F51B5"}} containerStyle={styles.button}  raised onPress={Register} title='Register'/>
   
    <View style={{height:10}}/>
    <View style={{position: 'relative', left: 0, right: 0, bottom: 0,marginTop:30,alignItems:"center"}}>
    <Text style={{color:'gray',marginBottom:10}}>Contact us:</Text>
        <View style={{flexDirection:'row',padding:10,marginBottom:15}}>
            
            <FontAwesome name='envelope' size={20} color="#3F51B5"        
            onPress={() => Linking.openURL('mailto:wafulaallan5@gmail.com?subject=&body=') }  />
        <Text style={{marginLeft:5,marginTop:5}} 
        onPress={() => Linking.openURL('mailto:wafulaallan5@gmail.com?subject=&body=') }>wafulaallan5@gmail.com</Text>
        </View>
        <Text style={{color:'gray'}}>Version 1.0.0 </Text></View>
 </ImageBackground>
)
}
const styles = StyleSheet.create({
container:{
flex:1,
alignItems:'center',
justifyContent:'center',
backgroundColor:'white',
padding:10
},
button:{
    width:200,
    marginTop:10,
    color:"red"
},
inputContainer:{
    width:300
}
}
)