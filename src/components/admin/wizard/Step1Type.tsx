import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Webhook, Newspaper, CheckCircle2 } from 'lucide-react';

interface Props {
    siteType: string;
    onChange: (type: string) => void;
}

export default function Step1Type({ siteType, onChange }: Props) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Webhook className="w-5 h-5 text-violet-600" />
                    O que você deseja criar?
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Escolha o objetivo principal do seu novo projeto Astro.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    onClick={() => onChange('local')}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-4 ${siteType === 'local' ? 'border-violet-600 bg-violet-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${siteType === 'local' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Webhook className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-900">Site Local</h4>
                        <p className="text-sm text-slate-500 mt-1">Para empresas, prestadores de serviços e negócios físicos.</p>
                    </div>
                    {siteType === 'local' && <CheckCircle2 className="w-5 h-5 text-violet-600" />}
                </div>

                <div
                    onClick={() => onChange('blog')}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-4 ${siteType === 'blog' ? 'border-violet-600 bg-violet-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${siteType === 'blog' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Newspaper className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-900">Blog / Portal</h4>
                        <p className="text-sm text-slate-500 mt-1">Para marketing de conteúdo, notícias e artigos otimizados.</p>
                    </div>
                    {siteType === 'blog' && <CheckCircle2 className="w-5 h-5 text-violet-600" />}
                </div>
            </div>
        </div>
    );
}
