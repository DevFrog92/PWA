import firebase from "firebase/compat/app";
import "firebase/compat/database";

const oDB = firebase
  .initializeApp({
    databaseURL: "https://vue-pwa-33539-default-rtdb.firebaseio.com",
  })
  .database();

export const oTodosinDB = oDB.ref("todos");
