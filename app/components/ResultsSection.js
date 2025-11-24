"use client";
import ReactMarkdown from "react-markdown";
import Mermaid from "./Mermaid";
import { Download, Shield, FileText, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function ResultsSection({ result }) {
    if (!result) return null;

    const { dfd, analysis } = result;

    const downloadDFD = async () => {
        try {
            const encoded = btoa(dfd);
            const imageUrl = `https://mermaid.ink/img/${encoded}`;

            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Mermaid.ink failed to generate image');
            }

            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'threat-model-dfd.png';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download DFD. The diagram may be too complex. Try regenerating with a simpler description or right-click the diagram to save it manually.');
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
            <div className="flex items-center justify-between flex-wrap gap-4" style={{
                borderBottom: '2px solid rgba(0, 243, 255, 0.3)',
                paddingBottom: '1rem',
                marginBottom: '2rem'
            }}>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded" style={{
                        background: 'rgba(0, 243, 255, 0.1)',
                        border: '1px solid rgba(0, 243, 255, 0.3)'
                    }}>
                        <Shield className="w-6 h-6" style={{ color: '#00f3ff' }} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold m-0" style={{
                            fontFamily: 'Orbitron, sans-serif',
                            color: '#00f3ff',
                            textShadow: '0 0 20px rgba(0, 243, 255, 0.4)'
                        }}>
                            THREAT ANALYSIS REPORT
                        </h2>
                        <p className="text-sm m-0 mt-1" style={{ color: '#8b95a5' }}>
                            <CheckCircle className="w-3 h-3 inline mr-1" style={{ color: '#00ff41' }} />
                            Analysis Complete
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {dfd && (
                        <button onClick={downloadDFD} className="btn btn-secondary text-sm px-4 py-2">
                            <ImageIcon className="w-4 h-4 mr-2" /> DOWNLOAD DFD
                        </button>
                    )}
                </div>
            </div>

            {dfd && (
                <div className="card relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5" style={{ color: '#7b2cbf' }} />
                        <h3 className="text-xl m-0" style={{
                            fontFamily: 'Orbitron, sans-serif',
                            color: '#7b2cbf',
                            textShadow: '0 0 10px rgba(123, 44, 191, 0.3)'
                        }}>
                            DATA FLOW DIAGRAM
                        </h3>
                    </div>
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 243, 255, 0.2)',
                        borderRadius: '0.25rem',
                        padding: '1rem'
                    }}>
                        <Mermaid chart={dfd} />
                    </div>

                    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                        <div className="w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #7b2cbf)' }}></div>
                        <div className="w-0.5 h-full absolute top-0 right-0" style={{ background: 'linear-gradient(180deg, transparent, #7b2cbf)' }}></div>
                    </div>
                </div>
            )}

            <div className="card prose prose-invert max-w-none relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5" style={{ color: '#ff006e' }} />
                    <h3 className="text-xl m-0" style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: '#ff006e',
                        textShadow: '0 0 10px rgba(255, 0, 110, 0.3)'
                    }}>
                        SECURITY ANALYSIS
                    </h3>
                </div>
                <div style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(0, 243, 255, 0.15)',
                    borderRadius: '0.25rem',
                    padding: '1.5rem',
                    fontFamily: 'Source Code Pro, monospace',
                    fontSize: '0.875rem',
                    lineHeight: '1.8'
                }}>
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>

                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="w-full h-0.5 absolute bottom-0" style={{ background: 'linear-gradient(90deg, #ff006e, transparent)' }}></div>
                    <div className="w-0.5 h-full" style={{ background: 'linear-gradient(180deg, #ff006e, transparent)' }}></div>
                </div>
            </div>
        </div>
    );
}
