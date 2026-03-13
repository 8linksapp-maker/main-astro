import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const payload = await req.json();
        console.log('--- KIWIFY WEBHOOK RECEIVED ---');

        const eventType = payload.webhook_event_type;
        const customerEmail = payload.Customer?.email;
        const subscriptionId = payload.subscription_id;

        if (eventType === 'order_approved') {
            // O campo next_payment define EXATAMENTE até quando ele tem acesso (1 dia, 1 ano, etc)
            const nextPaymentDate = payload.Subscription?.next_payment;
            const subscriptionStatus = payload.Subscription?.status || 'active';

            if (!customerEmail || !nextPaymentDate) {
                return new Response('E-mail ou Data de Expiração ausentes', { status: 400 });
            }

            let userId: string;

            // Buscar se o usuário já existe
            const { data: rpcData } = await supabaseAdmin.rpc('get_user_id_by_email', { p_email: customerEmail });

            if (rpcData) {
                userId = rpcData;
                console.log(`Usuário encontrado: ${userId}`);
            } else {
                // Se não existe, convida
                const { data: newUser, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(customerEmail);
                if (inviteError) throw inviteError;
                userId = newUser.user.id;
                console.log(`Novo usuário convidado: ${userId}`);
            }

            // Atualiza o perfil com a data de validade enviada pela Kiwify
            const { error: updateError } = await supabaseAdmin.from('profiles').upsert({
                id: userId,
                subscription_status: subscriptionStatus,
                payment_provider: 'kiwify',
                kiwify_subscription_id: subscriptionId,
                subscription_period_end: new Date(nextPaymentDate).toISOString(),
                updated_at: new Date().toISOString()
            });

            if (updateError) throw updateError;

        } else if (eventType === 'order_refunded' || eventType === 'subscription_canceled') {
            // Bloqueia o acesso imediatamente
            const { error: updateError } = await supabaseAdmin
                .from('profiles')
                .update({ subscription_status: 'inactive' })
                .eq('kiwify_subscription_id', subscriptionId);

            if (updateError) throw updateError;
            console.log(`Acesso revogado para assinatura: ${subscriptionId}`);
        }

        return new Response(JSON.stringify({ received: true }), { status: 200 });

    } catch (err) {
        console.error(`Erro no Webhook: ${err.message}`);
        return new Response(`Erro: ${err.message}`, { status: 400 });
    }
});
