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

### 1. Install dependencies

```bash
# install frontend dependencies
cd frontend
npm install

# install backend dependencies
cd ../backend
bundle install
```

---

### 2. Set up environment variables

- Copy `.env.example` to `.env` at the project root:
  ```bash
  cp .env.example .env
  ```
- Fill in real credentials in `.env` for your local database connection and CORS settings.

---

### 3. Set up the database

```bash
cd backend
rails db:create
rails db:migrate
```

---

### 4. Start the app

In two separate terminal windows or tabs:

```bash
# Terminal 1 - start Rails API
cd backend
rails server
```

```bash
# Terminal 2 - start Vite frontend
cd frontend
npm run dev
```

The servers will be running at:

- Rails API → [http://localhost:3000](http://localhost:3000)
- Vite frontend → [http://localhost:5173](http://localhost:5173)

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
