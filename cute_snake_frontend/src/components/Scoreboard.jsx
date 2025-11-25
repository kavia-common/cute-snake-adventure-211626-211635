import React from 'react';

// PUBLIC_INTERFACE
export default function Scoreboard({ score, best, level, length }) {
  /** Displays current score, best score, level and snake length. */
  return (
    <div className="stats card" role="status" aria-live="polite">
      <div className="badge">
        🧮 Score <span style={{ fontWeight: 800 }}>{score}</span>
      </div>
      <div className="badge secondary">
        🏆 Best <span style={{ fontWeight: 800 }}>{best}</span>
      </div>
      <div className="badge">
        🧩 Level <span style={{ fontWeight: 800 }}>{level}</span>
      </div>
      <div className="badge">
        🐍 Length <span style={{ fontWeight: 800 }}>{length}</span>
      </div>
    </div>
  );
}
