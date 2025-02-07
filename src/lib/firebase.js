import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSoPCXiDmblKMbde28hwpWuwREtMLGSsk",
  authDomain: "appgt-de07c.firebaseapp.com",
  projectId: "appgt-de07c",
  storageBucket: "appgt-de07c.firebasestorage.app",
  messagingSenderId: "1084475643786",
  appId: "1:1084475643786:web:bc486bdb8dc4294f4bda73"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
