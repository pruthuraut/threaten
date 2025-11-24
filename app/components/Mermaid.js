"use client";
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "Inter",
});

export default function Mermaid({ chart }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && chart) {
            mermaid.contentLoaded();
            ref.current.innerHTML = chart;
            mermaid.run({
                nodes: [ref.current],
            });
        }
    }, [chart]);

    return (
        <div className="mermaid overflow-x-auto p-4 bg-surface rounded-lg border border-border" ref={ref}>
            {chart}
        </div>
    );
}
