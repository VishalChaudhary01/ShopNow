import { useState } from "react";
import { LabelledInput } from "../../components/common/LabelledInput";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/store/shop/orderSlice";

export function AddressForm() {
     const dispatch = useAppDispatch();
     const { productList } = useAppSelector((state) => state.cartItems);
     const [addressInfo, setAddressInfo] = useState<Address>({
          street: "",
          city: "",
          state: "",
          pin: 0,
     });

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setAddressInfo({
               ...addressInfo,
               [name]: name === "pin" ? Number(value) : value
          })
     }
     const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!addressInfo.street || !addressInfo.city || !addressInfo.state || !addressInfo.pin) {
               toast.error("All fields are required");
               return;
          }
          const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");
          const products = productList.map((product) => ({
               productId: product.productId._id,
               name: product.productId.title,
               price: product.productId.salePrice,
               quantity: product.quantity,
          }));
          const orderInfo = { products, addressInfo }
          const response = await dispatch(createOrder(orderInfo))
          console.log(response);
          if (response.payload.success) {
               const result = await stripe?.redirectToCheckout({
                    sessionId:response.payload.id
               });
               toast.success("Payment successfull");
               if(result?.error){
                    console.error(result.error);
                    toast.error("Something went wrong")
               }
          } else {
               console.log(response);
               toast.error("Something went wrong")
          } 
     }
     console.log(productList);
      
     return (
          <div className="flex justify-center w-full">
               <div className="flex flex-col items-center justify-center min-h-96 mt-8 px-10 py-4 rounded-md shrink-0 shadow-md border border-gray-100  bg-gray-100 ">
                    <div className="text-2xl font-bold text-gray-800 py-4" >
                         Address Informatino
                    </div>
                    <form onSubmit={handleSubmit}>
                         <LabelledInput onChange={handleChange} value={addressInfo.street}  name="street" label="Street" type="text"  />
                         <LabelledInput onChange={handleChange} value={addressInfo.city} name="city" label="City" type="text" />
                         <LabelledInput onChange={handleChange} value={addressInfo.state} name="state" label="State" type="text" />
                         <LabelledInput onChange={handleChange} value={addressInfo.pin} name="pin" label="Pin" type="number" />               
                         <Button type="submit" className="w-full my-4">Proceed to Payment</Button>
                    </form>
               </div>
          </div>
     )
}