import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tiya-website.leepolung1.workers.dev',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
