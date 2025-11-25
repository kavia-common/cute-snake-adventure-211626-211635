export const CELL_EMPTY = 0;
export const CELL_SNAKE = 1;
export const CELL_FOOD = 2;
export const CELL_OBSTACLE = 3;

export const DIRS = {
  UP: { x: 0, y: -1, key: 'ArrowUp' },
  DOWN: { x: 0, y: 1, key: 'ArrowDown' },
  LEFT: { x: -1, y: 0, key: 'ArrowLeft' },
  RIGHT: { x: 1, y: 0, key: 'ArrowRight' }
};

export const isOpposite = (a, b) => {
  if (!a || !b) return false;
  return (a.x + b.x === 0 && a.y + b.y === 0);
};

export function createEmptyGrid(cols, rows) {
  const g = [];
  for (let y = 0; y < rows; y++) {
    const row = new Array(cols).fill(CELL_EMPTY);
    g.push(row);
  }
  return g;
}

export function randomEmptyCell(grid, avoid = new Set(), rng = Math.random) {
  const rows = grid.length;
  const cols = grid[0].length;
  const empties = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === CELL_EMPTY && !avoid.has(`${x},${y}`)) {
        empties.push({ x, y });
      }
    }
  }
  if (empties.length === 0) return null;
  return empties[Math.floor(rng() * empties.length)];
}

export function placeFood(grid, snake, rng = Math.random) {
  const avoid = new Set(snake.map(s => `${s.x},${s.y}`));
  const pos = randomEmptyCell(grid, avoid, rng);
  if (!pos) return null;
  grid[pos.y][pos.x] = CELL_FOOD;
  return pos;
}

export function placeObstacles(grid, count, excludeSet = new Set(), rng = Math.random) {
  let placed = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  while (placed < count) {
    const x = Math.floor(rng() * cols);
    const y = Math.floor(rng() * rows);
    const key = `${x},${y}`;
    if (grid[y][x] === CELL_EMPTY && !excludeSet.has(key)) {
      grid[y][x] = CELL_OBSTACLE;
      placed++;
    }
  }
}

export function nextHead(head, dir) {
  return { x: head.x + dir.x, y: head.y + dir.y };
}

export function isOutOfBounds(pos, cols, rows) {
  return pos.x < 0 || pos.y < 0 || pos.x >= cols || pos.y >= rows;
}

export function willHitSelf(next, snake) {
  return snake.some(seg => seg.x === next.x && seg.y === next.y);
}

export function keyToDirection(key, currentDir) {
  const map = {
    ArrowUp: DIRS.UP, ArrowDown: DIRS.DOWN,
    ArrowLeft: DIRS.LEFT, ArrowRight: DIRS.RIGHT,
    w: DIRS.UP, s: DIRS.DOWN, a: DIRS.LEFT, d: DIRS.RIGHT,
    W: DIRS.UP, S: DIRS.DOWN, A: DIRS.LEFT, D: DIRS.RIGHT
  };
  const dir = map[key];
  if (!dir) return currentDir;
  if (isOpposite(dir, currentDir)) return currentDir;
  return dir;
}
