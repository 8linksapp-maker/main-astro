import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'

export function supabaseSSR(context: any) {
    return createServerClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    try {
                        const cookieHeader = context?.request?.headers?.get('Cookie') ?? '';
                        const parsed = parseCookieHeader(cookieHeader);
                        return parsed.map(c => ({ name: c.name, value: c.value || '' }));
                    } catch (_) {
                        return [];
                    }
                },
                setAll(cookiesToSet) {
                    if (!context?.cookies?.set) return; // Se não houver objeto de cookies do Astro, ignora silenciosamente
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            context.cookies.set(name, value, options as any)
                        );
                    } catch (_) {
                        // Ignora erros de gravação de cookie no servidor
                    }
                },
            },
        }
    )
}
