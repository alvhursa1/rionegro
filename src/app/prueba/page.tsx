'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HztalImgPanor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        const aspectRatio = 11521 / 2160 // Aspect ratio of the original image
        const windowAspectRatio = window.innerWidth / window.innerHeight

        let width, height

        if (windowAspectRatio > aspectRatio) {
          width = window.innerWidth
          height = width / aspectRatio
        } else {
          height = window.innerHeight
          width = height * aspectRatio
        }

        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (containerRef.current && imageRef.current && dimensions.width > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${dimensions.width - window.innerWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to(imageRef.current, {
        x: () => -(dimensions.width - window.innerWidth),
        ease: 'none',
      })
    }
  }, [dimensions])

  return (
    <div ref={containerRef} className="w-screen h-screen overflow-hidden">
      <div ref={imageRef} className="h-full" style={{ width: `${dimensions.width}px` }}>
        <Image
          src="/images/panorama-completo.png"
          alt="Panoramic view"
          width={dimensions.width}
          height={dimensions.height}
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </div>
  )
}