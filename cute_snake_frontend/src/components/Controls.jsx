import React from 'react';

// PUBLIC_INTERFACE
export default function Controls({
  isRunning,
  onStart,
  onPause,
  onReset,
  speed,
  setSpeed
}) {
  /** Controls section with buttons and speed options. */
  return (
    <div className="controls card" aria-label="Game controls">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="button" onClick={onStart} disabled={isRunning} aria-label="Start game">
          ▶ Start
        </button>
        <button className="button secondary" onClick={onPause} disabled={!isRunning} aria-label="Pause game">
          ⏸ Pause
        </button>
        <button className="button ghost" onClick={onReset} aria-label="Reset game">
          ↻ Reset
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
        <span className="subtitle">Speed:</span>
        <button
          className={`button ghost${speed === 180 ? ' active' : ''}`}
          onClick={() => setSpeed(180)}
          aria-label="Slow speed"
        >
          🐢 Slow
        </button>
        <button
          className={`button ghost${speed === 120 ? ' active' : ''}`}
          onClick={() => setSpeed(120)}
          aria-label="Normal speed"
        >
          🚶 Normal
        </button>
        <button
          className={`button ghost${speed === 70 ? ' active' : ''}`}
          onClick={() => setSpeed(70)}
          aria-label="Fast speed"
        >
          ⚡ Fast
        </button>
      </div>
    </div>
  );
}
