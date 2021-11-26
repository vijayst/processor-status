import React from 'react';
import Timeline from './Timeline';

const MAX_SQUARES = 40;
const WIDTH = 24;
const TIMELINE_HEIGHT = 40;

export default function SquareArea({ data }) {
  const width = MAX_SQUARES * WIDTH;
  const height = TIMELINE_HEIGHT + WIDTH * data.length;
  return (
    <svg width={width} height={height}>
      <Timeline
        width={width}
        height={TIMELINE_HEIGHT}
        squareCount={MAX_SQUARES}
        squareWidth={WIDTH}
      />
    </svg>
  );
}