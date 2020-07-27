
import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBebA2lZdbuhTxxii8-vQ4GywuFVPhLx6s",
    authDomain: "school-5738a.firebaseapp.com",
    databaseURL: "https://school-5738a.firebaseio.com",
    projectId: "school-5738a",
    storageBucket: "school-5738a.appspot.com",
    messagingSenderId: "116815522129",
    appId: "1:116815522129:web:5df79b456b01fb2a234b70"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
