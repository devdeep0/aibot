import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCBbbaYDWy28EUpuKM6EsPVN8txYp-ES4",
    authDomain: "aibot-b2f3f.firebaseapp.com",
    projectId: "aibot-b2f3f",
    storageBucket: "aibot-b2f3f.firebasestorage.app",
    messagingSenderId: "549683582384",
    appId: "1:549683582384:web:6eb4b0573547ed178ab275"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);