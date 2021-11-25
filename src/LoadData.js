import React from 'react';
import { db } from './utils/firebase';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const processors = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

async function handleLoad() {
  const querySnapshot = await getDocs(collection(db, 'processors'));
  const promises = [];
  querySnapshot.forEach((doc) => {
    promises.push(deleteDoc(doc.ref));
  });
  await Promise.all(promises);
  processors.forEach(async (processorName) => {
    const docRef = await addDoc(collection(db, 'processors'), {
      name: processorName
    });
  });
}

export default function LoadData() {
  return (
    <button className="button" onClick={handleLoad}>
      Load Data
    </button>
  );
}
