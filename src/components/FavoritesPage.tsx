'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft, Trash2 } from 'lucide-react'
import AartiDetail from './AartiDetail'

interface Aarti {
  title: string
  content: string
  category: string
  language: string
  source: string
  type: string
}

interface FavoritesPageProps {
  favorites: string[]
  aartis: Aarti[]
  onToggleFavorite: (title: string) => void
  onBack: () => void
}

export default function FavoritesPage({ 
  favorites, 
  aartis, 
  onToggleFavorite, 
  onBack 
}: FavoritesPageProps) {
  const [selectedAarti, setSelectedAarti] = useState<Aarti | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const favoriteAartis = aartis.filter(aarti => favorites.includes(aarti.title))

  const categoryColors: Record<string, string> = {
    'गणेश': 'gradient-bg',
    'विठ्ठल': 'gradient-bg-warm',
    'शंकर': 'gradient-bg-cool',
    'कृष्ण': 'gradient-bg-sunset',
    'राम': 'gradient-bg-ocean',
    'हनुमान': 'bg-gradient-to-r from-orange-400 to-red-500',
    'दुर्गा': 'bg-gradient-to-r from-pink-400 to-purple-500',
    'अंबा': 'bg-gradient-to-r from-rose-400 to-pink-500',
    'गंगा': 'bg-gradient-to-r from-cyan-400 to-blue-500',
    'भागवत': 'bg-gradient-to-r from-indigo-400 to-purple-500',
    'लोटांगण': 'bg-gradient-to-r from-emerald-400 to-teal-500',
    'मंत्र': 'bg-gradient-to-r from-amber-400 to-orange-500',
  }

  const openAartiDetail = (aarti: Aarti) => {
    setSelectedAarti(aarti)
    setIsDetailOpen(true)
  }

  const closeAartiDetail = () => {
    setIsDetailOpen(false)
    setSelectedAarti(null)
  }

  const removeAllFavorites = () => {
    favorites.forEach(title => onToggleFavorite(title))
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-bg text-white py-6 sm:py-8 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold marathi-title leading-tight">
                  आवडत्या आरती (Favorite Aartis)
                </h1>
                <p className="text-sm sm:text-base lg:text-lg opacity-90 mt-1 sm:mt-2">
                  {favorites.length} आरती (Aartis)
                </p>
              </div>
            </div>
            
            {favorites.length > 0 && (
              <button
                onClick={removeAllFavorites}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl transition-colors text-sm sm:text-base"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">सर्व काढा (Remove All)</span>
                <span className="sm:hidden">सर्व काढा</span>
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {favoriteAartis.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 max-w-md mx-auto">
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                कोणतीही आवडती आरती नाही
              </h3>
              <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
                No favorite aartis yet. Start adding some by clicking the heart icon on any aarti.
              </p>
              <button
                onClick={onBack}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all text-sm sm:text-base"
              >
                आरती शोधा (Browse Aartis)
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {favoriteAartis.map((aarti, index) => (
              <motion.div
                key={aarti.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className={`h-2 ${categoryColors[aarti.category] || 'gradient-bg'}`} />
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold marathi-title text-gray-800 flex-1 leading-tight">
                      {aarti.title}
                    </h3>
                    <button
                      onClick={() => onToggleFavorite(aarti.title)}
                      className="p-1.5 sm:p-2 rounded-full text-red-500 bg-red-50 hover:bg-red-100 transition-colors ml-2 sm:ml-4"
                    >
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    </button>
                  </div>
                  
                  <div className="mb-3 sm:mb-4">
                    <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${
                      categoryColors[aarti.category] || 'gradient-bg'
                    }`}>
                      {aarti.category}
                    </span>
                  </div>

                  <div className="marathi-text text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                    {aarti.content.length > 120 
                      ? `${aarti.content.substring(0, 120)}...` 
                      : aarti.content
                    }
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openAartiDetail(aarti)}
                    className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all text-sm sm:text-base"
                  >
                    पूर्ण आरती वाचा (Read Full Aarti)
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Aarti Detail Modal */}
      {selectedAarti && (
        <AartiDetail
          aarti={selectedAarti}
          isOpen={isDetailOpen}
          onClose={closeAartiDetail}
          isFavorite={favorites.includes(selectedAarti.title)}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  )
}
