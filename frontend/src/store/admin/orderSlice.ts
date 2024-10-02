import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

interface ProductId {
     _id: string;
     user: string;
     image: string;
}
interface Product {
     productId: ProductId;
     name: string;
     price: number;
     quantity: number;
}
interface Order {
     addressInfo: Address;
     _id: string;
     userId: string;
     products: Product[]
     status: string;
     createdAt: string;
     updatedAt: string;
}
interface OrderState {
     loading: boolean;
     orders: Order[];
}

const initialState: OrderState = {
     loading: false,
     orders: [],
}

export const fetchAllOrders = createAsyncThunk(
     "/admin/order/fetch-all-orders",
     async (_, { rejectWithValue }) => {
          try {
               const { data } = await axios.get('/api/admin/order/fetch-all-orders');
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

interface UpdateStatusProps {
     id: string;
     status: string;
}
export const updateStatus = createAsyncThunk(
     "/admin/order/update-status/:id",
     async ({ id, status }: UpdateStatusProps, { rejectWithValue }) => {
          try {
               const { data } = await axios.put(`/api/admin/order/update-status/${id}`, { status });
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
     name: "adminOrders",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchAllOrders.pending, (state) => {
                    state.loading = true;
               })
               .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<{ success: Boolean, orders: Order[] }>) => {
                    state.loading = false;
                    state.orders = action.payload.orders;
               })
               .addCase(fetchAllOrders.rejected, (state) => {
                    state.loading = false;
                    state.orders = [];
               })
     }
})

export default OrderSlice.reducer;