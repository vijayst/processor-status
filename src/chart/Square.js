import React from 'react';

function getColor(event) {
  if (event.errorCount > 0) {
    return 'red';
  } else if (event.warningCount > 0) {
    return 'yellow';
  } else if (event.successCount > 0) {
    return 'green';
  } else if (event.infoCount > 0) {
    return 'blue';
  } else {
    return 'transparent';
  }
}

function getOpacity(event) {
  if (event.errorCount > 0) {
    return event.errorCount / 5;
  } else if (event.warningCount > 0) {
    return event.warningCount / 20;
  } else if (event.successCount > 0) {
    return event.successCount / 5;
  } else if (event.infoCount > 0) {
    return event.infoCount / 100;
  }
  return 1;
}

export default function Square({ event, size, rowIndex, timelineHeight }) {
  return (
    <rect
      x={(event.tick - 1) * size}
      y={timelineHeight + rowIndex * size}
      width={size}
      height={size}
      fill={getColor(event)}
      opacity={getOpacity(event)}
    />
  );
}
