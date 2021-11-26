import React from 'react';

const FONT_SIZE = 10;
const TICK_COUNT = 5;

export default function Timeline({ width, squareWidth, squareCount }) {
  const tickTexts = [];
  for (let index = 0; index < squareCount; index += TICK_COUNT) {
    tickTexts.push({
      text: `${index}s`,
      x: index * squareWidth
    });
  }
  const ticks = [];
  for (let index = 0; index < squareCount; index++) {
    ticks.push({
      x: index * squareWidth
    });
  }
  return (
    <g>
      {tickTexts.map((t, i) => (
        <text key={i} x={t.x} y={FONT_SIZE} style={{ fontSize: FONT_SIZE }}>
          {t.text}
        </text>
      ))}
      <line
        x1={0}
        y1={FONT_SIZE + 2}
        x2={width}
        y2={FONT_SIZE + 2}
        stroke="black"
        strokeWidth={1}
      />
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={i === 0 ? 1 : t.x}
          y1={FONT_SIZE + 3}
          x2={i === 0 ? 1 : t.x}
          y2={i % 5 ? FONT_SIZE + 8 : FONT_SIZE + 12}
          stroke="rgba(0,0,0,.5)"
        ></line>
      ))}
    </g>
  );
}
