'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const stories = [
  {
    name: "Liborio Mejía",
    years: "(1792-1816)",
    image: "/images/Liborio-mejia.png",
    bio: "Liborio Mejía Gutiérrez de Lara fue un valiente hombre rionegrero, recordado por haber asumido la presidencia de las Provincias Unidas de la Nueva Granada en 1816, a los 24 años, siendo hasta entonces el presidente más joven. \n\n En 1813, se unió a la lucha independentista. Tras la renuncia de José Fernández Madrid y la imposibilidad de Custodio García Rovira de asumir la presidencia, Mejía ocupó el cargo. Derrotado en batalla en La Plata, fue capturado por los españoles. En 1816, fue ejecutado en Bogotá, acusado de traición. Con su espíritu tenaz y su visión de igualdad, recordemos esta Navidad la importancia de luchar por un país más justo.",
  },
  {
    name: "José María Córdova",
    years: "(1799-1829)",
    image: "/images/Jose-Maria-Cordoba.png",
    bio: "José María Córdova es una de las figuras militares más destacadas de la independencia de Colombia y de Suramérica, además de uno de los héroes más recordados de Antioquia. Nació en Concepción, un pequeño poblado en jurisdicción de Rionegro. A los 15 años Córdova se unió a las fuerzas del Libertador Simón Bolívar, con quien compartió la visión de una América libre de dominio español. \n\nParticipó en varias batallas claves de la independencia, también contribuyendo significativamente a la victoria que consolidó la independencia de Perú, siendo nombrado El Héroe de Ayacucho. Sin embargo, su relación con Bolívar comenzó a tensarse cuando Córdova expresó su desacuerdo con la visión centralista del Libertador y su idea de perpetuarse en el poder. Esto lo llevó a enfrentarse al régimen de Bolívar, hasta que finalmente fue asesinado en 1829 en El Santuario, Antioquia. Al igual que la Navidad simboliza la unión y la esperanza, la vida de Córdova nos invita a trabajar juntos por un futuro donde los ideales de libertad florezcan, permitiendo que cada persona celebre en un ambiente de paz y amor.",
  },
  {
    name: "Javiera Londoño",
    years: "(1696-1767)",
    image: "/images/Javiera-Lodoño.png",
    bio: "Javiera Londoño fue una mujer muy importante en la historia del periodo colonial en Antioquia. Destacó no solo como una de las pocas mujeres propietarias de grandes extensiones de tierra en la época, sino también como un símbolo de autonomía y filantropía. Junto con su esposo, poseían importantes minas de oro en El Guarzo, una zona que con el tiempo se transformaría en el municipio de El Retiro. \n\nPero su legado va más allá de sus posesiones materiales, pues ella pasó a la historia por su generosa voluntad, mediante la cual otorgó la libertad a más de 120 esclavos. Esta acción de Javiera fue extraordinaria para su tiempo, dado que la esclavitud era ampliamente aceptada en la sociedad colonial. En esta temporada navideña, celebramos la valentía de Javiera, quien encarna otros valores del espíritu de la Navidad: la solidaridad y la esperanza.",
  }
];

const Historia: React.FC = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="relative min-h-screen flex flex-col-reverse md:flex-row bg-[#9a1616] text-[#fefaf1]">
      {/* Columna Izquierda (Texto) en modo Escritorio */}
      <div className="md:w-3/5 w-full flex flex-col justify-end p-5 md:p-[5%] text-center md:text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStoryIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="font-JosefinSans text-[1.5rem] text-[#fefaf1] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentStory.name} <span className="text-[1.2rem]">{currentStory.years}</span>
            </motion.h2>
            {/* Divide el texto por saltos de línea */}
            {currentStory.bio.split('\n\n').map((line, index) => (
              <motion.p
                key={index}
                className="font-MinionPro text-[1rem] text-[#fefaf1] mb-4 md:mb-6 text-justify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Columna Derecha (Imagen) en modo Escritorio */}
      <div className="md:w-2/5 w-full md:pt-[3%] pt-[30%]  flex items-center justify-center bg-[#9a1616] relative p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-auto flex items-center justify-center"
          >
            <Image
              src={currentStory.image}
              alt={currentStory.name}
              width={400}
              height={400}
              className="object-contain w-3/4 md:w-full max-h-[70vh]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Historia;
