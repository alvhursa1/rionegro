'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Select } from './Select';
import { EventCard } from './EventCard';

// Definimos la interfaz para los eventos
interface Event {
  id: number;
  title: string;
  date: string;
  location: 'Parque Plaza de la Libertad' | 'Paisajes del Agua';
  image: string;
}

// Lista de eventos
const events: Event[] = [
  { id: 1, title: 'Concierto de Navidad', date: '24 Dic 2024, 20:00', location: 'Parque Plaza de la Libertad', image: '/images/carrusel/01-carrusel-rionegro.jpg' },
  { id: 2, title: 'Desfile de Luces', date: '25 Dic 2024, 19:00', location: 'Paisajes del Agua', image: '/images/carrusel/02-carrusel-rionegro.jpg' },
  { id: 3, title: 'Mercado Navideño', date: '26 Dic 2024, 10:00', location: 'Paisajes del Agua', image: '/images/carrusel/03-carrusel-rionegro.jpg' },
  { id: 4, title: 'Obra de Teatro', date: '27 Dic 2024, 18:00', location: 'Parque Plaza de la Libertad', image: '/images/carrusel/04-carrusel-rionegro.jpg' },
  { id: 5, title: 'Encendido de Árbol', date: '1 Dic 2024, 20:00', location: 'Paisajes del Agua', image: '/images/carrusel/05-carrusel-rionegro.jpg' },
  { id: 6, title: 'Cena Benéfica', date: '15 Dic 2024, 21:00', location: 'Parque Plaza de la Libertad', image: '/images/carrusel/06-carrusel-rionegro.jpg' },
  { id: 7, title: 'Concierto de Año Nuevo', date: '31 Dic 2024, 22:00', location: 'Paisajes del Agua', image: '/images/carrusel/07-carrusel-rionegro.jpg' },
  { id: 8, title: 'Exposición de Belenes', date: '20 Dic 2024, 10:00', location: 'Parque Plaza de la Libertad', image: '/images/carrusel/08-carrusel-rionegro.jpg' },
  { id: 9, title: 'Taller de Adornos', date: '18 Dic 2024, 16:00', location: 'Paisajes del Agua', image: '/images/carrusel/09-carrusel-rionegro.jpg' },
  { id: 10, title: 'Concierto de Villancicos', date: '22 Dic 2024, 19:00', location: 'Parque Plaza de la Libertad', image: '/images/carrusel/10-carrusel-rionegro.jpg' },
];

export const CarruselEventos: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const filteredEvents = selectedLocation 
    ? events.filter(event => event.location === selectedLocation)
    : events;

  return (
    <div className="relative z-[100] w-screen h-screen bg-[#fefaf1] text-[#004141] overflow-hidden">
      <div className="  pl-[5%] pb-[5%]">
        <h1 className="text-2xl md:text-[2rem] font-JosefinSans mb-[3%] pt-[5%]">Eventos especiales</h1>
        <Select
          options={['Parque Plaza de la Libertad', 'Paisajes del Agua']}
          onChange={(value) => setSelectedLocation(value)}
          placeholder="Seleccionar ubicación"
        />
      </div>
      <motion.div
        className="flex mt-4"
        animate={{
          x: [0, -100 * filteredEvents.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </motion.div>
    </div>
  );
};

export default CarruselEventos;