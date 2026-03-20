import React from 'react';
import type { WizardData } from '../SiteBuilderWizard';
import { Paintbrush, Type, Image as ImageIcon, Palette } from 'lucide-react';

interface Props {
    data: WizardData['design'];
    onChange: (data: Partial<WizardData['design']>) => void;
}

export default function Step2Design({ data, onChange }: Props) {

    const fontPairings = [
        { value: 'outfit', label: 'Outfit (Moderno)', preview: 'Limpo, geométrico e premium' },
        { value: 'poppins-inter', label: 'Poppins + Inter', preview: 'Equilíbrio perfeito entre legibilidade e estilo' },
        { value: 'playfair-lato', label: 'Playfair + Lato', preview: 'Toque clássico e elegante (Ideal para Blogs)' },
        { value: 'montserrat-source', label: 'Montserrat + Source Sans', preview: 'Forte, profissional e corporativo' },
        { value: 'syne-inter', label: 'Syne + Inter', preview: 'Vanguardista, artístico e moderno' },
    ];

    const presetColors = [
        { primary: '#6366f1', secondary: '#0f172a', name: 'Indigo Night (CNX Style)' },
        { primary: '#2563eb', secondary: '#1e293b', name: 'Corporate Blue' },
        { primary: '#059669', secondary: '#064e3b', name: 'Emerald Forest' },
        { primary: '#e11d48', secondary: '#4c0519', name: 'Ruby Wine' },
        { primary: '#7c3aed', secondary: '#2e1065', name: 'Deep Purple' },
        { primary: '#d97706', secondary: '#451a03', name: 'Sunset Amber' },
        { primary: '#0f172a', secondary: '#334155', name: 'Modern Stealth' },
        { primary: '#be123c', secondary: '#fb7185', name: 'Vibrant Rose' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-violet-600" />
                    Estética e Identidade Visual
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Defina o "clima" visual do seu site. A IA aplicará o Design System em todos os componentes.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Coluna 1: Presets de Cores */}
                <div className="lg:col-span-2 space-y-4">
                    <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider flex items-center gap-2 opacity-60">
                        Presets Profissionais
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {presetColors.map((preset) => (
                            <button
                                key={preset.name}
                                type="button"
                                onClick={() => onChange({ primaryColor: preset.primary, secondaryColor: preset.secondary })}
                                className={`flex flex-col gap-2 p-3 rounded-2xl border-2 transition-all group ${data.primaryColor === preset.primary ? 'border-violet-600 bg-violet-50 ring-4 ring-violet-500/10' : 'border-slate-100 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex h-10 w-full rounded-xl overflow-hidden shadow-sm">
                                    <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                                    <div className="flex-1 opacity-80" style={{ backgroundColor: preset.secondary }} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase text-center group-hover:text-violet-600 transition-colors leading-tight">{preset.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Edição Manual Destacada */}
                    <div className="mt-8 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="flex items-center gap-2 mb-4">
                            <Paintbrush className="w-4 h-4 text-violet-600" />
                            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Edição Manual de Cores</h4>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Primária</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" value={data.primaryColor} onChange={(e) => onChange({ primaryColor: e.target.value })} className="h-10 w-12 rounded-lg cursor-pointer border-none p-0" />
                                    <input type="text" value={data.primaryColor} onChange={(e) => onChange({ primaryColor: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl font-mono text-sm uppercase" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Secundária</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" value={data.secondaryColor} onChange={(e) => onChange({ secondaryColor: e.target.value })} className="h-10 w-12 rounded-lg cursor-pointer border-none p-0" />
                                    <input type="text" value={data.secondaryColor} onChange={(e) => onChange({ secondaryColor: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl font-mono text-sm uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Fontes */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider flex items-center gap-2 opacity-60">
                        <Type className="w-4 h-4" /> Tipografia
                    </label>
                    <div className="space-y-3">
                        {fontPairings.map((font) => (
                            <label
                                key={font.value}
                                className={`flex items-start p-4 border-2 rounded-2xl cursor-pointer transition-all ${data.fontPairing === font.value
                                    ? 'border-violet-600 bg-violet-50 shadow-sm'
                                    : 'border-slate-100 bg-white hover:border-slate-200'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="fontPairing"
                                    className="mt-1 w-4 h-4 text-violet-600 border-slate-300 focus:ring-violet-500"
                                    checked={data.fontPairing === font.value}
                                    onChange={() => onChange({ fontPairing: font.value })}
                                />
                                <div className="ml-4 flex flex-col">
                                    <span className="text-sm font-bold text-slate-800">{font.label}</span>
                                    <span className="text-[11px] text-slate-500 mt-1 leading-snug">{font.preview}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className="mt-6 bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                            <ImageIcon className="w-4 h-4 text-amber-600" />
                        </div>
                        <p className="text-[11px] text-amber-700 leading-relaxed italic">
                            <b>Dica:</b> As imagens do site serão preenchidas com placeholders profissionais. Você poderá trocar cada imagem, fazer upload e editar os banners diretamente pelo <b>CMS</b> após o lançamento.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
