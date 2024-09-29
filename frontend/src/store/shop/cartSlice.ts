import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState: CartState = {
     loading: false,
     message: "",
     productList: []
}

export const fetchCartItems = createAsyncThunk(
     "/shop/cart",
     async (_, { rejectWithValue } ) => {
          try {
               const { data } = await axios.get(`/api/shop/cart`);
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

export const addToCart = createAsyncThunk(
     "/shop/cart/add",
     async ({productId, quantity}: { productId: string, quantity: number }, { rejectWithValue }) => {
          try {
               const { data } = await axios.post(`/api/shop/cart/add`, { productId, quantity })
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

export const updateQuantity = createAsyncThunk(
     "/shop/cart/update",
     async( { productId, quantity }: {productId: string, quantity: number}, { rejectWithValue }) => {
          try {
               const { data } = await axios.put(`/api/shop/cart/update`, { productId, quantity });
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


const CartSlice = createSlice({
     name: "cartItems",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchCartItems.pending, (state) => {
                    state.loading = true;
               })
               .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<{ succes: boolean, products: CartItems[] }>) => {
                    state.loading = false;
                    state.productList = action.payload.products;
               })
               .addCase(fetchCartItems.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.message = action.payload.message || "Error fetching cart items";
               })
     }
})

export default CartSlice.reducer;