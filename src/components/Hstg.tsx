import Image from 'next/image'

export default function Hstg() {
  return (
    <div className="flex flex-col sm:flex-row bg-[#fefaf1] min-h-screen relative z-[100]">
      {/* Columna izquierda (Imagen) */}
      <div className="w-full sm:w-1/2 flex items-center justify-center pt-[20%] sm:p-0">
        <Image
          src="/images/QR.svg"
          alt="QR Code"
          width={300}
          height={300}
          className="max-w-full h-auto"
        />
      </div>

      {/* Columna derecha (Texto) */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center p-8">
        <h2 className="font-JosefinSans text-[2rem] leading-tight text-[#004141] mb-6 text-center sm:text-left">
          Crea tus historias <br />
          junto a nosotros
        </h2>
        <p className="font-MinionPro text-[1.125rem] text-[#004141] pr-0 sm:pr-[20%] text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  )
}
