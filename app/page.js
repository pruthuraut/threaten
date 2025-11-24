"use client";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ThreatTool from "./components/ThreatTool";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <ThreatTool onBack={() => setStarted(false)} />
      )}
    </main>
  );
}
