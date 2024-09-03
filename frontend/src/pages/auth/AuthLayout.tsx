import { Outlet } from "react-router-dom";

export function AuthLayout() {
     return (
          <div className="flex justify-center w-full">
               <div className="flex flex-col items-center justify-center min-h-96 mt-16 px-10 rounded-md shrink-0 shadow-md border border-gray-100  hover:bg-gray-50 ">
                    <div className="text-3xl font-bold pb-8">
                         Welcome to ShopNow
                    </div>
                    <Outlet />
               </div>
          </div>
     )
}