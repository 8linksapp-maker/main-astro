import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Search, Globe, Instagram, Facebook } from 'lucide-react';

interface Props {
    data: WizardData['seo'];
    onChange: (data: Partial<WizardData['seo']>) => void;
}

export default function Step5SEO({ data, onChange }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Search className="w-5 h-5 text-violet-600" />
                    Otimização e SEO
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Configurações gerais para ajudar seu site a ser encontrado no Google.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Descrição Geral (Google)</label>
                    <textarea
                        rows={3}
                        placeholder="Ex: Oferecemos os melhores serviços de locação de equipamentos na região de São Paulo. Atendimento rápido e preço justo."
                        value={data.metaDescription}
                        onChange={(e) => onChange({ metaDescription: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                    <p className="text-xs text-slate-400 mt-2">Recomendado entre 120 e 160 caracteres.</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Palavras-chave (separadas por vírgula)</label>
                    <input
                        type="text"
                        placeholder="Ex: locação de containers, banheiros químicos, obras SP"
                        value={data.keywords}
                        onChange={(e) => onChange({ keywords: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <Instagram className="w-4 h-4 text-pink-500" />
                            User Instagram
                        </label>
                        <input
                            type="text"
                            placeholder="@empresa"
                            value={data.instagram}
                            onChange={(e) => onChange({ instagram: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <Facebook className="w-4 h-4 text-blue-600" />
                            URL Facebook
                        </label>
                        <input
                            type="text"
                            placeholder="facebook.com/empresa"
                            value={data.facebook}
                            onChange={(e) => onChange({ facebook: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
