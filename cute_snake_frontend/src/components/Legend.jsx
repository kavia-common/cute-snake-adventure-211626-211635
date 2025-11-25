import React from 'react';

// PUBLIC_INTERFACE
export default function Legend() {
  /** Shows legend for grid items. */
  return (
    <div className="legend card" aria-label="Legend">
      <div className="legend-item"><span className="legend-swatch swatch-snake" /> Snake</div>
      <div className="legend-item"><span className="legend-swatch swatch-food" /> Food</div>
      <div className="legend-item"><span className="legend-swatch swatch-obstacle" /> Obstacle</div>
      <div className="legend-item" style={{ marginLeft: 'auto', color: '#6b7280' }}>
        Use arrow keys or WASD to move
      </div>
    </div>
  );
}
