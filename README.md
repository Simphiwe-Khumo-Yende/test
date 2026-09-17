# Auth Signal Lab

A safe Next.js + TypeScript classroom prototype for demonstrating what an authentication endpoint can observe.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and use any test username or email address and passphrase.

## Privacy and safety

- No database, cookies, filesystem writes, analytics, or browser storage.
- The login endpoint is disabled outside local development builds.
- The API logs a masked identifier, passphrase length, timestamp, and `persisted: false` to the server runtime.
- The passphrase itself is never logged.
- Responses use `Cache-Control: no-store`.

## Deploy to Vercel

Import the repository into Vercel and use the default Next.js settings. No environment variables or storage services are required. Runtime observations appear in Vercel function logs and are subject to the log retention configured on the Vercel account.
