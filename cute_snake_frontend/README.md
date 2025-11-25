# Cute Snake Adventure (React)

A classic snake arcade game with a cute, child-friendly look, themed with "Ocean Professional" (blue primary + amber accents).

## Features
- Smooth grid-based movement with arrow keys or WASD
- Obstacles, growth on eating food, score and level
- Start/Pause/Reset controls and speed selection
- Ocean Professional theme (rounded corners, soft gradients, subtle shadows)
- Accessible: ARIA roles for grid and controls
- Local best score persistence

## Run locally
- Node 16+ recommended
- Install: `npm install`
- Start dev server: `npm start`
- Run tests: `npm test`
- Build: `npm run build`

Open http://localhost:3000

## Controls
- Move: Arrow keys or WASD
- Start: Click "Start"
- Pause: Click "Pause"
- Reset: Click "Reset"
- Speed: Slow/Normal/Fast toggles

## Environment variables
This frontend is self-contained and does not require backend connectivity. For completeness, a .env.example is provided with optional variables:

- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

## Project structure
- src/App.js — main game logic and layout
- src/theme.css — Ocean Professional theme
- src/components/* — UI building blocks
- src/utils/gameUtils.js — game utilities

Enjoy and have fun! 🐍
