import React, { useState } from 'react';
import { db } from './utils/firebase';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const processors = [
  'Processor A',
  'Processor B',
  'Processor C',
  'Processor D',
  'Processor E',
  'Processor F',
  'Processor G',
  'Processor H',
  'Processor I',
  'Processor J'
];

function randomise(max, cutoff) {
  let randomNumber = Math.random() * max;
  randomNumber -= cutoff;
  if (randomNumber < 0) randomNumber = 0;
  return Math.ceil(randomNumber);
}

export default function LoadData({ setRefreshKey }) {
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
    const processorPromises = [];
    processors.forEach((processorName) => {
      processorPromises.push(
        addDoc(collection(db, 'processors'), {
          name: processorName
        }).then((docRef) => {
          const eventPromises = [];
          for (let tick = 1; tick <= 50; tick++) {
            eventPromises.push(
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
          return Promise.all(eventPromises);
        })
      );
    });
    await Promise.all(processorPromises);
    setLoading(false);
    setTime(0);
    clearInterval(handle);
    setRefreshKey(Date.now().toString());
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
