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
import "./HztalScrollSmooth.config.css";

gsap.registerPlugin(ScrollTrigger);

const PopupContainer: React.FC<{ activePopup: number }> = ({ activePopup }) => {
  const popupData = [
    {
      title: "Parque Plaza La Libertad",
      content: "¡Comienza un recorrido mágico en familia por Rionegro! La primera parada es el Parque Principal, donde las luces brillantes y decoraciones festivas dan la bienvenida a la Navidad frente a nuestra Concatedral de San Nicolás el Magno. ¡No te lo pierdas!"
    },
    {
      title: "Calle Alcaldía",
      content: "Donde la magia de la Navidad cobra vida. Disfruta de un ambiente alegre con luces, música y amor para crear recuerdos inolvidables mientras recorres con amigos y seres queridos. Ven a vivir la esencia de la Navidad en el corazón de Rionegro y celebra con nosotros esta temporada de alegría."
    },
    {
      title: "Paisajes del Agua",
      content: "Paisajes del Agua, una experiencia navideña junto al río que ilumina la noche con un hermoso espectáculo de luces. Aquí, podrás explorar un encantador mercadillo navideño, disfrutar de delicias locales y dejarte envolver por la magia del entorno. ¡Ven a celebrar con nosotros y vive una experiencia inolvidable en esta nueva zona de Rionegro!"
    }
  ];

  return (
    <>
      {popupData.map((popup, index) => (
        <PopupWindow
          key={index}
          title={popup.title}
          content={popup.content}
          isActive={activePopup === index + 1}
        />
      ))}
    </>
  );
};

const HztalScroll: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initialContentRef = useRef<HTMLDivElement | null>(null);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [showAnimatedTrain, setShowAnimatedTrain] = useState(false);
  const [showHder, setShowHder] = useState(false);
  const [activePopup, setActivePopup] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = () => {
    if (containerRef.current) {
      const aspectRatio = 5760 / 1080;
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const containerAspectRatio = containerWidth / containerHeight;

      let width, height;

      if (containerAspectRatio > aspectRatio) {
        width = containerWidth;
        height = width / aspectRatio;
      } else {
        height = containerHeight;
        width = height * aspectRatio;
      }

      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;

    if (track && container && isScrollActive && dimensions.width > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          invalidateOnRefresh: true,
          pin: true,
          scrub: 4,
          start: "top top",
          end: () => `+=${dimensions.width - container.clientWidth}`,
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
        x: () => -(dimensions.width - container.clientWidth),
        ease: "power1.out",
        duration: 1,
      });
    }
  }, [isScrollActive, dimensions]);

  const handleEnterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Botón clickeado'); // Para depuración

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

  return (
    <div ref={containerRef} className="horizontal-scroll w-full h-screen overflow-hidden relative z-30">
      <div
        ref={trackRef}
        className={`track-h flex text-black h-full ${isScrollActive ? '' : 'pointer-events-none'}`}
        style={{ width: `${dimensions.width}px`, willChange: 'transform' }}
      >
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src="/images/panorama-completo-1080.svg"
            alt="Panoramic view"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="w-full h-full"
          />
        </div>
      </div>

      {isScrollActive && <PopupContainer activePopup={activePopup} />}

      {showHder && (
        <div className="fixed top-0 left-0 w-full pointer-events-auto z-50">
          <Hder />
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none z-40">
        <div className="absolute bottom-[14%] left-[3%] w-1/3 h-1/3 z-0">
          {showAnimatedTrain ? <TrainAnimado /> : <TrainFijo />}
        </div>
      </div>

      <div
        ref={initialContentRef}
        className={`fixed top-0 left-0 w-full h-full bg-[#74131f] z-60 flex flex-col items-center justify-start pt-16 sm:pt-24 transition-opacity duration-1000 ${isScrollActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ touchAction: 'manipulation' }}
      >
        <div className="flex flex-col items-center justify-start h-full w-full px-4 sm:px-0">
          <div className="mb-6 sm:mb-8 relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
            <Image
              src="/images/Logo-rionegro-blanco.svg"
              alt="Logo Rionegro"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <p className="text-white text-[1rem] sm:text-[1.125rem] leading-[1.2rem] sm:leading-[1.25rem] font-['MinionPro-Regular'] mb-8 sm:mb-10 text-center max-w-xs sm:max-w-2xl">
            La Ruta de la Navidad te invita <br />
            a vivir la mejor experiencia de <br />
            Rionegro en familia
          </p>
          <div className="w-full flex justify-center mt-4 sm:mt-6">
            <button
              onClick={handleEnterClick}
              className="bg-white text-[#74131f] px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 touch-action-manipulation"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HztalScroll;