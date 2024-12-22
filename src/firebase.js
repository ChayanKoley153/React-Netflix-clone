import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";  // Fixed imports
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyATsmmLcaIzyJ7RZFSOHykp5ko5ZcVpAe0",
  authDomain: "react-clone-1b740.firebaseapp.com",
  projectId: "react-clone-1b740",
  storageBucket: "react-clone-1b740.firebasestorage.app",
  messagingSenderId: "43117478368",
  appId: "1:43117478368:web:9c188bcd407b4d00ea2b85",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {  // Fixed typo in password
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);  // Fixed typo in password
    const user = res.user;
    await addDoc(collection(db, "user"), {  // Added missing imports for Firestore
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch(error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const login = async (email, password) => {  // Fixed typo in password
  try {
    await signInWithEmailAndPassword(auth, email, password);  // Awaiting the promise to properly handle login
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logout = () => {
  signOut(auth);
}

export { auth, db, login, signup, logout };
