import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Layout, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
    data: WizardData;
    onChange: (templateId: string) => void;
}

export default function Step2TemplateSelection({ data, onChange }: Props) {
    const isBlog = data.structure.siteType === 'blog';

    const templates = isBlog ? [
        { id: 'minimalist', name: 'Blog Minimalista', description: 'Focado em leitura e AdSense', image: '/templates_previews/minimalist.png' }
    ] : [
        { id: 'local', name: 'Site Local Premium', description: 'Alta conversão para serviços', image: '/templates_previews/local.png' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Layout className="w-5 h-5 text-violet-600" />
                    Escolha seu Template
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Selecione o design base para o seu {isBlog ? 'Blog' : 'Site Local'}.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {templates.map((tpl) => (
                    <div
                        key={tpl.id}
                        onClick={() => onChange(tpl.id)}
                        className={`group cursor-pointer relative overflow-hidden rounded-2xl border-2 transition-all hover:shadow-xl ${data.templateId === tpl.id ? 'border-violet-600 ring-4 ring-violet-50' : 'border-slate-200 hover:border-slate-300'
                            }`}
                    >
                        <div className="aspect-video w-full overflow-hidden bg-slate-100">
                            <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="p-5 bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-slate-900 group-hover:text-violet-600 transition-colors">{tpl.name}</h4>
                                {data.templateId === tpl.id && <CheckCircle2 className="w-5 h-5 text-violet-600" />}
                            </div>
                            <p className="text-sm text-slate-500">{tpl.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
