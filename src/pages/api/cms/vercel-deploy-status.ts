import type { APIRoute } from 'astro';
import { supabaseSSR } from '../../../lib/supabaseSSR';

/**
 * GET /api/cms/vercel-deploy-status?repo=owner/slug
 *
 * Retorna o STATUS do deploy mais recente do projeto no Vercel.
 * Usa o token do Vercel salvo nas integrações do usuário.
 * O projectName é derivado do "slug" (parte após a barra do repo).
 *
 * Estados possíveis retornados: QUEUED | INITIALIZING | BUILDING | READY | ERROR | CANCELED
 */
export const GET: APIRoute = async (context) => {
    try {
        const supabase = supabaseSSR(context);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 401 });

        const repo = context.url.searchParams.get('repo'); // ex: "gustavo/cnx-cliente"
        if (!repo) return new Response(JSON.stringify({ error: 'Parâmetro repo obrigatório' }), { status: 400 });

        // Slug = parte após a última barra do repo (ex: "cnx-cliente")
        const projectName = repo.split('/').pop();

        // Busca token do Vercel nas integrações
        const { data: integrations } = await supabase
            .from('integrations')
            .select('*')
            .eq('user_id', user.id);

        const vercelToken = integrations?.find((i: any) => i.provider === 'vercel')?.token?.trim();
        if (!vercelToken) return new Response(JSON.stringify({ error: 'Token Vercel não encontrado' }), { status: 404 });

        const listRes = await fetch(
            `https://api.vercel.com/v6/deployments?projectId=${projectName}&limit=5`,
            { headers: { Authorization: `Bearer ${vercelToken}` } }
        );

        if (!listRes.ok) {
            const errData = await listRes.json();
            return new Response(JSON.stringify({ error: errData.error?.message || 'Erro ao listar deployments' }), { status: 500 });
        }

        const listData = await listRes.json();
        const deployments: any[] = listData.deployments || [];

        if (!deployments.length) {
            return new Response(JSON.stringify({ status: 'UNKNOWN', message: 'Nenhum deploy encontrado' }), { status: 200 });
        }

        // Filtra apenas deploys criados APÓS o timestamp de save (se informado)
        const afterParam = context.url.searchParams.get('after');
        const afterMs = afterParam ? parseInt(afterParam, 10) : 0;

        const filtered = afterMs > 0
            ? deployments.filter((d: any) => (d.createdAt || 0) >= afterMs)
            : deployments;

        // Se não achou deploy novo ainda, retorna UNKNOWN p/ o frontend continuar aguardando
        if (!filtered.length) {
            return new Response(JSON.stringify({ status: 'UNKNOWN', message: 'Aguardando novo deploy ser registrado na Vercel...' }), { status: 200 });
        }

        const latest = filtered[0];
        // Estado mapeado: QUEUED, INITIALIZING, BUILDING, READY, ERROR, CANCELED
        const state = latest.state || latest.readyState || 'UNKNOWN';

        return new Response(JSON.stringify({
            status: state,
            id: latest.uid || latest.id,
            url: latest.url ? `https://${latest.url}` : null,
            createdAt: latest.createdAt,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
