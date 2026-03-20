import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { CheckCircle2, Building2, Palette, Globe, Tag, Rocket } from 'lucide-react';

interface Props {
    wizardData: WizardData;
}

export default function Step6Review({ wizardData }: Props) {
    const { structure, design, seo, templateId } = wizardData;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Revisão Final
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Confira todos os dados antes de iniciarmos a geração do seu novo site Astro.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card de Estrutura */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-5 h-5 text-violet-600" />
                        <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Negócio e Informações</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p><span className="text-slate-500">Nome:</span> <span className="font-semibold">{structure.companyName}</span></p>
                        <p><span className="text-slate-500">Tipo:</span> <span className="font-semibold">{structure.siteType === 'blog' ? 'Blog' : 'Site Local'}</span></p>
                        <p><span className="text-slate-500">Template:</span> <span className="font-semibold uppercase">{templateId}</span></p>
                        <p><span className="text-slate-500">Fone:</span> <span className="font-semibold">{structure.phone}</span></p>
                    </div>
                </div>

                {/* Card de Design */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Palette className="w-5 h-5 text-violet-600" />
                        <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Identidade Visual</h4>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full border border-slate-300" style={{ backgroundColor: design.primaryColor }}></div>
                            <span className="text-xs font-mono">{design.primaryColor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full border border-slate-300" style={{ backgroundColor: design.secondaryColor }}></div>
                            <span className="text-xs font-mono">{design.secondaryColor}</span>
                        </div>
                    </div>
                    <p className="text-sm"><span className="text-slate-500">Fonte:</span> <span className="font-semibold uppercase">{design.fontPairing}</span></p>
                </div>

                {/* Card de SEO */}
                <div className="md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Globe className="w-5 h-5 text-violet-600" />
                        <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">SEO e Social</h4>
                    </div>
                    <p className="text-sm mb-2"><span className="text-slate-500 uppercase text-[10px] font-bold block mb-1">Meta Description:</span> {seo.metaDescription || 'Será gerado via IA'}</p>
                    <div className="flex gap-6 mt-4">
                        {seo.instagram && <p className="text-xs font-semibold text-pink-600 flex items-center gap-1">Instagram: {seo.instagram}</p>}
                        {seo.facebook && <p className="text-xs font-semibold text-blue-600 flex items-center gap-1">Facebook: Presente</p>}
                    </div>
                </div>
            </div>

            <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                    <h5 className="font-bold text-violet-900 mb-1 text-sm">Pronto para Lançar!</h5>
                    <p className="text-xs text-violet-700 leading-relaxed">
                        Ao clicar no botão abaixo, nossa IA irá clonar o repositório, aplicar seu design premium e configurar todo o SEO técnico. O processo leva cerca de 30-60 segundos.
                    </p>
                </div>
            </div>
        </div>
    );
}
