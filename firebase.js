import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage' 
import 'firebase/compat/database'


const firebaseConfig = {
  apiKey: "AIzaSyB171OEeq4fEFYiLak5kCzbcNKp3zRNBJM",
  authDomain: "influx-269a5.firebaseapp.com",
  projectId: "influx-269a5",
  storageBucket: "influx-269a5.appspot.com",
  messagingSenderId: "1053993775043",
  appId: "1:1053993775043:web:091849d913711b31d61776"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();

export { auth, firestore, storage,database };