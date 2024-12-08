
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDp9TFuHQKtDunpQOEI5ZNabTip6djdfaA",
  authDomain: "safestep-8e58f.firebaseapp.com",
  projectId: "safestep-8e58f",
  storageBucket: "safestep-8e58f.firebasestorage.app",
  messagingSenderId: "181145284173",
  appId: "1:181145284173:web:8763ec16372bd7c4b8f604",
  measurementId: "G-KC878TLLZH"
};


const firebaseApp = initializeApp(firebaseConfig);


export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;