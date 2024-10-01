import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchAllOrders } from "@/store/shop/orderSlice";
import { logout } from "@/store/userSlice";
import { CircleUserRound, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function UserAccount() {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const { user } = useAppSelector((state) => state.user);
     const { orderList } = useAppSelector((state) => state.orderList);
     if (!user) return <div>Loading....</div>

     async function handleLogout() {
          const response = await dispatch(logout());
          if (response.payload.success) {
               navigate("/signin")
               toast.success(`${response.payload.message}`)
          } else {
               console.log(response);
               toast.error(`${response.payload.message}`)
          }
     }

     useEffect(() => {
          dispatch(fetchAllOrders());
     }, []);

     return (
          <div className="p-4 bg-gray-50 min-h-screen">
               <div className="flex flex-col gap-4 justify-center items-center bg-gray-800 text-white h-64 w-full rounded-md">
                    <div className="flex flex-col gap-4 justify-center items-center">
                         <CircleUserRound className="w-12 h-12" />
                         <div>{user.email}</div>
                         <div className="uppercase">{user.name}</div>
                    </div>
                    <Button onClick={handleLogout} variant="ghost" className="text-lg font-medium flex gap-2 border"><LogOut />Logout</Button>
               </div>
               <div className="flex flex-col items-center py-4 w-full">
                    <div className="text-2xl font-bold text-gray-700 py-2">
                         Your All orders are here!
                    </div>
                    <div className="w-full">
                         {orderList.slice().reverse().map((order) => (
                              <div className="grid grid-cols-2 space-x-8 my-4 lg:grid-cols-4 border rounded-md shadow-sm p-4 lg:px-8 items-center w-full bg-white">
                                   <div className="col-span-2">
                                   {order.products.map((product) => (
                                        <div onClick={() => navigate(`/shop/product/${product.productId._id}`)} className="flex justify-between border-b py-2 px-8 cursor-pointer">
                                             <img src={product.productId.image} alt="Image" width={80} height={80} />
                                             <div className="text-base font-medium text-gray-800">
                                                  <div>{product.name}</div>
                                                  <div className="font-bold text-gray-700">Rs. {product.price}</div>
                                             </div>
                                             <div className="font-bold text-gray-700">Quantity: {product.quantity}</div>
                                        </div>
                                   ))}
                                   </div>
                                   <div className="flex flex-col gap-2 lg:gap-4 text-base font-medium text-gray-700">
                                        <div className={`lg:text-xl font-bold ${order.status === "Delivered" ? "text-green-700" : "text-blue-700"}`}>
                                             <span className="pr-2">Status:</span>{order.status}
                                        </div>
                                        <div>
                                             <span>Order Date: </span>{new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                        <div>
                                             {(order.status === "Delivered" || order.status === "Cancel") && (<div><span>Deliver Date: </span>{new Date(order.updatedAt).toLocaleDateString()}</div>)}
                                        </div>
                                   </div>
                                   <div className="flex flex-col lg:gap-2 text-base font-medium text-gray-700">
                                        <div className="lg:text-xl font-bold">Address: </div>
                                        <span>{order.addressInfo.street}</span>
                                        <span>{order.addressInfo.city}</span>
                                        <span>{order.addressInfo.state}</span>
                                        <span>{order.addressInfo.pin}</span>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     )
}