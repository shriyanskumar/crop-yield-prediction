# AI-Based Crop Health & Yield Analysis

A research-grade web application prototype for analyzing crop health and yield using aerial imagery. This application simulates advanced NDVI (Normalized Difference Vegetation Index) computation and machine learning-based analysis for precision agriculture.

## Features

- **Image Upload**: Drag-and-drop or click to upload aerial/drone crop imagery
- **Multi-Step Analysis Pipeline**: Simulated processing pipeline with 7 distinct analysis stages
- **NDVI Visualization**: Heatmap overlay showing vegetation health zones
- **Metrics Dashboard**: Comprehensive numerical metrics and crop performance predictions
- **AI-Generated Insights**: Automated analysis summaries and recommendations

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Canvas API** - NDVI heatmap generation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser


### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main landing page
├── components/
│   ├── ImageUpload.tsx   # Image upload component
│   ├── AnalysisPipeline.tsx  # Multi-step analysis UI
│   ├── ResultsDisplay.tsx    # Results visualization
│   ├── NDVIHeatmap.tsx      # NDVI heatmap overlay
│   └── Footer.tsx           # Footer component
└── package.json
```

## Analysis Pipeline Steps

1. Image Normalization & Radiometric Correction
2. Vegetation Pixel Segmentation
3. NDVI-Style Index Computation
4. Spatial Stress Patch Detection
5. Feature Aggregation (Mean NDVI, Variance, Coverage)
6. Random Forest Inference Engine
7. Confidence Calibration & Outlier Check

## Notes

This is a research prototype designed for academic demonstration purposes. The analysis pipeline and results are simulated to showcase the user interface and workflow of a crop health analysis system.

## License

Built for academic demonstration purposes.

