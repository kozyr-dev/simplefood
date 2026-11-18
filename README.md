# SimpleFood: the website

The shop's website: Next.js 16 (App Router), React 19, react-query 5, zustand 5, Formik and yup, Sass and Tailwind 4. Its data comes from the NestJS API in `../api`. The shop's staff edit it in the API's admin app.

## Getting started

```bash
nvm use                 # Node 24 (.nvmrc)
cp .env.example .env    # the API's address: http://localhost:1339 locally
npm ci
npm run dev             # http://localhost:3000
```

The API must be running (`cd ../api && npm run start:dev`), with `CORS_ORIGINS` and `FRONTEND_URL` set to `http://localhost:3000` (its `.env.example` defaults).

## Scripts

| Script              | What it does                                                               |
| ------------------- | -------------------------------------------------------------------------- |
| `npm run dev`       | Development server                                                         |
| `npm run build`     | Production build (`output: standalone`)                                    |
| `npm run lint`      | ESLint (Next's rules)                                                      |
| `npm run typecheck` | TypeScript                                                                 |
| `npm test`          | Jest                                                                       |
| `npm run api:types` | Regenerates `src/shared/api/schema.ts` from the running API's OpenAPI spec |

## Configuration

| Variable              | Used for                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `DEV_API_URL`         | `next dev`: server-side calls, and the browser unless `NEXT_PUBLIC_API_URL` is set           |
| `PROD_API_URL`        | `next build`: server-side calls (may be an internal address); `STAGING=1` uses `DEV_API_URL` |
| `NEXT_PUBLIC_API_URL` | The browser's calls and image URLs: always the public address                                |

They're inlined at build time (`next.config.ts`).

## How it talks to the API

- **Types** come from the API's OpenAPI spec: `src/shared/api/schema.ts` is generated (`npm run api:types`), and `src/shared/api/types.ts` names the shapes. After an API change, regenerate and let `tsc` show what broke.
- **Calls:** `apiFetch()` (`src/shared/api/client.ts`) for public ones; it throws `ApiError` (`status`, `code`, `details`, `retryAfter`). `errorMessage()` / `fieldErrors()` (`errors.ts`) turn it into Ukrainian text or Formik field errors.
- **Signed-in calls:** `authFetch()` (`src/shared/session/`) sends the access token, refreshes it once on a 401 and retries. Concurrent calls share one refresh; tabs take turns through the browser's Web Locks, because a refresh token works once.
- **Sessions:** the access token and the profile live in memory only. The refresh token is an HttpOnly cookie (`sf_refresh`, `SameSite=Strict`, path `/api/auth`) that only the site's own routes in `app/api/auth/` read: login, register, refresh, logout, change-password. Everything else goes from the browser to the API directly. After a page load, `SessionBootstrap` asks `/api/auth/refresh` for a new access token.
- **Pages** are loaded on the server first, so unknown or unpublished pages and posts get a real 404 (`notFoundOn404`); sections arrive resolved (products, images, categories embedded).
- **Prices** are integer kopiykas everywhere; `formatPrice()` divides for display.
- **Images:** `MediaImage` (`src/shared/ui/base/MediaImage`) renders an uploaded image with its size and alt text; `prefixContentImages()` points `/uploads/…` images in editor HTML at the API.

## Structure

Feature-Sliced Design under `src/` (the Next `app/` folder sits at the root and only routes):

```text
app/        routes; app/api/auth/* are the session routes
src/
  app/      providers, layouts, the session bootstrap
  pages/    page components
  widgets/  page blocks (header, sections, checkout form, account parts)
  features/ user actions: auth, placing an order, the contact form
  entities/ settings, menus, pages, blog, products, cart, orders, user
  shared/   api client and types, session, helpers, UI kit, styles
```

## Deploy

`.github/workflows/deploy.yml`: lint, typecheck and tests on every push and PR. **A push to `main` deploys to production:** the VPS pulls, builds with the Node version in `.nvmrc` and restarts the standalone server with pm2 on `127.0.0.1:3000`, behind nginx (its proxy template is in `../api/deploy/nginx/`).

The production `.env` lives on the VPS only. There `PROD_API_URL` is the API's local address (`http://127.0.0.1:1339`) and `NEXT_PUBLIC_API_URL` its public one (`https://api-simplefood.kozyr.info`).
