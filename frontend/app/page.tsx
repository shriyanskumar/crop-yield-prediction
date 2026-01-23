"use client";
import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import AnalysisPipeline from "../components/AnalysisPipeline";
import ResultsDisplay from "../components/ResultsDisplay";
import Footer from "../components/Footer";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    setAnalysisResults(null);
  };

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
  };

  const handleReset = () => {
    setImageUrl(null);
    setAnalysisResults(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-research-dark text-white">
      <h1 className="text-3xl font-bold mb-8">
        AI-Based Crop Health & Yield Analysis
      </h1>
      {!imageUrl && <ImageUpload onImageUpload={handleImageUpload} />}
      {imageUrl && !analysisResults && (
        <AnalysisPipeline
          imageUrl={imageUrl}
          onComplete={handleAnalysisComplete}
        />
      )}
      {imageUrl && analysisResults && (
        <ResultsDisplay
          imageUrl={imageUrl}
          results={analysisResults}
          onReset={handleReset}
        />
      )}
      <Footer />
    </main>
  );
}
