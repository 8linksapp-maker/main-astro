# STEP 1: ESTRUTURA DATA-DRIVEN PARA CMS

Crie um projeto Astro + Tailwind CSS com arquitetura 100% data-driven.

## ⚠️ VERSÕES OBRIGATÓRIAS (CRÍTICO)

**USE ESTAS VERSÕES EXATAS** para evitar conflitos:

```json
// package.json - dependências principais
{
  "dependencies": {
    "astro": "^4.5.0",
    "@astrojs/tailwind": "^5.1.0",
    "tailwindcss": "^3.4.1"
  }
}
```

> ⚠️ **NÃO USE bibliotecas de roteamento do React (como react-router-dom)** - O Astro usa roteamento nativo baseado em arquivos (file-based routing).
> ⚠️ **NÃO USE bibliotecas de SEO de terceiros como react-helmet** - Use as tags `<title>` e `<meta>` nativas no componente `<head>` do seu Layout base.

---

## DADOS DO CLIENTE
- Empresa: Encanador Express RJ
- Telefone: (21) 99999-8888
- Cidade: Rio de Janeiro
- Serviço Principal: Serviços de Encanamento
- Slogan: Atendimento de emergência em até 40 minutos. Orçamento grátis!

---

## 1. ARQUIVO DE CONFIGURAÇÃO (src/config/siteConfig.ts)

**CRÍTICO**: Crie este arquivo com os dados exportados. O CMS lê diretamente deste arquivo.

```typescript
// src/config/siteConfig.ts - ARQUIVO PRINCIPAL DE DADOS (editável pelo CMS)
import type { SiteData } from '../types/siteData';

export const siteConfig: SiteData = {
  settings: {
    companyName: 'Encanador Express RJ',
    slogan: 'Atendimento de emergência em até 40 minutos. Orçamento grátis!',
    contact: {
      phone: '(21) 99999-8888',
      whatsapp: '21999998888',
      email: 'contato@encanadorexpressrj.com.br',
    },
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      accent: '#f59e0b',
    },
  },
  pages: {
    home: {
      hero: {
        title: 'Encanador 24 Horas no Rio de Janeiro',
        subtitle: 'Atendimento de emergência em até 40 minutos. Orçamento grátis!',
        ctaText: 'Solicitar Orçamento',
        ctaLink: '/contato',
      },
      trust: {
        items: [
          { label: 'Anos de Experiência', value: '10+' },
          { label: 'Clientes Atendidos', value: '500+' },
          { label: 'Avaliação', value: '4.9' },
        ],
      },
      about: {
        title: 'Sobre a Encanador Express RJ',
        description: 'Especialistas em serviços de encanamento em Rio de Janeiro.',
        highlights: [],
      },
      benefits: {
        title: 'Por que nos escolher?',
        subtitle: 'Diferenciais que fazem a diferença',
        items: [],
      },
      services: {
        title: 'Nossos Serviços',
        subtitle: 'Soluções completas para você',
      },
      faq: {
        title: 'Perguntas Frequentes',
        items: [],
      },
      contact: {
        title: 'Entre em Contato',
        subtitle: 'Estamos prontos para atender você',
      },
      finalCta: {
        title: 'Pronto para começar?',
        subtitle: 'Entre em contato agora mesmo',
        ctaText: 'Fale Conosco',
      },
    },
  },
  services: [],
  locations: [],
};

export default siteConfig;
```

---

## 2. CONSUMO DE DADOS NO ASTRO (Frontmatter)

No Astro, não usamos "hooks" de estado para dados estáticos. O consumo dos dados deve ser feito diretamente no script de frontmatter (`---`) dos componentes e páginas `.astro`:

```astro
---
// Exemplo em src/pages/index.astro ou componentes
import { siteConfig } from '../config/siteConfig';

const { settings, pages } = siteConfig;
const homeData = pages.home;
---

<h1>{homeData.hero.title}</h1>
<p>{homeData.hero.subtitle}</p>
```

---

## 3. ESTRUTURA DA HOMEPAGE ROBUSTA

