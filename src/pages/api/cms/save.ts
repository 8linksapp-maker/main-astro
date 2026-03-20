import type { APIRoute } from 'astro';
import { supabaseSSR } from '../../../lib/supabaseSSR';

export const POST: APIRoute = async (context) => {
    try {
        const body = await context.request.json();
        const { siteId, repoName, files } = body;

        const supabase = supabaseSSR(context);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 401 });

        // 1. Buscar Token do GitHub
        const { data: integrations } = await supabase.from('integrations').select('*').eq('user_id', user.id);
        const ghToken = integrations?.find((i: any) => i.provider === 'github')?.token?.trim();
        if (!ghToken) throw new Error('Integração com GitHub não encontrada.');

        // 2. Commitar cada arquivo
        for (const file of files) {
            const { path, content } = file;

            // Buscar o SHA atual para evitar conflitos (Update)
            let currentSha = null;
            const checkRes = await fetch(`https://api.github.com/repos/${repoName}/contents/${path}`, {
                headers: { 'Authorization': `Bearer ${ghToken}` }
            });

            if (checkRes.ok) {
                const existingFile = await checkRes.json();
                currentSha = existingFile.sha;
            }

            const commitRes = await fetch(`https://api.github.com/repos/${repoName}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${ghToken}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `cms: atualizando ${path}`,
                    content: Buffer.from(content).toString('base64'),
                    ...(currentSha && { sha: currentSha })
                })
            });

            if (!commitRes.ok) {
                const errData = await commitRes.json();
                throw new Error(`Erro ao salvar ${path}: ${errData.message}`);
            }
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (e: any) {
        console.error("ERRO CMS SAVE:", e.message);
        return new Response(JSON.stringify({ message: e.message }), { status: 500 });
    }
}
