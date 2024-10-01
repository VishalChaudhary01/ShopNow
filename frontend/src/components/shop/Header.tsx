import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart, User } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/userSlice";
import { toast } from "sonner";

export function Header() {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();

     async function handleLogout() {
          const response = await dispatch(logout());
          if (response.payload.success) {
               toast.success(`${response.payload.message}`)
          } else {
               console.log(response);
               toast.error(`${response.payload.message}`)
          }
     }

     return (
          <div className="sticky top-0 z-50 flex justify-between border-b py-4 px-5 shadow bg-white text-gray-700 hover:text-gray-800">
               <div className="font-bold text-2xl">
                    <Link to='/'>
                         <span className="text-yellow-500">S</span>hop<span className="text-yellow-600">N</span>ow
                    </Link>
               </div>
               <div className="flex lg:gap-4 font-medium items-center">
                    {/* <Link to='/seller' className="px-4">Become a seller</Link> */}
                    <Link to='/shop/cart' className="px-4"><ShoppingCart /></Link>
                    <DropdownMenu >
                         <DropdownMenuTrigger ><CircleUserRound /></DropdownMenuTrigger>
                         <DropdownMenuContent className="mr-6">
                              <DropdownMenuItem onClick={() => navigate("/shop/account")} className="flex gap-4 px-4 text-lg font-medium"><User />Account</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={handleLogout} className="text-lg font-medium flex gap-4 px-4"><LogOut />Logout</DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               </div>
          </div>
     )
}