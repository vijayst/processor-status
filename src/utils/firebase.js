import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0reKms_t7RObkpkKBMtSIDKhYydUbz9o',
  authDomain: 'processor-status.firebaseapp.com',
  projectId: 'processor-status',
  storageBucket: 'processor-status.appspot.com'
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { app, db };