A home deve ter as seguintes seções (componentes `.astro` separados):

### Seções Obrigatórias:
1. **HeroSection** - Título, subtítulo, CTA, telefone
2. **TrustBadges** - Números/estatísticas (anos, clientes, avaliação)
3. **AboutSection** - Sobre a empresa com destaques
4. **BenefitsSection** - Grade 4-6 diferenciais com ícones
5. **ServicesSection** - Cards dos serviços principais
6. **FAQSection** - Perguntas frequentes gerais
7. **ContactSection** - Formulário e dados de contato
8. **FinalCTA** - Bloco de chamada final antes do footer

### Estrutura de pastas:
```
src/
├── components/
│   ├── layout/
│   │   ├── BaseLayout.astro
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── sections/
│   │   ├── HeroSection.astro
│   │   ├── TrustBadges.astro
│   │   ├── AboutSection.astro
│   │   ├── BenefitsSection.astro
│   │   ├── ServicesSection.astro
│   │   ├── FAQSection.astro
│   │   ├── ContactSection.astro
│   │   └── FinalCTA.astro
│   └── ui/
│       ├── ServiceCard.astro
│       └── BenefitCard.astro
├── config/
│   └── siteConfig.ts    <- ARQUIVO DE DADOS (CMS edita este)
├── pages/
│   ├── index.astro
│   ├── sobre.astro
│   ├── contato.astro
│   ├── servicos/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── [cidade]/
│       └── [servico].astro
└── types/
    └── siteData.ts
```

---

## 4. TIPOS TYPESCRIPT (src/types/siteData.ts)

```typescript
export interface SiteSettings {
  companyName: string;
  slogan: string;
  contact: { phone: string; whatsapp: string; email: string; address?: SiteAddress };
  colors: { primary: string; secondary: string; accent: string };
  openingHours?: string;
  priceRange?: string;
}

export interface SiteAddress {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface SiteData {
  settings: SiteSettings;
  pages: { home: HomePage };
  services: ServicePage[];
  locations: LocationPage[];
}

export interface HomePage {
  hero: HeroSection;
  about: AboutSection;
  benefits: BenefitsSection;
  services: ServicesListSection;
  faq: FAQSection;
  contact: ContactSection;
  trust: { items: { label: string; value: string }[] };
  finalCta: { title: string; subtitle: string; ctaText: string };
}

export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface AboutSection {
  title: string;
  description: string;
  image?: string;
  highlights: { icon: string; value: string; label: string }[];
}

export interface BenefitsSection {
  title: string;
  subtitle?: string;
  items: { icon: string; title: string; description: string }[];
}

export interface ServicesListSection {
  title: string;
  subtitle: string;
}

export interface FAQSection {
  title: string;
  subtitle?: string;
  items: { question: string; answer: string }[];
}

export interface ContactSection {
  title: string;
  subtitle: string;
  formTitle?: string;
}

export interface ServicePage {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  howItWorks: { number: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  ctaText: string;
  image?: string;
}

export interface LocationPage {
  id: string;
  slug: string;
  name: string;
  city: string;
  state?: string;
  headline: string;
  description: string;
}
```

---

## 5. ROTAS DINÂMICAS (File-based Routing)

O Astro usa a pasta `src/pages` para definir rotas. Para as páginas dinâmicas, implemente a função `getStaticPaths()` dentro dos arquivos entre colchetes, consumindo o `siteConfig`:

* `/src/pages/servicos/[slug].astro` -> Exibe um serviço específico.
* `/src/pages/[cidade]/[servico].astro` -> Exibe a página combinada de cidade + serviço.

---

## 6. SERVIÇOS INICIAIS

Crie páginas para estes 6 serviços:
1. Desentupimento de Pia (slug: desentupimento-de-pia)
2. Desentupimento de Esgoto (slug: desentupimento-de-esgoto)
3. Reparo de Vazamentos (slug: reparo-de-vazamentos)
4. Instalação de Torneiras (slug: instalacao-de-torneiras)
5. Limpeza de Caixa D'água (slug: limpeza-de-caixa-dagua)
6. Hidráulica em Geral (slug: hidraulica-em-geral)

