import React from 'react'

function Loader() {
  return (
    <div>
      
    <div className="animate-pulse space-y-4 p-6 border rounded-xl shadow-md max-w-sm mx-auto">
      {/* City name */}
      <div className="h-6 w-32 bg-gray-300 rounded"></div>
      
      {/* Weather icon */}
      <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto"></div>
      
      {/* Temperature */}
      <div className="h-8 w-24 bg-gray-300 rounded mx-auto"></div>
      
      {/* Condition */}
      <div className="h-4 w-28 bg-gray-300 rounded mx-auto"></div>
      
      {/* Extra info */}
      <div className="h-4 w-20 bg-gray-300 rounded mx-auto"></div>
    </div>
  

      
    </div>
  )
}

export default Loader
