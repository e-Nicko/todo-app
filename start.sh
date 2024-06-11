#!/bin/bash

# This script automates the startup process for both backend and frontend services.
# It first activates the virtual environment and starts the backend server,
# then it navigates to the frontend directory and starts the frontend server.
# Finally, it waits for all processes to finish.

# Usage:
# 1. Make the script executable: chmod +x start.sh
# 2. Run the script: ./start.sh


# Start backend
echo "Starting backend..."
# Navigate to the backend directory
cd backend
# Activate the virtual environment
source venv/bin/activate
# Start the backend server using uvicorn
uvicorn main:app --reload &


# Start frontend
echo "Starting frontend..."
# Navigate to the frontend directory
cd ../frontend
# Start the frontend server using npm
npm run dev &


# Awaiting for processes to finish
wait