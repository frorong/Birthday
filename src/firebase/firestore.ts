import firebaseApp from "./firebasedb";
import { getFirestore } from "firebase/firestore";

const fireStore = getFirestore(firebaseApp);

export default fireStore;
