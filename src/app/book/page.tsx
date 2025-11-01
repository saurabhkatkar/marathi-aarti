'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home, BookOpen, Book, Search, X } from 'lucide-react'
import Link from 'next/link'
import aartiData from '@/data/comprehensive_marathi_arati_final.json'

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

// Transliteration mapping for common Marathi words to English
const transliterationMap: Record<string, string> = {
  // Categories
  'गणेश': 'ganesh',
  'विठ्ठल': 'viththal',
  'शंकर': 'shankar',
  'कृष्ण': 'krishna',
  'राम': 'ram',
  'हनुमान': 'hanuman',
  'दुर्गा': 'durga',
  'अंबा': 'amba',
  'गंगा': 'ganga',
  'भागवत': 'bhagavat',
  'लोटांगण': 'lotangan',
  'मंत्र': 'mantra',
  // Common words
  'श्री': 'shri',
  'आरती': 'aarti',
  'नमः': 'namah',
  'देव': 'dev',
  'भक्त': 'bhakt',
  'मंगल': 'mangal',
  'मूर्ती': 'murti',
}

// Convert Marathi text to English transliteration for search
const transliterateToEnglish = (text: string): string => {
  let result = text.toLowerCase()
  
  // Replace known transliterations
  Object.entries(transliterationMap).forEach(([marathi, english]) => {
    const regex = new RegExp(marathi, 'gi')
    result = result.replace(regex, english)
  })
  
  return result
}

// Get searchable text (English transliteration + original Marathi)
const getSearchableText = (aarti: Aarti): string => {
  const titleEnglish = transliterateToEnglish(aarti.title)
  const categoryEnglish = transliterateToEnglish(aarti.category)
  const contentEnglish = transliterateToEnglish(aarti.content)
  
  return `${aarti.title} ${aarti.category} ${aarti.content} ${titleEnglish} ${categoryEnglish} ${contentEnglish}`.toLowerCase()
}

