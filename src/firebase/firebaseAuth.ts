import { getAuth } from "firebase/auth";
import firebaseApp from "./firebasedb";

const firebaseAuth = getAuth(firebaseApp);

export default firebaseAuth;
