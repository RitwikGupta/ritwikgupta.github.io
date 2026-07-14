# Ritwik Gupta

Personal website built with Astro, Tailwind CSS, and pnpm.

## Development

```sh
pnpm install
pnpm dev
```

The development server runs at `http://localhost:4321/` by default.

Run the production checks and static build with:

```sh
pnpm build
```

## Content

- Homepage profile and biography: `src/pages/_home/`
- Full biography: `src/pages/about/_full-bio.md`
- Blog posts: `src/content/blog/`
- Publications: `src/pages/publications/_content/list.ts`
- Students: `src/pages/students/_data.ts`
- Press coverage: `src/pages/press/_content/`
- Moving-sale inventory: `src/data/moving-sale.yaml`

Blog posts and moving-sale items are validated through the collections in
`src/content.config.ts`. Publication and student pages use typed local data.
The three newest publications are selected for the homepage automatically at
build time.
