"use client"

import { useEffect, useState } from 'react'

const Loader = () => {
  const [loading, setLoading] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Don't render anything on server-side to avoid hydration mismatch
  if (!hasMounted) return null
  
  // After mounting, show loader only if still loading
  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white dark:bg-black transition-opacity duration-700 animate-fade-out">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-purple-600 dark:border-blue-400"></div>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-out {
          animation: fade-out 0.7s forwards;
        }
      `}</style>
    </div>
  )
}

export default Loader 