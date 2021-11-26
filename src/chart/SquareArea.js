import React from 'react';
import Timeline from './Timeline';
import Square from './Square';

const MAX_SQUARES = 40;
const WIDTH = 24;
const TIMELINE_HEIGHT = 40;

export default function SquareArea({ data }) {
  const width = MAX_SQUARES * WIDTH;
  const height = TIMELINE_HEIGHT + WIDTH * data.length;
  return (
    <svg width={width} height={height}>
      <Timeline width={width} squareCount={MAX_SQUARES} squareWidth={WIDTH} />
      {data.map((processor, rowIndex) => {
        return processor.events.map((event) => (
          <Square
            key={`${processor.name}_${event.tick}`}
            rowIndex={rowIndex}
            event={event}
            timelineHeight={TIMELINE_HEIGHT}
            size={WIDTH}
          />
        ));
      })}
    </svg>
  );
}
