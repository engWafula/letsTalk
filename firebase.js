import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR9RCNSjDNT5OzzLUF__GQQPc-_KdkmJM",
  authDomain: "talk-d3563.firebaseapp.com",
  projectId: "talk-d3563",
  storageBucket: "talk-d3563.appspot.com",
  messagingSenderId: "471693353807",
  appId: "1:471693353807:web:9fa49fa760bf0ef4e95b3a",
  measurementId: "G-6J59F1FYXJ"
};
let app

if(firebase.apps.length===0){
 app= firebase.initializeApp(firebaseConfig);
}
else{
  app=firebase.app()
}
const db =app.firestore()
const auth = firebase.auth()
export {db,auth}
// const firebaseApp=firebase.initializeApp(firebaseConfig)
// const db=firebaseApp.firestore()
// const auth=firebase.auth()
// export {auth}
// export default db