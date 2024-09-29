import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState: OrderState = {
     loading: false,
     message: "",
     orderList: []
}
interface Product {
     productId: string;
     name: string;
     price: number;
     quantity: number;
}
interface OrderInfo {
     products: Product[];
     addressInfo: Address;
 }
export const createOrder = createAsyncThunk(
     "/shop/order-create-order",
     async (orderInfo: OrderInfo, { rejectWithValue }) => {
          try {
               const { data } = await axios.post(`/api/shop/order/create-order`, orderInfo);
               return data;
          } catch (e: any) {
               return rejectWithValue(
                    e.response && e.response.data
                         ? e.response.data
                         : e.response
               )
          }
     }
)

export const fetchAllOrders = createAsyncThunk(
     "/shop/user/orders",
     async (__dirname, { rejectWithValue }) => {
          try {
               const { data } = await axios.get(`/api/shop/order`);
               console.log(data);
               return data;
          } catch (e: any) {
               return rejectWithValue(
                    e.response && e.response.data
                         ? e.response.data
                         : e.response
               )
          }
     }
)

const OrderSlice = createSlice({
     name: "orderList",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchAllOrders.pending, (state) => {
                    state.loading = true;
               })
               .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<{ success: Boolean, orders: Order[] }>) => {
                    state.loading = false;
                    state.orderList = action.payload.orders;
               })
               .addCase(fetchAllOrders.rejected, (state) => {
                    state.loading = false;
                    state.message = "Error fetch order list"
               })
     }
})

export default OrderSlice.reducer;