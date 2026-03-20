import type { APIRoute } from 'astro';
import { supabaseSSR } from '../../../lib/supabaseSSR';

export const POST: APIRoute = async (context) => {
    try {
        const body = await context.request.json();
        const { action, repo, path, content, message, sha, isBase64 } = body;

        // action: 'read', 'list', 'write', 'delete'
        // repo: 'login/slug'
        // path: 'src/data/home.json' ou 'src/content/blog'

        if (!action || !repo || !path) {
            return new Response(JSON.stringify({ error: 'Faltam parâmetros obrigatórios (action, repo, path)' }), { status: 400 });
        }

        const supabase = supabaseSSR(context);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return new Response(JSON.stringify({ error: 'Não autorizado. Faça login.' }), { status: 401 });

        const { data: integrations } = await supabase.from('integrations').select('*').eq('user_id', user.id);
        const ghToken = integrations?.find((i: any) => i.provider === 'github')?.token?.trim();
        if (!ghToken) throw new Error('Token do GitHub não encontrado. Verifique suas integrações.');

        const githubUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
        const headers: any = {
            Authorization: `Bearer ${ghToken}`,
            Accept: 'application/vnd.github+json',
        };

        let res;

        switch (action) {
            case 'read':
            case 'list': {
                res = await fetch(githubUrl, { headers });
                if (!res.ok) {
                    if (res.status === 404) return new Response(JSON.stringify({ error: 'Arquivo ou pasta não encontrado', code: 404 }), { status: 404 });
                    const e = await res.json();
                    throw new Error(`Erro ao ler ${path} do GitHub: ${e.message}`);
                }
                const data = await res.json();

                // Se retornar um array, é requisição de diretório (List)
                if (Array.isArray(data)) {
                    return new Response(JSON.stringify({ data }), { status: 200 });
                }

                // Se retornar um file (Read), damos um decode do conteúdo encodado cru do Github (Base64)
                if (data.type === 'file' && data.content) {
                    const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
                    // Retornamos ao frontend o texto legível e o identificador (SHA) desse arquivo, essencial caso queiramos editá-lo
                    return new Response(JSON.stringify({ content: decoded, sha: data.sha }), { status: 200 });
                }

                return new Response(JSON.stringify({ data }), { status: 200 });
            }

            case 'write': {
                if (content === undefined) throw new Error("Ação 'write' exige o campo 'content'.");

                const writeBody: any = {
                    message: message || `Update ${path} via CMS CNX`,
                    content: isBase64 ? content : Buffer.from(content).toString('base64'),
                };
                // Github exige a sha passada se você for substituir um arquivo existente (evita conflitos)
                if (sha) writeBody.sha = sha;

                res = await fetch(githubUrl, {
                    method: 'PUT',
                    headers: { ...headers, 'Content-Type': 'application/json' },
                    body: JSON.stringify(writeBody),
                });

                if (!res.ok) {
                    const e = await res.json();
                    throw new Error(`Erro ao salvar arquivo ${path} no GitHub: ${e.message}`);
                }

                const responseData = await res.json();
                // A resposta devolve a nova sha, podemos usar se quisermos editar o msmo arquvio várias vezes na mesma sessão
                return new Response(JSON.stringify({ success: true, sha: responseData.content?.sha }), { status: 200 });
            }

            case 'delete': {
                if (!sha) throw new Error("Ação 'delete' exige o campo 'sha' (identificador exato do arquivo no histórico git).");

                res = await fetch(githubUrl, {
                    method: 'DELETE',
                    headers: { ...headers, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: message || `Delete ${path} via CMS CNX`,
                        sha: sha,
                    }),
                });

                if (!res.ok) {
                    const e = await res.json();
                    throw new Error(`Erro ao excluir ${path} no GitHub: ${e.message}`);
                }

                return new Response(JSON.stringify({ success: true }), { status: 200 });
            }

            default:
                throw new Error("Ação inválida. Variáveis permitidas: 'read', 'list', 'write' ou 'delete'.");
        }

    } catch (err: any) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
