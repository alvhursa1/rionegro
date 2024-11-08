'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HztalImgPanor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const updateDimensions = () => {
    if (containerRef.current) {
      const aspectRatio = 5760 / 1080 // Aspect ratio of the original image
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      const containerAspectRatio = containerWidth / containerHeight

      let width, height

      if (containerAspectRatio > aspectRatio) {
        width = containerWidth
        height = width / aspectRatio
      } else {
        height = containerHeight
        width = height * aspectRatio
      }

      setDimensions({ width, height })
    }
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    let ctx: gsap.Context

    if (containerRef.current && imageRef.current && dimensions.width > 0) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${dimensions.width - window.innerWidth}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to(imageRef.current, {
          x: () => -(dimensions.width - window.innerWidth),
          ease: 'none',
        })
      }, containerRef)
    }

    return () => {
      if (ctx) ctx.revert()
    }
  }, [dimensions])

  return (
    <div ref={containerRef} className="w-screen h-screen overflow-hidden">
      <div 
        ref={imageRef} 
        className="h-full relative"
        style={{ width: `${dimensions.width}px` }}
      >
        <Image
          src="/images/panorama-completo-1080.svg"
          alt="Panoramic view"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
      </div>
    </div>
  )
}