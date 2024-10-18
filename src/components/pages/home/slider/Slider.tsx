"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import img1 from "@/images/slider/img1.jpeg";
import img2 from "@/images/slider/img2.jpeg";
import img3 from "@/images/slider/img3.jpeg";
import img4 from "@/images/slider/img4.jpeg";
import img5 from "@/images/slider/img5.jpeg";
import img6 from "@/images/slider/img6.jpeg";
import img7 from "@/images/slider/img7.jpeg";
import Image from "next/image";

const sliderData = [
  {
    id: 1,
    name: "Slider 1",
    img: img1,
    link: "/slider1",
  },
  {
    id: 2,
    name: "Slider 2",
    img: img2,
    link: "/slider2",
  },
  {
    id: 3,
    name: "Slider 3",
    img: img3,
    link: "/slider3",
  },
  {
    id: 4,
    name: "Slider 4",
    img: img4,
    link: "/slider3",
  },
  {
    id: 5,
    name: "Slider 5",
    img: img5,
    link: "/slider3",
  },
  {
    id: 6,
    name: "Slider 6",
    img: img6,
    link: "/slider3",
  },
  {
    id: 7,
    name: "Slider 7",
    img: img7,
    link: "/slider3",
  },
];

export function Slider() {
  return (
    <div className="mx-16">
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {sliderData.map((slider) => (
            <CarouselItem
              key={slider.id}
              className="relative md:basis-1/2 lg:basis-1/5"
            >
              <Image src={slider.img} alt="" className="h-32 object-cover" />
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold text-white">
                {slider.name}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
