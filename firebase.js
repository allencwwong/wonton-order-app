import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: '',
    databaseURL: '',
    projectId: 'wonton-order-app',
    storageBucket: '',
    messagingSenderId: '',
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
