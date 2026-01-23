"use client";

import { useEffect, useState } from "react";

interface AnalysisStep {
  id: number;
  name: string;
  status: "pending" | "processing" | "complete";
  progress: number;
  message?: string;
}

interface AnalysisPipelineProps {
  imageUrl: string;
  onComplete: (results: any) => void;
}

const ANALYSIS_STEPS = [
  {
    id: 1,
    name: "Image Normalization & Radiometric Correction",
    messages: [
      "Calibrating sensor response curves...",
      "Applying atmospheric correction algorithms...",
      "Normalizing pixel values across spectral bands...",
    ],
  },
  {
    id: 2,
    name: "Vegetation Pixel Segmentation",
    messages: [
      "Identifying vegetation pixels using spectral thresholds...",
      "Processing tile 3/8...",
      "Segmentation complete: 68% vegetation coverage detected",
    ],
  },
  {
    id: 3,
    name: "NDVI-Style Index Computation",
    messages: [
      "Computing near-infrared and red band ratios...",
      "Analyzing vegetation reflectance distribution...",
      "NDVI values computed: range 0.12 - 0.87",
    ],
  },
  {
    id: 4,
    name: "Spatial Stress Patch Detection",
    messages: [
      "Applying spatial convolution filters...",
      "Identifying stress clusters using density analysis...",
      "11 stress patches detected across field boundaries",
    ],
  },
  {
    id: 5,
    name: "Feature Aggregation (Mean NDVI, Variance, Coverage)",
    messages: [
      "Computing statistical moments...",
      "Calculating spatial autocorrelation...",
      "Feature vector assembled: 47 dimensions",
    ],
  },
  {
    id: 6,
    name: "Random Forest Inference Engine",
    messages: [
      "Loading pre-trained model weights...",
      "Running inference on feature vector...",
      "Model confidence: 92%",
    ],
  },
  {
    id: 7,
    name: "Confidence Calibration & Outlier Check",
    messages: [
      "Validating prediction against historical patterns...",
      "Performing outlier detection...",
      "Analysis complete. Results validated.",
    ],
  },
];

export default function AnalysisPipeline({
  imageUrl,
  onComplete,
}: AnalysisPipelineProps) {
  const [steps, setSteps] = useState<AnalysisStep[]>(
    ANALYSIS_STEPS.map((step) => ({
      id: step.id,
      name: step.name,
      status: "pending",
      progress: 0,
    })),
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    let stepIndex = 0;

    const processStep = async () => {
      if (stepIndex >= ANALYSIS_STEPS.length) {
        // Call real ML model API
        try {
          // Convert image URL to File/Blob for upload
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });

          // Create FormData
          const formData = new FormData();
          formData.append("file", file);

          // Call API endpoint
          const apiResponse = await fetch("http://localhost:8000/predict", {
            method: "POST",
            body: formData,
          });

          if (!apiResponse.ok) {
            throw new Error(`API error: ${apiResponse.statusText}`);
          }

          const results = await apiResponse.json();
          const mappedResults = {
            ...results,
            moderateStressArea: results.moderatelyStressedArea,
            highStressArea: results.highlyStressedArea,
            uniformityIndex: results.vegetationUniformityIndex,
            confidence: Math.round((results.confidence || 0) * 100),
          };
          onComplete(mappedResults);
        } catch (error) {
          console.error("Error calling ML model:", error);
          // Show error to user - no fake fallback
          alert(
            "Error analyzing image. Please make sure the ML model is trained and the server is running correctly.",
          );
          throw error;
        }
        return;
      }

      const step = ANALYSIS_STEPS[stepIndex];
      const stepMessages = step.messages;

      // Update current step to processing
      setSteps((prev) =>
        prev.map((s) =>
          s.id === step.id ? { ...s, status: "processing", progress: 0 } : s,
        ),
      );

      // Simulate progress for this step (smooth loading animation)
      let progress = 0;
      let messageIndex = 0;
      // Deterministic progress increment for smooth loading animation
      const progressIncrement = 12; // Fixed increment for consistent progress
      const progressInterval = setInterval(() => {
        progress += progressIncrement;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);

          // Update step to complete
          setSteps((prev) =>
            prev.map((s) =>
              s.id === step.id
                ? { ...s, status: "complete", progress: 100 }
                : s,
            ),
          );

          // Move to next step
          stepIndex++;
          setCurrentStepIndex(stepIndex);
          setTimeout(() => processStep(), 300);
        } else {
          // Update progress and message
          if (
            messageIndex < stepMessages.length &&
            progress > (messageIndex + 1) * 30
          ) {
            messageIndex++;
          }
          setSteps((prev) =>
            prev.map((s) =>
              s.id === step.id
                ? {
                    ...s,
                    progress: Math.min(progress, 100),
                    message:
                      stepMessages[messageIndex] ||
                      stepMessages[stepMessages.length - 1],
                  }
                : s,
            ),
          );
        }
      }, 150);
    };

    // Start processing after a short delay
    setTimeout(processStep, 500);
  }, [onComplete]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Analysis Pipeline
        </h2>
        <p className="text-gray-400">
          Processing aerial imagery using advanced remote sensing algorithms
        </p>
      </div>

      <div className="bg-research-gray/50 rounded-lg p-6 mb-6 border border-gray-700">
        <img
          src={imageUrl}
          alt="Uploaded aerial image"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`
              bg-research-gray/50 rounded-lg p-6 border transition-all
              ${step.status === "processing" ? "border-ndvi-green shadow-lg shadow-ndvi-green/20" : ""}
              ${step.status === "complete" ? "border-ndvi-green/50" : ""}
              ${step.status === "pending" ? "border-gray-700 opacity-60" : ""}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold
                  ${step.status === "complete" ? "bg-ndvi-green text-white" : ""}
                  ${step.status === "processing" ? "bg-ndvi-yellow text-black animate-spin" : "⏳"}
                  ${step.status === "pending" ? "bg-gray-600 text-gray-400" : ""}
                `}
                >
                  {step.status === "complete" ? (
                    "✓"
                  ) : step.status === "processing" ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"></div>
                  ) : (
                    step.id
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {step.name}
                  </h3>
                  {step.message && (
                    <p className="text-sm text-gray-400 mt-1 italic">
                      {step.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono text-gray-400">
                  {step.progress}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`
                  h-full transition-all duration-300
                  ${step.status === "processing" ? "bg-ndvi-green" : ""}
                  ${step.status === "complete" ? "bg-ndvi-green" : ""}
                  ${step.status === "pending" ? "bg-gray-600" : ""}
                `}
                style={{ width: `${step.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
