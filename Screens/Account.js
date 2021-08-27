import React from 'react'
import { View,StyleSheet,Text ,TouchableOpacity} from 'react-native'
import { auth,db } from '../firebase'
import {Avatar } from   'react-native-elements'
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons'
export default function Account({navigation}) {
    const SignOut=()=>{
        auth.signOut().then(()=>{
            navigation.replace('Login')
        })
    }
 

 
 return (
 <View style={styles.container}>
         
                    <TouchableOpacity style={styles.icon}>
                    {/* <MaterialCommunityIcons  name='person-circle' rounded  size={50} source={{uri:auth?.currentUser?.photoURL}} onPress={SignOut}/> */}
                    <MaterialIcons name="account-circle" size={200} color="gray"/>
                    {/* <View style={{backgroundColor:"#3F51B5"}} >  */}
                    <Entypo name="camera" size={24} color="gray"
                    style={{
                    marginTop:-45,
                    marginRight:20,
                    color:"#3F51B5",
                    
                    }}
                    />
                     {/* </View>  */}
                
                    </TouchableOpacity>
                
 </View>
)
}
const styles = StyleSheet.create({
container:{
    flex:1,
    alignItems:'center'

},
// input:{
//     width:300,
//     height:300,
//     borderRadius:50%
// },
icon:{
    padding:10
}
}
)