'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SVGIcon from '../SVGIcon';
import EventCard from '../profile/EventCard';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/stores';
import { login } from '@/utils/functions/login';
import { toast } from 'sonner';
import ButtonLanding from '../Home/ButtonLanding';
import { generateReferralCode } from '@/utils/functions/referral-code';

const extendedEvents = [
  {
    image: 'https://i.postimg.cc/4y8SDw39/Community-Posters.png',
    title: 'Techtrix 2025 - Orientation Day 1',
    date: '24th February 2025',
    time: '10:00 AM',
    link: 'https://lu.ma/bk6sxplg',
  },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ isOpen, onClose }: ModalProps) {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const referralLink = referralCode ? `http://localhost:3000/referral?code=${referralCode}` : '';

  useEffect(() => {
    if (isOpen) {
     
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#121212] p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4 font-kagitingan">Refer Techtrix 2025</h2>
        {loading ? (
          <p className="text-gray-300">Generating referral code...</p>
        ) : referralCode ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full p-2 text-white bg-gray-800 rounded-md border border-gray-600 cursor-not-allowed"
            />
            <button
              className="bg-pink-600 text-white px-3 py-2 rounded-md hover:bg-pink-700"
              onClick={copyToClipboard}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ) : (
          <p className="text-red-500">Failed to generate referral code.</p>
        )}
        <button
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function About() {
  const { userData } = useUser();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-fit w-full overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-6">
        <div
          id="ext-events"
          className="flex flex-col items-center gap-5 justify-center"
        >
          <h1
            id="glowPink"
            className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pt-12 pb-4 sm:pb-6 text-left z-10"
          >
            EXTENDED EVENTS
          </h1>
          <div className="relative mt-3 w-full flex flex-row items-center justify-center">
            {extendedEvents.map((event, index) => (
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
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-10">
        <ButtonLanding
          text="Refer Techtrix 2025"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="relative z-10 container mx-auto px-6">
        <h1
          id="glowPink"
          className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-center mt-14 z-10"
        >
          ABOUT
        </h1>
        <div className="flex flex-col-reverse px-2 lg:px-5 w-full lg:flex-row items-center justify-between">
          <div className="lg:w-[60%] w-full text-center flex flex-col items-start mt-10">
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
            className="w-full h-full lg:w-[40%] lg:h-[300px]"
            alt=""
            width={1000}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
