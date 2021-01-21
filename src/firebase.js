import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAwKpmdeaXaapEt5oOYFnTD6JEeovKWNeU",
    authDomain: "mymovies-b9465.firebaseapp.com",
    databaseURL: "https://mymovies-b9465-default-rtdb.firebaseio.com/",
    projectId: "mymovies-b9465",
    storageBucket: "mymovies-b9465.appspot.com",
    messagingSenderId: "435481440274",
    appId: "1:435481440274:web:31e07ef8b97e3fc60fe8cb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;