---

## 7. LOCALIZAÇÕES INICIAIS

Crie páginas para estes 7 bairros/regiões:
1. Copacabana, Rio de Janeiro
2. Ipanema, Rio de Janeiro
3. Leblon, Rio de Janeiro
4. Botafogo, Rio de Janeiro
5. Flamengo, Rio de Janeiro
6. Centro, Rio de Janeiro
7. Barra da Tijuca, Rio de Janeiro

---

## ENTREGA ESPERADA

✅ Consumo de dados nativo no Frontmatter do Astro (`---`)
✅ Todos os tipos TypeScript definidos
✅ HomePage com 8 seções modulares usando componentes `.astro`
✅ Roteamento estático configurado (`src/pages/` e `getStaticPaths()`)
✅ Componentes consumindo dados globais perfeitamente
✅ Site super rápido, funcional e pronto para conectar ao CMS headless## STEP 2: DESIGN SYSTEM

Complementa a estrutura data-driven do Step 1.

### CORES
```
primary: #2563eb (botões, links, elementos principais)
secondary: #f59e0b (fundos, cards, áreas de destaque)
accent: #f59e0b (CTAs, badges, chamadas urgentes)
```

**Implementar em `src/styles/global.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --site-primary: #2563eb;
    --site-secondary: #f59e0b;
  }
}
```

**Tailwind config (`tailwind.config.mjs`):**
```javascript
export default {
  // ...
  theme: {
    extend: {
      colors: {
        'site-primary': 'var(--site-primary)',
        'site-secondary': 'var(--site-secondary)'
      }
    }
  }
}
```

### TIPOGRAFIA

**Fontes:** Poppins (títulos) + Inter (corpo)

**Importar no `src/styles/global.css`:**
```css
@import url('[https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap](https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap)');

@layer base {
  :root {
    --font-heading: 'Poppins', system-ui, sans-serif;
    --font-body: 'Inter', system-ui, sans-serif;
  }
}
```

**Escala de tamanhos:**
- `text-sm`: 14px (labels, captions)
- `text-base`: 16px (corpo principal)
- `text-lg`: 18px (destaques)
- `text-xl`: 20px (subtítulos)
- `text-2xl`: 24px (títulos de seção)
- `text-4xl/text-5xl`: Hero headline

**Tailwind config (`tailwind.config.mjs`):** ```javascript
export default {
  // ...
  theme: {
    extend: {
      fontFamily: { 
        heading: 'var(--font-heading)', 
        body: 'var(--font-body)' 
      }
    }
  }
}
```

### COMPONENTES BASE (Classes Tailwind)

**Botão Primário (CTA):**
```text
bg-site-primary text-white font-heading font-semibold px-6 py-3 rounded-xl hover:bg-site-primary/90 hover:scale-105 transition-all shadow-lg
```

**Card de Serviço:**
```text
bg-white border border-gray-100 rounded-2xl p-6 font-body hover:-translate-y-2 hover:shadow-xl transition-all duration-300
```

**Badge/Tag:**
```text
bg-site-primary/10 text-site-primary px-3 py-1 rounded-full text-sm font-medium
```

### IMAGENS (Unsplash)

**Hero:** `https://source.unsplash.com/random/1920x1080/?plumber`

| Serviço | Keywords | URL da Imagem |
|---------|----------|---------------|
| Desentupimento de Pia | sink, drain | https://source.unsplash.com/random/800x600/?sink,drain |
| Desentupimento de Esgoto | sewer, drain pipe | https://source.unsplash.com/random/800x600/?sewer,drain%20pipe |
| Reparo de Vazamentos | water leak, pipe | https://source.unsplash.com/random/800x600/?water%20leak,pipe |
| Instalação de Torneiras | installation, setup | https://source.unsplash.com/random/800x600/?installation,setup |
| Limpeza de Caixa D'água | water tank, cleaning | https://source.unsplash.com/random/800x600/?water%20tank,cleaning |
| Hidráulica em Geral | professional, service | https://source.unsplash.com/random/800x600/?professional,service |

