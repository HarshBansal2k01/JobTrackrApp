import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAfg9pbSV-VboR-mh9Q3gZHatgVApyA2vk",
  authDomain: "job-trackr-3a457.firebaseapp.com",
  projectId: "job-trackr-3a457",
  storageBucket: "job-trackr-3a457.appspot.com",
  messagingSenderId: "667760604895",
  appId: "1:667760604895:web:64fd7e4d4596c72c2e9b6a",
  measurementId: "G-C5XQ2JYBZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore(app)
export default app;