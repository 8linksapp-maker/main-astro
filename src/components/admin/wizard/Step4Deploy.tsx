import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Rocket, CheckCircle2, GitBranch, Globe, Server, AlertCircle } from 'lucide-react';

interface Props {
    wizardData: WizardData; // Lê tudo de todas as etapas passadas
}

export default function Step4Deploy({ wizardData }: Props) {
    const isReady = wizardData.structure.companyName && wizardData.structure.mainKeyword;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-indigo-500" />
                    Deploy Automático & Publicação
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Revise as configurações antes de criarmos o Banco de Dados (Repositório) e enviarmos o site para a Vercel.
                </p>
            </div>

            {!isReady && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 leading-relaxed">
                        <strong>Faltam dados críticos:</strong> Retorne à página de Estrutura e garanta que ao menos o <strong>Nome da Empresa</strong> e o <strong>Serviço Principal</strong> estejam preenchidos.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card: Infraestrutura Pipeline */}
                <div className="md:col-span-2 bg-gradient-to-br from-indigo-50/50 to-emerald-50/50 border border-indigo-100/60 rounded-2xl p-6 relative overflow-hidden shadow-sm">

                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <h4 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                        <Server className="w-5 h-5 text-indigo-500" />
                        Trabalho Subterrâneo
                    </h4>

                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                                <span className="font-bold text-slate-600">1</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">Clonagem do ASTRO Matrix</p>
                                <p className="text-sm text-slate-500 mt-1">O sistema clonará de forma invisível toda a configuração do Cnx-Astro root.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                                <span className="font-bold text-slate-600">2</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">Criação do Banco Vivo</p>
                                <p className="text-sm text-slate-500 mt-1">Seu site será encapsulado num repositório que agirá como CMS.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                                <span className="font-bold text-slate-600">3</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">Deploy Global</p>
                                <p className="text-sm text-slate-500 mt-1">Comandos automáticos criarão um deploy limpo na Vercel (Ready).</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card: Resumo dos Dados */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            Resumo Injetado
                        </h4>

                        <dl className="space-y-3 pt-2">
                            <div className="flex justify-between border-b border-slate-200/50 pb-2">
                                <dt className="text-sm font-semibold text-slate-500">Nome da Empresa:</dt>
                                <dd className="text-sm font-bold text-slate-800">{wizardData.structure.companyName || '---'}</dd>
                            </div>
                            <div className="flex justify-between border-b border-slate-200/50 pb-2">
                                <dt className="text-sm font-semibold text-slate-500">Filiais/Cidades:</dt>
                                <dd className="text-sm font-bold text-slate-800">{(wizardData.structure.locations || '0').split('\n').filter(Boolean).length}</dd>
                            </div>
                            <div className="flex justify-between border-b border-slate-200/50 pb-2">
                                <dt className="text-sm font-semibold text-slate-500">Serviços Base:</dt>
                                <dd className="text-sm font-bold text-slate-800">{(wizardData.structure.services || '0').split('\n').filter(Boolean).length}</dd>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <dt className="text-sm font-semibold text-slate-500">Esquema Tailwind:</dt>
                                <dd className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1.5 rounded-lg">
                                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: wizardData.design.primaryColor }} />
                                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: wizardData.design.secondaryColor }} />
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Card: Configurações Técnicas */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                            <GitBranch className="w-5 h-5 text-slate-500" />
                            Produção (Opcional)
                        </h4>

                        <div className="space-y-4 pt-2">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-slate-400" /> Domínio Customizado
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: www.minha-empresa.com.br"
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                                />
                                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                                    Se em branco, a plataforma gerará um subdomínio padrão em cima da Vercel (<code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 break-all">{wizardData.structure.companyName ? wizardData.structure.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'subdominio-gerado'}.vercel.app</code>).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
