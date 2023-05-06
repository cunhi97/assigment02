// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZMMCHQlwo93mJhqjzxQLGdSkOEe_0xyw",
  authDomain: "asm3-bcaa1.firebaseapp.com",
  databaseURL: "https://asm3-bcaa1-default-rtdb.firebaseio.com",
  projectId: "asm3-bcaa1",
  storageBucket: "asm3-bcaa1.appspot.com",
  messagingSenderId: "998795119496",
  appId: "1:998795119496:web:6bf8b6e5025b775de6483d",
  measurementId: "G-LYRN30T05E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
