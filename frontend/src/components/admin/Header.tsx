import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function AdminHeader({ setOpen }: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
     return (
          <header className="flex items-center justify-between px-4 py-3 border-b">
               <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
                    <AlignJustify />
                    <span className="sr-only">Toggle menu</span>
               </Button>
               <div className="flex flex-1 justify-end">
                    <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                         <LogOut />
                         Logout
                    </Button>
               </div>
          </header>
     )
}