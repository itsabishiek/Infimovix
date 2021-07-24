import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBhFjnl920CRUAYWD8BMl5XlS9uv4IlWA8",
  authDomain: "infimovix.firebaseapp.com",
  projectId: "infimovix",
  storageBucket: "infimovix.appspot.com",
  messagingSenderId: "1096391636853",
  appId: "1:1096391636853:web:2834fef605fcda9b48053c",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
