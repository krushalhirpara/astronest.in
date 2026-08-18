# AstroNest Full-Stack Setup

This project is now structured as a full-stack application with a React frontend and a Node.js/Express backend.

## Project Structure
- `/client`: Frontend (Vite + React + TanStack Router)
- `/server`: Backend (Node.js + Express + OpenAI)

## Local Development

### 1. Backend Setup
1. Navigate to `/server`
2. Run `npm install`
3. Ensure the root `.env` file has your `OPENAI_API_KEY` (without VITE_ prefix).
4. Run `npm run dev` to start the backend at `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to `/client`
2. Run `npm install`
3. Run `npm run dev` to start the frontend at `http://localhost:5173`.

---

## Deployment Instructions (Render.com)

### 1. Deploying the Backend (Web Service)
1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Root Directory: `server`
4. Build Command: `npm install && npm run build` (or just `npm install` if using ts-node in start)
   * *Recommended*: Add a build script in `server/package.json` that runs `tsc`.
5. Start Command: `node dist/index.js` (or `npx ts-node index.ts` for simplicity on Render)
6. Environment Variables:
   - `OPENAI_API_KEY`: Your secret key.
   - `PORT`: 5000 (Render usually provides this automatically).

### 2. Deploying the Frontend (Static Site)
1. Create a new **Static Site** on Render.
2. Connect your GitHub repository.
3. Root Directory: `client`
4. Build Command: `npm install && npm run build`
5. Publish Directory: `dist`
6. Environment Variables:
   - `VITE_BACKEND_URL`: The URL of your deployed backend (e.g., `https://your-backend.onrender.com`).

---

## Security
- The `OPENAI_API_KEY` is now stored securely on the backend.
- The frontend communicates with the backend via `fetch` calls.
- CORS is enabled on the backend to allow requests only from your trusted frontend.
