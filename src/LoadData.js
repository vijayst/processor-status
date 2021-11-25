import React, { useState } from 'react';
import { db } from './utils/firebase';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const processors = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function randomise(max, cutoff) {
  let randomNumber = Math.random() * max;
  randomNumber -= cutoff;
  if (randomNumber < 0) randomNumber = 0;
  return Math.ceil(randomNumber);
}

export default function LoadData() {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  async function handleLoad() {
    setLoading(true);
    const handle = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    let querySnapshot = await getDocs(collection(db, 'eventSummary'));
    let promises = [];
    querySnapshot.forEach((doc) => {
      promises.push(deleteDoc(doc.ref));
    });
    querySnapshot = await getDocs(collection(db, 'processors'));
    querySnapshot.forEach((doc) => {
      promises.push(deleteDoc(doc.ref));
    });
    await Promise.all(promises);
    processors.forEach(async (processorName) => {
      const docRef = await addDoc(collection(db, 'processors'), {
        name: processorName
      });
      promises = [];
      for (let tick = 1; tick <= 100; tick++) {
        promises.push(
          addDoc(collection(db, 'eventSummary'), {
            tick,
            processorId: docRef.id,
            errorCount: randomise(100, 95),
            warningCount: randomise(100, 80),
            successCount: randomise(20, 15),
            infoCount: randomise(150, 50)
          })
        );
      }
      await Promise.all(promises);
    });
    setLoading(false);
    setTime(0);
    clearInterval(handle);
  }

  return (
    <div className="load-data">
      <button className="button" onClick={handleLoad} disabled={loading}>
        {loading ? 'Loading Data' : 'Load Data'}
      </button>
      {loading && (
        <span className="load-data__warning">
          Loading data will take about a minute! ({time}s)
        </span>
      )}
    </div>
  );
}
