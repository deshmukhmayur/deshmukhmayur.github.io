import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://deshmukhmayur.com',
  // i18n seam (spec §1): en-only, no prefixes — later locales add prefixes without URL churn
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  // dev server: expose on the tailnet (astro's own server option, not vite's)
  server: {
    host: true,
    allowedHosts: ['.ts.net'],
  },
  vite: {
    // contact worker (ticket 27): proxy the form endpoint to `wrangler dev`
    // in worker/ during local development; production uses the worker's route
    server: {
      proxy: {
        '/api/send': 'http://localhost:8787',
      },
    },
  },
});
