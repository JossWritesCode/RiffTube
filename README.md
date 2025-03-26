# RiffTube

In the glorious tradition of Mystery Science Theater 3000, The Film Crew, RiffTrax, Cinematic Titanic, MST3k again, and others...

Now presenting: **you**.

**RiffTube** lets you add your own riffs to any video on YouTube. Watch, comment, create — your voice, your style, your movie night.

---

## 🚀 Getting Started

This project uses a Vite + React frontend and a Ruby on Rails API backend. Both are booted up together with one command.

### 1. Install dependencies

```bash
# from the root
npm install
cd backend && bundle install
```

### 2. Start the app

```bash
npm run dev
```

This runs both servers concurrently:

- Rails API at `http://localhost:3000`
- Vite frontend at `http://localhost:5173`

---

## 🧱 Tech Stack

### Frontend
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [YouTube API](https://developers.google.com/youtube/v3)
- [Google Login](https://developers.google.com/identity)
- [Web Audio Recorder](https://github.com/higuma/web-audio-recorder-js)

### Backend
- [Ruby on Rails](https://rubyonrails.org/) (API mode)
- [PostgreSQL](https://www.postgresql.org/) (planned)

---

## 👥 Authors

- **David Newberry** — [paxfeline](https://github.com/paxfeline)
- **Joscelyn Stancek** — [JossWritesCode](https://github.com/JossWritesCode)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
