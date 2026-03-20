import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Newspaper, Tag, Lightbulb } from 'lucide-react';

interface Props {
    data: WizardData['structure'];
    onChange: (data: Partial<WizardData['structure']>) => void;
}

export default function Step3InfoBlog({ data, onChange }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-violet-600" />
                    Informações do Conteúdo
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Defina a identidade do seu blog para a IA gerar os primeiros artigos e categorias.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nome do Blog</label>
                    <input
                        type="text"
                        placeholder="Ex: TechInsights Brasil"
                        value={data.companyName}
                        onChange={(e) => onChange({ companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Assunto / Nicho Principal
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: Tecnologia, Gadgets e Futuro"
                        value={data.mainKeyword}
                        onChange={(e) => onChange({ mainKeyword: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> Categorias Principais</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">1 por linha</span>
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Ex: Reviews\nNotícias\nTutoriais"
                        value={data.services}
                        onChange={(e) => onChange({ services: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
