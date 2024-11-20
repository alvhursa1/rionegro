'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import TrainAnimado from './TrainAnimado';
import Hder from './Hder';
import PopupWindow from './PopupWindow';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function SmoothHorizontalScrollPanorama() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState({ width: 5760, height: 1080 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [activePopupIndex, setActivePopupIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const desktopSpeedFactor = 0.5;
  const mobileSpeedFactor = 0.7;
  const speedFactor = isDesktop ? desktopSpeedFactor : mobileSpeedFactor;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateImageSize = () => {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const imageAspectRatio = 5760 / 1080;
        const calculatedWidth = Math.ceil(viewportHeight * imageAspectRatio);
        setImageSize({ width: calculatedWidth, height: viewportHeight });
        setIsDesktop(viewportWidth >= 1024);
        setIsMobile(viewportWidth < 768);
        setViewportDimensions({ width: viewportWidth, height: viewportHeight });
      };

      updateImageSize();
      window.addEventListener('resize', updateImageSize);
      return () => window.removeEventListener('resize', updateImageSize);
    }
  }, []);

  const xRange = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(imageSize.width - viewportDimensions.width)]
  );

  const x = useSpring(xRange, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleEnterClick = () => {
    setIsScrollActive(true);
    document.body.classList.remove('overflow-hidden'); // Enable scroll
  };

  const popupData = [
    {
      title: 'Parque Plaza La Libertad',
      content: '¡Comienza un recorrido mágico en familia por Rionegro! La primera parada es el Parque Principal, donde las luces brillantes y decoraciones festivas dan la bienvenida a la Navidad frente a nuestra Concatedral de San Nicolás el Magno. ¡No te lo pierdas!',
      range: [0, 0.33],
    },
    {
      title: 'Calle Alcaldía',
      content: 'Donde la magia de la Navidad cobra vida. Disfruta de un ambiente alegre con luces, música y amor para crear recuerdos inolvidables mientras recorres con amigos y seres queridos. Ven a vivir la esencia de la Navidad en el corazón de Rionegro y celebra con nosotros esta temporada de alegría.',
      range: [0.33, 0.66],
    },
    {
      title: 'Paisajes del Agua',
      content: 'Paisajes del Agua, una experiencia navideña junto al río que ilumina la noche con un hermoso espectáculo de luces. Aquí, podrás explorar un encantador mercadillo navideño, disfrutar de delicias locales y dejarte envolver por la magia del entorno. ¡Ven a celebrar con nosotros y vive una experiencia inolvidable en esta nueva zona de Rionegro!',
      range: [0.66, 1],
    },
  ];

  useEffect(() => {
    if (!isScrollActive) {
      document.body.classList.add('overflow-hidden'); // Disable scroll initially on all devices
    }
    return () => document.body.classList.remove('overflow-hidden'); // Cleanup on unmount
  }, [isScrollActive]);

  useEffect(() => {
    scrollYProgress.onChange((progress) => {
      const newIndex = popupData.findIndex(
        (popup) => progress >= popup.range[0] && progress < popup.range[1]
      );
      setActivePopupIndex(newIndex);
    });
  }, [scrollYProgress]);

  const MobilePopupAccordion = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div className="fixed top-[10%] left-[10%] bg-white bg-opacity-90 p-4 rounded-lg shadow-lg w-5/6 z-50 md:hidden">
        <div className="flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
          <h2 className="text-lg font-['MinionItalic'] text-[#74131f]">
            {popupData[activePopupIndex]?.title}
          </h2>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 overflow-hidden"
            >
              <p className="text-sm font-['MinionPro-Regular'] text-black">
                {popupData[activePopupIndex]?.content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {!isScrollActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-[#74131f] z-50 flex flex-col items-center justify-center"
          >
            <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mb-8">
              <Image
                src="/images/Logo-rionegro-blanco.svg"
                alt="Logo Rionegro"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <p className="text-white text-center text-lg sm:text-xl mb-8">
              La Ruta de la Navidad te invita a vivir la mejor experiencia de Rionegro en familia.
            </p>
            <button
              onClick={handleEnterClick}
              className="bg-white text-[#74131f] px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition"
            >
              Entrar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrollActive ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div
          ref={containerRef}
          style={{
            height: `${(imageSize.width - viewportDimensions.width) / speedFactor +
              viewportDimensions.height}px`,
          }}
        />
        <motion.div
          className="fixed top-0 left-0 h-screen overflow-hidden"
          style={{
            x,
            width: `${imageSize.width}px`,
            willChange: 'transform',
          }}
        >
          <div className="relative h-full w-full -ml-[0.3%]">
            <Image
              src={isDesktop ? '/images/panorama-completo-1080-2.svg' : '/images/panorama-completo-1080-2.png'}
              alt="Panoramic view"
              fill
              sizes={`${imageSize.width}px`}
              style={{
                objectFit: 'cover',
                objectPosition: 'left',
              }}
              priority
              quality={100}
            />
          </div>
        </motion.div>
      </motion.div>

      {isScrollActive && (
        <>
          <div className="fixed top-0 left-0 w-full pointer-events-auto z-[60]">
            <Hder />
          </div>
          <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none z-40">
            <div className={`absolute ${isDesktop ? 'bottom-[14%] left-[3%] w-1/3 h-1/3' : 'absolute bottom-[11%] left-0 w-full h-1/4'} z-0`}>
              <TrainAnimado />
            </div>
          </div>
        </>
      )}

      {isScrollActive && (
        <>
          {isMobile && <MobilePopupAccordion />}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-30 flex flex-col items-center md:flex hidden">
            {popupData.map((popup, index) => (
              <PopupWindow
                key={index}
                title={popup.title}
                content={popup.content}
                isActive={index === activePopupIndex}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
