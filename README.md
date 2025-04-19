# RiffTube

[![Rails](https://img.shields.io/badge/Rails-7.0-red?logo=rubyonrails)](https://rubyonrails.org/)  
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)  
[![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?logo=vite)](https://vitejs.dev/)

---

In the glorious tradition of Mystery Science Theater 3000, The Film Crew, RiffTrax, Cinematic Titanic, MST3k again, and others...

Now presenting: **you**.

**RiffTube** lets you add your own riffs to any video on YouTube. Watch, comment, create — your voice, your style, your movie night.

---

## Getting Started

This project uses a Vite + React frontend and a Ruby on Rails API backend. They are booted separately but coordinated during development.

---

### 💻 IDE Setup

We recommend using **Visual Studio Code** for local development.

1. **Open the project folder in VS Code**
2. **When prompted, install the recommended extensions:**
   - Prettier (`esbenp.prettier-vscode`)
   - ESLint (`dbaeumer.vscode-eslint`)
   - RuboCop (`rubocop.vscode-rubocop`)
3. **On save, your code will auto‑format** for:
   - JavaScript & TypeScript (via Prettier + ESLint)
   - Ruby (via RuboCop)

---

### 🔧 Linting & Formatting

The `package.json` includes scripts for checking and formatting code in both the frontend and backend.

To lint everything:

```bash
npm run lint
```

To format everything automatically:

```bash
npm run format
```

You can also target each side individually:

```bash

# Frontend only

npm run lint:frontend
npm run format:frontend

# Backend only

npm run lint:backend
npm run format:backend
```

To check if your frontend code is formatted correctly (without writing changes):

```bash
npm run check-format
```

---

### 1. Install dependencies

We’ve added a convenient script that installs both frontend and backend dependencies in one go:

```bash
npm run install:all
```

This runs `npm install` in `frontend/` and `bundle install` in `backend/`.

---

### 2. Set up environment variables

- Copy `.env.example` to `.env` at the project root:

```bash
cp .env.example .env
```

- Fill in real credentials in `.env` for your local database connection and CORS settings:

```bash
DATABASE_USERNAME=your_postgres_username
DATABASE_PASSWORD=your_postgres_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
ALLOWED_CORS_ORIGINS=http://localhost:5173
```

> **Important:** `.env` must be located at the project root (`/RiffTube/.env`), **not inside `/backend` or `/frontend`**.

---

### 3. Set up the database

```bash
cd backend
rails db:create
rails db:migrate
```

This will:

- Create the `rifftube_development` and `rifftube_test` databases
- Enable the `uuid-ossp` extension for UUID primary keys

---

### 4. Start the app

From the project root, run:

```bash
npm run dev
```

This will concurrently start:

- Rails API → http://localhost:3000
- Vite frontend → http://localhost:5173

---

## 🧹 Local Development Setup Checklist

- [ ] `.env` exists at project root and contains correct database and CORS variables
- [ ] `npm run install:all` completed without errors
- [ ] `rails db:create` and `rails db:migrate` completed without errors
- [ ] Rails server (`rails server`) starts successfully
- [ ] Vite server (`npm run dev`) starts successfully
- [ ] Access Rails API at `http://localhost:3000`
- [ ] Access React frontend at `http://localhost:5173`

---

## 📝 Commit & Pull Request Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for a clear history and automated workflows.

**Commit messages should:**

- Use the imperative, present tense (e.g., `add x to y`, not `added x to y`).
- Begin with a type prefix: `feat:`, `fix:` or `chore:`.

**Pull request conventions:**

- **Title:** Must match your commit message.
- **Body:** Include `resolves #<issue-number>` to automatically close the related issue.

**Example:**

**PR Title:**  
`feat: support time-traveling riffs from future disappointed users`

**PR Body:**

```text
resolves #303

- allows pre-emptive commentary before scenes even happen
- breaks causality but improves engagement metrics
```

---

## Tech Stack

### Frontend

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [YouTube API](https://developers.google.com/youtube/v3)
- [Google Login](https://developers.google.com/identity)
- [Web Audio Recorder](https://github.com/higuma/web-audio-recorder-js)

### Backend

- [Ruby on Rails](https://rubyonrails.org/) (API mode)
- [PostgreSQL](https://www.postgresql.org/)
- [Google Cloud Storage](https://cloud.google.com/storage) (planned)
- [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech) (planned)

---

## Authors

- **David Newberry** — [paxfeline](https://github.com/paxfeline)
- **Joscelyn Stancek** — [JossWritesCode](https://github.com/JossWritesCode)

---

## License

This project is licensed under the [MIT License](LICENSE).

