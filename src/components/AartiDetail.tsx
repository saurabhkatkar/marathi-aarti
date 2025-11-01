'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Volume2, VolumeX, Share2, Copy, Check } from 'lucide-react'

interface Aarti {
  title: string
  content: string
  category: string
  language: string
  source: string
  type: string
}

interface AartiDetailProps {
  aarti: Aarti
  isOpen: boolean
  onClose: () => void
  isFavorite: boolean
  onToggleFavorite: (title: string) => void
}

export default function AartiDetail({ 
  aarti, 
  isOpen, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}: AartiDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [copied, setCopied] = useState(false)


  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    // Here you would integrate with text-to-speech
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aarti.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: aarti.title,
          text: aarti.content,
        })
      } catch (err) {
        console.error('Error sharing: ', err)
      }
    } else {
      // Fallback to copying to clipboard
      handleCopy()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-2 sm:inset-4 z-50 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Header */}
            <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />
            
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 gap-3 sm:gap-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-400/80 to-amber-400/80 rounded-full text-xs sm:text-sm font-medium text-white shadow-lg">
                    {aarti.category}
                  </span>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold marathi-title text-gray-800 leading-tight">
                    {aarti.title}
                  </h1>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => onToggleFavorite(aarti.title)}
                    className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                      isFavorite
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handlePlay}
                    className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {isPlaying ? (
                      <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  
                  <button
                    onClick={handleCopy}
                    className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-purple-500 hover:bg-purple-50 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-orange-200 shadow-lg">
                    <div className="marathi-text text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-line">
                      {aarti.content}
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
                      <h3 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">भाषा (Language)</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{aarti.language}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
                      <h3 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">स्रोत (Source)</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{aarti.source}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 sm:col-span-2 lg:col-span-1">
                      <h3 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">प्रकार (Type)</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{aarti.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
