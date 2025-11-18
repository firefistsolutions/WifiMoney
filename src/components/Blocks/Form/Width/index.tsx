import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  width?: number
}> = ({ children, width }) => {
  const widthClass = width === 50 
    ? 'w-full md:w-1/2' 
    : width === 33 
    ? 'w-full md:w-1/3'
    : width === 25
    ? 'w-full md:w-1/4'
    : 'w-full'
  
  return (
    <div className={`px-2 ${widthClass}`}>
      {children}
    </div>
  )
}
