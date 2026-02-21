# Feedback App

A React app for notes and reminders with priority (1–7). Add, edit, and delete notes; data is persisted via json-server. Uses React Router, Framer Motion, and React Context.

## Tech Stack

- **Frontend**: React 18, React Router v6, Framer Motion, react-icons, uuid
- **Backend**: json-server for REST API and file-based storage (`db.json`)
- **Scripts**: `start` (frontend), `server` (json-server on port 5000), `dev` (both via concurrently)

## Setup & Run

### Prerequisites

- Node.js and npm

### Install

```bash
npm install
```

If `npm run dev` fails with a missing `concurrently` error, install it:

```bash
npm install concurrently --save-dev
```

### Run the app

**Option A** — Start backend and frontend together:

```bash
npm run dev
```

**Option B** — Run in two terminals:

1. Terminal 1: `npm run server` (json-server on port 5000)
2. Terminal 2: `npm start` (React dev server on port 3000)

### Open

Open [http://localhost:3000](http://localhost:3000). The frontend proxies API requests to `http://localhost:5000`.

## Functionalities

| Area | What the app does |
|------|-------------------|
| **Notes CRUD** | Add note (text + priority 1–7), edit existing note, delete note (with confirmation). |
| **Validation** | Note text must be at least 10 characters; a day/priority must be selected before submit. |
| **List & UI** | Notes listed newest first; each shows priority (day) and text; Framer Motion for list animations; loading spinner while fetching. |
| **Stats** | Displays total note count and average priority ("Average Rating") on the home page. |
| **Routing** | `/` — main page (form, stats, list); `/about` — About page with link back home; `/post` and `/post/show` — placeholder Post routes. |
| **Persistence** | Notes stored in `db.json` via json-server (GET/POST/PUT/DELETE `/Notes`). |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | React dev server. |
| `npm run server` | json-server (watch `db.json`, port 5000). |
| `npm run dev` | Run server + start (requires concurrently). |
| `npm run build` | Production build. |
| `npm test` | Run tests. |

## Project Structure

- **State**: `src/context/NotesContext.jsx` — notes data, loading, add/edit/delete/update.
- **Components**: `src/components` — NoteForm, NoteList, NoteItem, NotesStats, Header, shared Card/Button/Spinner.
- **Pages**: `src/components/pages` — About, Post, NotesReminder (placeholder).
