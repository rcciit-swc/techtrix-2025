import SVGIcon from '@/components/SVGIcon';
import Image from 'next/image';

const HeroBg = ({ showAssets = true }: { showAssets?: boolean }) => {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden ">
        {/* Background */}
        <div className="inset-0">
          <Image
            src="https://i.postimg.cc/pVDLP06f/stars2.png"
            alt="Starfield Background"
            fill
            className="object-cover"
            quality={100}
          />
        </div>
        {showAssets && (
          <div className="absolute top-0 left-0 h-full flex items-center">
            <SVGIcon
              iconName="heroBG"
              className="max-md:w-[700px]   absolute left-0 top-0"
            />
            <SVGIcon
              iconName="heroBG2"
              className="max-md:w-[700px]  absolute left-0 top-0"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HeroBg;
