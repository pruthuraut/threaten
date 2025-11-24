"use client";
import { useState, useRef } from "react";
import { Upload, FileText, Settings, ArrowRight, Loader2, Image as ImageIcon } from "lucide-react";

export default function InputSection({ onSubmit, isLoading }) {
    const [description, setDescription] = useState("");
    const [model, setModel] = useState("STRIDE");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!description && !image) return;
        onSubmit({ description, model, image, imagePreview });
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md-grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div className="space-y-6">
                    <div className="card">
                        <label className="label flex items-center gap-2">
                            <FileText className="w-4 h-4" /> PROJECT DESCRIPTION
                        </label>
                        <textarea
                            className="input min-h-[150px] resize-none"
                            placeholder="Describe your system architecture, technology stack, and key components..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                fontFamily: 'Source Code Pro, monospace',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>

                    <div className="card">
                        <label className="label flex items-center gap-2">
                            <Settings className="w-4 h-4" /> THREAT MODEL
                        </label>
                        <select
                            className="input"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            style={{
                                fontFamily: 'Source Code Pro, monospace',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="STRIDE">STRIDE - Spoofing, Tampering, Repudiation...</option>
                            <option value="PASTA">PASTA - Process for Attack Simulation</option>
                            <option value="LINDDUN">LINDDUN - Privacy Threat Modeling</option>
                            <option value="CVSS">CVSS - Vulnerability Scoring System</option>
                        </select>
                    </div>
                </div>

                {/* Right Column: Image Upload */}
                <div className="card flex flex-col h-full relative overflow-hidden">
                    <label className="label flex items-center gap-2 relative z-10">
                        <ImageIcon className="w-4 h-4" /> ARCHITECTURE DIAGRAM
                    </label>
                    <div
                        className="flex-1 border-2 border-dashed rounded relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-opacity-100"
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            borderColor: imagePreview ? 'rgba(0, 243, 255, 0.5)' : 'rgba(0, 243, 255, 0.3)',
                            background: imagePreview ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 243, 255, 0.03)',
                            minHeight: '250px'
                        }}
                    >
                        {imagePreview ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="absolute inset-0 w-full h-full object-contain p-4"
                                    style={{
                                        filter: 'drop-shadow(0 0 10px rgba(0, 243, 255, 0.3))'
                                    }}
                                />
                                <div className="absolute inset-0" style={{
                                    background: 'radial-gradient(circle at center, transparent 40%, rgba(10, 14, 26, 0.8) 100%)'
                                }}></div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                <Upload className="w-16 h-16 mb-4 opacity-50" style={{ color: '#00f3ff' }} />
                                <p style={{ color: '#8b95a5', fontFamily: 'Orbitron, sans-serif', fontSize: '0.875rem' }}>
                                    CLICK TO UPLOAD
                                </p>
                                <p className="text-sm mt-2" style={{ color: '#8b95a5', opacity: 0.7 }}>
                                    PNG, JPG, SVG up to 10MB
                                </p>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    className="btn btn-primary w-full md-w-auto min-w-[250px]"
                    onClick={handleSubmit}
                    disabled={isLoading || (!description && !image)}
                    style={{
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" style={{
                                animation: 'spin 1s linear infinite'
                            }} />
                            ANALYZING...
                        </>
                    ) : (
                        <>
                            <Settings className="w-5 h-5 mr-2" />
                            GENERATE THREAT MODEL
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                    )}
                </button>
            </div>

            <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
