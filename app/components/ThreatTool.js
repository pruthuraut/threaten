"use client";
import { useState } from "react";
import { ArrowLeft, Terminal } from "lucide-react";
import InputSection from "./InputSection";
import ResultsSection from "./ResultsSection";

export default function ThreatTool({ onBack }) {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async (data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("description", data.description);
            formData.append("model", data.model);
            if (data.image) {
                formData.append("image", data.image);
            }

            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Analysis failed");
            }

            const resultData = await response.json();
            setResult(resultData);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to generate threat model. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md-p-8 relative">
            {/* Background grid effect */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto relative z-10">
                <button
                    onClick={onBack}
                    className="flex items-center mb-8 transition-all duration-300 group"
                    style={{
                        color: '#8b95a5',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.875rem',
                        border: '1px solid rgba(0, 243, 255, 0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        background: 'rgba(0, 243, 255, 0.05)',
                        cursor: 'pointer'
                    }}
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    BACK TO HOME
                </button>

                <div className="flex flex-col items-center">
                    <div className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="p-3 rounded" style={{
                                background: 'rgba(0, 243, 255, 0.1)',
                                border: '1px solid rgba(0, 243, 255, 0.3)',
                                boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)'
                            }}>
                                <Terminal className="w-8 h-8" style={{ color: '#00f3ff' }} />
                            </div>
                            <h1 className="text-4xl mb-0" style={{
                                fontFamily: 'Orbitron, sans-serif',
                                background: 'linear-gradient(135deg, #00f3ff, #7b2cbf)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 0 20px rgba(0, 243, 255, 0.3))'
                            }}>
                                THREAT MODEL GENERATOR
                            </h1>
                        </div>
                        <p style={{
                            color: '#8b95a5',
                            fontFamily: 'Source Code Pro, monospace'
                        }}>
                            AI-POWERED SECURITY ANALYSIS FOR YOUR ARCHITECTURE
                        </p>
                    </div>

                    {!result ? (
                        <InputSection onSubmit={handleAnalyze} isLoading={isLoading} />
                    ) : (
                        <div className="w-full">
                            <ResultsSection result={result} />
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setResult(null)}
                                    className="btn btn-secondary"
                                    style={{
                                        fontFamily: 'Orbitron, sans-serif'
                                    }}
                                >
                                    <Terminal className="w-4 h-4 mr-2" />
                                    START NEW ANALYSIS
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
