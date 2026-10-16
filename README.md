# Kundan Kumar — Portfolio (MERN)

Personal portfolio built with **MongoDB, Express, React, Node.js, Tailwind CSS and JWT**.

- **Public site**: hero, about, experience, projects (loaded from MongoDB), skills, achievements, contact form
- **Contact form**: messages are validated, rate-limited and saved to MongoDB
- **Admin dashboard** (`/admin`): JWT login (bcrypt-hashed password) to read/delete messages and add/edit/delete projects

## Structure

```
client/   React (Vite) + Tailwind CSS v4 + React Router
server/   Express + Mongoose + JWT
  src/data/projects.js   default project data (also used by the client as an offline fallback)
```

## Setup

```bash
npm run install:all            # installs root, server and client deps
cp server/.env.example server/.env   # then edit values (MONGO_URI, JWT_SECRET, ADMIN_*)
npm run seed                   # creates the admin user + inserts default projects
npm run dev                    # server on :5000, client on :5173 (proxies /api)
```

`npm run seed -- --reset` (inside `server/`) replaces all projects with the defaults.

## Production

```bash
npm run build   # builds client/dist
npm start       # Express serves the API and the built React app on PORT
```

Works on Render / Railway etc. with MongoDB Atlas. If you host the client separately (e.g. Vercel),
set `VITE_API_URL` to the API origin and `CLIENT_URL` on the server to the client origin for CORS.
