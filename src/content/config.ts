import { defineCollection, z } from 'astro:content';
// Force reload v2
import { glob } from 'astro/loaders';

const siteThemes = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/themes' }),
    schema: z.object({
        name: z.string(),
        slug: z.string(),
        primaryColor: z.string(),
        secondaryColor: z.string(),
        borderRadius: z.string(),
        layout: z.enum(['classic', 'bento', 'stellar', 'blog-adsense']).default('classic'),
        screenshot: z.string().optional(),
    }),
});

const siteSettings = defineCollection({
    loader: glob({
        pattern: 'settings.yaml',
        base: './src/content/singletons',
        generateId: ({ entry }) => entry.replace(/\.yaml$/, ''), // id = 'settings'
    }),
    schema: z.object({
        activeTheme: z.string().optional(),
        siteName: z.string(),
        colorScheme: z.enum(['dark', 'light']).default('dark'),
        siteMode: z.enum(['blog', 'local']).default('blog'),
        aiProvider: z.enum(['openai', 'gemini']).default('gemini').optional(),
        aiApiKey: z.string().optional(),
        // Pexels API — imagens em posts gerados por IA (1 a cada ~400 palavras, máx 5)
        pexelsApiKey: z.string().optional(),
        // SEO Técnico (sitemap, robots.txt) — configurável no admin
        canonicalUrl: z.string().optional(),
        generateSitemap: z.boolean().default(true),
        generateRobots: z.boolean().default(true),
        robotsDisallow: z.array(z.string()).optional(),
        // Estrutura de permalink dos posts
        blogPermalinkStructure: z.enum(['postname', 'year_month', 'year_month_day']).default('postname'),
        blogUrlPrefix: z.enum(['blog', 'root']).default('blog'), // 'root' = sem /blog na URL
        // Contato centralizado — usado em Header, Footer, páginas locais, schema JSON-LD
        companyPhone: z.string().optional(),
        companyWhatsapp: z.string().optional(),
        // Atualizações automáticas do template (workflow .github)
        autoUpdateEnabled: z.boolean().optional(),
    }),
});

export const collections = { homepage, siteThemes, siteSettings, lp1 };
