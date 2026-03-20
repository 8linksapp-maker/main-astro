import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Search, MapPin, Clock, DollarSign, Globe, Instagram, Image as ImageIcon } from 'lucide-react';

interface Props {
    data: WizardData['seo'];
    onChange: (data: Partial<WizardData['seo']>) => void;
    siteType?: string;
}

export default function Step3SEO({ data, onChange, siteType }: Props) {
    const isBlog = siteType === 'blog';

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Search className="w-5 h-5 text-violet-600" />
                    SEO Técnico & Metadados
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    {isBlog
                        ? "A IA usará estas informações para construir as Tags Meta e o Schema Article/WebSite (JSON-LD) para otimizar indexação no Google."
                        : "A IA usará estas informações para construir as Tags Meta e o Schema LocalBusiness nativo do Astro (JSON-LD)."
                    }
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Descrição Global */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Meta Description Global
                    </label>
                    <textarea
                        rows={3}
                        value={data.metaDescription}
                        onChange={(e) => onChange({ metaDescription: e.target.value })}
                        placeholder={isBlog ? "Ex: TechBlog Brasil é o seu portal diário para notícias de tecnologia, reviews de celular e tutoriais rápidos." : "Ex: Encanador 24h no Rio de Janeiro. Desentupimento, vazamentos e hidráulica. Orçamento grátis. Ligue agora!"}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-y leading-relaxed"
                    />
                    <p className="text-xs text-slate-400 text-right font-medium mt-2">
                        {(data.metaDescription || '').length}/160 caracteres (Recomendado)
                    </p>
                </div>

                {!isBlog && (
                    <>
                        <div className="md:col-span-2 pt-6 border-t border-slate-100">
                            <h4 className="font-bold text-lg text-slate-800 mb-6">Dados do Schema LocalBusiness</h4>
                        </div>

                        {/* Endereço Completo */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                Endereço Principal
                            </label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => onChange({ address: e.target.value })}
                                placeholder="Av. Atlântica, 500, Copacabana, RJ, 22010-000"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                            />
                        </div>

                        {/* Horário de Funcionamento */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-400" />
                                Horário de Funcionamento
                            </label>
                            <input
                                type="text"
                                value={data.businessHours}
                                onChange={(e) => onChange({ businessHours: e.target.value })}
                                placeholder="Ex: Segunda a Domingo, 24 horas"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                            />
                        </div>

                        {/* Faixa de Preço */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-slate-400" />
                                Faixa de Preço ($ a $$$$)
                            </label>
                            <select
                                value={data.priceRange}
                                onChange={(e) => onChange({ priceRange: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors appearance-none"
                            >
                                <option value="$">$ (Acessível)</option>
                                <option value="$$">$$ (Médio)</option>
                                <option value="$$$">$$$ (Alto)</option>
                                <option value="$$$$">$$$$ (Luxo)</option>
                            </select>
                        </div>
                    </>
                )}

                <div className={isBlog ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                        Logo URL (Preferencial GitHub Raw)
                    </label>
                    <input
                        type="text"
                        value={data.logoUrl}
                        onChange={(e) => onChange({ logoUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors font-mono text-sm"
                    />
                </div>

                <div className="md:col-span-2 pt-6 border-t border-slate-100">
                    <h4 className="font-bold text-lg text-slate-800 mb-6">Redes Sociais & Links (Opcionais)</h4>
                </div>

                {/* Redes e GMB */}
                {!isBlog && (
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-slate-400" />
                            Google Meu Negócio (Link)
                        </label>
                        <input
                            type="text"
                            value={data.gmb}
                            onChange={(e) => onChange({ gmb: e.target.value })}
                            placeholder="https://g.page/sua-empresa"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-slate-400" />
                        Instagram
                    </label>
                    <input
                        type="text"
                        value={data.instagram}
                        onChange={(e) => onChange({ instagram: e.target.value })}
                        placeholder="https://instagram.com/empresa"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

            </div>
        </div>
    );
}