### LAYOUT DAS SEÇÕES

1. **HeroSection:** min-h-[70vh] bg-gradient-to-br from-site-primary/5
2. **TrustBadges:** py-8 bg-gray-50/50 grid grid-cols-2 md:grid-cols-4 gap-6
3. **BenefitsSection:** py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
4. **ServicesSection:** py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
5. **FAQSection:** py-16 md:py-24 max-w-3xl mx-auto (accordion)
6. **ContactSection:** py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12
7. **FinalCTA:** py-16 bg-site-primary text-white text-center

### ESPAÇAMENTO PADRÃO

- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Seções: `py-16 md:py-24`
- Cards gap: `gap-6` ou `gap-8`
- Elementos internos: `space-y-4`

### EFEITOS GLOBAIS

- Navbar: `sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b`
- Scroll: `scroll-smooth` (Aplicar na tag `<html>` do `src/components/layout/BaseLayout.astro`)
- Links: `hover:text-site-primary transition-colors`
- Imagens: `rounded-xl object-cover`# STEP 4: SEO TÉCNICO

## CONFIGURAÇÃO SEO

### Meta Tags Padrão
**Adicione ao seu `src/config/siteConfig.ts`:**
```typescript
seo: {
  defaultTitle: 'Encanador Express RJ | Serviços de Encanamento em Rio de Janeiro',
  titleTemplate: '%s | Encanador Express RJ',
  defaultDescription: 'Encanador 24h no Rio de Janeiro. Desentupimento, vazamentos e hidráulica. Orçamento grátis. Ligue agora!',
  siteUrl: '[https://www.encanadorexpressrj.com.br](https://www.encanadorexpressrj.com.br)',
}
```

### Schema LocalBusiness (JSON-LD)
Este script deve ser injetado nativamente no `<head>` do seu `BaseLayout.astro`:
```html
<script type="application/ld+json">
{
  "@context": "[https://schema.org](https://schema.org)",
  "@type": "LocalBusiness",
  "name": "Encanador Express RJ",
  "description": "Encanador 24h no Rio de Janeiro. Desentupimento, vazamentos e hidráulica. Orçamento grátis. Ligue agora!",
  "telephone": "(21) 99999-8888",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Atlântica, 500, Copacabana, Rio de Janeiro, RJ, 22010-000"
  },
  "openingHours": "Segunda a Domingo, 24 horas",
  "priceRange": "$$"
}
</script>
```

### Componente SEO (src/components/SEO.astro)
**CRÍTICO:** No Astro, não manipulamos o DOM do cliente para alterar o título (esqueça `useEffect` ou `react-helmet`). Nós renderizamos as tags nativamente no servidor.

Crie este componente e chame-o dentro do `<head>` do seu layout base:

```astro
---
import { siteConfig } from '../config/siteConfig';

export interface Props {
  title?: string;
  description?: string;
}

const { 
  title = siteConfig.seo.defaultTitle, 
  description = siteConfig.seo.defaultDescription 
} = Astro.props;

// Formata o título dinamicamente se não for a Home
const formattedTitle = title === siteConfig.seo.defaultTitle 
  ? title 
  : siteConfig.seo.titleTemplate.replace('%s', title);
---

<title>{formattedTitle}</title>
<meta name="description" content={description} />
<meta property="og:title" content={formattedTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={siteConfig.seo.siteUrl} />
<meta property="og:type" content="website" />
<meta property="og:locale" content="pt_BR" />
```

### Sitemap Automático
No Astro, a melhor forma de gerar o sitemap é usando a integração oficial.
1. Instale: `npx astro add sitemap`
2. Certifique-se de que o `astro.config.mjs` possui a URL do site:
```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: '[https://www.encanadorexpressrj.com.br](https://www.encanadorexpressrj.com.br)',
  integrations: [tailwind(), sitemap()],
});
```
O Astro vai gerar automaticamente o `sitemap-index.xml` e `sitemap-0.xml` na pasta `dist/` durante o build, cobrindo todas as suas rotas dinâmicas (`/servicos/desentupimento-de-pia`, `/rio-de-janeiro/copacabana`, etc).

