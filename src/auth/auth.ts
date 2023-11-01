import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../config/config";
import { getFirestore,addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { userData } from "../entities/userDate";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const db = getFirestore(app);


export const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const displayNameString:string = result.user.displayName? result.user.displayName: " ";
            const emailString:string = result.user.email? result.user.email: " ";
            const collectionName = 'user'; 
            const userDataCollection = collection(db, collectionName);
            // const docRef = doc(db, collectionName, emailString);
            const queryToSearch = query(collection(db, collectionName), where('email', '==', emailString));


                // getDoc(queryToSearch)
                // .then((docSnapshot) => {
                // if (docSnapshot.exists()) {
                getDocs(queryToSearch)
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        // Document exists
                        querySnapshot.forEach((doc) => {
                            // Access and work with the matching document(s)
                            console.log('Document data: ', doc.data());
                          });
                    } else {
                    // Document doesn't exist
                    console.log('Document does not exist');
                    const newUser:userData = {
                        displayName: displayNameString,
                        email: emailString,
                        createdAt: new Date(),
                    }
                        addDoc(userDataCollection, newUser)
                        .then((docRef) => {
                        console.log('Document written with ID: ', docRef.id);
                        })
                        .catch((error) => {
                        console.error('Error adding document: ', error);
                        });
                    }
                })
                .catch((error) => {
                console.error('Error checking document:', error);
                });

            const user = result.user;
            console.log(user);
          })
          .catch((error) => {
            console.error(error);
            return null;
          });
    }

const signOut = () => {
    
}

