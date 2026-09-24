# Nema Backend API

Node.js/Express + TypeScript backend for the Nema e-commerce platform, using Prisma ORM over PostgreSQL.

## ⚠️ Security Warning — Rotate Secrets Before Production

A `.env` file was previously committed to this repository's history. Before any production deployment:

- **Rotate `JWT_SECRET`** to a new, long, random value. All previously issued access/refresh tokens will be invalidated.
- **Rotate the database password** (`POSTGRES_PASSWORD` / the credential embedded in `DATABASE_URL`) on the database server itself, then update the deployment's `DATABASE_URL`.
- Rotate any other credentials that were in that committed `.env` (e.g. mail provider key, Cloudinary secret) as a precaution.
- Confirm `.env` is now covered by `.gitignore` and scrub it from git history if it hasn't been already (e.g. `git filter-repo` / BFG).

## What This Service Is

A REST API powering an online grocery/e-commerce storefront: catalog browsing (categories, products, weight-based variants), cart, checkout with **Cash on Delivery (COD) only** (no card/webhook payment provider is wired up despite schema fields for it), order management, coupons, reviews, wishlist, search, and an admin surface for catalog, orders, users, and analytics.

## Requirements

- Node.js 18+
- npm
- PostgreSQL 14+ (or the bundled `docker-compose.yml` for local Postgres)

## Local Setup

```bash
npm install
cp .env.example .env   # then fill in real values, see below
npm run db:generate    # generate the Prisma client
npm run db:migrate     # apply migrations to your local database (dev)
npm run dev            # start the API with nodemon
```

To seed sample data (categories, products, an admin user, etc.):

```bash
npx prisma db seed
```
(runs `prisma/seed.ts`, configured via the `prisma.seed` field in `package.json`)

## Environment Variables

See [`.env.example`](./.env.example) for the full, documented list. Summary:

| Variable | Purpose |
|---|---|
| `PORT`, `NODE_ENV` | Server runtime config |
| `DATABASE_URL` | Postgres connection string used by Prisma |
| `JWT_SECRET`, `JWT_EXPIRES_IN` | Auth token signing — **must be rotated, see warning above** |
| `FRONTEND_URL`, `APP_URL` | CORS / link generation |
| `MAIL_FROM`, `MAIL_PROVIDER_API_KEY` | Transactional email |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Optional image upload provider config (see note below) |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Used by `docker-compose.yml` to provision a local Postgres container — **password must be rotated, see warning above** |

Never commit a real `.env` file; only `.env.example` (with placeholder values) belongs in version control.

## Database & Migrations

Prisma manages the schema (`prisma/schema.prisma`) and migrations (`prisma/migrations/`).

- `npm run db:generate` — regenerate the Prisma Client after schema changes.
- `npm run db:migrate` — `prisma migrate dev`, creates/applies migrations in a local/dev environment (interactive, may prompt to create a new migration).
- `npm run db:deploy` — `prisma migrate deploy`, applies pending migrations non-interactively; use this in CI/CD and production.
- `npm run db:push:dev` — `prisma db push`, quick schema sync without generating a migration (dev/prototyping only, not for production).

The initial migration (`prisma/migrations/0_init`) creates all 22 tables backing the schema's models (users, refresh/reset tokens, addresses, categories, products, product images, weight options, product weight variants, carts/cart items, orders/order items/order status history, audit logs, payments, wishlists/wishlist items, reviews, coupons/coupon usage, settings).

## NPM Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the API in watch mode via nodemon + ts-node (`src/server.ts`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server from `dist/server.js` |
| `npm run db:generate` | Generate the Prisma Client |
| `npm run db:push:dev` | Push the Prisma schema to the database without a migration (dev only) |
| `npm run db:migrate` | Create/apply migrations locally (`prisma migrate dev`) |
| `npm run db:deploy` | Apply pending migrations in CI/production (`prisma migrate deploy`) |
| `npm test` | Placeholder — no test suite configured yet |

## API Overview

All routes are mounted under the API root (see `src/routes/index.ts`); paths below are relative to that root (e.g. `/auth/login`).

### Auth — `/auth`
- `POST /register` — create a customer account
- `POST /login` — email/password login
- `POST /refresh` — exchange a refresh token for a new access token
- `POST /logout` — invalidate the current session (requires auth)
- `POST /forgot-password` — request a password reset token
- `POST /reset-password` — reset password with a token

