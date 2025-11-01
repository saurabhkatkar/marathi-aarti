'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, BookOpen, Filter, Volume2, VolumeX } from 'lucide-react'
import aartiData from '@/data/comprehensive_marathi_arati_final.json'
import AartiDetail from '@/components/AartiDetail'
import FavoritesPage from '@/components/FavoritesPage'

interface Aarti {
  title: string
  content: string
  category: string
  language: string
  source: string
  type: string
}

interface AartiCollection {
  metadata: {
    total_aarti: number
    categories: Record<string, number>
    description: string
  }
  aarti_collection: Aarti[]
}

export default function Home() {
  const [aartis] = useState<AartiCollection>(aartiData as AartiCollection)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAarti, setCurrentAarti] = useState<Aarti | null>(null)
  const [selectedAarti, setSelectedAarti] = useState<Aarti | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'favorites'>('home')

  const categories = ['all', ...Object.keys(aartis.metadata.categories)]

  const filteredAartis = aartis.aarti_collection.filter(aarti => {
    const matchesSearch = aarti.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aarti.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || aarti.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (title: string) => {
    setFavorites(prev => 
      prev.includes(title) 
        ? prev.filter(fav => fav !== title)
        : [...prev, title]
    )
  }

  const playAarti = (aarti: Aarti) => {
    setCurrentAarti(aarti)
    setIsPlaying(true)
    // Here you would integrate with a text-to-speech API
  }


  const openAartiDetail = (aarti: Aarti) => {
    setSelectedAarti(aarti)
    setIsDetailOpen(true)
  }

  const closeAartiDetail = () => {
    setIsDetailOpen(false)
    setSelectedAarti(null)
  }


  if (currentView === 'favorites') {
    return (
      <FavoritesPage
        favorites={favorites}
        aartis={aartis.aarti_collection}
        onToggleFavorite={toggleFavorite}
        onBack={() => setCurrentView('home')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 text-black">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white py-12 sm:py-16 px-4"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/50 via-amber-400/50 to-yellow-400/50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 marathi-title leading-tight bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent drop-shadow-2xl"
          >
            मराठी आरती संग्रह
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl opacity-90 mb-6 sm:mb-8 font-light"
          >
            Marathi Aarti Collection
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base lg:text-lg"
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium">{aartis.metadata.total_aarti} आरती</span>
            </div>
            <button 
              onClick={() => setCurrentView('favorites')}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium">{favorites.length} आवडत्या</span>
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-6xl mx-auto px-4 py-8 sm:py-12"
      >
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="text"
                placeholder="आरती शोधा... (Search aarti...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-4 py-4 sm:py-5 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-400/50 focus:border-transparent focus:bg-white transition-all duration-300 text-sm sm:text-base placeholder-gray-500 shadow-sm text-black"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-4 sm:px-6 py-4 sm:py-5 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-400/50 focus:border-transparent focus:bg-white transition-all duration-300 text-sm sm:text-base shadow-sm text-black"
              >
                <option value="all">सर्व श्रेण्या (All Categories)</option>
                {Object.keys(aartis.metadata.categories).map(category => (
                  <option key={category} value={category}>
                    {category} ({aartis.metadata.categories[category]})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8 sm:mb-12">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-lg shadow-orange-400/25'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
              }`}
            >
              {category === 'all' ? 'सर्व' : category}
            </motion.button>
          ))}
        </div>

        {/* Aarti Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAartis.map((aarti, index) => (
              <motion.div
                key={aarti.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-500 hover:scale-105"
              >
                <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"></div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold marathi-title text-gray-800 flex-1 leading-tight group-hover:text-gray-900 transition-colors">
                      {aarti.title}
                    </h3>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleFavorite(aarti.title)}
                        className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                          favorites.includes(aarti.title)
                            ? 'text-red-500 bg-red-50 border border-red-200'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 hover:border-red-200'
                        }`}
                      >
                        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favorites.includes(aarti.title) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => playAarti(aarti)}
                        className="p-2 sm:p-3 rounded-full text-gray-400 hover:text-orange-500 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 transition-all duration-300"
                      >
                        {isPlaying && currentAarti?.title === aarti.title ? (
                          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-400/80 to-amber-400/80 rounded-full text-xs sm:text-sm font-medium text-white shadow-lg">
                      {aarti.category}
                    </span>
                  </div>

                  <div className="marathi-text text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                    {aarti.content.length > 120 
                      ? `${aarti.content.substring(0, 120)}...` 
                      : aarti.content
                    }
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openAartiDetail(aarti)}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white rounded-2xl font-semibold hover:from-orange-500 hover:to-amber-500 transition-all duration-300 text-sm sm:text-base shadow-lg shadow-orange-400/25 hover:shadow-orange-400/40"
                  >
                    पूर्ण आरती वाचा (Read Full Aarti)
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filteredAartis.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 sm:py-20"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 max-w-md mx-auto">
              <div className="text-white/80 text-lg sm:text-xl font-medium">
                कोणतीही आरती सापडली नाही
              </div>
              <div className="text-white/60 text-sm sm:text-base mt-2">
                (No aartis found)
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Aarti Detail Modal */}
      {selectedAarti && (
        <AartiDetail
          aarti={selectedAarti}
          isOpen={isDetailOpen}
          onClose={closeAartiDetail}
          isFavorite={favorites.includes(selectedAarti.title)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}