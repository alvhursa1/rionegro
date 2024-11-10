'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Volume2, VolumeX, Plus, Minus } from 'lucide-react'

const Hder: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const volumeControlRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    audioRef.current = new Audio('/merry-2.mp3')
    audioRef.current.loop = true
    audioRef.current.play().catch(error => console.log('Audio playback failed:', error))

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
      audioRef.current.volume = volume
    }
  }, [isMuted, volume])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setIsVolumeControlVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const increaseVolume = () => {
    setVolume(prev => Math.min(prev + 0.1, 1))
    setIsMuted(false)
  }

  const decreaseVolume = () => {
    setVolume(prev => Math.max(prev - 0.1, 0))
  }

  const toggleVolumeControl = () => {
    setIsVolumeControlVisible(!isVolumeControlVisible)
  }

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">

      <div className="container mx-auto flex justify-between items-center">
        <div className="pl-[2%] pt-[2%]">
        <Link href="/">
          <Image
            src="/images/Logo-rionegro-blanco.svg"
            alt="Logo Rionegro"
            width={100}
            height={50}
            priority
          />
          </Link>
        </div>
        <div className="pr-[2%] flex items-center space-x-4">
          <Link 
            href="/historia" 
            className="text-white hover:text-gray-300 transition-colors duration-300 text-lg font-MinionItalic"
          >
            Historia
          </Link>
          <div className="relative" ref={volumeControlRef}>
            <button
              onClick={toggleVolumeControl}
              className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white hover:bg-opacity-30 transition-colors duration-300"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            {isVolumeControlVisible && (
              <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={decreaseVolume}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors duration-300"
                    aria-label="Decrease volume"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-gray-700 w-12 text-center">
                    {Math.round(volume * 100)}%
                  </span>
                  <button
                    onClick={increaseVolume}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors duration-300"
                    aria-label="Increase volume"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={toggleMute}
                  className={`w-full py-2 px-4 rounded ${
                    isMuted
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-gray-200 text-gray-700'
                  } hover:bg-gray-400 transition-colors duration-300`}
                >
                  {isMuted ? 'Sonido' : 'Mutear'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hder