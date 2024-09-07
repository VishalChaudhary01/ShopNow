import { Outlet } from "react-router-dom";
import { AdminHeader } from "../../components/admin/Header";
import { AdminSidebar } from "../../components/admin/Sidebar";
import { useState } from "react";


export function AdminLayout() {
     const [openSidebar, setOpenSidebar] = useState(false);

     return (
          <div className="flex min-h-screen w-full">
               <div className="sticky top-0 h-screen">
                    <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
               </div>
               <div className="flex flex-1 flex-col">
                    <AdminHeader setOpen={setOpenSidebar}/>
                    <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                         <Outlet />
                    </main>
               </div>
          </div>
     )
}
