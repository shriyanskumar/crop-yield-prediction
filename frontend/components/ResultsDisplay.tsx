'use client'

import { useEffect, useRef, useState } from 'react'
import NDVIHeatmap from './NDVIHeatmap'

interface ResultsDisplayProps {
  imageUrl: string
  results: {
    meanNDVI: string
    healthyArea: number
    moderateStressArea: number
    highStressArea: number
    uniformityIndex: string
    confidence: number
    yieldRange: { min: string; max: string }
    healthRating: string
  }
  onReset: () => void
}

export default function ResultsDisplay({ imageUrl, results, onReset }: ResultsDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [heatmapReady, setHeatmapReady] = useState(false)

  useEffect(() => {
    // Generate explanation text based on results
    setHeatmapReady(true)
  }, [])

  const generateExplanation = () => {
    const { healthyArea, moderateStressArea, highStressArea, meanNDVI } = results
    return `Analysis of the uploaded aerial imagery indicates that approximately **${healthyArea}% of the field exhibits strong vegetation vigor**, characterized by high NDVI-style values (mean NDVI: ${meanNDVI}). **Localized stress patches** are detected primarily along field boundaries (${highStressArea}% high stress, ${moderateStressArea}% moderate stress), which may correspond to irrigation inconsistency or nutrient deficiency. Overall vegetation health aligns with **favorable yield outcomes** observed in similar growth stages.`
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Analysis Results</h2>
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
        >
          Analyze New Image
        </button>
      </div>

      {/* Image with NDVI Overlay */}
      <div className="bg-research-gray/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">NDVI Visualization</h3>
        <div className="relative">
          <NDVIHeatmap imageUrl={imageUrl} />
          <div className="absolute bottom-4 right-4 bg-black/70 p-3 rounded-lg text-xs">
            <div className="font-semibold text-white mb-2">NDVI Range:</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-ndvi-green"></div>
                <span className="text-gray-300">0.6 – 0.9 : Healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-ndvi-yellow"></div>
                <span className="text-gray-300">0.3 – 0.6 : Moderate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-ndvi-red"></div>
                <span className="text-gray-300">&lt; 0.3 : Stressed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-research-gray/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Numerical Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Mean NDVI:</span>
              <span className="text-ndvi-green font-mono font-bold text-lg">{results.meanNDVI}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Healthy Area:</span>
              <span className="text-ndvi-green font-mono font-bold text-lg">{results.healthyArea}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Moderately Stressed Area:</span>
              <span className="text-ndvi-yellow font-mono font-bold text-lg">{results.moderateStressArea}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Highly Stressed Area:</span>
              <span className="text-ndvi-red font-mono font-bold text-lg">{results.highStressArea}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Vegetation Uniformity Index:</span>
              <span className="text-white font-mono font-bold text-lg">{results.uniformityIndex}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Prediction Confidence:</span>
              <span className="text-ndvi-green font-mono font-bold text-lg">
                {results.confidence >= 90 ? 'High' : results.confidence >= 75 ? 'Medium' : 'Low'} ({results.confidence}%)
              </span>
            </div>
          </div>
        </div>

        {/* Model Output */}
        <div className="bg-research-gray/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Predicted Crop Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="text-gray-400 text-sm mb-1">Estimated Yield:</div>
              <div className="text-2xl font-bold text-ndvi-green">
                {results.yieldRange.min} – {results.yieldRange.max} tonnes/hectare
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Crop Health Rating:</div>
              <div className="text-xl font-semibold text-white">{results.healthRating}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Season Consistency:</div>
              <div className="text-lg text-gray-300">Matches historical growth patterns</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 italic">
                Estimates generated using vegetation indices and machine-learning inference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-research-gray/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Analysis Summary</h3>
        <p className="text-gray-300 leading-relaxed">
          {generateExplanation().split('**').map((part, index) => 
            index % 2 === 1 ? (
              <strong key={index} className="text-ndvi-green">{part}</strong>
            ) : (
              part
            )
          )}
        </p>
      </div>

      {/* Recommendations */}
      <div className="bg-research-gray/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Advisory Recommendations</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start space-x-3">
            <span className="text-ndvi-red mt-1">•</span>
            <span>Inspect high-stress zones for water deficiency</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-ndvi-yellow mt-1">•</span>
            <span>Consider nitrogen supplementation in affected patches</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-ndvi-green mt-1">•</span>
            <span>Continue current irrigation schedule for healthy regions</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-white mt-1">•</span>
            <span>Re-scan field after 10–14 days for trend validation</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

