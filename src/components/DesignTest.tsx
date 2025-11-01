'use client'

export default function DesignTest() {
  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-4 rounded-lg shadow-lg">
      <h3 className="font-bold mb-2">Design Test</h3>
      <div className="space-y-2 text-sm">
        <div className="bg-blue-500 p-2 rounded">Blue Box</div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded text-white">Gradient</div>
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded border border-white/30">Glass Effect</div>
        <div className="text-yellow-300 font-bold">Yellow Text</div>
      </div>
    </div>
  )
}

