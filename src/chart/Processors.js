import React from 'react';
import './processors.css';

export default function Processors({ data }) {
  return (
    <div className="processors">
      {data.map((d) => (
        <div className="processors__item" key={d.name}>
          {d.name}
        </div>
      ))}
    </div>
  );
}
