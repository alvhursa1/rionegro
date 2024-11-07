'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Mpa() {
  const mapRef = useRef<SVGSVGElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        })
      }
    }

    const mapElement = mapRef.current
    if (mapElement) {
      mapElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (mapElement) {
        mapElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Left column */}
      <div className="w-[40%] bg-[#9a1616]"></div>

      {/* Right column with SVG map */}
      <div className="flex-grow relative">
        <svg
          ref={mapRef}
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <image
            href="/images/Mapa.svg"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="5"
            fill="red"
            pointerEvents="none"
          />
        </svg>
      </div>

      {/* Overlay image at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <Image
          src="/images/Frente-A1.png"
          alt="Frente A1"
          layout="responsive"
          width={1920}
          height={300}
          objectFit="cover"
        />
      </div>
    </div>
  )
}