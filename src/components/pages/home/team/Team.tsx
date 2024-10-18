"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { TeamData } from "./TeamDate";

export default function Team() {
  return (
    <div className="mt-20">
      <p className="text-center text-4xl font-bold md:text-6xl">My Team</p>

      <div className="w-full px-3 md:px-0">
        <Swiper
          modules={[Autoplay, FreeMode, Pagination]}
          grabCursor={true}
          autoplay={true}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 60,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            768: {
              slidesPerView: 2.8,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          centerInsufficientSlides={true}
          freeMode={true}
          pagination={{
            dynamicBullets: true,
          }}
          className="my-10 flex h-full"
        >
          {TeamData.map((data) => (
            <SwiperSlide
              key={data.id}
              className="white-bg dark:dark-bg m-10 w-96 items-center justify-center rounded-2xl p-5"
            >
              <Image
                src={data.img}
                alt=""
                className="mx-auto h-40 w-40 rounded-full object-cover"
              />

              <div className="my-5 flex flex-col items-center justify-center gap-2">
                <div className="text-center text-2xl font-bold text-primary">
                  {data.name}
                </div>
                <div className="text-secondary-foreground">{data.post}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
