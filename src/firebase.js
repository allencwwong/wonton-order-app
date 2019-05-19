import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: 'wonton-order-app.firebaseapp.com',
    databaseURL: 'https://wonton-order-app.firebaseio.com',
    projectId: 'wonton-order-app',
    storageBucket: 'wonton-order-app.appspot.com',
    messagingSenderId: '176821388700',
    appId: '1:176821388700:web:91e7163c4d9426e6',
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
