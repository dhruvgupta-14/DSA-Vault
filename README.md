# DSA Vault — Node.js + MongoDB

A small Express backend backing the DSA Vault C++ template manager, with the
frontend served from the same server. Data is stored in MongoDB, so it
persists across restarts and can be reached from any device once deployed.

## 1. Get a free MongoDB Atlas connection string

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a free (M0) cluster.
3. Under **Database Access**, add a database user with a username/password.
4. Under **Network Access**, add an IP entry — either your current IP, or
   `0.0.0.0/0` (allow from anywhere) if you'll deploy to a host with a
   changing IP.
5. Click **Connect** on your cluster → **Drivers** → copy the connection
   string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your database user's
   credentials, and add a database name before the `?`, e.g. `.../dsa-vault?retryWrites...`.

## 2. Configure

Open `.env` and replace the placeholder:

```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/dsa-vault?retryWrites=true&w=majority
PORT=3000
```

## 3. Install & run

```bash
npm install
npm start
```

Then open http://localhost:3000 — the app will seed 15 starter C++
templates into your database the first time it loads.

For auto-restart on file changes during development:

```bash
npm run dev
```

## Project structure

```
dsa-vault-backend/
├── server.js              # Express app entry point
├── models/Template.js     # Mongoose schema
├── routes/templates.js    # REST API (GET/POST/PUT/DELETE + import)
├── seed/defaultTemplates.js
├── public/index.html      # Frontend (fetches the API above)
├── .env                   # Your MongoDB URI + port (not committed)
└── package.json
```

## API

| Method | Route                    | Description                        |
|--------|---------------------------|-------------------------------------|
| GET    | `/api/templates`          | List all templates (seeds on first run) |
| POST   | `/api/templates`          | Create a template                  |
| PUT    | `/api/templates/:id`      | Update a template                  |
| DELETE | `/api/templates/:id`      | Delete a template                  |
| POST   | `/api/templates/import`   | Bulk import from a JSON array       |

## Deploying

This is a normal Node app, so it runs as-is on Render, Railway, Fly.io,
a VPS, etc. Just set the `MONGODB_URI` and `PORT` environment variables on
whichever host you use (most platforms let you set these in their
dashboard instead of a `.env` file).
