'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const biographies = [
  {
    name: "Liborio Mejía",
    years: "(1792-1816)",
    image: "/images/Liborio-mejia.png",
    bio: "Liborio Mejía Gutiérrez de Lara fue un valiente hombre rionegrero, recordado por haber asumido la presidencia de las Provincias Unidas de la Nueva Granada en 1816, a los 24 años, siendo hasta entonces el presidente más joven. \n\nEn 1813, se unió a la lucha independentista. Tras la renuncia de José Fernández Madrid y la imposibilidad de Custodio García Rovira de asumir la presidencia, Mejía ocupó el cargo. Derrotado en batalla en La Plata, fue capturado por los españoles. En 1816, fue ejecutado en Bogotá, acusado de traición. Con su espíritu tenaz y su visión de igualdad, recordemos esta Navidad la importancia de luchar por un país más justo."

  },
  {
    name: "José María Córdova",
    years: "(1799-1829)",
    image: "/images/Jose-Maria-Cordoba.png",
    bio: "José María Córdova es una de las figuras militares más destacadas de la independencia de Colombia y de Suramérica, además de uno de los héroes más recordados de Antioquia. Nació en Concepción, un pequeño poblado en jurisdicción de Rionegro. A los 15 años Córdova se unió a las fuerzas del Libertador Simón Bolívar, con quien compartió la visión de una América libre de dominio español. \n\nParticipó en varias batallas claves de la independencia, también contribuyendo significativamente a la victoria que consolidó la independencia de Perú, siendo nombrado 'El Héroe de Ayacucho'. Sin embargo, su relación con Bolívar comenzó a tensarse cuando Córdova expresó su desacuerdo con la visión centralista del Libertador y su idea de perpetuarse en el poder. Esto lo llevó a enfrentarse al régimen de Bolívar, hasta que finalmente fue asesinado en 1829 en El Santuario, Antioquia. Al igual que la Navidad simboliza la unión y la esperanza, la vida de Córdova nos invita a trabajar juntos por un futuro donde los ideales de libertad florezcan, permitiendo que cada persona celebre en un ambiente de paz y amor."
  },
  {
    name: "Javiera Londoño",
    years: "(1696-1767)",
    image: "/images/Javiera-Lodoño.png",
    bio: "Javiera Londoño fue una mujer muy importante en la historia del periodo colonial en Antioquia. Destacó no solo como una de las pocas mujeres propietarias de grandes extensiones de tierra en la época, sino también como un símbolo de autonomía y filantropía. Junto con su esposo, poseían importantes minas de oro en El Guarzo, una zona que con el tiempo se transformaría en el municipio de El Retiro. \n\nPero su legado va más allá de sus posesiones materiales, pues ella pasó a la historia por su generosa voluntad, mediante la cual otorgó la libertad a más de 120 esclavos. Esta acción de Javiera fue extraordinaria para su tiempo, dado que la esclavitud era ampliamente aceptada en la sociedad colonial. En esta temporada navideña, celebramos la valentía de Javiera, quien encarna otros valores del espíritu de la Navidad: la solidaridad y la esperanza."
  }
]

export default function Htra() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % biographies.length)
    }, 10000) // Change slide every 10 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (carouselRef.current && textRef.current) {
      gsap.to(carouselRef.current, {
        x: `-${currentSlide * 100}%`,
        duration: 1,
        ease: "power3.inOut"
      })

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
    }
  }, [currentSlide])

  return (
    <div className="bg-[#9a1616] text-white min-h-screen flex flex-col pt-[5%] pb-[3%] pl-[3%]">
      <div className="flex-grow flex">
        {/* Left column - Text */}
        <div className="w-1/2 pr-8 flex flex-col justify-center" ref={textRef}>
          <p className="font-minion text-[1rem] mb-4 whitespace-pre-line text-justify">
            {biographies[currentSlide].bio}
          </p>
          <h2 className="font-josefin text-[1.5rem]">
            {biographies[currentSlide].name} {biographies[currentSlide].years}
          </h2>
        </div>

        {/* Right column - Images */}
        <div className="w-1/2 relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ width: `${biographies.length * 100}%` }}
          >
            {biographies.map((bio, index) => (
              <div key={index} className="w-full flex-shrink-0 relative h-full">
                <Image
                  src={bio.image}
                  alt={bio.name}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="left center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center p-4">
        {biographies.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap');
        @font-face {
          font-family: 'Minion Pro';
          src: url('/fonts/MinionPro-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        .font-josefin {
          font-family: 'Josefin Sans', sans-serif;
        }
        .font-minion {
          font-family: 'Minion Pro', serif;
        }
      `}</style>
    </div>
  )
}