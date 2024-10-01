import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/userSlice";
import { CircleUserRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function AdminDashboard() {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const { user } = useAppSelector((state) => state.user);

     async function handleLogout() {
          const response = await dispatch(logout());
          if (response.payload.success) {
               navigate("/signin");
               toast.success(`${response.payload.message}`)
          } else {
               console.log(response);
               toast.error(`${response.payload.message}`)
          }
     }

     return (
          <div className="p-4 bg-gray-50 min-h-screen">
               <div className="flex flex-col gap-4 justify-center items-center bg-gray-800 text-white h-64 w-full rounded-md">
                    <div className="flex flex-col gap-4 justify-center items-center">
                         <CircleUserRound className="w-12 h-12" />
                         <div>{user?.email}</div>
                         <div className="uppercase">{user?.name}</div>
                    </div>
                    <Button onClick={handleLogout} variant="ghost" className="text-lg font-medium flex gap-2 border"><LogOut />Logout</Button>
               </div>
          </div>
     )
}