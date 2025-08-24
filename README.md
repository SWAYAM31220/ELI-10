# ELI10 (Single-folder Fullstack)

Next.js App Router + Tailwind + Framer Motion + Supabase + OpenAI + React Flow, deployed as one app.

## Setup
1. Create a Supabase project → get URL + anon + service role keys.
2. Run SQL in `supabase.sql` within Supabase SQL editor.
3. Copy `.env.example` → `.env.local` and fill values.
4. Install deps: `npm i` (or `yarn`, `pnpm i`).
5. Start: `npm run dev` → http://localhost:3000

## Deploy
- Vercel/Node host: add env vars and deploy. No separate backend needed.

## Notes
- API route `/api/explain` calls OpenAI and stores the result + mindmap into Supabase.
- Mindmap is rendered with React Flow.
