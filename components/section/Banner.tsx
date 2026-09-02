import React from 'react'

const Banner = () => {
  return (
    <div className="w-full overflow-hidden">
      <img
        src="/images/banner.png"
        alt="BeingAV Banner"
        className="w-full h-auto object-cover"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  )
}

export default Banner