import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function ProductCard({ product }: { product: ProductType }) {
     return (
          <div className="flex justify-center cls
          items-center w-full">
               <Link to={`/shop/product/${product._id}`} key={product._id}>
                    <div className="flex flex-col items-center justify-between w-60 h-80 border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow duration-200 ease-in-out">
                         <img
                              src={`${product.image}`}
                              className="w-24 h-36 lg:w-32 lg:h-48 object-cover mb-4"
                              alt={product.title}
                         />
                         <div className="text-center">
                              <div className="font-medium text-gray-700 truncate">
                                   {product.title}
                              </div>
                         <div className="font-semibold text-gray-900">
                              Rs. {(product.price).toLocaleString()}
                         </div>
                         </div>
                         <div className="flex justify-between gap-4 pt-4">
                              <Button onClick={() => console.log("Clicked")} className="bg-gray-800 hover:bg-gray-900">Add to cart</Button>
                              <Button className="bg-gray-800 hover:bg-gray-900">Buy Now</Button>
                         </div>
                    </div>
               </Link>
          </div>
     )
}