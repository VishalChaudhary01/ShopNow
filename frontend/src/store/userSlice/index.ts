import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState: UserState = {
     isAuthenticated: false,
     loading: true,
     user: null,
     message: "",
};

export const signupUser = createAsyncThunk(
     'user/signupUser',
     async ( formData: ISignup, { rejectWithValue }) => {
          try {
               const { data } = await axios.post('/api/user/signup',
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

export const signinUser = createAsyncThunk(
     '/user/signin',
     async (formData: ISignin,  { rejectWithValue }) => {
          try {
               const { data } = await axios.post('/api/user/signin',
                    formData,
               )
               return data;
          } catch (e: any) {
               return rejectWithValue(
                    e.response && e.response.data
                         ? e.response.data
                         : e.message
               );
          }
     }
)

export const logout = createAsyncThunk(
     "/user/logout",
     async () => {
          const { data } = await axios.post('/api/user/logout', {});
          return data;
     }
)

export const profile = createAsyncThunk(
     "/user/profile",
     async (_, { rejectWithValue }) => {
          try {
               const { data } = await axios.get("/api/user/profile");
               return data;
          } catch (e: any) {
               return rejectWithValue(
                    e.response && e.response.data
                         ? e.response.data
                         : e.response
               );
          }
     }
)

const userSlice = createSlice({
     name: "user",
     initialState,
     reducers: {
          setUser: (state, action) => {}
     },
     extraReducers: (builder) => {
          builder
               .addCase(signupUser.pending, (state) => {
                    state.loading = true;
               })
               .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.message = action.payload.message;
                    state.isAuthenticated = action.payload.success;
               })
               .addCase(signupUser.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.message = action.payload.message;
                    state.isAuthenticated = action.payload.success;
               })
               .addCase(signinUser.pending, (state) => {
                    state.loading = true;
               })
               .addCase(signinUser.fulfilled, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.message = action.payload.message;
                    state.isAuthenticated = action.payload.success;
               })
               .addCase(signinUser.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.isAuthenticated = action.payload.success;
                    state.message = action.payload.message;
               })
               .addCase(profile.pending, (state) => {
                    state.loading = true;
               })
               .addCase(profile.fulfilled, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.message = action.payload.message;
                    state.isAuthenticated = action.payload.success;
               })
               .addCase(profile.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.user = null;
                    state.message = action.payload.message;
                    state.isAuthenticated = false;
               })
               .addCase(logout.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = null;
                    state.isAuthenticated = false;
               })
     }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;