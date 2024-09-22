import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./pages/auth/AuthLayout";
import { Signin } from "./pages/auth/signin";
import { Signup } from "./pages/auth/signup";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/dashboard";
import { AdminOrder } from "./pages/admin/orders";
import { AdminProducts } from "./pages/admin/products";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { profile } from "./store/userSlice";
import { useEffect } from "react";
import { CheckAuth } from "./components/common/CheckAuth";
import { ShopLayout } from "./pages/shop/shopLayout";
import { Home } from "./pages/shop/home";
import { Cart } from "./pages/shop/cart";
import { UserAccount } from "./pages/shop/account";
import { NewProduct } from "./pages/admin/newProduct";
import { UpdateProduct } from "./pages/admin/updateProduct";
import { AllProduct } from "./pages/shop/allProducts";
import { ProductDetails } from "./pages/shop/productDetails";

export default function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  if (loading) return <div className="flex flex-col items-center justify-center text-3xl font-bold">Loading....</div>

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/shop" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShopLayout />
        </CheckAuth>
      }>
        <Route index element={<Home />} />
        <Route path="products" element={<AllProduct />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<UserAccount />} />
      </Route>

      <Route path="/admin" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
        }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="order" element={<AdminOrder />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="new-product" element={<NewProduct />} />
        <Route path="products/update/:id" element={<UpdateProduct />} />
      </Route>

      <Route path="/" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout /> 
        </CheckAuth>
      }>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}