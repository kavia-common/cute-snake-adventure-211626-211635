import React from 'react';

// PUBLIC_INTERFACE
export default function GameOverModal({ open, score, onClose, onReset }) {
  /** Game over modal that appears when the game ends. */
  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Game Over">
      <div className="modal-card">
        <div className="modal-title">Game Over</div>
        <div className="modal-desc">Nice try! Your score: <strong>{score}</strong></div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="button" onClick={onReset}>↻ Play Again</button>
          <button className="button ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
