import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDcTgj2JRJHYkBE3C_m1QDug3w6efMu9zw",
  authDomain: "todo-app-react-37d3c.firebaseapp.com",
  projectId: "todo-app-react-37d3c",
  storageBucket: "todo-app-react-37d3c.appspot.com",
  messagingSenderId: "734996901306",
  appId: "1:734996901306:web:79e5d764e092eb27000183",
});

const db = firebaseApp.firestore();

export default db;
