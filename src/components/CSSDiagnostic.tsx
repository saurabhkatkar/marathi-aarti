'use client'

export default function CSSDiagnostic() {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border-2 border-red-500">
      <h3 className="text-sm font-bold text-red-600 mb-2">CSS Diagnostic</h3>
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Tailwind: Blue box</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
          <span>Gradients: Purple-Pink</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-noto-devanagari text-sm">मराठी</span>
          <span>Font: Marathi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span>Rounded: Circle</span>
        </div>
      </div>
    </div>
  )
}

