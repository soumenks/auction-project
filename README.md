# E-Auction

Minimal demonstration of an e-auction app with the bare essentials.

## Structure

- `backend/` - Express server (server.js), connect to MongoDB (MONGO_URI)
- `frontend/` - React app (created with CRA style files: package.json, public/index.html, src/)

## Run locally

### Backend
1. cd backend
2. npm install
3. create .env and set MONGO_URI (or use local mongodb)
4. node server.js

### Frontend
1. cd frontend
2. npm install
3. set .env: REACT_APP_API_URL=http://localhost:5000
4. npm start

