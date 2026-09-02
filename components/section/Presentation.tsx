import React from 'react'

const Presentation = () => {
  return (
    <div className="w-full overflow-hidden">
      <img
        src="/images/presentation.png"
        alt="BeingAV Banner"
        className="w-full h-auto object-cover"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  )
}

export default Presentation