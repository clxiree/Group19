// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB3AKrgWNgPxQ8sbfLAifgjJCNrJC6DBI",
  authDomain: "smootutor.firebaseapp.com",
  projectId: "smootutor",
  storageBucket: "smootutor.appspot.com",
  messagingSenderId: "67066833337",
  appId: "1:67066833337:web:b276b3233ea4d3c432ee68",
  measurementId: "G-YT0HD5BB27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);