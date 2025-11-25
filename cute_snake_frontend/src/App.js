import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import './theme.css';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import Scoreboard from './components/Scoreboard';
import Legend from './components/Legend';
import GameOverModal from './components/GameOverModal';
import {
  CELL_EMPTY, CELL_FOOD, CELL_OBSTACLE, CELL_SNAKE,
  DIRS, createEmptyGrid, isOutOfBounds, keyToDirection,
  nextHead, placeFood, placeObstacles, willHitSelf
} from './utils/gameUtils';

// PUBLIC_INTERFACE
function App() {
  /** Main app: Cute Snake Game with Ocean Professional styling. */
  const COLS = 20;
  const ROWS = 20;

  // State
  const [grid, setGrid] = useState(() => createEmptyGrid(COLS, ROWS));
  const [snake, setSnake] = useState([{ x: 8, y: 10 }, { x: 7, y: 10 }]);
  const [dir, setDir] = useState(DIRS.RIGHT);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('bestScore') || 0));
  const [level, setLevel] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(120); // ms per tick

  const tickRef = useRef(null);

  // Prepare initial grid with snake, food, and some obstacles
  useEffect(() => {
    const g = createEmptyGrid(COLS, ROWS);
    // place snake
    const sSet = new Set();
    for (const seg of snake) {
      g[seg.y][seg.x] = CELL_SNAKE;
      sSet.add(`${seg.x},${seg.y}`);
    }
    // place a few obstacles away from snake start
    placeObstacles(g, 15, sSet);
    // place first food
    placeFood(g, snake);
    setGrid(g);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // init once

  // Keyboard controls
  useEffect(() => {
    const handler = (e) => {
      const newDir = keyToDirection(e.key, dir);
      if (newDir !== dir) {
        setDir(newDir);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dir]);

  // Game loop
  useEffect(() => {
    if (!isRunning || gameOver) return;
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const next = nextHead(head, dir);
        // bounds
        if (isOutOfBounds(next, COLS, ROWS)) {
          endGame();
          return prevSnake;
        }
        // grid reads require latest snapshot
        let ateFood = false;
        setGrid(prevGrid => {
          const cellVal = prevGrid[next.y][next.x];
          if (cellVal === CELL_SNAKE || cellVal === CELL_OBSTACLE) {
            endGame();
            return prevGrid;
          }
          // clone grid shallowly and update after movement computed below
          const newGrid = prevGrid.map(r => r.slice());
          // mark new head
          newGrid[next.y][next.x] = CELL_SNAKE;

          // handle food and tail
          if (cellVal === CELL_FOOD) {
            ateFood = true;
            setScore(s => s + 10);
          }

          // remove tail if not growing
          if (!ateFood) {
            const tail = prevSnake[prevSnake.length - 1];
            newGrid[tail.y][tail.x] = CELL_EMPTY;
          }

          return newGrid;
        });

        // compute new snake array after grid updates
        const newSnake = [next, ...prevSnake];
        if (!ateFood) newSnake.pop();

        // place new food when eaten
        if (ateFood) {
          setGrid(prevGrid => {
            const g2 = prevGrid.map(r => r.slice());
            placeFood(g2, newSnake);
            return g2;
          });

          // level up every 50 points
          setLevel(lv => {
            const nextLevel = Math.floor((score + 10) / 50) + 1;
            return nextLevel;
          });
        }

        return newSnake;
      });
    }, speed);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, speed, dir, gameOver, score]);

  useEffect(() => {
    // reflect snake positions in grid when snake changes (e.g., reset)
    setGrid(prev => {
      const g = prev.map(r => r.slice());
      // clear snake & food/obstacles preserved
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (g[y][x] === CELL_SNAKE) g[y][x] = CELL_EMPTY;
        }
      }
      for (const seg of snake) {
        g[seg.y][seg.x] = CELL_SNAKE;
      }
      return g;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake]);

  const endGame = () => {
    setIsRunning(false);
    setGameOver(true);
    setBest(b => {
      const newBest = Math.max(b, score);
      localStorage.setItem('bestScore', String(newBest));
      return newBest;
    });
  };

  const handleStart = () => {
    if (gameOver) return;
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    if (tickRef.current) clearInterval(tickRef.current);
    const startSnake = [{ x: 8, y: 10 }, { x: 7, y: 10 }];
    const g = createEmptyGrid(COLS, ROWS);
    const sSet = new Set(startSnake.map(s => `${s.x},${s.y}`));
    for (const seg of startSnake) g[seg.y][seg.x] = CELL_SNAKE;
    placeObstacles(g, 15, sSet);
    placeFood(g, startSnake);
    setGrid(g);
    setSnake(startSnake);
    setDir(DIRS.RIGHT);
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setIsRunning(false);
  };

  const onCloseModal = () => setGameOver(false);

  const gridWithHead = useMemo(() => grid, [grid]); // alias for clarity

  return (
    <div className="container">
      <header className="header">
        <div className="title">
          <span className="title-badge">🐍</span>
          Cute Snake Adventure
        </div>
        <div className="subtitle">Ocean Professional • Blue & Amber accents</div>
      </header>

      <Scoreboard score={score} best={best} level={level} length={snake.length} />

      <div className="card" style={{ marginTop: 12 }}>
        <div className="grid-wrapper">
          <GameBoard grid={gridWithHead} snake={snake} />
        </div>
      </div>

      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <Controls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          speed={speed}
          setSpeed={setSpeed}
        />
        <Legend />
      </div>

      <footer className="footer">
        Tip: Eat apples to grow and score! Avoid walls, yourself, and blocks.
      </footer>

      <GameOverModal
        open={gameOver}
        score={score}
        onClose={onCloseModal}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;
