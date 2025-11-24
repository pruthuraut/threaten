"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Lock, ArrowRight, Terminal, Eye, Cpu } from "lucide-react";

export default function LandingPage({ onStart }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative">
            {/* Animated grid background */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }}></div>
            </div>

            <style jsx>{`
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(60deg) translateZ(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateZ(50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto relative z-10"
            >
                <motion.div
                    className="mb-8 flex justify-center"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="p-6 rounded-lg relative" style={{
                        background: 'rgba(0, 243, 255, 0.05)',
                        border: '2px solid rgba(0, 243, 255, 0.3)',
                        boxShadow: '0 0 30px rgba(0, 243, 255, 0.3), inset 0 0 30px rgba(0, 243, 255, 0.1)'
                    }}>
                        <Shield className="w-20 h-20" style={{
                            color: '#00f3ff',
                            filter: 'drop-shadow(0 0 10px #00f3ff)'
                        }} />
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: '#ff006e' }}></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: '#ff006e' }}></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: '#ff006e' }}></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: '#ff006e' }}></div>
                    </div>
                </motion.div>

                <h1 className="mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    SECURE YOUR SYSTEM WITH{" "}
                    <span style={{
                        background: 'linear-gradient(135deg, #00f3ff, #7b2cbf, #ff006e)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 20px rgba(0, 243, 255, 0.5))'
                    }}>
                        AI-POWERED
                    </span>{" "}
                    THREAT ANALYSIS
                </h1>

                <p className="text-xl mb-12 max-w-2xl mx-auto" style={{
                    color: '#8b95a5',
                    lineHeight: '1.8'
                }}>
                    Transform your architecture into comprehensive threat models in seconds.
                    <br />
                    <span style={{ color: '#00f3ff' }}>Identify risks. Visualize flows. Secure your future.</span>
                </p>

                <motion.button
                    onClick={onStart}
                    className="btn btn-primary text-lg px-8 py-4 mb-24"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Terminal className="mr-2 w-5 h-5" />
                    INITIATE SCAN
                    <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md-grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
                <FeatureCard
                    icon={<Zap className="w-10 h-10" style={{ color: '#00ff41' }} />}
                    title="INSTANT ANALYSIS"
                    description="Deploy AI-powered scanning to detect vulnerabilities in real-time across your entire infrastructure."
                    delay={0.2}
                />
                <FeatureCard
                    icon={<Eye className="w-10 h-10" style={{ color: '#ff006e' }} />}
                    title="DEEP COVERAGE"
                    description="Supports STRIDE, PASTA, LINDDUN and other industry-standard threat modeling frameworks."
                    delay={0.4}
                />
                <FeatureCard
                    icon={<Cpu className="w-10 h-10" style={{ color: '#7b2cbf' }} />}
                    title="SMART MITIGATION"
                    description="Receive AI-generated, actionable security recommendations tailored to your specific stack."
                    delay={0.6}
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="card text-left relative group"
            style={{
                background: 'rgba(26, 31, 46, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 243, 255, 0.2)'
            }}
        >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.05), rgba(123, 44, 191, 0.05))',
                borderRadius: '0.25rem'
            }}></div>

            <div className="relative z-10">
                <div className="mb-4 inline-block p-3 rounded" style={{
                    background: 'rgba(0, 243, 255, 0.1)',
                    border: '1px solid rgba(0, 243, 255, 0.3)'
                }}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{
                    fontFamily: 'Orbitron, sans-serif',
                    color: '#00f3ff',
                    textShadow: '0 0 10px rgba(0, 243, 255, 0.3)'
                }}>
                    {title}
                </h3>
                <p style={{ color: '#8b95a5', lineHeight: '1.6' }}>{description}</p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #ff006e)' }}></div>
                <div className="w-0.5 h-full absolute top-0 right-0" style={{ background: 'linear-gradient(180deg, transparent, #ff006e)' }}></div>
            </div>
        </motion.div>
    );
}
