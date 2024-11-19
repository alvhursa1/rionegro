import React from 'react';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
}

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex-shrink-0 w-64 md:w-80 mx-2">
      <div className="relative h-48 md:h-64">
        <Image
          src={event.image}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="bg-white p-4 rounded-b-lg">
        <h2 className="font-minion text-lg md:text-xl font-semibold mb-2">{event.title}</h2>
        <p className="font-josefin text-sm md:text-base mb-1">{event.date}</p>
        <p className="font-josefin text-sm md:text-base text-gray-600">{event.location}</p>
      </div>
    </div>
  );
};