import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchSingleProduct } from "@/store/shop/productSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function ProductDetails() {
     const { id } = useParams();
     const dispatch = useAppDispatch();
     const { product, loading } = useAppSelector((state) => state.shopProducts);

     useEffect(() => {
          id && dispatch(fetchSingleProduct(id));
     }, []);

     if (loading) return <div>Loading...</div>

     return (
          <div className="min-h-screen flex justify-center items-center py-8">
          {product && 
              <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
               <div className="w-full md:w-1/3 lg:w-1/3 flex justify-center items-center">
               <img 
                    src={`${product.image}`} 
                    alt="product" 
                    width={300} 
                    height={300} 
                    className="border border-gray-100 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-200 ease-in-out"
               />
               </div>
               <div className="border-t-2 lg:border-l-2 flex flex-col pl-10 items-start w-full md:w-2/3 lg:w-2/3 text-lg font-medium text-gray-700 p-4">
                    <div>{product.title}</div>
                    {product.totalStock < 10 && <span className="text-red-500">Hurry up! only {product.totalStock} are left</span>}
                    <div className="flex gap-2">
                         <span className="line-through">{product.price.toLocaleString()}</span>
                         <span className="text-green-600">{(((product.price-product.salePrice)/product.price)*100).toLocaleString(undefined, {maximumFractionDigits:2})}<span>%off</span></span>
                    </div>
                    <div>{product.salePrice.toLocaleString()}</div>
                    <div>{product.brand}</div>
                    <div>{product.category}</div>
                    <div>{product.description}</div>
                    <div className="flex gap-6 mt-6">
                         <Button>Add to Cart</Button>
                         <Button>Buy Now</Button>
                    </div>
               </div>
          </div>
          }
</div>

     )
}