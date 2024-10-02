import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllOrders } from "@/store/admin/orderSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateStatus } from "@/components/admin/UpdateStatus";

export function AdminOrder() {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const [openUpdate, setOpenUpdate] = useState<boolean>(false);
     const [status, setStatus] = useState<string>("");
     const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
     const { orders } = useAppSelector((state) => state.adminOrder);

     useEffect(() => {
          dispatch(fetchAllOrders());
     }, [openUpdate]);

     return (
          <div className="flex flex-col items-center py-4 w-full">
               <div className="flex justify-center items-center bg-gray-800 w-full rounded-md">
                    <div className="py-4 text-xl font-bold text-white">Your all orders are here!</div>
               </div>
               <div className="w-full">
                    {orders.slice().reverse().map((order) => (
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
                                   <div onClick={() => {
                                        setStatus(order.status)
                                        setSelectedOrder(order._id)
                                        setOpenUpdate(true);
                                   }} className={`lg:text-xl font-bold hover:underline cursor-pointer ${order.status === "Delivered" ? "text-green-700" : "text-blue-700"}`}>
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
                              {selectedOrder && (
                                   <UpdateStatus open={openUpdate} setOpen={setOpenUpdate} orderId={selectedOrder} status={status} setStatus={setStatus} />
                              )}
                         </div>
                    ))}
               </div>
          </div>
     )
}