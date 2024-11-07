import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'

export default function Rds() {
  return (
    <div className="flex bg-[#fefaf1] min-h-screen">
      {/* Left column */}
      <div className="w-1/2 flex flex-col justify-center items-end p-8">
        <h2 className="font-JosefinSans text-[2.5rem] leading-tight text-[#004141] mb-6 text-right">
          Haz parte de nuestras <br />
          comunidades
        </h2>
        <div className="flex space-x-4">
          <Link href="https://www.facebook.com" className="bg-[#004141] text-white p-3 rounded-full hover:bg-opacity-80 transition-colors duration-300" aria-label="Facebook">
            <Facebook size={24} />
          </Link>
          <Link href="https://www.instagram.com" className="bg-[#004141] text-white p-3 rounded-full hover:bg-opacity-80 transition-colors duration-300" aria-label="Instagram">
            <Instagram size={24} />
          </Link>
        </div>
      </div>

      {/* Right column */}
      <div className="w-1/2 flex items-center justify-center">
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