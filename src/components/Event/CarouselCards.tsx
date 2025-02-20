'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const slides: string[] = [
  '/assets/Events/sampleimage.jpg',
  '/assets/Events/sampleimage.jpg',
];

const CarouselCards = () => {
  return (
    <section className="h-screen w-screen flex justify-center items-center bg-black">
      <Swiper
        grabCursor
        centeredSlides
        slidesPerView="auto"
        effect="coverflow"
        loop
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="w-full h-auto py-12"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="bg-center bg-no-repeat bg-contain rounded-lg w-72 h-64"
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </Swiper>
    </section>
  );
};

export default CarouselCards;
