import Image from 'next/image'
import React from 'react'
import ButtonLanding from '../Home/ButtonLanding'

const ComingSoon = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://i.postimg.cc/d1PGRJfp/Mac-OS-X-Snow-Leopard.png"
          alt="Starfield Background"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center text-white z-10">
        <h1 className="text-5xl font-bold md:text-6xl lg:text-8xl font-kagitingan">
          TECHTRIX <span className="text-yellow-200">2025</span>
        </h1>
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 font-alexandria">
          Annual Technical Fest of RCCIIT
        </div>
        <ButtonLanding text="Coming Soon" disabled />
      </div>
    </div>
  )
}

export default ComingSoon
