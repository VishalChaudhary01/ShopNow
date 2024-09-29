import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchCartItems, updateQuantity } from "@/store/shop/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Cart() {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const { productList } = useAppSelector((state) => state.cartItems);
     
     async function handleUpdate(productId: string, quantity: number) {
          await dispatch(updateQuantity({productId, quantity}));
          await dispatch(fetchCartItems());
     }

     useEffect(() => {
          dispatch(fetchCartItems());
     }, [dispatch]);

     const totalItems = productList.reduce((acc, item) => acc + item.quantity, 0);
     const totalPrice = productList.reduce((acc, item) => acc + item.productId.salePrice*item.quantity, 0);

     return (
          <div className="min-h-screen flex justify-center items-start w-full p-4 bg-gray-50">
               {productList.length ? (
                    <div className="w-full flex flex-col justify-start items-center">
                         {productList.map((p) => (
                              <div key={p._id} className="flex justify-start md:items-center gap-8 border py-2 px-6 w-full lg:w-3/4 rounded-md bg-white">
                                   <img src={p.productId.image} alt="Image" width={80} height={80}/>
                                   <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                                        <div className="font-medium text-gray-700">
                                             <div className="text-lg">{p.productId.title}</div>
                                             <span className="line-through">Rs. {p.productId.price.toLocaleString()}</span>
                                             <span className="text-green-600 px-2">{(((p.productId.price-p.productId.salePrice)/p.productId.price)*100).toLocaleString(undefined, {maximumFractionDigits:2})}<span>%off</span></span>
                                             <span className="">Rs. {p.productId.salePrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-start gap-2 items-center py-2">
                                             <Button onClick={() => (handleUpdate(p.productId._id, -1))} className="bg-gray-100 hover:text-white text-black w-10 px-1"><Minus /></Button>
                                             <span className="text-md font-bold px-4 py-1 border rounded-md text-gray-600">{p.quantity}</span>
                                             <Button onClick={() => (handleUpdate(p.productId._id, +1))} disabled={p.productId.totalStock <= p.quantity} className="bg-gray-100 hover:text-white text-black w-10 px-1"><Plus /></Button>
                                        </div>
                                   </div>
                              </div>
                         ))}
                         <div className="flex justify-between items-center w-full px-6 lg:w-3/4 bg-gray-800 rounded-md p-4 my-4 text-white text-base font-medium">
                              <div className=" flex gap-2 lg:gap-4">
                                   Total Items: <span>{totalItems}</span>
                              </div>
                              <div className=" flex gap-2 lg:gap-4">
                                   Total Price: <span>Rs {totalPrice.toLocaleString()}</span>
                              </div>
                              <Button onClick={() => navigate("/shop/checkout/address")} className="bg-gray-100 hover:bg-white text-black text-base font-medium">Checkout</Button>
                         </div>
                    </div>
               ) : (
                    <div className="text-xl font-bold text-gray-700">
                         Your cart is empty!
                    </div>
               )}
          </div>
     )
}