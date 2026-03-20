import fs from 'fs';
import https from 'https';

let token = process.env.GITHUB_TOKEN || "ghp_JtYk102O2nIuEqoP2Fk8zVXZ7LofmZ0JqQ1d";

try {
    const envFile = fs.readFileSync('/Users/gustavos/Documents/cnx/.env.local', 'utf-8');
    const tokenMatch = envFile.match(/GITHUB_TOKEN=(.+)/);
    if (tokenMatch) token = tokenMatch[1].trim();
} catch (e) { /* ignore */ }

const repoName = "not-cias-do-brasil";
const owner = "gustavosantana-dev";
const path = "src/components/sections/Section1Hero.astro";

const updatedFileContent = fs.readFileSync('/Users/gustavos/Documents/cnx/templates/blog-minimalist/src/components/sections/Section1Hero.astro', 'utf-8');

async function pushUpdateToRepo() {
    try {
        console.log(`Buscando SHA antigo em ${owner}/${repoName}/${path}`);

        let sha = '';
        const getOptions = {
            hostname: 'api.github.com',
            path: `/repos/${owner}/${repoName}/contents/${path}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'NodeJS',
                'Accept': 'application/vnd.github.v3+json'
            }
        };

        const getRes = await new Promise((resolve, reject) => {
            https.get(getOptions, res => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(JSON.parse(data)));
            }).on('error', reject);
        });

        if (getRes.sha) sha = getRes.sha;

        console.log(`Fazendo upload da nova versão p/ o arquivo ${path}`);
        const putData = JSON.stringify({
            message: 'Astro Blueprint Sync: Funcionalidade de Tamanho no Hero adicionada ao código-fonte',
            content: Buffer.from(updatedFileContent).toString('base64'),
            sha: sha || undefined,
            branch: 'main'
        });

        const putOptions = {
            hostname: 'api.github.com',
            path: `/repos/${owner}/${repoName}/contents/${path}`,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'NodeJS',
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(putData)
            }
        };

        const putRequest = https.request(putOptions, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log('✅ Tudo Certo! Código sincronizado e novo commit engatilhado na Vercel.');
                } else {
                    console.error('Falha:', data);
                }
            });
        });

        putRequest.on('error', e => console.error(e));
        putRequest.write(putData);
        putRequest.end();

    } catch (e) {
        console.error(e);
    }
}
pushUpdateToRepo();
