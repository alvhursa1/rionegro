import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PopupWindowProps {
  title: string;
  content: string;
  isActive: boolean;
}

const PopupWindow: React.FC<PopupWindowProps> = ({ title, content, isActive }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popupRef.current) {
      if (isActive) {
        gsap.fromTo(popupRef.current, 
          { opacity: 0, x: 100 }, 
          { opacity: 1, x: 0, duration: 2, ease: 'power3.out' }
        );
      } else {
        gsap.to(popupRef.current, { opacity: 0, x: -100, duration: 2, ease: 'power3.in' });
      }
    }
  }, [isActive]);

  return (
    <div 
      ref={popupRef} 
      className="fixed right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-85 p-8 rounded-lg shadow-lg w-96 z-30"
      style={{ opacity: 0 }} // Inicialmente oculto
    >
      <h2 className="text-[1.875rem] font-['MinionItalic'] mb-4 text-[#74131f]">{title}</h2>
      <p className="text-[1rem] leading-[1.25rem] font-['MinionPro-Regular'] text-black">{content}</p>
    </div>
  );
};

export default PopupWindow;