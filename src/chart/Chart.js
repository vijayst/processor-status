import React, { useState, useEffect } from 'react';
import Processors from './Processors';
import SquareArea from './SquareArea';
import { db } from '../utils/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import './chart.css';

export default function Chart({ refreshKey }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (refreshKey) {
      fetchData();
    }
  }, [refreshKey]);

  function fetchData() {
    const data = [];
    const processorQuery = query(collection(db, 'processors'), orderBy('name'));
    const querySnapshotPromise = getDocs(processorQuery);
    querySnapshotPromise
      .then((querySnapshot) => {
        const promises = [];
        querySnapshot.forEach((documentSnapshot) => {
          const { name } = documentSnapshot.data();
          const eventQuery = query(
            collection(db, 'eventSummary'),
            where('tick', '<=', 40),
            where('processorId', '==', documentSnapshot.id),
            orderBy('tick')
          );
          const events = [];
          const promise = getDocs(eventQuery);
          promise.then((eventQuerySnapshot) => {
            eventQuerySnapshot.forEach((eventDocumentSnapshot) => {
              events.push(eventDocumentSnapshot.data());
            });
            data.push({
              name,
              events
            });
          });
          promises.push(promise);
        });
        return Promise.all(promises);
      })
      .then(() => {
        setData(data);
      });
  }

  return data.length > 0 ? (
    <div className="chart">
      <Processors data={data} />
      <SquareArea data={data} />
    </div>
  ) : null;
}
