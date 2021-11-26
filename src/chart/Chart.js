import React, { useState, useEffect } from 'react';
import Processors from './Processors';
import SquareArea from './SquareArea';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Chart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const querySnapshotPromise = getDocs(collection(db, 'processors'));
    querySnapshotPromise.then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((documentSnapshot) => {
        data.push(documentSnapshot.data());
      });
      setData(data);
    });
  }, []);

  return (
    <div className="chart">
      <Processors data={data} />
      <SquareArea />
    </div>
  );
}
