export async function readSiteSettings(): Promise<any> {
    return {
        siteName: 'Main CNX',
        canonicalUrl: '',
        generateSitemap: true,
        generateRobots: true,
        robotsDisallow: ['/dashboard', '/api']
    };
}
