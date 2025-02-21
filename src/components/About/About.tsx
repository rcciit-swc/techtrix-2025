import Image from 'next/image';
import SVGIcon from '../SVGIcon';

export default function About() {
  return (
    <div className="relative h-fit w-full  overflow-hidden">
      <div className="inset-0 bg-repeat-y">
        <Image
          src="https://i.postimg.cc/pVDLP06f/stars2.png"
          alt="Starfield Background"
          fill
          className="object-cover bg-repeat-y"
          quality={100}
        />
        {/* <div className="absolute bottom-0 w-full h-10 bg-[#030204] bg-opacity-60 backdrop-blur-sm" /> */}
      </div>
      <div className="relative z-10  container mx-auto px-6">
        <h1 className="text-4xl md:text-7xl font-bold font-kagitingan text-white text-center pt-12">
          ABOUT
        </h1>
        <div className="flex flex-col-reverse w-full lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 w-full text-center flex flex-col items-start mt-10">
            <h1 className="text-5xl font-bold md:text-4xl lg:text-6xl font-kagitingan">
              TECHTRIX <span className="text-yellow-200">2025</span>
            </h1>
            <p className="text-white/90 text-lg text-justify md:text-xl font-semibold leading-relaxed font-alexandria">
              Techtrix – The Annual Technical Fest of RCCIIT is a celebration of
              technology, innovation, and problem-solving, featuring 25+ dynamic
              events that challenge and inspire participants. The fest is
              divided into five major categories: Automata for coding and AI
              challenges, Flagship Events for high-stakes hackathons and
              innovation competitions, Out of the Box for creative
              problem-solving, Robotics for bot-building and autonomous
              challenges, and Gaming for esports enthusiasts. Beyond
              competitions, Techtrix offers workshops, speaker sessions, and
              hands-on experiences, making it the perfect platform to learn,
              network, and innovate. As Techtrix 2025 approaches, get ready for
              bigger challenges, interactive sessions, and an unforgettable tech
              experience!
            </p>
          </div>
          <Image
            src={'/assets/Home/loader.gif'}
            className="w-full h-full lg:w-[800px] lg:h-[400px]"
            alt=""
            width={1000}
            height={500}
          />
          {/* <SVGIcon
                        iconName="techtrixLogo"
                        className="transition-all w-[600px] duration-300 h-[600px]"
                        // width={isMobile ? 100 : scrolled ? 100 : 160}
                        // height={isMobile ? 100 : scrolled ? 100 : 160}
                      /> */}
        </div>
      </div>
    </div>
  );
}
