import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState: ProductState = {
     loading: false,
     message: "",
     productList: [],
     product: null
}

export const addProduct = createAsyncThunk(
     '/admin/products/new',
     async ( formData: AddProductForm, { rejectWithValue }) => {
          try {
               const { data } = await axios.post('/api/admin/products/new',
                    formData,
               )
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

export const getAllProducts = createAsyncThunk(
     "/admin/products",
     async (_, { rejectWithValue }) => {
          try {
               const { data } = await axios.get("/api/admin/products");
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

export const getSingleProduct = createAsyncThunk(
     "/admin/product:id",
     async (id: string, { rejectWithValue }) => {
          try {
               const { data } = await axios.get(`/api/admin/products/${id}`);
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

export const updateProduct = createAsyncThunk(
     "/admin/products/update",
     async ({ id, formData }:  { id: string, formData: UpdateProductForm } , { rejectWithValue }) => {
          try {
               const { data } = await axios.put(`/api/admin/products/${id}`,
                    formData
               );
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

export const deleteProduct = createAsyncThunk(
     "/admin/products/delete",
     async (id: string, { rejectWithValue }) => {
          try {
               const { data } = await axios.delete(`/api/admin/products/${id}`);
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

const AdminProductSlice = createSlice({
     name: "adminProducts",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(getAllProducts.pending, (state) => {
                    state.loading = true;
               })
               .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<{ success: boolean, products: ProductType[] }>) => {
                    state.loading = false;
                    state.productList = action.payload.products;
               })
               .addCase(getAllProducts.rejected, (state, action) => {
                    state.loading = false;
                    state.productList = [];
               })
               .addCase(getSingleProduct.pending, (state) => {
                    state.loading = true;
               })
               .addCase(getSingleProduct.fulfilled, (state, action: PayloadAction<{ success: boolean, product: ProductType}>) => {
                    state.loading = false;
                    state.product = action.payload.product;
               })
               .addCase(getSingleProduct.rejected, (state) => {
                    state.loading = false;
                    state.product = null;
               })
     }
})

export default AdminProductSlice.reducer;