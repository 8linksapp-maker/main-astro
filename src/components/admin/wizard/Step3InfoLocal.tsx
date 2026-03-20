import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Building2, Phone, MapPin, Tag, Clock } from 'lucide-react';

interface Props {
    data: WizardData['structure'];
    onChange: (data: Partial<WizardData['structure']>) => void;
}

export default function Step3InfoLocal({ data, onChange }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-violet-600" />
                    Informações do Negócio
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Preencha os detalhes reais da empresa. A IA usará isso para gerar os textos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nome da Empresa</label>
                    <input
                        type="text"
                        placeholder="Ex: Encanador Express RJ"
                        value={data.companyName}
                        onChange={(e) => onChange({ companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nicho Principal</label>
                    <input
                        type="text"
                        placeholder="Ex: Instalações Hidráulicas"
                        value={data.mainKeyword}
                        onChange={(e) => onChange({ mainKeyword: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp</label>
                    <input
                        type="text"
                        placeholder="(21) 99999-8888"
                        value={data.whatsapp}
                        onChange={(e) => onChange({ whatsapp: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> Serviços Oferecidos</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">1 por linha</span>
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Ex: Reparo de Vazamentos\nDesentupimento de Pia\nInstalação de Vaso"
                        value={data.services}
                        onChange={(e) => onChange({ services: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors mb-6"
                    />

                    {/* Blog Opcional */}
                    <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100 flex items-center justify-between group cursor-pointer" onClick={() => onChange({ enableBlog: !data.enableBlog })}>
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${data.enableBlog ? 'bg-violet-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-check">
                                    <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" /><path d="m16 12 2 2 4-4" /><path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">Deseja incluir um Blog?</h4>
                                <p className="text-[11px] text-slate-500">Adicione uma área de artigos para atrair mais clientes via SEO.</p>
                            </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${data.enableBlog ? 'bg-violet-600 border-violet-600' : 'border-slate-300'}`}>
                            {data.enableBlog && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
