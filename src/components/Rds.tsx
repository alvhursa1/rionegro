import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'

export default function Rds() {
  return (
    <div className="flex flex-col sm:flex-row bg-[#fefaf1] min-h-screen relative z-[100]">
      {/* Columna izquierda (Texto) */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center sm:items-end p-8">
        <h2 className="font-JosefinSans text-[2rem] leading-tight text-[#004141] mb-6 text-center sm:text-right">
          Haz parte de nuestras <br />
          comunidades
        </h2>
        <div className="flex space-x-4 justify-center sm:justify-end">
          <Link
            href="https://www.facebook.com"
            className="bg-[#004141] text-white p-3 rounded-full hover:bg-opacity-80 transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </Link>
          <Link
            href="https://www.instagram.com"
            className="bg-[#004141] text-white p-3 rounded-full hover:bg-opacity-80 transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </Link>
        </div>
      </div>

      {/* Columna derecha (Imagen) */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-4 sm:p-0">
        <Image
          src="/images/Redes.svg"
          alt="Social Networks"
          width={400}
          height={400}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  )
}
