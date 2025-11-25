#!/bin/bash
cd /home/kavia/workspace/code-generation/cute-snake-adventure-211626-211635/cute_snake_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

