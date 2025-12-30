# Support Wizard

Voice-first internal support ticket system with human-in-the-loop routing.

## Structure
- `server/`: Express + Prisma backend with ticket intake, routing stubs, RBAC middleware, and schema migrations.
- `client/`: React (Vite + TypeScript) frontend with push-to-talk intake, text fallback, and ticket list/admin banner.

## Backend
1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `PORT`, and secrets.
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Run migrations (requires Postgres):
   ```bash
   npx prisma migrate deploy
   ```
4. Start the API:
   ```bash
   npm run dev
   ```

### TODOs
- OAuth providers (Google, Microsoft, GitHub) + JWT issuance.
- Okta SSO hooks (placeholder in `/api/auth`).
- Langfuse tracing integration for routing/KB services.
- Chatterbox voice output interface and MCP exposure.

## Frontend
1. Install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```

The UI hits the backend at `http://localhost:4000/api` by default (override with `VITE_API_BASE`).
