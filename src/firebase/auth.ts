import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from "./firebaseConfig";
import { firestore } from "../firestore/firestoreConfig";

export interface UserData {
  displayName: string;
  email: string;
  createdAt: Date;
  userId:  string;

}


export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider); // Wait for the sign-in result

    const displayNameString = result.user.displayName || "";
    const emailString = result.user.email || "";
    const collectionName = 'user';
    const userDataCollection = collection(firestore, collectionName);
    const queryToSearch = query(collection(firestore, collectionName), where('email', '==', emailString));

    const querySnapshot = await getDocs(queryToSearch); // Wait for the query result

    if (!querySnapshot.empty) {
      // Document exists
      let existUser: UserData | undefined;
      querySnapshot.forEach((doc) => {
        existUser = {
          displayName: doc.data().displayName,
          email: emailString,
          createdAt: new Date(doc.data().createdAt.seconds * 1000),
          userId: doc.id,
        };
      });
      return existUser || null;
    } else {
      // Document doesn't exist
      const newUser: UserData = {
        displayName: displayNameString,
        email: emailString,
        createdAt: new Date(),
        userId: ""
      };
      const docRef = await addDoc(userDataCollection, newUser); // Wait for the document to be written
      newUser.userId = docRef.id;
      return newUser;
    }
  } catch (error) {
    console.error(error);
    return null; // Handle errors appropriately and return null or another value
  }
}

export const signOut = () => {
    
}

