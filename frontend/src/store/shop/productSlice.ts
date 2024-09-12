import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState: ProductState = {
     loading: false,
     message: "",
     productList: [],
     product: null
}

interface Params {
     filterParams?: string[];
     sortParams?: string;
}

export const fetchFilterdProduct = createAsyncThunk(
     "/shop/filterd-product",
     async ( { filterParams=[], sortParams }: Params, { rejectWithValue }) => {
          try {
               const query = new URLSearchParams();
               if (filterParams.length > 0) {
                    filterParams.forEach((param) => query.append("category", param));
               }
               if (sortParams) {
                    query.append("sortBy", sortParams);
               }
               const { data } = await axios.get(`/api/shop/products/filters?${query.toString()}`);
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

export const fetchSingleProduct = createAsyncThunk(
     "/shop/product:id",
     async (id: string, { rejectWithValue }) => {
          try {
               const { data } = await axios.get(`/api/shop/products/${id}`)
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

const shopProductSlice = createSlice({
     name: "shopProducts",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchFilterdProduct.pending, (state) => {
                    state.loading = true;
               })
               .addCase(fetchFilterdProduct.fulfilled, (state, action: PayloadAction<{ success: boolean, products: ProductType[] }>) => {
                    state.loading = false;
                    state.productList = action.payload.products;
               })
               .addCase(fetchFilterdProduct.rejected, (state) => {
                    state.loading = false;
                    state.productList = [];
               })
               .addCase(fetchSingleProduct.pending, (state) => {
                    state.loading = true;
               })
               .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<{ success: boolean, product: ProductType }>) => {
                    state.loading = false;
                    state.product = action.payload.product;
               })
               .addCase(fetchSingleProduct.rejected, (state) => {
                    state.loading = false;
                    state.product = null;
               });
     }
})

export default shopProductSlice.reducer;