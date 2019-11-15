import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyB9-XUnAxwAGwwSUJEgJ3mW4xk3LD54lig",
    authDomain: "crwn-db-4ef42.firebaseapp.com",
    databaseURL: "https://crwn-db-4ef42.firebaseio.com",
    projectId: "crwn-db-4ef42",
    storageBucket: "crwn-db-4ef42.appspot.com",
    messagingSenderId: "832201080041",
    appId: "1:832201080041:web:619596d77f440b84f34478",
    measurementId: "G-J3VBJMTE4M"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()
  
    if(!snapShot.exists) {
      const { displayName, email } = userAuth
      const createdAt = new Date()
    
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user, ', error.message)
      }
    }

    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase