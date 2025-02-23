import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const { progress, loaded, total } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (progress === 100) {
      // Add a small delay before hiding to ensure everything is rendered
      const timeout = setTimeout(() => {
        setShow(false)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [progress])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="mb-4 text-4xl font-bold text-orange-500">TECHFEST 2025</h1>
        <div className="mb-8 flex items-center gap-2">
          <span className="text-sm text-gray-400">Preparing for Intergalactic Travel</span>
          <span className="text-sm text-orange-500">{Math.round(progress)}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          >
          </div>
        </div>

        {/* Loading stats */}
        <div className="mt-4 text-xs text-gray-500">
          {loaded} / {total} assets loaded
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen 