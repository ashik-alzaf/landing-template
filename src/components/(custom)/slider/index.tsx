"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function SliderDemp() {
  const slider = [
    {
      image: "",
    },
  ];
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView] = useState(3);

  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [itemsPerView, api]);

  useEffect(() => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-[1120px] mx-auto xl:px-0 px-5 lg:pt-[100px] pt-[50px]">
      {/* ... Header unchanged ... */}

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full"
      >
        <CarouselContent>
          {slider.map((item, itemInd) => (
            <CarouselItem
              key={itemInd}
              className={`md:basis-1/3 sm:basis-[50%] basis-full`}
            >
              <Image
                src={item.image}
                width={350}
                height={757}
                alt="Client Interface"
                className="w-full h-auto object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Slide Indicators */}
      <div className="flex justify-center lg:mb-14 mb-9 space-x-2">
        {slider.map((_, index) => (
          <button
            key={`slide-${index}`}
            onClick={() => api && api.scrollTo(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default SliderDemp;