### robots.txt (public/robots.txt)
Crie este arquivo dentro da pasta `public/` (o Astro copia tudo daqui direto para a raiz do site):
```text
User-agent: *
Allow: /
Sitemap: [https://www.encanadorexpressrj.com.br/sitemap-index.xml](https://www.encanadorexpressrj.com.br/sitemap-index.xml)
```Atue como Arquiteto de Software Front-End.

═══════════════════════════════════════════════════════════════
📁 INTEGRAÇÃO CMS VIA GIT (SEM BANCO DE DADOS!)
═══════════════════════════════════════════════════════════════

O site JÁ FOI CRIADO com arquitetura data-driven nos Steps 1-4 no Astro:

✅ `src/types/siteData.ts` - Tipos TypeScript
✅ `src/data/siteConfig.ts` - ÚNICA FONTE DE DADOS do site
✅ Consumo Direto via Frontmatter - Sem necessidade de hooks React!
✅ Todos os componentes `.astro` já importam a configuração nativamente.

FILOSOFIA: "Arquivo de config = Banco de dados"
O Git é seu CMS! Cada commit = uma versão do site.

═══════════════════════════════════════════════════════════════
🎯 COMO EDITAR O SITE
═══════════════════════════════════════════════════════════════

**OPÇÃO 1: Editar direto no repositório**
1. Abra `src/data/siteConfig.ts` no GitHub/GitLab
2. Clique em "Edit" (ícone de lápis)
3. Modifique os valores (textos, cores, links)
4. Commit as alterações
5. Deploy automático acontece (Vercel/Netlify)

**OPÇÃO 2: Usar CMS conectado ao GitHub (Ex: Decap CMS, TinaCMS)**
1. Conecte o repositório no CMS headless
2. Edite via interface visual  
3. CMS faz commit automático no Git
4. Deploy acontece automaticamente

═══════════════════════════════════════════════════════════════
📄 ESTRUTURA DO ARQUIVO DE CONFIGURAÇÃO
═══════════════════════════════════════════════════════════════

O arquivo `src/data/siteConfig.ts` contém TODOS os dados editáveis:

```typescript
import type { SiteData } from '../types/siteData';

export const defaultSiteData: SiteData = {
  settings: {
    companyName: 'Encanador Express RJ',
    slogan: 'Seu slogan aqui',
    contact: {
      phone: '(XX) XXXXX-XXXX',
      whatsapp: 'XXXXXXXXXXX',
      email: 'contato@empresa.com.br',
      // ...
    },
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      // ...
    },
  },
  pages: {
    home: {
      hero: {
        title: 'Título Principal',
        subtitle: 'Subtítulo',
        ctaText: 'Botão CTA',
        ctaLink: '/contato',
      },
      // ...
    },
  },
  services: [
    // Lista de serviços
  ],
  locations: [
    // Lista de bairros/cidades
  ],
  seo: {
    defaultTitle: 'Encanador Express RJ',
    defaultDescription: 'Descrição para SEO',
    // ...
  },
};
```

═══════════════════════════════════════════════════════════════
📦 CONSUMO NATIVO NO ASTRO (Adeus Hooks!)
═══════════════════════════════════════════════════════════════

Diferente do React, o Astro não precisa de hooks (`useSiteData`) nem de gerenciamento de estado (`useState`) para dados estáticos. Nós simplesmente importamos os dados diretamente no script de build do componente:

```astro
// ═══════════════════════════════════════════════════════════════
// Importação direta nos componentes Astro
// ═══════════════════════════════════════════════════════════════

---
import { defaultSiteData } from '@/data/siteConfig';

/**
 * Vantagens desta abordagem no Astro:
 * - Zero dependências de banco de dados
 * - Zero JavaScript enviado ao cliente (SSG puro)
 * - Deploy automático via Git push
 * - Versionamento completo via Git
 * - Performance absoluta (Score 100 no Lighthouse)
 */
---
```

