import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";
import slider_4  from "../../assets/slider_4.png"

export function CarouselComponent() {
     const autoplay: any = useRef(
          Autoplay({ delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          stopOnFocusIn: false
        }))
     return (
          <div className="flex justify-center w-full h-60 px-4">
               <Carousel
                    plugins={[autoplay.current]} 
                    className="w-full bg-black"
                    >
                    <CarouselContent>
                         <CarouselItem className="flex justify-center w-full"><img src={slider_4} alt="image" /></CarouselItem>
                         <CarouselItem className="flex justify-center w-full"><img src={slider_4} alt="image" /></CarouselItem>
                         <CarouselItem className="flex justify-center w-full"><img src={slider_4} alt="image" /></CarouselItem>
                         <CarouselItem className="flex justify-center w-full"><img src={slider_4} alt="image" /></CarouselItem>
                         <CarouselItem className="flex justify-center w-full"><img src={slider_4} alt="image" /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="translate-x-12"/>
                    <CarouselNext className="-translate-x-12"/>
               </Carousel>
          </div>
     )
}