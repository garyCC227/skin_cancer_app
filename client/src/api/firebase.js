import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";

// Initialize Firebase
var config = {
  apiKey:
    "AAAAA83iJaIw:APA91bGWvNGibDJMZB0j4uLbQs5t6IuXHqDjEYYn3AU7VDf6xc2u7s6h62etnXANNMY_t55Z6hmlWF6xase62Uti22JAYQc3IW7EVvP-cLzts4O4syxoWPUYCVD2SrNMjkwOPZD9jWl2",
  authDomain: "project-8631149794213846052.firebaseapp.com",
  databaseURL: "https://project-8631149794213846052.firebaseio.com",
  projectId: "project-8631149794213846052",
  //   storageBucket: "seng3011-ac32d.appspot.com"
};

firebase.initializeApp(config);

export default firebase;
