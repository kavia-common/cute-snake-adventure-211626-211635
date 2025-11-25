import React from 'react';
import { CELL_EMPTY, CELL_SNAKE, CELL_FOOD, CELL_OBSTACLE } from '../utils/gameUtils';

// PUBLIC_INTERFACE
export default function GameBoard({ grid, snake }) {
  /** Renders a grid with snake, food, and obstacles. */
  const rows = grid.length;
  const cols = grid[0].length;
  const head = snake[0];

  return (
    <div
      className="grid"
      role="grid"
      aria-label="Snake game grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 22px)` }}
    >
      {Array.from({ length: rows }).map((_, y) =>
        Array.from({ length: cols }).map((__, x) => {
          const key = `${x}-${y}`;
          const cell = grid[y][x];
          const isSnake = cell === CELL_SNAKE;
          const isHead = isSnake && head && head.x === x && head.y === y;
          const className = [
            'cell',
            cell === CELL_SNAKE ? 'snake' : '',
            isHead ? 'snake-head' : '',
            cell === CELL_FOOD ? 'food' : '',
            cell === CELL_OBSTACLE ? 'obstacle' : ''
          ].join(' ').trim();

          return <div key={key} className={className} role="gridcell" aria-label={`cell-${x}-${y}`} />;
        })
      )}
    </div>
  );
}
