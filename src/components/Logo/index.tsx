import Image from 'next/image'
import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div className="relative h-10 w-32 flex items-center">
      <Image
        src="/media/wifi-money-white-logo.png"
        alt="WiFi Money"
        fill
        className="object-contain object-left"
        priority
        sizes="128px"
      />
    </div>
  )
}
