import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCP0tqLlappvqjHC4FqKsaTdjJIb4jZKmM",
    authDomain: "pushnotification-22eeb.firebaseapp.com",
    projectId: "pushnotification-22eeb",
    storageBucket: "pushnotification-22eeb.appspot.com",
    messagingSenderId: "456358245923",
    appId: "1:456358245923:web:37776161a045686f73e396",
    measurementId: "G-WT7ZDZXSJR"
  };

 export const app = initializeApp(firebaseConfig);
 export const messaging = getMessaging(app);