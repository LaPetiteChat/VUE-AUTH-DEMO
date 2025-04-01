import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUqh0SI_wkVx8JCQL0npMikxiLcx6fjDk",
  authDomain: "vue-auth-demo-f3657.firebaseapp.com",
  projectId: "vue-auth-demo-f3657",
  storageBucket: "vue-auth-demo-f3657.firebasestorage.app",
  messagingSenderId: "2520006530",
  appId: "1:2520006530:web:e9f1e07b46a88b4f4bd99b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);