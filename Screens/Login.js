import React ,{useState,useEffect} from 'react'
import {auth} from "../firebase"
import { View,StyleSheet ,Text,KeyboardAvoidingView,ImageBackground } from 'react-native'
import {Button,Input,Image} from  'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { Formik} from  'formik'
import { Linking } from 'react-native'
import * as Yup from  'yup'
import { FontAwesome,Ionicons } from '@expo/vector-icons'
import AppForm from  './Components/AppForm'

const validationSchema=Yup.object().shape({
    email:Yup.string().required().email().label("Email"),
    password:Yup.string().required().min(7).label("Password"),
})

export default function Login({navigation}) {
    const [email,setEmail]=useState( '')
    const [password,setPassword]=useState( '')

    useEffect(()=>{
  const unsubscribe =auth.onAuthStateChanged((authUser)=>{
      console.log(authUser)
     if(authUser){
         navigation.replace("Home")
     }
  }) 
  return unsubscribe
    },[])
    const signIn=()=>{
            auth.signInWithEmailAndPassword(email,password).catch(error=>alert(error.message))

    }
 return (
    
    // <View style={styles.container}>
  <ImageBackground blurRadius={2} style={styles.container} resizeMode="cover" source={require('../assets/bac.jpg')}> 
      <StatusBar style='light' backgroundColor='#1A237E' />
     <Image source={require('../assets/download.png')} 
     style={{width:100,height:100,borderRadius:50,marginBottom:2}}/>  
     <Text style={{marginBottom:50,fontSize:25}}>Sign In </Text>

<View style={styles.inputContainer}>
<AppForm
         initialValues={{email:'',password:''}}
         onSubmit={values=>console.log(values)}
         validationSchema={validationSchema}
         >
 <Input placeholder='Email' autoFocus type='email' value={email} onChangeText={text=>setEmail(text)}/>
 <Input placeholder='Password' secureTextEntry 
 onSubmitEditing={signIn}
  type='password' value={password} onChangeText={text=>setPassword(text)} />
  </AppForm>
</View>
    <Button buttonStyle={{backgroundColor:"#3F51B5"}} containerStyle={styles.button} onPress={signIn} title='Login' color="black"/>
    {/* <Button  containerStyle={styles.button} type='outline' title='Create Account'/> */}
    <Text style={styles.text}>Don't have an account?<Text onPress={()=>navigation.navigate("Register")} style={{color:"#3F51B5",fontWeight:"bold",marginLeft:10}}>SIGN UP!</Text></Text>
{/*    
    <View style={{height:0}}/> */}
 
 <View style={{position: 'relative', left: 0, right: 0, bottom: 0,marginTop:65,alignItems:"center"}}>
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
    
},
text:{
marginTop:30,
padding:10
},
inputContainer:{
    width:300
}
}
)