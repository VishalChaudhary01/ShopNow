import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/store/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";

export function AdminHeader({ setOpen }: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
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
          <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 border-b bg-white">
               <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
                    <AlignJustify />
                    <span className="sr-only">Toggle menu</span>
               </Button>
               <div className="flex flex-1 justify-end">
                    <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                         <LogOut />
                         Logout
                    </Button>
               </div>
          </header>
     )
}