═══════════════════════════════════════════════════════════════
🔧 COMO OS COMPONENTES USAM OS DADOS
═══════════════════════════════════════════════════════════════

Todos os componentes já consomem os dados via Frontmatter:

```astro
---
// Exemplo: src/components/sections/HeroSection.astro
import { defaultSiteData } from '@/data/siteConfig';

const { hero } = defaultSiteData.pages.home;
---

<section class="bg-blue-50 py-20">
  <div class="max-w-7xl mx-auto px-4">
    <h1 class="text-4xl font-heading font-bold">{hero.title}</h1>
    <p class="mt-4 text-xl font-body">{hero.subtitle}</p>
    <a href={hero.ctaLink} class="mt-8 inline-block bg-site-primary text-white px-6 py-3 rounded-xl">
      {hero.ctaText}
    </a>
  </div>
</section>
```

Ao editar o `siteConfig.ts` e fazer deploy, o site atualiza estaticamente com máxima performance!

═══════════════════════════════════════════════════════════════
✅ VANTAGENS DA ABORDAGEM GIT-BASED NO ASTRO
═══════════════════════════════════════════════════════════════

🚀 **Zero Custo de Infraestrutura**
   - Sem banco de dados para manter
   - Sem servidor backend
   - Hospedagem 100% estática (grátis no Vercel/Netlify/GitHub Pages)

📜 **Versionamento Completo**
   - Cada edição fica no histórico Git
   - Pode reverter para qualquer versão
   - Audit trail automático

⚡ **Performance Máxima (Astro SSG)**
   - HTML gerado no servidor durante o build
   - Zero chamadas de API em runtime
   - Zero latência de banco e Zero JS inútil no cliente

🔒 **Segurança**
   - Sem endpoints expostos
   - Sem credenciais de banco
   - Impossível sofrer SQL injection (é só HTML estático!)

═══════════════════════════════════════════════════════════════
📋 CHECKLIST FINAL
═══════════════════════════════════════════════════════════════

✅ Arquivo `src/data/siteConfig.ts` é a fonte de dados única
✅ Componentes Astro importam dados via Frontmatter (`---`)
✅ Variáveis são injetadas nativamente no HTML
✅ Edições = commits no Git
✅ Deploy automático via Vercel/Netlify

**O SITE JÁ ESTÁ PRONTO PARA EDIÇÃO!**
Basta modificar o arquivo de config e fazer commit.Atue como DevOps Engineer e Especialista em Deploy.

═══════════════════════════════════════════════════════════════
CONTEXTO
═══════════════════════════════════════════════════════════════

O site está completo: estrutura, design, conteúdo, SEO técnico e integração CMS via Git.
Agora precisamos fazer o DEPLOY para produção.

Plataforma escolhida: VERCEL
Domínio: será usado o padrão da plataforma inicialmente.

═══════════════════════════════════════════════════════════════
🚨🚨🚨 TAREFA #1 OBRIGATÓRIA - FAZER PRIMEIRO! 🚨🚨🚨
═══════════════════════════════════════════════════════════════

⚠️ **PREVENÇÃO DE CONFLITOS DE PACOTES NO BUILD**

Crie o arquivo `.npmrc` na RAIZ do projeto com este conteúdo:

```text
legacy-peer-deps=true
```

**Por que isso é necessário?**
Mesmo usando Astro, ao integrar bibliotecas de UI (Tailwind, ícones, ou componentes React interativos), podemos esbarrar em erros de árvore de dependências no servidor do Vercel (`ERESOLVE unable to resolve dependency tree`). Este arquivo garante um build liso.

**Como criar via terminal (macOS/Linux):**
```bash
echo "legacy-peer-deps=true" > .npmrc
git add .npmrc
git commit -m "chore: add npmrc to resolve peer deps conflicts"
git push
```

⚠️ SOMENTE APÓS CRIAR O .npmrc, PROSSIGA COM AS PRÓXIMAS TAREFAS!

