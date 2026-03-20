import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Building2, MapPin, Tag, Type, Phone, Webhook, Newspaper } from 'lucide-react';

interface Props {
    data: WizardData['structure'];
    onChange: (data: Partial<WizardData['structure']>) => void;
}

export default function Step1Structure({ data, onChange }: Props) {
    const isBlog = data.siteType === 'blog';

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-violet-600" />
                    Estrutura Inicial do Projeto
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    {isBlog
                        ? "Defina as informações base do seu Blog/Portal de Conteúdo. A IA usará estes dados para gerar a estrutura de pastas e as categorias iniciais."
                        : "Defina as informações base do negócio. A IA usará estes dados para gerar a estrutura de pastas e as páginas de serviço local."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Tipo de Site */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Qual o tipo de site/projeto?</label>
                    <div className="flex gap-4">
                        <label className={`flex-1 flex cursor-pointer items-center justify-center px-4 py-3 border-2 rounded-xl transition-all ${!isBlog ? 'border-violet-600 bg-violet-50 text-violet-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}>
                            <input type="radio" className="sr-only" checked={!isBlog} onChange={() => onChange({ siteType: 'local' })} />
                            <Webhook className="w-4 h-4 mr-2" />
                            Site Local (Serviços)
                        </label>
                        <label className={`flex-1 flex cursor-pointer items-center justify-center px-4 py-3 border-2 rounded-xl transition-all ${isBlog ? 'border-violet-600 bg-violet-50 text-violet-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}>
                            <input type="radio" className="sr-only" checked={isBlog} onChange={() => onChange({ siteType: 'blog' })} />
                            <Newspaper className="w-4 h-4 mr-2" />
                            Blog / Portal de Notícias
                        </label>
                    </div>
                </div>

                {/* NOME / TITULO PRINCIPAL */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {isBlog ? "Nome do Blog / Portal" : "Nome da Empresa"} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder={isBlog ? "Ex: TechBlog Brasil" : "Ex: Encanador Express RJ"}
                        value={data.companyName}
                        onChange={(e) => onChange({ companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

                {/* SERVIÇO / NICHO PRINCIPAL */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
                        <span>{isBlog ? "Nicho / Assunto Principal" : "Serviço Principal (Keyword)"} <span className="text-red-500">*</span></span>
                        <span className="text-xs text-slate-400 font-normal">Sugerirá o Hero AI</span>
                    </label>
                    <input
                        type="text"
                        placeholder={isBlog ? "Ex: Tecnologia, Gadgets, IA" : "Ex: Serviços de Encanamento"}
                        value={data.mainKeyword}
                        onChange={(e) => onChange({ mainKeyword: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    />
                </div>

                {/* ----- RENDERIZAÇÃO CONDICIONAL SITE LOCAL ----- */}
                {!isBlog && (
                    <>
                        {/* Telefone e Whats */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-slate-400" />
                                Telefone Fixo
                            </label>
                            <input
                                type="text"
                                placeholder="(21) 3333-3333"
                                value={data.phone}
                                onChange={(e) => onChange({ phone: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-emerald-500" />
                                WhatsApp
                            </label>
                            <input
                                type="text"
                                placeholder="(21) 99999-8888"
                                value={data.whatsapp}
                                onChange={(e) => onChange({ whatsapp: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                            />
                        </div>

                        {/* Estado e Cidade */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                Estado
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: RJ"
                                value={data.state}
                                onChange={(e) => onChange({ state: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors uppercase"
                                maxLength={2}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                Cidade Principal
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Rio de Janeiro"
                                value={data.city}
                                onChange={(e) => onChange({ city: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                            />
                        </div>
                    </>
                )}

                {/* Textareas para Títulos e Mass Data (Usados por Ambos, mas com labels diferentes) */}
                <div className="md:col-span-2 mt-4 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Título do Hero (Banner Principal)</label>
                        <input
                            type="text"
                            placeholder={isBlog ? "Ex: TechBlog - Tudo Sobre Tecnologia e Inovação" : "Ex: Encanador 24 Horas no Rio de Janeiro"}
                            value={data.heroTitle}
                            onChange={(e) => onChange({ heroTitle: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Slogan / Subtítulo</label>
                        <input
                            type="text"
                            placeholder={isBlog ? "Ex: Fique por dentro de todas as novidades em Gadgets, Sistemas e Inteligência Artificial." : "Ex: Atendimento de emergência em até 40 minutos. Orçamento grátis!"}
                            value={data.slogan}
                            onChange={(e) => onChange({ slogan: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    {/* Serviços / Categorias */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> {isBlog ? "Categorias Principais do Blog" : "Serviços Oferecidos"}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">1 por linha</span>
                        </label>
                        <textarea
                            rows={6}
                            placeholder={isBlog ? "Dicas de Computador\nReview de Celulares\nInteligência Artificial\nNotícias" : "Desentupimento de Pia\nReparo de Vazamentos\nInstalação de Torneiras"}
                            value={data.services}
                            onChange={(e) => onChange({ services: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-y leading-relaxed"
                        />
                    </div>

                    {/* Bairros / Público Alvo */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {isBlog ? "Tags Frequentes / Sub-tópicos" : "Bairros Atendidos"}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">1 por linha</span>
                        </label>
                        <textarea
                            rows={6}
                            placeholder={isBlog ? "Windows\nApple\nAndroid\nProgramação\nGames" : "Copacabana\nIpanema\nLeblon\nCentro"}
                            value={data.locations}
                            onChange={(e) => onChange({ locations: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-y leading-relaxed"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
