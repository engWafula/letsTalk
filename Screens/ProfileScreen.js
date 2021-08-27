import React, {useState, useEffect, useLayoutEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Linking } from 'react-native'
import { FontAwesome,Ionicons } from '@expo/vector-icons'
// import FormButton from '../components/FormButton';
// import {AuthContext} from '../navigation/AuthProvider';
import { auth,db } from '../firebase'
import { Button } from "react-native-elements";
// import PostCard from '../components/PostCard';

const ProfileScreen = ({navigation, route}) => {
  // const {user, logout} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState([]);

  // const fetchPosts = async () => {
  //   try {
  //     const list = [];

  //     await firestore()
  //       .collection('posts')
  //       .where('userId', '==', route.params ? route.params.userId : user.uid)
  //       .orderBy('postTime', 'desc')
  //       .get()
  //       .then((querySnapshot) => {
  //         // console.log('Total Posts: ', querySnapshot.size);

  //         querySnapshot.forEach((doc) => {
  //           const {
  //             userId,
  //             post,
  //             postImg,
  //             postTime,
  //             likes,
  //             comments,
  //           } = doc.data();
  //           list.push({
  //             id: doc.id,
  //             userId,
  //             userName: 'Test Name',
  //             userImg:
  //               'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
  //             postTime: postTime,
  //             post,
  //             postImg,
  //             liked: false,
  //             likes,
  //             comments,
  //           });
  //         });
  //       });

  //     setPosts(list);

  //     if (loading) {
  //       setLoading(false);
  //     }

  //     console.log('Posts: ', posts);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useLayoutEffect(()=>{
    const   unsbscribe=  db.collection("chats").doc(route.params).collection("messages")
    .orderBy('timestamp','asc').onSnapshot(snapshot=>
                setUserData(snapshot.docs.map(
                    doc=>({
                        id:doc.id,
                        data:doc.data()
                    })
                ))
    )
  return unsbscribe
    },[route])

  // useEffect(() => {
  //   getUser();
  //   fetchPosts();
  //   navigation.addListener("focus", () => setLoading(!loading));
  // }, [navigation, loading]);

  const handleDelete = () => {};

  const SignOut=()=>{
     auth.signOut().then(()=>{
        navigation.replace('Welcome to lets talk')
     })
}


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar style='light' backgroundColor='#1A237E' />
        <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
        />
        <Text style={styles.userName}>{userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>
        {userData ? userData.about || 'No details added.' : ''}
        </Text>
        <View style={styles.userBtnWrapper}>
          {/* {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : ( */}
            <>
            
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('');
                }}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={SignOut}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          {/* )} */}
        </View>
{/* 
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>

        {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))} */}
      </ScrollView>
      <View style={{position: 'relative', left: 0, right: 0, bottom: 0,marginTop:30,alignItems:"center"}}>
    <Text style={{color:'gray',marginBottom:10}}>Contact us:</Text>
        <View style={{flexDirection:'row',padding:10,marginBottom:15}}>
            
            <FontAwesome name='envelope' size={20} color="#3F51B5"        
            onPress={() => Linking.openURL('mailto:wafulaallan5@gmail.com?subject=&body=') }  />
        <Text style={{marginLeft:5,marginTop:5}} 
        onPress={() => Linking.openURL('mailto:wafulaallan5@gmail.com?subject=&body=') }>wafulaallan5@gmail.com</Text>
        </View>
        <Text style={{color:'gray'}}>Version 1.0.0 </Text></View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
