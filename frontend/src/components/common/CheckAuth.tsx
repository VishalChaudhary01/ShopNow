import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CheckAuthProps {
     isAuthenticated: boolean;
     user: IProfile | null;
     children: React.ReactNode;
}

export function CheckAuth({ isAuthenticated, user, children }: CheckAuthProps) {
     const navigate = useNavigate();
     const location = useLocation();

     useEffect(() => {
          if (!isAuthenticated) {
              // If the user is not authenticated, redirect to signin page unless already on signin/signup pages
              if (!location.pathname.includes("/signin") && !location.pathname.includes("/signup")) {
                  navigate("/signin");
              }
          } else {
               // If the user is authenticated, handle role-based routing
               if (user?.role === "admin") {
                  if (location.pathname.includes("/shop") || location.pathname.includes("/signin") || location.pathname.includes("/signup")) {
                    navigate("/admin/dashboard");
                  }
               } else {
                  // Non-admin users should not access admin routes
                  if (location.pathname.includes("/admin")) {
                      navigate("/shop");
                  } else if (location.pathname.includes("/signin") || location.pathname.includes("/signup")) {
                      navigate("/shop");
                  }
               }
          }
     }, [isAuthenticated, user, location.pathname, navigate]);
      
     return <>{children}</>
}