import { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onFinish?: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 0);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 
        transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="w-3/4 md:w-1/2 lg:w-1/3">
        <Image
          src="/assets/Home/ohyeah.gif"
          alt="Loading..."
          width={400}
          height={400}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default SplashScreen;