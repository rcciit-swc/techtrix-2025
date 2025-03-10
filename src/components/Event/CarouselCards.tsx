'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from 'next/image';

const slides: string[] = [
  '/assets/Events/sampleimage.jpg',
  '/assets/Events/sampleimage.jpg',
  '/assets/Events/sampleimage.jpg',
  '/assets/Events/sampleimage.jpg',
  '/assets/Events/sampleimage.jpg',
  '/assets/Events/sampleimage.jpg',
  '/assets/Events/sampleimage.jpg',
];

const CarouselCards = ({
  events,
  categoryName,
  categoryId,
}: {
  events: any;
  categoryName: string;
  categoryId: string;
}) => {
  return (
    <section className="bg-black min-h-screen max-w-[90%] overflow-x-hidden flex flex-col items-center justify-center p-4 gap-10">
      <h1 className="font-kagitingan text-5xl text-white">{categoryName}</h1>
      <div className="w-full overflow-x-hidden ">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          loop={true}
          autoplay={true}
          pagination={{
            clickable: true,
          }}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="bg-center bg-cover rounded-lg">
              <div className="relative w-full h-64 md:h-80 rounded-lg shadow-lg">
                <Image
                  src={slide || '/placeholder.svg'}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CarouselCards;
