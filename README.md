# Job Tracker

Track target companies and professional connections during a job search.  
The app provides dashboards for company pipeline management and outreach tracking.

## Technologies Used

- Framework: `Next.js 16` (App Router) + `React 19`
- Authentication: `next-auth` with Google OAuth
- Database/ORM: `PostgreSQL` + `Prisma 7` (`@prisma/adapter-pg`)
- Styling/UI: `SCSS modules`, `Tailwind CSS v4`, Radix/shadcn-style UI components
- Forms/Validation: `react-hook-form` + `zod`
- Notifications: `sonner`
- Email/Docs tooling: `nodemailer`, `@react-pdf/renderer`, `ical-generator`
- Testing: `Vitest` + Testing Library
- Linting: `ESLint` + `eslint-config-next`

## File Structure

```text
job-tracker/
  app/
    (dashboard)/
      dashboard/page.jsx
      companies/page.jsx
      connections/page.jsx
      layout.jsx
    api/
      auth/[...nextauth]/route.js
      company/route.jsx
      connection/route.jsx
    layout.jsx
    page.jsx
  features/
    companies/
      components/
      context/companyContext.jsx
      lib/
    connections/
      components/
      context/connectionContext.jsx
      lib/
    shared/
      components/
      context/
      lib/
      ui/
    email/
      templates/
      lib/
  prisma/
    schema.prisma
    migrations/
  generated/prisma/
  styles/
  auth.js
  Constants.js
  package.json
```

## User Flow

1. User lands on `/` and sees the welcome/sign-in screen.
2. User signs in with Google (`next-auth`).
3. Providers initialize app state (`SessionProvider`, auth, company, and connection contexts).
4. User enters dashboard pages:
   - `/dashboard` and `/companies` render the companies dashboard.
   - `/connections` renders the connections dashboard.
5. User can create, edit, filter, update status, and delete:
   - Companies (company pipeline)
   - Connections (outreach pipeline)
6. UI actions call API routes (`/api/company`, `/api/connection`), which persist changes to PostgreSQL through Prisma.
7. Changes are reflected in context state and rendered in list/detail components.

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file with at least:

```env
DATABASE_URL=postgresql://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### 3) Generate Prisma client and run schema/migrations

```bash
npx prisma generate
npx prisma migrate deploy
```

If you are iterating locally and want to push schema changes quickly:

```bash
npx prisma db push
```

### 4) Start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - generate Prisma client and build Next app
- `npm run start` - run production build
- `npm run lint` - run ESLint
- `npm run test` - run Vitest
- `npm run test:ui` - run Vitest UI

## Notes

- Prisma client is generated into `generated/prisma`.
- API handlers for auth, companies, and connections live under `app/api`.
- Feature logic is grouped by domain under `features/` to keep concerns localized.
