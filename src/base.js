import Rebase from 're-base'
import firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'catch-of-the-day-nds.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-nds.firebaseio.com',
})

export default Rebase.createClass(firebaseApp.database())
