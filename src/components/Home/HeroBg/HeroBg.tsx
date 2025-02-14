import Image from 'next/image';

const HeroBg = () => {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="inset-0">
          <Image
            src="/assets/home/star.svg"
            alt="Starfield Background"
            fill
            className="object-cover"
            quality={100}
          />
        </div>

        {/* Techtrix Logo (fixed at top-left) */}
        {/* <div className="absolute top-2 left-2 z-50 w-[300px] h-[200px] hidden lg:block">
          <Image
            src="/assets/home/TechtrixLogo.png"
            alt="Techtrix Logo"
            fill
            className="object-contain"
          />
        </div> */}

        {/* LeftHero Decorative Element with Shadow */}
        <div className="absolute top-0 left-0 h-full flex items-center">
          <div className="relative w-[600px] h-[800px] rotate-[-30deg]">
            {/* Main Image */}
            <Image
              src="/assets/home/LeftHero.png"
              alt="Left Hero Decorative Element"
              fill
              className="object-contain"
              style={{ transform: 'translate(-80px, -50px)' }}
            />

            {/* Shadow Image (slightly offset) */}
            <Image
              src="/assets/home/LeftHero.png"
              alt="Left Hero Shadow"
              fill
              className="object-contain opacity-30"
              style={{ transform: 'translate(-200px, -50px)' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBg;
