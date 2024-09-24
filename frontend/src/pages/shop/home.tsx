import { CarouselComponent } from "@/components/shop/Carousel";
import { Category } from "@/components/shop/CategoryBanner";
import { LatestProductBanner } from "@/components/shop/LatestProductBanner";

export function Home() {
     return (
          <div className="min-h-screen bg-zinc-100">
               <Category />
               <CarouselComponent />
               <LatestProductBanner />
          </div>
     )
}