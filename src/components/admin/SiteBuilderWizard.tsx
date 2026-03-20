import React, { useState } from 'react';
import { LayoutTemplate, Droplet, Search as SearchIcon, Rocket, CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Type } from 'lucide-react';
import Step1Type from './wizard/Step1Type';
import Step2TemplateSelection from './wizard/Step2TemplateSelection';
import Step3InfoLocal from './wizard/Step3InfoLocal';
import Step3InfoBlog from './wizard/Step3InfoBlog';
import Step4Design from './wizard/Step2Design';
import Step5SEO from './wizard/Step5SEO';
import Step6Review from './wizard/Step6Review';

export interface WizardData {
    templateId: string;
    structure: {
        siteType: string;
        companyName: string;
        phone: string;
        whatsapp: string;
        state: string;
        city: string;
        heroTitle: string;
        slogan: string;
        services: string;
        locations: string;
        mainKeyword: string;
        enableBlog: boolean;
    };
    design: {
        primaryColor: string;
        secondaryColor: string;
        fontPairing: string;
        heroImageKeyword: string;
    };
    seo: {
        metaDescription: string;
        keywords: string;
        instagram: string;
        facebook: string;
        address: string;
        businessHours: string;
    };
    meta?: {
        github_repo: string;
        projectSlug: string;
        login: string;
    };
}

const initialWizardData: WizardData = {
    templateId: 'local',
    structure: {
        siteType: 'local',
        companyName: '',
        phone: '',
        whatsapp: '',
        state: '',
        city: '',
        heroTitle: '',
        slogan: '',
        services: '',
        locations: '',
        mainKeyword: '',
        enableBlog: false,
    },
    design: {
        primaryColor: '#2563eb',
        secondaryColor: '#0f172a',
        fontPairing: 'outfit',
        heroImageKeyword: '',
    },
    seo: {
        metaDescription: '',
        keywords: '',
        instagram: '',
        facebook: '',
        address: '',
        businessHours: '',
    },
    meta: {
        github_repo: '',
        projectSlug: '',
        login: ''
    }
};

const steps = [
    { id: 1, name: 'Tipo', icon: LayoutTemplate },
    { id: 2, name: 'Template', icon: Rocket },
    { id: 3, name: 'Informações', icon: Type },
    { id: 4, name: 'Design', icon: Droplet },
    { id: 5, name: 'SEO', icon: SearchIcon },
    { id: 6, name: 'Revisão', icon: CheckCircle2 },
];

export default function SiteBuilderWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState<WizardData>(initialWizardData);
    const [isGenerating, setIsGenerating] = useState(false);

    const updateData = (stepKey: keyof WizardData, stepData: Partial<any>) => {
        setData((prev: WizardData) => ({
            ...prev,
            [stepKey]: {
                ...(prev[stepKey] as object),
                ...stepData
            }
        }));
    };

    const nextStep = () => setCurrentStep((prev: number) => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep((prev: number) => Math.max(prev - 1, 1));

    const handleGenerateStepData = async () => {
        setIsGenerating(true);
        try {
            // No futuro, aqui chamaremos as APIs step1, step2, step3
            // Por enquanto, apenas simulamos o avanço no wizard
            if (currentStep === 6) {
                // Rota final de geração redirecionada pela Refatoração de Arquitetura.
                const endpoint = data.structure.siteType === 'blog'
                    ? '/api/site-builder/blog'
                    : '/api/site-builder/local';

                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...data.structure,
                        templateId: data.templateId,
                        design: data.design,
                        seo: data.seo
                    })
                });

                if (!res.ok) {
                    const errorJson = await res.json();
                    throw new Error(errorJson.error || 'Erro ao gerar site.');
                }

                window.location.href = '/dashboard/cms';
                return;
            }

            nextStep();
        } catch (error: any) {
            alert('Falha: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">

            {/* Header de Abas */}
            <nav className="flex flex-row gap-6 overflow-x-auto border-b border-slate-200 mb-2 pb-px">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`flex items-center gap-2 text-left pb-3 font-semibold transition-colors border-b-2 cursor-default ${currentStep === step.id
                            ? 'text-violet-600 border-violet-600'
                            : currentStep > step.id
                                ? 'text-slate-800 border-transparent'
                                : 'text-slate-400 border-transparent'
                            }`}
                    >
                        <step.icon className="w-5 h-5" />
                        <span>{step.name}</span>
                        {currentStep > step.id && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-1" />
                        )}
                    </div>
                ))}
            </nav>

            {/* Main Content Area */}
            <div className="bg-white border text-left border-slate-200 shadow-sm rounded-2xl p-6 sm:p-8">

                {/* Form Rendering */}
                {currentStep === 1 && (
                    <Step1Type siteType={data.structure.siteType} onChange={(val: string) => updateData('structure', { siteType: val })} />
                )}
                {currentStep === 2 && (
                    <Step2TemplateSelection data={data} onChange={(val: string) => setData((prev: WizardData) => ({ ...prev, templateId: val }))} />
                )}
                {currentStep === 3 && (
                    data.structure.siteType === 'local' ? (
                        <Step3InfoLocal data={data.structure} onChange={(p: any) => updateData('structure', p)} />
                    ) : (
                        <Step3InfoBlog data={data.structure} onChange={(p: any) => updateData('structure', p)} />
                    )
                )}
                {currentStep === 4 && (
                    <Step4Design data={data.design} onChange={(p: any) => updateData('design', p)} />
                )}
                {currentStep === 5 && (
                    <Step5SEO data={data.seo} onChange={(p: any) => updateData('seo', p)} />
                )}
                {currentStep === 6 && (
                    <Step6Review wizardData={data} />
                )}

                {/* Ações / Botões */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100 transition-opacity">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1 || isGenerating}
                        className={`px-5 py-2.5 font-semibold rounded-xl transition-all ${currentStep === 1
                            ? 'opacity-0 invisible'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        &larr; Voltar
                    </button>

                    <button
                        type="button"
                        onClick={handleGenerateStepData}
                        disabled={isGenerating}
                        className={`px-5 py-2.5 font-semibold rounded-xl transition-all flex items-center disabled:opacity-50 ${currentStep === 6 ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20' : 'bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20'
                            }`}
                    >
                        {isGenerating ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {currentStep === 6 ? 'Lançando Site...' : 'Processando...'}
                            </span>
                        ) : (
                            currentStep === 6 ? (
                                <><Rocket className="w-5 h-5 mr-2" /> Lançar Site Agora</>
                            ) : (
                                <>Avançar (Processar) &rarr;</>
                            )
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
