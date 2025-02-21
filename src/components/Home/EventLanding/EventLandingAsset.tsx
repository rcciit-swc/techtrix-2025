import { Suspense } from "react";
import Image from "next/image";
import Spline from "@splinetool/react-spline";

const EventLandingAsset = () => {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-full">
          <Image
            alt=""
            src={"https://i.postimg.cc/qqZZmV0n/board.png"}
            width={100}
            height={100}
            quality={100}
            className="w-screen h-full"
          />
        </div>
      }
    >
      <div>
        <Spline
          scene="https://prod.spline.design/KEELmKSXO3Evqb00/scene.splinecode"
          className="object-cover"
        />
      </div>
    </Suspense>
  );
};

export default EventLandingAsset;
