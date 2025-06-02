import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtIDLP-ehRaiJqrlnfsmU3cKn0WowfyrM",
    authDomain: "casharoo-76d2d.firebaseapp.com",
    projectId: "casharoo-76d2d",
    storageBucket: "casharoo-76d2d.firebasestorage.app",
    messagingSenderId: "733759149828",
    appId: "1:733759149828:web:d52eee67fc454575556251",
    measurementId: "G-19BXH6RRE9"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};