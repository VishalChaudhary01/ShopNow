import { categeris } from "@/config"
import { CategoryCard } from "./CategoryCard"

export const Category = () => { 
     return (
          <div className="px-4 py-5">
               <div className="grid grid-cols-5 border-1 bg-white w-full h-32 shadow-md">
                    {categeris.map((c) => 
                    <CategoryCard img={c.img} category={c.category} />)}
               </div>
          </div>
     )
}

