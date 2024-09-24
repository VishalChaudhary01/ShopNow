import { Link } from "react-router-dom"

export const CategoryCard = ({ img, category }: { img: string, category: string}) => {
     return (
          <div className="col-span-1">
               <div className="flex justify-center pt-4">
                    <Link to={`/shop/products?category=${category}`} className="flex flex-col justify-center items-center">
                         <img src={img} alt={category} width={70} height={80}/>
                         <div className="font-medium text-gray-600">
                              {category}
                         </div>
                    </Link>  
               </div>
          </div>
     )
}