import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addToCart } from "@/store/shop/cartSlice";
import { fetchSingleProduct } from "@/store/shop/productSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function ProductDetails() {
     const { id } = useParams();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { product, loading } = useAppSelector((state) => state.shopProducts);

     useEffect(() => {
          id && dispatch(fetchSingleProduct(id));
     }, []);

     async function handleAddToCart(productId: string, quantity: number) {
          const res = await dispatch(addToCart({ productId: productId, quantity: quantity}));
          if (res.payload.success) {
               toast.success("Item added to cart");
               navigate("/shop/cart");
          } else {
               toast.error("Something went wrong");
          }
     }

     if (loading) return <div>Loading...</div>

     return (
          <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-50">
          {product && 
              <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
               <div className="w-full md:w-1/3 lg:w-1/3 flex justify-center items-center">
               <img 
                    src={`${product.image}`} 
                    alt="product" 
                    width={300} 
                    height={300} 
                    className="border rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-200 ease-in-out bg-white"
               />
               </div>
               <div className="border shadow-sm rounded-md flex flex-col pl-10 items-start w-full md:w-2/3 lg:w-2/3 text-lg font-medium text-gray-700 bg-white p-4">
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
                         <Button onClick={() => handleAddToCart(product._id, 1)}>Add to Cart</Button>
                         <Button>Buy Now</Button>
                    </div>
               </div>
          </div>
          }
</div>

     )
}