#!/bin/bash

# Define the GitHub Token & Repository
TOKEN="${GITHUB_TOKEN}"
REPO="Bloghouse/template-cnx"

echo "[START] Updating Bloghouse/template-cnx via cURL"

push_file() {
  local path=$1
  local b64content=$2
  
  # Check if file exists to get SHA
  local sha_response=$(curl -s -H "Authorization: token $TOKEN" "https://api.github.com/repos/$REPO/contents/$path")
  local sha=$(echo "$sha_response" | grep -o '"sha": *"[^"]*"' | head -n 1 | awk -F '"' '{print $4}')
  
  # Build JSON payload
  if [ -n "$sha" ]; then
    json_payload="{\"message\": \"build(template): Add React component $path\", \"content\": \"$b64content\", \"sha\": \"$sha\"}"
  else
    json_payload="{\"message\": \"build(template): Add React component $path\", \"content\": \"$b64content\"}"
  fi
  
  # Push file
  local response=$(curl -s -o /dev/null -w "%{http_code}" -X PUT -H "Authorization: token $TOKEN" -H "Content-Type: application/json" -d "$json_payload" "https://api.github.com/repos/$REPO/contents/$path")
  
  if [ "$response" -eq 200 ] || [ "$response" -eq 201 ]; then
    echo "✅ $path updated ($response)"
  else
    echo "❌ $path failed ($response)"
  fi
}

echo "Pushing package.json..."
push_file "package.json" "$(cat << 'EOF' | base64
{
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
}
EOF
)"

echo "Pushing astro.config.mjs..."
push_file "astro.config.mjs" "$(cat << 'EOF' | base64
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://meu-site.vercel.app',
  integrations: [tailwind(), react(), sitemap()]
});
EOF
)"

echo "Pushing siteConfig.ts..."
push_file "src/config/siteConfig.ts" "$(cat << 'EOF' | base64
import type { SiteData } from '../types/siteData';

export const siteConfig: SiteData = {
  settings: {
    companyName: 'Meu Site',
    slogan: 'Construindo o futuro',
    contact: { phone: '', whatsapp: '', email: '' },
    colors: { primary: '#2563eb', secondary: '#f59e0b', accent: '#f59e0b' }
  },
  pages: { home: { hero: { title: 'Bem-vindo', subtitle: '', ctaText: 'Saiba Mais', ctaLink: '/' } } }
};
export default siteConfig;
EOF
)"

echo "Pushing siteData.ts..."
push_file "src/types/siteData.ts" "$(cat << 'EOF' | base64
export interface SiteData {
  settings: any;
  pages: any;
  services?: any[];
  locations?: any[];
  seo?: any;
}
EOF
)"

echo "Pushing useSiteData.ts..."
push_file "src/hooks/useSiteData.ts" "$(cat << 'EOF' | base64
import { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

export const useSiteData = () => {
  const [data] = useState(siteConfig);
  return { data, isLoading: false, error: null };
};
EOF
)"

echo "Pushing HeroSection.tsx..."
push_file "src/components/sections/HeroSection.tsx" "$(cat << 'EOF' | base64
import React from 'react';
import { useSiteData } from '../../hooks/useSiteData';

export const HeroSection = () => {
  const { data } = useSiteData();
  const hero = data?.pages?.home?.hero;
  if (!hero) return null;

  return (
    <section className="bg-site-primary text-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 font-heading">{hero.title}</h1>
        <p className="text-xl mb-8 font-body opacity-90">{hero.subtitle}</p>
        {hero.ctaText && (
          <a href={hero.ctaLink} className="bg-site-secondary text-white px-8 py-4 rounded-xl font-bold inline-block hover:scale-105 transition-transform">
            {hero.ctaText}
          </a>
        )}
      </div>
    </section>
  );
};
EOF
)"

echo "Pushing ServicesSection.tsx..."
push_file "src/components/sections/ServicesSection.tsx" "$(cat << 'EOF' | base64
import React from 'react';
import { useSiteData } from '../../hooks/useSiteData';

export const ServicesSection = () => {
  const { data } = useSiteData();
  const services = data?.services || [];
  
  if (!services.length) return null;

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 font-heading">Nossos Serviços / Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s: any, i: number) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-bold mb-4">{s.name}</h3>
              <p className="text-gray-600">{s.shortDescription || s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
EOF
)"

echo "Pushing index.astro..."
push_file "src/pages/index.astro" "$(cat << 'EOF' | base64
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesSection } from '../components/sections/ServicesSection';
---

<BaseLayout title="Bem-vindo ao nosso site">
  <HeroSection client:load />
  <ServicesSection client:visible />
</BaseLayout>
EOF
)"

echo "[DONE] Base template is ready."
