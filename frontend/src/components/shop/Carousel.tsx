import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function Curousel() {
     return (
          <div className="flex justify-center w-full h-60 px-4">
               <Carousel className="w-full bg-red-400">
                    <CarouselContent>
                         <CarouselItem>Hi</CarouselItem>
                         <CarouselItem>There</CarouselItem>
                         <CarouselItem>Hello</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="translate-x-12"/>
                    <CarouselNext className="-translate-x-12"/>
               </Carousel>
          </div>
     )
}