import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { TeamData } from "./TeamDate";

export default function Team() {
  return (
    <div className="mx-16 my-20">
      <p className="mb-10 text-center text-4xl font-bold md:text-6xl">
        My Team
      </p>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {TeamData.map((slider) => (
            <CarouselItem key={slider.id} className="md:basis-1/2 lg:basis-1/5">
              {/* Fixed height card */}
              <div className="white-bg dark:dark-bg flex min-h-[17.5rem] flex-col items-center justify-center gap-6 rounded-md px-2 py-5">
                <Image
                  src={slider.img}
                  alt={slider.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
                <div className="space-y-2 text-center">
                  <p className="text-xl font-bold text-primary">
                    {slider.name}
                  </p>
                  <p className="text-muted-foreground">{slider.post}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
