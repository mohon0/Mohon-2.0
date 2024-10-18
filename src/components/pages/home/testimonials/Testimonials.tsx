"use client";

import { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TestimonialArrowButton } from "./TestimonialArrowButton";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialContent } from "./TestimonialContent";
import { TestimonialData } from "./TestimonialsData";

export default function Testimonials() {
  const swiperRef = useRef<any>(null);

  return (
    <div className="mx-3 my-16 md:mx-10 lg:mx-auto lg:max-w-7xl">
      <div className="text-center">
        <p className="text-4xl font-bold lg:text-6xl">Testimonials</p>
      </div>

      <div className="relative lg:mx-20">
        {/* Custom previous button */}
        <TestimonialArrowButton
          direction="left"
          onClick={() => swiperRef.current?.slidePrev()}
        />

        <Swiper
          grabCursor
          loop
          pagination
          navigation
          modules={[Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={50}
          slidesPerView={1}
        >
          {TestimonialData.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="mt-20 flex flex-col justify-center md:flex-row md:gap-10">
                <TestimonialCard review={review} />
                <TestimonialContent review={review} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom next button */}
        <TestimonialArrowButton
          direction="right"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </div>
  );
}
