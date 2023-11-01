import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";

export const firestore = getFirestore(app);