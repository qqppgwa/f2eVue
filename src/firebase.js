import Vue from 'vue';
// import VueFire from 'vuefire';
import {
    firestorePlugin
} from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
// require('@firebase/storage');
import 'firebase/storage';
Vue.use(firestorePlugin);
// console.log(VueFire);
// console.log(firestorePlugin);
// Vue.use(VueFire);
var firebaseConfig = {
    apiKey: 'AIzaSyCO7ki47c5KMrfSFfjx-l32OdAExpH773s',
    authDomain: 'froggychat-ce2ec.firebaseapp.com',
    databaseURL: 'https://froggychat-ce2ec.firebaseio.com',
    projectId: 'froggychat-ce2ec',
    storageBucket: 'froggychat-ce2ec.appspot.com',
    messagingSenderId: '963502777978',
    appId: '1:963502777978:web:227c74e95aa07c4c957dc3'
};
// console.log(a);
export let db = firebase.initializeApp(firebaseConfig).firestore();
export let storage = firebase.storage();
console.log(firebase);
// export let store = firebase.storage().ref();
// console.log(firebase.storage());
// db.settings({
//     timestampsInSnapshots: true
// });
// let db=fire.
// firebase.analytics();
// console.log(fire);
// export default fire;
const {
    TimeStamp,
    GeoPoint
} = firebase.firestore;
export {
    TimeStamp,
    GeoPoint
};
