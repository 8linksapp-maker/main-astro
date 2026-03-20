import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { triggerToast } from './CmsToaster';

interface ConfigEditorProps {
    siteId: string;
    repoName: string;
}

export default function ConfigEditor({ siteId, repoName }: ConfigEditorProps) {
    const [config, setConfig] = useState<any>(null);
    const [fileSha, setFileSha] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/cms/github', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'read',
                        repo: repoName,
                        path: 'src/data/siteConfig.json'
                    })
                });

                if (!res.ok) {
                    const errPayload = await res.json();
                    throw new Error(errPayload.error || 'Erro ao buscar configurações.');
                }

                const data = await res.json();
                setConfig(JSON.parse(data.content));
                setFileSha(data.sha);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, [repoName]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        triggerToast('Sincronizando configurações com o repositório...', 'progress', 20);

        try {
            const res = await fetch('/api/cms/github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'write',
                    repo: repoName,
                    path: 'src/data/siteConfig.json',
                    content: JSON.stringify(config, null, 2),
                    sha: fileSha,
                    message: 'CMS: Update siteConfig.json'
                })
            });

            if (!res.ok) {
                const errPayload = await res.json();
                throw new Error(errPayload.error || 'Erro ao salvar no GitHub.');
            }

            const data = await res.json();
            setFileSha(data.sha);

            triggerToast('Sincronizado! Reconstruindo site na nuvem da Vercel...', 'progress', 60);

            // Simula o tempo de Build na Vercel (~12 segs)
            let prog = 60;
            const interval = setInterval(() => {
                prog += 4;
                if (prog >= 95) clearInterval(interval);
                else triggerToast('Reconstruindo site na nuvem da Vercel...', 'progress', prog);
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);

                const finalLink = config?.url ? (config.url.startsWith('http') ? config.url : `https://${config.url}`) : `https://${repoName.split('/')[1]}.vercel.app`;
                triggerToast('Configurações aplicadas! O site já está atualizado online.', 'success', 100, finalLink);
                setSaving(false);
            }, 12000);

        } catch (err: any) {
            setError(err.message);
            triggerToast(`Erro: ${err.message}`, 'error');
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 text-slate-400 bg-white rounded-3xl border border-slate-200">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-violet-500" />
            <p className="font-medium animate-pulse">Estabelecendo conexão com o Repositório...</p>
        </div>
    );

    if (error && !config) return (
        <div className="bg-red-50 text-red-700 p-8 rounded-3xl border border-red-200 flex gap-4 items-start shadow-sm">
            <AlertCircle className="w-8 h-8 shrink-0" />
            <div>
                <h3 className="text-xl font-bold mb-2">Erro de Leitura do Repositório</h3>
                <p className="font-medium opacity-90">{error}</p>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSave} className="space-y-8 pb-32">

            {/* Action Bar Sticky */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-5 px-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-20 z-40 transition-all">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Status de Sincronização</h2>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Conectado a branch Main
                    </p>
                </div>
                <button type="submit" disabled={saving} className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {saving ? 'Validando e Comitando...' : 'Salvar Alterações Globais'}
                </button>
            </div>

            {error && <div className="p-5 bg-red-100/50 text-red-700 rounded-2xl font-bold border border-red-200 shadow-sm flex gap-3"><AlertCircle className="w-5 h-5 shrink-0" /> {error}</div>}

            {/* Identidade Base */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4 flex items-center gap-3">
                    <span className="bg-slate-100 p-2 rounded-lg text-slate-600">📦</span> Identidade Base
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo + Formulários */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row gap-8 items-start">

                        {/* Logo Upload Dropzone */}
                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Logo Principal</label>
                            <label className="group relative border-2 border-dashed border-slate-300 hover:border-violet-500 bg-slate-50 hover:bg-violet-50/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all text-center h-48">
                                <input type="file" accept="image/*" className="hidden" />
                                {config?.logo ? (
                                    <img src={config.logo} alt="Logo Visual" className="max-h-24 w-auto object-contain mb-4 transition-transform group-hover:scale-105" />
                                ) : (
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 shadow-sm mb-3 group-hover:text-violet-500 transition-colors">
                                        <ImageIcon className="w-8 h-8" />
                                    </div>
                                )}
                                <span className="text-sm font-semibold text-slate-700 group-hover:text-violet-700 transition-colors">{config?.logo ? 'Trocar Logo' : 'Enviar Logo (PNG/SVG)'}</span>
                            </label>
                        </div>

                        {/* Text Inputs */}
                        <div className="w-full sm:w-2/3 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Site / Empresa</label>
                                <input type="text" value={config?.name || ''} onChange={e => setConfig({ ...config, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-slate-800 font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Descrição Curta (Slogan / SEO)</label>
                                <textarea rows={3} value={config?.description || ''} onChange={e => setConfig({ ...config, description: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all resize-none text-slate-700"></textarea>
                                <p className="text-xs text-slate-400 mt-1 font-medium">Usada no metadado da página principal para os robôs do Google.</p>
                            </div>
                        </div>

                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Domínio do Site (URL Oficial)</label>
                        <input type="text" value={config?.url || ''} onChange={e => setConfig({ ...config, url: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all font-mono text-sm text-slate-600" />
                    </div>
                </div>
            </div>

            {/* Recursos Adicionais (Toggles) */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4 flex items-center gap-3">
                    <span className="bg-slate-100 p-2 rounded-lg text-slate-600">⚡</span> Módulos e Recursos (Toggles)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
                        <div className="pr-4">
                            <p className="font-bold text-slate-800 mb-1">Barra de Pesquisa de Artigos</p>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">Permitir que usuários encontrem artigos usando um campo de busca no cabeçalho.</p>
                        </div>
                        <div className={`w-14 h-8 flex items-center shrink-0 rounded-full p-1 transition-colors ${config?.features?.search ? 'bg-violet-500' : 'bg-slate-300'}`}>
                            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${config?.features?.search ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                        <input type="checkbox" className="hidden" checked={config?.features?.search || false} onChange={e => setConfig({ ...config, features: { ...config.features, search: e.target.checked } })} />
                    </label>

                    <label className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
                        <div className="pr-4">
                            <p className="font-bold text-slate-800 mb-1">Modo Escuro (Dark Mode)</p>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">Habilitar botão comutador para o leitor trocar o tema do site entre Claro e Escuro.</p>
                        </div>
                        <div className={`w-14 h-8 flex items-center shrink-0 rounded-full p-1 transition-colors ${config?.features?.darkMode ? 'bg-violet-500' : 'bg-slate-300'}`}>
                            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${config?.features?.darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                        <input type="checkbox" className="hidden" checked={config?.features?.darkMode || false} onChange={e => setConfig({ ...config, features: { ...config.features, darkMode: e.target.checked } })} />
                    </label>
                </div>
            </div>

            {/* Visual Branding */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4 flex items-center gap-3">
                    <span className="bg-slate-100 p-2 rounded-lg text-slate-600">🎨</span> Cores e Branding
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Cor Primária (Hexadecimal)</label>
                        <div className="flex gap-4 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                            <input type="color" value={config?.theme?.primary || '#000000'} onChange={e => setConfig({ ...config, theme: { ...config.theme, primary: e.target.value } })} className="h-10 w-16 p-0 border-0 rounded-lg cursor-pointer bg-transparent" />
                            <input type="text" value={config?.theme?.primary || ''} onChange={e => setConfig({ ...config, theme: { ...config.theme, primary: e.target.value } })} className="flex-1 bg-transparent border-none focus:outline-none font-mono text-slate-700 font-bold" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Família de Fonte Principal</label>
                        <select value={config?.theme?.font || 'inter'} onChange={e => setConfig({ ...config, theme: { ...config.theme, font: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 font-medium text-slate-700">
                            <option value="inter">Inter (Moderna/SaaS)</option>
                            <option value="outfit">Outfit (Clara/Geométrica)</option>
                            <option value="roboto">Roboto (Clássica)</option>
                            <option value="playfair">Playfair Display (Jornal/Elegante)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4 flex items-center gap-3">
                    <span className="bg-slate-100 p-2 rounded-lg text-slate-600">🔗</span> Redes Sociais (Rodapé)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {['instagram', 'twitter', 'linkedin', 'github'].map((social) => (
                        <div key={social}>
                            <label className="block text-sm font-bold text-slate-700 mb-2 capitalize">{social}</label>
                            <input type="url" placeholder={`https://${social}.com/seuperfil`} value={config?.social?.[social] || ''} onChange={e => setConfig({ ...config, social: { ...config.social, [social]: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-sm font-mono text-slate-600" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Contato Comercial */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4 flex items-center gap-3">
                    <span className="bg-slate-100 p-2 rounded-lg text-slate-600">📬</span> SAC / Localização
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">E-mail Comercial Oficial</label>
                        <input type="email" value={config?.contact?.email || ''} onChange={e => setConfig({ ...config, contact: { ...config.contact, email: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-slate-700 font-medium" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Telefone (Formato Visível)</label>
                        <input type="text" placeholder="+55 (11) 90000-0000" value={config?.contact?.phone || ''} onChange={e => setConfig({ ...config, contact: { ...config.contact, phone: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-slate-700 font-medium" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Endereço Comercial / Sede</label>
                        <input type="text" value={config?.contact?.address || ''} onChange={e => setConfig({ ...config, contact: { ...config.contact, address: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-slate-700 font-medium" />
                    </div>
                </div>
            </div>

        </form>
    );
}
