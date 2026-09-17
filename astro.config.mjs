import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://deshmukhmayur.com',
  // i18n seam (spec §1): en-only, no prefixes — later locales add prefixes without URL churn
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
});
