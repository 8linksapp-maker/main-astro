import fetch from "node-fetch";

const token = process.env.GITHUB_TOKEN; // Precisamos rodar passando isso na env
const repo = "Bloghouse/template-cnx";

const filesToPush = [
    {
        path: "package.json",
        content: `{
  "name": "template-cnx",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/react": "^3.6.2",
    "astro": "^4.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@astrojs/sitemap": "^3.7.0",
    "@astrojs/tailwind": "^5.1.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.0"
  }
}`
    },
    {
        path: "astro.config.mjs",
        content: `import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://meu-site.vercel.app',
  integrations: [tailwind(), react(), sitemap()]
});`
    },
    {
        path: "src/config/siteConfig.ts",
        content: `import type { SiteData } from '../types/siteData';
export const siteConfig: SiteData = {
  settings: {
    companyName: 'Meu Site',
    slogan: 'Construindo o futuro',
    contact: { phone: '', whatsapp: '', email: '' },
    colors: { primary: '#2563eb', secondary: '#f59e0b', accent: '#f59e0b' }
  },
  pages: { home: { hero: { title: 'Bem-vindo', subtitle: '', ctaText: 'Saiba Mais', ctaLink: '/' } } }
};
export default siteConfig;`
    },
    {
        path: "src/types/siteData.ts",
        content: `export interface SiteData {
  settings: any;
  pages: any;
  services?: any[];
  locations?: any[];
  seo?: any;
}`
    },
    {
        path: "src/hooks/useSiteData.ts",
        content: `import { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

export const useSiteData = () => {
  const [data] = useState(siteConfig);
  return { data, isLoading: false, error: null };
};`
    },
    {
        path: "src/components/sections/HeroSection.tsx",
        content: `import React from 'react';
import { useSiteData } from '../../hooks/useSiteData';

export const HeroSection = () => {
  const { data } = useSiteData();
  const hero = data.pages?.home?.hero;
  if (!hero) return null;

  return (
    <section className="bg-site-primary text-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 font-heading">{hero.title}</h1>
        <p className="text-xl mb-8 font-body opacity-90">{hero.subtitle}</p>
        {hero.ctaText && (
          <a href={hero.ctaLink} className="bg-site-secondary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all">
            {hero.ctaText}
          </a>
        )}
      </div>
    </section>
  );
};`
    },
    {
        path: "src/components/sections/ServicesSection.tsx",
        content: `import React from 'react';
import { useSiteData } from '../../hooks/useSiteData';

export const ServicesSection = () => {
  const { data } = useSiteData();
  const services = data.services || [];
  
  if (!services.length) return null;

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 font-heading">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-bold mb-4">{s.name}</h3>
              <p className="text-gray-600">{s.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};`
    },
    {
        path: "src/pages/index.astro",
        content: `---
import BaseLayout from '../layouts/BaseLayout.astro';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesSection } from '../components/sections/ServicesSection';
---

<BaseLayout title="Bem-vindo ao nosso site">
  <HeroSection client:load />
  <ServicesSection client:visible />
</BaseLayout>`
    }
];

async function updateFile(filePath: string, contentStr: string) {
    const url = \`https://api.github.com/repos/\${repo}/contents/\${filePath}\`;
  
  let sha;
  try {
     const getRes = await fetch(url, { headers: { "Authorization": \`token \${token}\` } });
     if (getRes.ok) {
       const info = await getRes.json();
       sha = info.sha;
     }
  } catch(e) {}

  const body = {
     message: \`build(template): Adicionando bloco nativo \${filePath} (CMS Base)\`,
     content: Buffer.from(contentStr).toString("base64"),
     ...(sha && { sha })
  };

  const res = await fetch(url, {
     method: "PUT",
     headers: { "Authorization": \`token \${token}\`, "Content-Type": "application/json" },
     body: JSON.stringify(body)
  });

  if (!res.ok) {
     const error = await res.json();
     console.error(\`Failed to update \${filePath}\`, error);
  } else {
     console.log(\`✅ \${filePath} updated in Bloghouse\`);
  }
}

async function run() {
  if (!token) throw new Error("precisa do token github");
  for (const file of filesToPush) {
     await updateFile(file.path, file.content);
     await new Promise(r => setTimeout(r, 1000));
  }
}

run();
