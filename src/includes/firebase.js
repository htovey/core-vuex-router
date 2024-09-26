import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDq07tRYuD0AWxGwa44_ntnHYvnV3fySfQ",
  authDomain: "cvr2-53318.firebaseapp.com",
  projectId: "cvr2-53318",
  storageBucket: "cvr2-53318.appspot.com",
  // messagingSenderId: "478497874025",
  appId: "1:478497874025:web:753f5a900ed657d5cd42f8",
  // measurementId: "G-GQSC4XQ35Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

export default {db, storage};