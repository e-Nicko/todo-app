# This script automates the startup process for both backend and frontend services.
# It first activates the virtual environment and starts the backend server,
# then it navigates to the frontend directory and starts the frontend server.
# Finally, it waits for all processes to finish.

# Run backend
Write-Host "Starting backend..."


# Navigate to the backend directory
cd backend
# Activate the virtual environment
venv\Scripts\Activate.ps1
# Start the backend server using uvicorn
Start-Process powershell -ArgumentList "uvicorn main:app --reload"


# Run frontend
Write-Host "Starting frontend..."
# Navigate to the frontend directory
cd ../frontend
# Start the frontend server using Vite
Start-Process npx vite


# Awaiting for processes to finish
Wait-Process