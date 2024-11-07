'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Prrfo1() {
  const componentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.column', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }, componentRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={componentRef} className="flex flex-col md:flex-row bg-[#004141] min-h-screen text-white">
      <div className="column flex-1 flex items-center justify-center p-8 md:p-16">
        <h1 className="font-josefin text-[2.625rem] leading-tight text-center">
          ¡Bienvenidos a la Navidad en <br />
          Rionegro 2024!
        </h1>
      </div>
      <div className="column flex-1 flex flex-col items-center justify-center p-8 md:p-16">
        <p className="font-minion text-[1.5rem] mb-8 text-center">
          Este año, nuestra ciudad se viste de alegría y color para celebrar las tradiciones que nos unen. Disfruta de un recorrido lleno de luces, naturaleza y delicias navideñas que evocan el espíritu de esta mágica temporada. Desde las emblemáticas figuras rionegreras hasta los sabores de la natilla y los buñuelos, cada rincón de nuestra ciudad cobra vida con el calor de la comunidad. Únete a nosotros para celebrar la paz, la esperanza y la unión, recordando que Rionegro es la Cuna de la Libertad, un lugar donde los sueños y la solidaridad brillan con fuerza en estas fiestas. 
          ¡Te esperamos para vivir en familia la magia de la Navidad!
        </p>
        <button className="bg-transparent border border-white text-white px-12 py-3 rounded-full text-lg font-bold hover:bg-white hover:text-[#74131f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
          Conoce más
        </button>
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