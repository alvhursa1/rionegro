'use client';

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import "tailwindcss/tailwind.css";
import TrainAnimado from "./TrainAnimado";
import TrainFijo from "./TrainFijo";
import Hder from "./Hder";
import PopupWindow from "./PopupWindow";

gsap.registerPlugin(ScrollTrigger);

const HztalScroll: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initialContentRef = useRef<HTMLDivElement | null>(null);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [showAnimatedTrain, setShowAnimatedTrain] = useState(false);
  const [showHder, setShowHder] = useState(false);
  const [activePopup, setActivePopup] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;

    if (track && container && isScrollActive) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          invalidateOnRefresh: true,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - document.documentElement.clientWidth}`,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.33) {
              setActivePopup(1);
            } else if (progress < 0.66) {
              setActivePopup(2);
            } else {
              setActivePopup(3);
            }
          },
        },
      });

      tl.to(track, {
        x: () => `-${track.scrollWidth - document.documentElement.clientWidth}px`,
        ease: "none",
      });
    }
  }, [isScrollActive]);

  const handleEnterClick = () => {
    if (initialContentRef.current) {
      gsap.to(initialContentRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          setIsScrollActive(true);
          setShowAnimatedTrain(true);
          setShowHder(true);
        }
      });
    }
  };

  const popupData = [
    {
      title: "Parque Principal",
      content: "¡Comienza un recorrido mágico en familia por Rionegro! La primera parada es el Parque Principal, donde las luces brillantes y decoraciones festivas dan la bienvenida a la Navidad frente a nuestra Concatedral de San Nicolás el Magno. ¡No te lo pierdas y prepárate para la próxima parada!"
    },
    {
      title: "Calle Alcaldía",
      content: "donde la magia de la Navidad cobra vida. Este emblemático lugar se llena de luces brillantes, música festiva y actividades emocionantes para toda la familia. Disfruta de un ambiente alegre para crear recuerdos inolvidables mientras recorres con amigos y seres queridos. Ven a vivir la esencia de la Navidad en el corazón de Rionegro y celebra con nosotros esta temporada de alegría y unión."
    },
    {
      title: "Paisajes del Agua",
      content: "La siguiente parada es Paisajes del Agua, una experiencia navideña junto al río que ilumina la noche con un hermoso espectáculo de luces. Aquí, podrás explorar un encantador mercadillo navideño, disfrutar de delicias locales y dejarte envolver por la magia del entorno. ¡Ven a celebrar con nosotros y vive una experiencia inolvidable en esta nueva zona de Rionegro!"
    }
  ];

  return (
    <div ref={containerRef} className="horizontal-scroll w-full h-screen overflow-hidden relative z-30">
      {/* Contenedor principal para el scroll horizontal */}
      <div
        ref={trackRef}
        className={`track-h flex text-black w-[300vw] h-full ${isScrollActive ? '' : 'pointer-events-none'}`}
        style={{ willChange: 'transform' }}
      >
        {['Slider-1', 'Slider-2', 'Slider-3'].map((slide, index) => (
          <div key={slide} className="subsection w-screen h-full flex-shrink-0 relative">
            <Image
              src={`/images/${slide}.svg`}
              alt={`SVG Fullscreen ${index + 1}`}
              layout="fill"
              objectFit="contain"
              quality={100}
              priority={index === 0}
            />
            {/* Imagen superpuesta */}
{/*             <Image
              src={`/images/Frente-A${index + 1}.png`}
              alt={`Frente A${index + 1}`}
              layout="fill"
              objectFit="button"
              quality={100}
              priority={index === 0}
              className="z-10"
            /> */}
          </div>
        ))}
      </div>

      {/* Popup Windows */}
      {popupData.map((popup, index) => (
        <PopupWindow
          key={index}
          title={popup.title}
          content={popup.content}
          isActive={activePopup === index + 1}
        />
      ))}

      {/* Contenedor para Hder, TrainFijo y TrainAnimado */}
      <>
        {showHder && (
          <div className="fixed top-0 left-0 w-full pointer-events-auto z-50">
            <Hder />
          </div>
        )}
        <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none z-40">
          <div className="absolute bottom-[8%] left-[3%] w-1/3 h-1/3 z-0">
            {showAnimatedTrain ? <TrainAnimado /> : <TrainFijo />}
          </div>
        </div>
      </>

      {/* Contenedor para el fondo, logo, texto y botón */}
      <div 
        ref={initialContentRef}
        className={`fixed top-0 left-0 pb-[10%] w-full h-full bg-[#74131f] z-60 flex flex-col items-center justify-center transition-opacity duration-1000 ${isScrollActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="mb-2 relative w-[200px] h-[200px]">
          <Image
            src="/images/Logo-rionegro-blanco.svg"
            alt="Logo Rionegro"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <p className="text-white text-[1.5rem] font-['MinionPro-Regular'] mb-8 text-center px-4 max-w-2xl">
        La Ruta de la Navidad trae la <br />
        mejor experiencia de Rionegro <br />
        para disfrutar en familia 
        </p>
        <button
          onClick={handleEnterClick}
          className="bg-white text-[#74131f] px-12 py-3 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default HztalScroll;