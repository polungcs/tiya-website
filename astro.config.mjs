import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://tiya-website.leepolung1.workers.dev',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],

  output: "hybrid",
  adapter: cloudflare()
});