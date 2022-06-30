import firebase from "firebase/app";
import "firebase/firebase-database";

const oDB = firebase
  .initializeApp({
    databaseURL: "https://vue-pwa-33539-default-rtdb.firebaseio.com",
  })
  .database();

export const oTodosinDB = oDB.ref("todos");
