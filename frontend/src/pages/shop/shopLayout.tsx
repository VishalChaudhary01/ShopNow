import { Footer } from "@/components/shop/Footer";
import { Header } from "@/components/shop/Header";
import { Outlet } from "react-router-dom";


export function ShopLayout() {
     return (
          <div>
               <Header />
               <section>
                    <Outlet />
               </section>
               <Footer/>
          </div>
     )
}