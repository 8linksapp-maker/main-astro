import type { APIRoute } from 'astro';
import { readSiteSettings } from '../utils/read-site-settings';

function esc(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function urlNode(base: string, path: string, lastmod?: string): string {
    const full = base.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
    const loc = esc(full);
    const lm = lastmod ? `\n    <lastmod>${esc(lastmod)}</lastmod>` : '';
    return `  <url>
    <loc>${loc}</loc>${lm}
  </url>`;
}

export const GET: APIRoute = async ({ request }) => {
    const settings = await readSiteSettings();
    const generate = settings.generateSitemap !== false;
    let base = (settings.canonicalUrl as string)?.trim();
    if (!base) {
        try {
            const url = new URL(request.url);
            base = `${url.protocol}//${url.host}`;
        } catch {
            base = 'https://example.com';
        }
    }

    const stylesheet = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';
    if (!generate) {
        return new Response(
            `<?xml version="1.0" encoding="UTF-8"?>
${stylesheet}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlNode(base, '/')}
</urlset>`,
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/xml; charset=utf-8',
                    'Cache-Control': 'public, max-age=3600',
                },
            },
        );
    }

    const today = new Date().toISOString().slice(0, 10);
    const urls: string[] = [];

    // Páginas do SaaS
    const staticPaths = ['/', '/login', '/forgot-password', '/update-password'];
    for (const p of staticPaths) {
        urls.push(urlNode(base, p, today));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
${stylesheet}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    return new Response(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
};
