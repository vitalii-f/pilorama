import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebase = {
  firebaseConfig : {
    apiKey: "AIzaSyDbZSNgYTQowwj9vBmDrxJZfoO3Ei79_ec",
    authDomain: "pilorama-news.firebaseapp.com",
    projectId: "pilorama-news",
    storageBucket: "pilorama-news.appspot.com",
    messagingSenderId: "1020216526343",
    appId: "1:1020216526343:web:25a0d7119d28db2136cca2",
    measurementId: "G-9TYNCH4KT3"
  },

  app : initializeApp(this.firebaseConfig),
  analytics : getAnalytics(this.app),
  auth : getAuth(this.app),
}