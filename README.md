# Engineering Portfolio

A personal engineering portfolio for Sharan Kuniyil Shaji, a senior full-stack software engineer based in Dubai. The homepage presents a concise introduction, with dedicated About and Career pages. Some project details, metrics, links, and the resume still need verification.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Geist, Lucide React, Framer Motion, ESLint, and Prettier.

## Local development

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Set `NEXT_PUBLIC_SITE_URL` to the production domain before deployment.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run format:check` — Prettier check
- `npm run format` — apply Prettier

## Structure

- `src/app` — routes and metadata endpoints
- `src/components/sections` — homepage sections and reusable career timeline
- `src/components/layout`, `ui`, `animations` — shared components
- `src/data` — representative project, experience, skill, and homepage content
- `src/types` — shared data contracts
- `src/config` — central site identity and links
- `src/lib` — shared utilities and metadata
- `public` — supplied portrait, abstract project previews, and future assets

Deployment target: Vercel. Before publishing, confirm project details, replace placeholder email and social links, supply a resume, and add verified impact figures.
