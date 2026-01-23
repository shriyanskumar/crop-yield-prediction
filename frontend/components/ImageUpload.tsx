'use client'

import { useRef, useState } from 'react'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        onImageUpload(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="mt-12">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-12 cursor-pointer transition-all
          ${isDragging 
            ? 'border-ndvi-green bg-ndvi-green/10' 
            : 'border-gray-600 hover:border-ndvi-green/50 hover:bg-research-gray/50'
          }
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-center space-y-4">
          <div className="text-6xl">📸</div>
          <p className="text-xl text-gray-300">
            Drag and drop an aerial image here, or click to select
          </p>
          <p className="text-sm text-gray-500">
            Supports JPEG, PNG, and other common image formats
          </p>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-8 py-4 bg-ndvi-green hover:bg-ndvi-green/90 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          Upload Aerial Image for Analysis
        </button>
      </div>
    </div>
  )
}

