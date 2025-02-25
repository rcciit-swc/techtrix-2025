import About from '@/components/About';
import { HeroBg } from '@/components/Home/HeroBg';
import { HeroGlobeText } from '@/components/Home/HeroGlobeText';
import { EventLanding } from '@/components/Home/EventLanding';
import Image from 'next/image';
import { generateReferralCode } from '@/utils/functions/referral-code';

const Page = async () => {
    const code = await generateReferralCode();
  return (
    <>
      <div className="fade-in">
        <div className="inset-0">
          <Image
            src="https://i.postimg.cc/pVDLP06f/stars2.png"
            alt="Starfield Background"
            fill
            className="object-cover bg-repeat-y h-full"
            quality={100}
          />
          <div className="absolute bottom-0 w-full h-10 bg-[#030204] bg-opacity-60 backdrop-blur-lg" />
        </div>
        <div className="relative w-full h-screen">
          <div className="absolute inset-0 z-0">
            <HeroBg />
          </div>
          <div className="relative z-10 flex justify-center items-center h-full">
            <HeroGlobeText />
          </div>
        </div>
        <About />
        <div className="relative min-h-screen flex items-center justify-center">
          <EventLanding />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Page;
