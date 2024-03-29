import firebase from "firebase/compat/app";
import {connectFirestoreEmulator, getFirestore} from "firebase/firestore";

import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from "./config";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);

if (window.location.hostname == "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
}
