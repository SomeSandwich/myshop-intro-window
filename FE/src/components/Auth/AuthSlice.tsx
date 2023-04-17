
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode'





import { ILoginInput, ILoginResponse } from "../../interfaces/IAuth";
// import { setLoading } from "../loadingSlice/loadingSlice";
import { RootState } from "../../store";
import { LoginAsync } from "@/services/auth.service";

export interface IAuthState {
  isLogin: boolean;
  token: string | null;
  name: string | null;
  role: string | null;
  clientId: number;
  isLoading: boolean;
  hasError : boolean;
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: ILoginInput, { dispatch, rejectWithValue }) => {
    try {
    //   dispatch(setLoading(true));
      const response = await LoginAsync(data);
    //   dispatch(setLoading(false));
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
const initialState: IAuthState = {
  isLogin: !!sessionStorage.getItem("token"),
  token: sessionStorage.getItem("token") || null,
  name: null,
  role: null,
  clientId: 0,
  isLoading: false,
  hasError: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginConfig: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      state.name = null;
      state.role = null;
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    },
    getMe: (state, action: PayloadAction<any>) => {
      console.log("GetMe:::", action.payload);
      state.name = action.payload.name;
      state.role = action.payload.role;
      sessionStorage.setItem("name", action.payload.name);
      state.clientId = action.payload.clientId;
    },
    refreshToken: (state, action: PayloadAction<ILoginResponse>) => {
      state.token = action.payload.token;
      console.log(state);
      sessionStorage.setItem("token", action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<ILoginResponse>) => {
        sessionStorage.setItem("token", action.payload.token);
        console.log("logged");
        state.isLogin = true;
        state.token = action.payload.token;
        state.isLoading = false;
        state.hasError = false;
      }
    );
    builder.addCase(
        login.pending,
        (state, action) => {
            console.log("loading");
            state.isLoading = true;
            state.hasError = false;
        }
      );
    builder.addCase(login.rejected, (state) => {
        sessionStorage.removeItem("token");
        console.log("test");
        state.isLogin = false;
        state.token = null;
        state.isLoading = false;
        state.hasError = true;
    });
  },
});

const {  reducer ,actions } = authSlice;
export const { logout, getMe, refreshToken } = authSlice.actions;

export const isLogin = (state: RootState) => state.auth.isLogin;
export  const getToken = (state: RootState) => state.auth.token;
export const getName = (state: RootState) => state.auth.name;
export const getRole = (state: RootState) => state.auth.role;
export const getClientId = (state: RootState) => state.auth.clientId;
export default authSlice.reducer;

