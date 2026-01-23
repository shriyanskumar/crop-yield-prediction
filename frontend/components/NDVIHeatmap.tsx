"use client";

import { useEffect, useRef, useState } from "react";

interface NDVIHeatmapProps {
  imageUrl: string;
  opacity?: number; // 0-1, how much to blend NDVI overlay (default 0.5)
}

export default function NDVIHeatmap({
  imageUrl,
  opacity = 0.5,
}: NDVIHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Helper: map NDVI value to RGB color
  function ndviToColor(ndvi: number): [number, number, number] {
    if (ndvi > 0.2) return [34, 197, 94]; // green (more forgiving)
    if (ndvi > 0.0) return [234, 179, 8]; // yellow
    return [239, 68, 68]; // red
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      // Scale down large images for performance
      const maxWidth = 1200;
      const maxHeight = 800;
      let width = img.width;
      let height = img.height;
      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      // Create NDVI overlay
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        // Pseudo-NDVI for RGB: (G - R) / (G + R)
        const ndvi = (g - r) / (g + r + 1e-5);
        const [nr, ng, nb] = ndviToColor(ndvi);
        // Blend NDVI color with original
        data[i] = Math.round(opacity * nr + (1 - opacity) * r);
        data[i + 1] = Math.round(opacity * ng + (1 - opacity) * g);
        data[i + 2] = Math.round(opacity * nb + (1 - opacity) * data[i + 2]);
        // alpha stays the same
      }
      ctx.putImageData(imageData, 0, 0);
      setImageLoaded(true);
    };
    img.src = imageUrl;
  }, [imageUrl, opacity]);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg"
        style={{ maxHeight: "600px", objectFit: "contain" }}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-research-gray/80 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ndvi-green mx-auto mb-4"></div>
            <p className="text-gray-400">Generating NDVI heatmap...</p>
          </div>
        </div>
      )}
    </div>
  );
}
