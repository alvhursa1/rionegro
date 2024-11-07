import Image from 'next/image'

export default function Hstg() {
  return (
    <div className="flex bg-[#fefaf1] min-h-screen">
      {/* Left column */}
      <div className="w-1/2 flex items-center justify-center">
        <Image
          src="/images/QR.svg"
          alt="QR Code"
          width={300}
          height={300}
          className="max-w-full h-auto"
        />
      </div>

      {/* Right column */}
      <div className="w-1/2 flex flex-col justify-center p-8">
        <h2 className="font-JosefinSans text-[42px] leading-tight text-[#004141] mb-6">
          Crea tus historias <br />
          junto a nosotros
        </h2>
        <p className="font-MinionPro text-[1.5rem] text-[#004141] pr-[20%] text-justify ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>


    </div>
  )
}