export default function BookPage() {
  const [aartis] = useState<AartiCollection>(aartiData as AartiCollection)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Filter aartis based on search (works with both Marathi and English)
  const filteredAartis = useMemo(() => {
    if (!searchTerm.trim()) return aartis.aarti_collection
    
    const searchLower = searchTerm.toLowerCase().trim()
    const searchEnglish = transliterateToEnglish(searchTerm)
    
    return aartis.aarti_collection.filter(aarti => {
      const searchableText = getSearchableText(aarti)
      
      // Search in both original Marathi and English transliteration
      return searchableText.includes(searchLower) || 
             searchableText.includes(searchEnglish)
    })
  }, [aartis.aarti_collection, searchTerm])

  // One aarti per page - use filtered results for navigation
  const displayAartis = searchTerm.trim() ? filteredAartis : aartis.aarti_collection
  const totalPages = displayAartis.length
  const currentAarti = displayAartis[currentPage]

  // Navigate to aarti when clicked from search results
  const navigateToAarti = (aartiTitle: string) => {
    const index = displayAartis.findIndex(a => a.title === aartiTitle)
    if (index !== -1) {
      setCurrentPage(index)
      setSearchTerm('')
      setShowSearchResults(false)
    }
  }

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1)
    }
  }, [currentPage, totalPages])

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }, [currentPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't navigate if user is typing in search
      if (document.activeElement?.tagName === 'INPUT') return
      
      if (e.key === 'ArrowLeft') {
        handlePrevPage()
      } else if (e.key === 'ArrowRight') {
        handleNextPage()
      } else if (e.key === 'Escape') {
        setShowSearchResults(false)
        setSearchTerm('')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handlePrevPage, handleNextPage])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.search-container')) {
        setShowSearchResults(false)
      }
    }

    if (showSearchResults) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSearchResults])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col items-center justify-start sm:justify-center p-3 sm:p-4 md:p-8 pt-4 sm:pt-8">
      {/* Header Navigation - Mobile First */}
      <div className="w-full max-w-7xl mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        {/* Top Row: Home & Page Counter - Mobile Stack */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md active:scale-95 sm:hover:shadow-lg sm:hover:scale-105 transition-all duration-300 touch-manipulation"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-gray-700 text-xs sm:text-sm md:text-base">मुख्यपृष्ठ</span>
          </Link>
          
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
            <Book className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            <span className="font-medium text-gray-700 text-xs sm:text-sm">
              {searchTerm.trim() ? (
                <span className="whitespace-nowrap">
                  {currentPage + 1} / {totalPages} {filteredAartis.length > 0 && <span className="hidden sm:inline">({filteredAartis.length})</span>}
                </span>
              ) : (
                <span className="hidden sm:inline">पृष्ठ {currentPage + 1} / {totalPages}</span>
              )}
            </span>
          </div>
        </div>
        
        {/* Search Bar - Full Width on Mobile */}
        <div className="relative w-full search-container my-2 sm:my-0">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search (ganesh, krishna...) or Marathi"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowSearchResults(true)
                setCurrentPage(0)
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full pl-10 sm:pl-12 pr-9 sm:pr-10 py-2.5 sm:py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400/50 focus:border-transparent focus:bg-white transition-all duration-300 text-sm sm:text-base placeholder-gray-500 shadow-md text-black"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setShowSearchResults(false)
                }}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 active:text-gray-600 sm:hover:text-gray-600 transition-colors touch-manipulation p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
          
          {/* Search Results Dropdown - Mobile Optimized */}
          {showSearchResults && searchTerm.trim() && filteredAartis.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[50vh] sm:max-h-64 overflow-y-auto overscroll-contain">
              {filteredAartis.slice(0, 10).map((aarti) => (
                <button
                  key={aarti.title}
                  onClick={() => navigateToAarti(aarti.title)}
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 active:bg-gray-50 sm:hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 touch-manipulation"
                >
                  <div className="font-medium marathi-title text-gray-800 text-sm sm:text-base mb-1 line-clamp-1">
                    {aarti.title}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 bg-gray-200 rounded-full text-gray-700 whitespace-nowrap">
                      {aarti.category}
                    </span>
                    {aarti.content.length > 40 && (
                      <span className="text-gray-400 truncate hidden sm:inline">
                        {aarti.content.substring(0, 40)}...
                      </span>
                    )}
                  </div>
                </button>
              ))}
              {filteredAartis.length > 10 && (
                <div className="px-3 sm:px-4 py-2 text-xs text-gray-500 text-center border-t border-gray-100">
                  {filteredAartis.length - 10} more results...
                </div>
              )}
            </div>
          )}
          
          {showSearchResults && searchTerm.trim() && filteredAartis.length === 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 sm:p-4">
              <div className="text-center text-gray-500 text-xs sm:text-sm">
                कोणतीही आरती सापडली नाही (No aartis found)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Book Container - Mobile First */}
      <div className="relative w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-6 md:p-8 lg:p-12"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Single Page */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative bg-white/95 backdrop-blur-sm rounded-lg shadow-lg min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.03) 0px,
                    rgba(0, 0, 0, 0.03) 1px,
                    transparent 1px,
                    transparent 24px
                  )
                `,
                boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.05), 0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Left Click Zone - Previous Page (Left 30%) */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="absolute left-0 top-0 bottom-0 w-[30%] z-10 cursor-w-resize touch-manipulation disabled:cursor-default disabled:opacity-0"
                aria-label="Previous page"
              />
              
              {/* Middle Zone - No Events (Middle 40%) - Allows scrolling and zooming */}
              <div className="absolute left-[30%] top-0 bottom-0 w-[40%] z-0 pointer-events-auto" />
              
              {/* Right Click Zone - Next Page (Right 30%) */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="absolute right-0 top-0 bottom-0 w-[30%] z-10 cursor-e-resize touch-manipulation disabled:cursor-default disabled:opacity-0"
                aria-label="Next page"
              />
              
              {/* Content Container */}
              <div className="relative p-4 sm:p-6 md:p-8 lg:p-12 pointer-events-auto">
                {currentAarti ? (
                  <>
                    {/* Page Number */}
                    <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 text-gray-400 text-xs sm:text-sm font-serif">
                      {currentPage + 1}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="mb-3 sm:mb-4">
                      <span className="inline-block px-2.5 sm:px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700">
                        {currentAarti.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold marathi-title text-gray-800 mb-4 sm:mb-6 leading-tight">
                      {currentAarti.title}
                    </h2>
                    
                    {/* Content */}
                    <div className="marathi-text text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-relaxed whitespace-pre-line pb-8 sm:pb-0 select-text">
                      {currentAarti.content}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[300px] text-gray-400">
                    <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 opacity-30" />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Controls - Touch Friendly */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full px-2 pb-2 sm:pb-0">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3 bg-white backdrop-blur-sm rounded-lg shadow-lg sm:hover:shadow-xl transition-all duration-300 touch-manipulation min-h-[48px] min-w-[48px] sm:min-w-auto ${
              currentPage === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'active:scale-95 sm:hover:scale-105 bg-white border border-gray-200'
            }`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 text-gray-700" />
            <span className="font-medium text-gray-700 text-sm sm:text-base hidden sm:inline">मागील</span>
          </button>
          
          <div className="flex items-center gap-2 px-4 sm:px-4 py-2.5 sm:py-2.5 bg-white backdrop-blur-sm rounded-lg shadow-lg min-h-[48px]">
            <BookOpen className="w-5 h-5 sm:w-5 sm:h-5 text-orange-500" />
            <span className="font-medium text-gray-700 text-sm sm:text-sm whitespace-nowrap">
              {currentPage + 1} / {totalPages}
            </span>
          </div>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3 bg-white backdrop-blur-sm rounded-lg shadow-lg sm:hover:shadow-xl transition-all duration-300 touch-manipulation min-h-[48px] min-w-[48px] sm:min-w-auto ${
              currentPage === totalPages - 1
                ? 'opacity-50 cursor-not-allowed'
                : 'active:scale-95 sm:hover:scale-105 bg-white border border-gray-200'
            }`}
          >
            <span className="font-medium text-gray-700 text-sm sm:text-base hidden sm:inline">पुढील</span>
            <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 text-gray-700" />
          </button>
        </div>

        {/* Keyboard Navigation Hint - Hidden on Mobile */}
        <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500 hidden sm:block">
          <p>← → arrow keys to navigate | Use mouse/touch to turn pages</p>
        </div>
      </div>
    </div>
  )
}

