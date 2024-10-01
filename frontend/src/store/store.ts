import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./userSlice";
import adminProductsReducer from "./admin/productSlice";
import shopProductReducer from "./shop/productSlice";
import cartItemReducer from "./shop/cartSlice";
import orderReducer from "./shop/orderSlice";
import adminOrderReducer from "./admin/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shopProductReducer,
    cartItems: cartItemReducer,
    orderList: orderReducer,
    adminOrder: adminOrderReducer,
  }
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;