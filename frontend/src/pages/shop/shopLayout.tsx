import { Outlet } from "react-router-dom";


export function ShopLayout() {
     return (
          <div>
               <div className="flex">Header</div>
               <Outlet />
          </div>
     )
}