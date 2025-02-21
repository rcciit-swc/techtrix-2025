'use client';
import Image from 'next/image';
import SVGIcon from '../SVGIcon';
import EventCard from '../profile/EventCard';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/stores';
import { login } from '@/utils/functions/login';
import { toast } from 'sonner';

const extendedEvents = [
  {
    image: 'https://i.postimg.cc/4y8SDw39/Community-Posters.png',
    title: 'Techtrix 2025 - Orientation Day 1',
    date: '20th March 2025',
    time: '10:00 AM',
    link: 'https://lu.ma/bk6sxplg',
  },
];
export default function About() {
  const { userData } = useUser();
  const router = useRouter();
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
        <div className="absolute bottom-0 w-full h-10 bg-[#030204] bg-opacity-60 backdrop-blur-sm" />
      </div>
      <div className="relative z-10  container mx-auto px-6">
       <div id='ext-events' className='flex flex-col items-center gap-5 justify-center'>
       <h1   id="glowPink"
        className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pt-12 pb-4 sm:pb-6 text-left z-10">
          EXTENDED EVENTS
        </h1>
        <div className="relative mt-3 w-full flex flex-row items-center justify-center">
          {extendedEvents.map((event, index) => {
            return (
              <EventCard
                key={index}
                image_url={event.image}
                title={event.title}
                showExploreButton={true}
                schedule={event.date + ' ' + event.time}
                exploreAction={async () => {
                  try {
                    if (!userData) {
                      await login();
                      const checkUserLoggedIn = setInterval(() => {
                        const updatedUser = useUser().userData; 
                        if (updatedUser) {
                          clearInterval(checkUserLoggedIn);
                          router.push(event.link);
                        }
                      }, 500); 
                
                      setTimeout(() => clearInterval(checkUserLoggedIn), 5000); 
                    } else {
                      router.push(event.link);
                    }
                  } catch (e) {
                    toast.error('An error occurred. Please try again later.');
                  }
                }}
                
                button_text="Register"
              />
            );
          })}
        </div>
      </div>
       </div>
      <div className="relative z-10  container mx-auto px-6">
        <h1   id="glowPink"
        className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-center mt-10 z-10">
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