═══════════════════════════════════════════════════════════════
TAREFA 2: ARQUIVO DE CONFIGURAÇÃO VERCEL
═══════════════════════════════════════════════════════════════

Crie o arquivo `vercel.json` na raiz do projeto. 
*Nota: Diferente do React puro, o Astro gera arquivos estáticos reais. Não precisamos forçar o rewrite para index.html.*

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/_astro/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

Este arquivo configura:
- URLs limpas (sem `.html` no final)
- Cache agressivo (1 ano) exclusivo para a pasta de assets gerada pelo Astro (`/_astro/`)
- Headers de segurança rigorosos (XSS, clickjacking, MIME sniffing) para pontuação máxima no Lighthouse.

═══════════════════════════════════════════════════════════════
TAREFA 3: CHECKLIST DE DEPLOY
═══════════════════════════════════════════════════════════════

# ═══════════════════════════════════════════════════════════════
# CHECKLIST DE DEPLOY - Encanador Express RJ
# Plataforma: Vercel
# ═══════════════════════════════════════════════════════════════

## 📋 PRÉ-REQUISITOS

- [ ] Código commitado na branch principal
- [ ] Projeto buildando localmente sem erros (`npm run build`)
- [ ] Arquivo `.npmrc` criado na raiz

## 🚀 PASSO 1: CRIAR PROJETO NO VERCEL

1. Acesse: https://vercel.com/new
2. Conecte seu repositório Git
3. Selecione o repositório do projeto "Encanador Express RJ"
4. Verifique as opções de build (O Vercel deve detectar o Astro automaticamente):
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

## ⚙️ PASSO 2: VARIÁVEIS DE AMBIENTE (Opcional)

Se você usar variáveis no Astro, adicione com o prefixo correto no painel do Vercel:
```text
PUBLIC_SITE_URL = [https://www.encanadorexpressrj.com.br](https://www.encanadorexpressrj.com.br)
PUBLIC_SITE_NAME = Encanador Express RJ
```

## 🌐 PASSO 3: DEPLOY INICIAL

1. Clique em "Deploy"
2. Aguarde o build completar (costuma levar < 1 minuto com Astro)
3. Teste a URL gerada (ex: `encanador-express-rj.vercel.app`)

## 🔗 PASSO 4: DOMÍNIO CUSTOMIZADO

1. Adquira o domínio
2. No painel do Vercel, vá em Settings > Domains
3. Adicione o domínio e configure os apontamentos DNS (A Record / CNAME) conforme instruído pela plataforma.

## ✅ PASSO 5: VERIFICAÇÃO FINAL TÉCNICA

- [ ] Navegação nativa funcionando (sem recarregamentos pesados)
- [ ] Verifique o código fonte (Ctrl+U) para confirmar a injeção estática do JSON-LD Schema.org
- [ ] Verifique as meta tags no `<head>` (OG e Twitter Cards)
- [ ] Lighthouse Audit: Deve bater 95-100 em Performance e SEO
- [ ] Sitemap acessível em `/sitemap-index.xml`
- [ ] Robots.txt acessível

## 🔄 FLUXO DE ATUALIZAÇÃO VIA GIT CMS

O pipeline está fechado. Para alterar o site:
1. Edite o `src/config/siteConfig.ts` localmente ou via interface do GitHub.
2. Faça o commit da alteração.
3. O Vercel fará o rebuild estático automaticamente em segundos!

═══════════════════════════════════════════════════════════════
COMANDOS ÚTEIS (CLI)
═══════════════════════════════════════════════════════════════

**Build e preview de produção localmente:**
```bash
npm run build
npm run preview
```

**Deploy forçado via CLI:**
```bash
npx vercel --prod
```

═══════════════════════════════════════════════════════════════
                        🎉 SITE EM PRODUÇÃO!
═══════════════════════════════════════════════════════════════

Sua infraestrutura está:
✅ 100% Serverless e incrivelmente rápida
✅ Imune a injeções de banco de dados (SSG puro)
✅ Com pontuação máxima de Core Web Vitals
✅ Pronta para a estratégia de backlinks e ranqueamento local.