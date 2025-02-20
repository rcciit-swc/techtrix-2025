import Image from 'next/image';
import SVGIcon from '../SVGIcon';

export default function About() {
  return (
    <main className="relative h-fit w-full  overflow-hidden">
      <div className="relative w-full">
        <Image
          src="/assets/home/eventbg.png"
          alt="Event Background"
          fill
          className="object-cover z-[10]"
          quality={100}
        />
      </div>
      <div className="inset-0 bg-repeat-y">
        <Image
          src="/assets/home/star2.svg"
          alt="Starfield Background"
          fill
          className="object-cover bg-repeat-y"
          quality={100}
        />
        {/* <div className="absolute bottom-0 w-full h-10 bg-[#030204] bg-opacity-60 backdrop-blur-sm" /> */}
      </div>
      <div className="relative z-10 min-h-screen container mx-auto px-6">
        <h1 className="text-4xl md:text-7xl font-bold font-kagitingan text-white text-center pt-12">
          ABOUT
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-between">
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
        </div>
      </div>
    </main>
  );
}
