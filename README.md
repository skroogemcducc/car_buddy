# CAR (Corrective Action Record)

A standalone QA workspace for running issues through Stafast's corrective action process. See [GLOSSARY.md](./GLOSSARY.md) for domain terms.

## Getting started

1. Copy `.env.example` to `.env` and point `DATABASE_URL` at a local Postgres instance. Set `SESSION_SECRET` to a long random string.
2. Install dependencies and generate the Prisma client:

   ```bash
   npm install
   npm run prisma:generate
   ```

3. Apply migrations to your database:

   ```bash
   npm run prisma:migrate
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/login`; register a new user with initials and a self-chosen PIN to get to the (currently empty) Corrective Action list.

## Testing

```bash
npm test
```

Service-layer tests (`src/lib/users/service.test.ts`) exercise registration and login logic against an in-memory fake repository, so they run without a database.

## Tech

- Next.js (App Router) + TypeScript
- Prisma + Postgres
- Session auth via a signed JWT cookie (no third-party auth provider — login is initials + PIN only, per spec)
