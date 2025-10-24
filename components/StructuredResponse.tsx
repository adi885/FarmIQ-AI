
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Icons from './Icons';

interface StructuredResponseProps {
    text: string;
}

// Helper to parse content between delimiters
const parseContent = (text: string, start: string, end?: string): string => {
    const startIndex = text.indexOf(start);
    if (startIndex === -1) return '';
    
    const contentStart = startIndex + start.length;
    
    if (end) {
        const endIndex = text.indexOf(end, contentStart);
        if (endIndex !== -1) {
            return text.substring(contentStart, endIndex).trim();
        }
    }
    return text.substring(contentStart).trim();
}

const MarkdownRenderer = ({ content }: { content: string }) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            h3: ({ node, ...props }) => (
                <h3 className="text-md font-semibold text-gray-800 mt-3 mb-1" {...props} />
            ),
            ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside space-y-1" {...props} />
            ),
            ol: ({ node, ...props }) => (
                 <ol className="list-decimal list-inside space-y-1" {...props} />
            ),
            li: ({ node, ...props }) => (
                <li className="text-gray-700" {...props} />
            ),
            p: ({ node, ...props }) => (
                <p className="mb-2 leading-relaxed text-gray-700" {...props} />
            ),
            strong: ({ node, ...props }) => (
                <strong className="font-semibold text-gray-900" {...props} />
            ),
        }}
    >
        {content}
    </ReactMarkdown>
);

const StructuredResponse: React.FC<StructuredResponseProps> = ({ text }) => {
    const title = parseContent(text, '[TITLE]', '[SUBTITLE]');
    const subtitle = parseContent(text, '[SUBTITLE]', '[SEVERITY]');
    const severity = parseInt(parseContent(text, '[SEVERITY]', '## Bimari ki Jaankari'), 10) || 0;
    
    const bimariKiJaankari = parseContent(text, '## Bimari ki Jaankari', '## Fasal ke Fayde/Nuksaan');
    
    const faydeNuksaanSection = parseContent(text, '## Fasal ke Fayde/Nuksaan', '## Fasal ki Khaas Baatein');
    const fayde = parseContent(faydeNuksaanSection, '[FAYDE]', '[NUKSAAN]');
    const nuksaan = parseContent(faydeNuksaanSection, '[NUKSAAN]');
    
    const khaasBaatein = parseContent(text, '## Fasal ki Khaas Baatein', '## Dawaai ki Salah');
    
    const dawaaiSalahSection = parseContent(text, '## Dawaai ki Salah', '## Bachav ke Upay');
    const treatments = dawaaiSalahSection.split('[DAWAAI]').filter(t => t.trim()).map(t => t.replace('[DAWAAI_END]', '').trim());
    
    const bachavKeUpay = parseContent(text, '## Bachav ke Upay');

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4 sm:p-6 space-y-4">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-500">{subtitle}</p>
            </div>

            {/* Severity Meter */}
            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Kitna Pakka Hai:</span>
                    <span className="text-sm font-bold text-green-700">{severity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${severity}%` }}></div>
                </div>
            </div>

            {/* Bimari ki Jaankari */}
            <div className="bg-lime-50 border border-lime-200 rounded-lg p-4">
                <h2 className="font-bold text-lg text-lime-900 flex items-center gap-2 mb-2"><Icons.VirusIcon /> Bimari ki Jaankari</h2>
                <MarkdownRenderer content={bimariKiJaankari} />
            </div>

            {/* Fayde / Nuksaan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h2 className="font-bold text-lg text-green-900 flex items-center gap-2 mb-2"><Icons.CheckIcon /> Fasal ke Fayde</h2>
                    <MarkdownRenderer content={fayde} />
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h2 className="font-bold text-lg text-red-900 flex items-center gap-2 mb-2"><Icons.XCircleIcon /> Fasal ke Nuksaan</h2>
                    <MarkdownRenderer content={nuksaan} />
                </div>
            </div>
            
            {/* Fasal ki Khaas Baatein */}
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-2"><Icons.StarIcon /> Fasal ki Khaas Baatein</h2>
                <MarkdownRenderer content={khaasBaatein} />
            </div>

            {/* Dawaai ki Salah */}
            <div>
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-4"><Icons.TreatmentIcon /> Dawaai ki Salah</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {treatments.map((treatment, index) => {
                         const treatmentTitle = treatment.split('\n')[0].replace('###', '').trim();
                         const treatmentContent = treatment.split('\n').slice(1).join('\n');
                         const isAyurvedic = treatmentTitle.toLowerCase().includes('neem') || treatmentTitle.toLowerCase().includes('gharelu');
                        return (
                             <div key={index} className="border rounded-lg">
                                <h3 className={`font-bold p-3 rounded-t-lg ${isAyurvedic ? 'bg-orange-100 text-orange-900' : 'bg-cyan-100 text-cyan-900'}`}>{treatmentTitle}</h3>
                                <div className="p-3">
                                    <MarkdownRenderer content={treatmentContent} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
             {/* Bachav ke Upay */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="font-bold text-lg text-blue-900 flex items-center gap-2 mb-2"><Icons.ShieldIcon /> Bachav ke Upay</h2>
                <MarkdownRenderer content={bachavKeUpay} />
            </div>
        </div>
    )
};

export default StructuredResponse;