import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket, BadgePlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/order",
    icon: <BadgeCheck />,
  },
  {
    id: "new-product",
    label: "Sell New",
    path: "/admin/new-product",
    icon: <BadgePlus />,
  },
];

function MenuItems({ setOpen }: { setOpen: (e: boolean) => void }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = pathname === menuItem.path || pathname.startsWith(menuItem.path);
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 ${isActive ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        )
      })}
    </nav>
  );
}

export function AdminSidebar({ open, setOpen }: { open: boolean; setOpen: (e: boolean) => void }) {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 shrink-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2lx font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="h-screen hidden w-64 flex-col border-r p-6 lg:flex md:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold text-gray-800">Admin Panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </>
  );
}
