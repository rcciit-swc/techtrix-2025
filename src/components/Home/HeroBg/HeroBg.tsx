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
          <div className="absolute bottom-0 w-full h-10 bg-[#030204] bg-opacity-60 backdrop-blur-sm" />
        </div>

        {/* LeftHero Decorative Element with Shadow */}
        <div className="absolute top-0 left-0 h-full flex items-center">
          <div className="relative w-[650px] h-[750px] lg:w-[700px] lg:h-[800px] rotate-[-25deg] lg:rotate-[-30deg]">
            {/* Main Image */}
            <Image
              src="/assets/home/LeftHero.png"
              alt="Left Hero Decorative Element"
              fill
              className="object-contain -translate-x-[190px] -translate-y-[160px] lg:-translate-x-[150px] lg:-translate-y-[80px]"
            />

            {/* Shadow Image (slightly offset) */}
            <Image
              src="/assets/home/LeftHero.png"
              alt="Left Hero Shadow"
              fill
              className="object-contain opacity-30 -translate-x-[300px] -translate-y-[170px] lg:-translate-x-[320px] lg:-translate-y-[65px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBg;
