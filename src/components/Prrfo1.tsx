'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image'

export default function Prrfo1() {
  const componentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.column', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="relative z-[100] flex flex-col md:flex-row bg-[#004141] min-h-screen text-[#fefaf1]">
      <div className="column flex-1 flex-col justify-center mt-10 p-8 md:p-16">
        <h1 className="font-josefin text-[2rem] leading-tight text-start font-JosefinSans font-normal">
          La Ruta de la Navidad trae la <br />
          mejor experiencia de Rionegro <br />
          para disfrutar en familia
        </h1>

        <p className="font-MinionPro text-[1.125rem] mb-4 pt-[5%] md:mb-8 text-justify">
          Este año, nuestra ciudad se viste de alegría y color para celebrar las tradiciones que nos unen. Desde los héroes rionegreros hasta el recorrido de luces, cada rincón de nuestra ciudad cobra vida. Únete a nosotros para celebrar la paz, la esperanza y la unión, recordando que Rionegro es la Cuna de la Libertad, un lugar donde los sueños y la solidaridad brillan con fuerza.
          ¡Te esperamos para vivir en familia la magia de la Navidad!

        </p>
        <Link href="/historia">
          <button className="bg-transparent border border-white text-white px-12 py-3 mt-32 md:mt-8 rounded-full text-lg font-bold hover:bg-white hover:text-[#74131f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            Conoce más
          </button>
        </Link>

      </div>
      <div className="column flex-1 flex flex-col items-center justify-center p-8">
      <Image
          src="/images/arbol-home.svg"
          alt="QR Code"
          width={400}
          height={400}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
