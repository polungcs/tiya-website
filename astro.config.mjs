import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sensational-dusk-b9aae4.netlify.app',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
