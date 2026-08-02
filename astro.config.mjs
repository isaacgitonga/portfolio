// @ts-check
import {defineConfig} from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  redirects: {
    '/case-studies': '/work',
    '/book': '/inquire?service=risk-auditing',
    '/contact': '/inquire',
  },

  adapter: vercel()
});