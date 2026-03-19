# CreatorFlow

CreatorFlow is a production-quality full-stack SaaS app for creators, freelancers, and small teams to manage projects, tasks, notes, content plans, and analytics.

## Stack
- Next.js + TypeScript + Tailwind
- Prisma ORM + PostgreSQL
- NextAuth credentials auth
- Zod + React Hook Form
- Recharts analytics

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and run migration:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Seed demo data:
   ```bash
   npm run prisma:seed
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## Demo login
- Email: `demo@creatorflow.app`
- Password: `Demo@1234`

## Validation commands
```bash
npm run lint
npm run typecheck
npm run build
```

## Routes
- `/` landing page
- `/auth/login`, `/auth/signup`
- `/dashboard`
- `/dashboard/projects`
- `/dashboard/projects/[id]`
- `/dashboard/tasks`
- `/dashboard/notes`
- `/dashboard/analytics`
- `/dashboard/settings`
