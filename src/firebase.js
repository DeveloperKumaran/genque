import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
  apiKey: "AIzaSyBImZF2RqVdbdezRQeXF1gNd_AHIhMRTuM",
  authDomain: "genque-759f7.firebaseapp.com",
  databaseURL: "https://genque-759f7-default-rtdb.firebaseio.com",
  projectId: "genque-759f7",
  storageBucket: "genque-759f7.appspot.com",
  messagingSenderId: "465263173463",
  appId: "1:465263173463:web:3d317612e0075c1731e812"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
