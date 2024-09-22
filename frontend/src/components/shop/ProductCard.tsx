import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { addToCart } from "@/store/shop/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";

export function ProductCard({ product }: { product: ProductType }) {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     async function handleAddToCart(productId: string, quantity: number) {
          const res = await dispatch(addToCart({ productId: productId, quantity: quantity}));
          if (res.payload.success) {
               toast.success("Item added to cart");
               navigate("/shop/cart");
          } else {
               toast.error("Something went wrong");
          }
     }

     return (
          <div className="flex justify-center items-center w-full">
                    <div className="flex flex-col items-center justify-between w-60 h-80 border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow duration-200 ease-in-out">
                         <img
                              onClick={() => navigate(`/shop/product/${product._id}`)}
                              src={`${product.image}`}
                              className="w-24 h-36 lg:w-32 lg:h-48 object-cover mb-4 cursor-pointer"
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
                              <Button onClick={() => handleAddToCart(product._id, 1)} className="bg-gray-200 border hover:text-white text-black">Add to cart</Button>
                              <Button className="bg-gray-200 border hover:text-white text-black">Buy Now</Button>
                         </div>
                    </div>
          </div>
     )
}