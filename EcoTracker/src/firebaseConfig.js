import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmiFJ7hv9b6qwGL8ajWDcPA8DKnXhqpfU",
  authDomain: "ecotracker-9f467.firebaseapp.com",
  projectId: "ecotracker-9f467",
  storageBucket: "ecotracker-9f467.firebasestorage.app",
  messagingSenderId: "178403577005",
  appId: "1:178403577005:web:793eb6b55569458e7d0a24",
  measurementId: "G-88EQDTVEVX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};