### Users — `/users`
- `GET /me`, `PATCH /me`, `PATCH /me/password` — current user profile/password (requires auth)
- `GET /`, `GET /:id`, `PATCH /:id`, `DELETE /:id` — admin user management

### Addresses — `/addresses`
- `GET /`, `POST /`, `PATCH /:id`, `DELETE /:id` — manage the current user's addresses
- `PATCH /:id/default` — set an address as default

### Categories — `/categories`
- `GET /`, `GET /:slug` — public catalog browsing
- `POST /`, `PATCH /:id`, `DELETE /:id` — admin management

### Products — `/products`
- `GET /`, `GET /:slug` — public catalog browsing (optional-auth for personalization)
- `POST /`, `PATCH /:id`, `DELETE /:id` — admin management
- `POST /:id/images`, `DELETE /:id/images/:imgId` — manage product images

### Weight Options — `/weight-options`
- `GET /` — public list
- `POST /`, `PATCH /:id`, `DELETE /:id` — admin management

### Cart — `/cart`
- `GET /session` — get/create a session identifier for guest carts
- `GET /`, `DELETE /` — view/clear the current cart
- `POST /items`, `PATCH /items/:itemId`, `DELETE /items/:itemId` — manage cart items

### Orders — `/orders`
- `POST /` — place an order
- `GET /`, `GET /:id` — the current user's orders
- `PATCH /:id/cancel` — cancel an order
- `GET /admin/all`, `GET /admin/:id`, `PATCH /admin/:id/status` — admin order management

### Payments — `/payments`
- `POST /initiate` — record a payment intent for an order
- `GET /:orderId` — list payments for an order

**Only Cash on Delivery (COD) is implemented end-to-end.** The Prisma schema includes `CARD`/`WALLET` payment methods and `STRIPE`/`PAYMOB` providers for future use, but there is no public payment-provider webhook endpoint in this codebase — do not assume card payments are processed or confirmed automatically.

### Coupons — `/coupons`
- `POST /validate` — validate a coupon code against a cart/order (public)
- `GET /admin`, `POST /admin`, `PATCH /admin/:id`, `DELETE /admin/:id` — admin management

### Reviews — `/reviews`
- `GET /products/:productId`, `POST /products/:productId` — view/create reviews for a product
- `PATCH /:id`, `DELETE /:id` — edit/remove own review
- `PATCH /admin/:id/approve` — admin moderation

### Wishlist — `/wishlist`
- `GET /`, `POST /items`, `DELETE /items/:productId` — manage the current user's wishlist

### Search — `/search`
- `GET /` — full-text/catalog search

### Analytics — `/analytics` (admin)
- `GET /overview`, `GET /sales`, `GET /top-products`

### Settings — `/settings`
- `GET /` — public read of store settings
- `PATCH /admin` — admin update (requires auth + admin)

## Image Uploads / Cloudinary

`src/config/cloudStorage.ts` configures the Cloudinary SDK from `CLOUDINARY_*` env vars, but **it is not currently imported or used by any route or module** (`rg` confirms no references outside the file itself). Cloudinary is present as a dependency and configuration scaffold for future image-upload work, not an active integration.

## Security Notes

- Passwords are hashed with `bcryptjs`; never store or log plaintext passwords.
- Auth uses short-lived JWT access tokens plus stored refresh tokens (`RefreshToken` model) — rotate `JWT_SECRET` per the warning above.
- `helmet`, `cors`, and `express-rate-limit` are applied; sensitive auth endpoints (`login`, `register`, `forgot/reset-password`) use dedicated rate limiters (`authLimiter`, `strictLimiter`).
- All request bodies/params are validated with `zod` schemas via the `validate` middleware before hitting controllers.
- Admin-only routes are protected by `adminMiddleware` in addition to `authMiddleware`.
- Payments are COD-only in this codebase; there is intentionally no unauthenticated webhook endpoint to secure/verify.

## Deployment Notes

1. Set all required environment variables (see `.env.example`), with **freshly rotated** `JWT_SECRET` and database credentials.
2. Run `npm ci && npm run build`.
3. Run `npm run db:deploy` to apply migrations non-interactively.
4. Run `npm run db:generate` (also run automatically by `prisma` on `npm install` via its postinstall hook, but safe to re-run) before starting the server if the client wasn't generated during build.
5. Start the compiled server with `npm start`.
6. Ensure `NODE_ENV=production` and that `.env` is not deployed as a world-readable file / is sourced from a secrets manager instead.
