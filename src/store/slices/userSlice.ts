import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser, signIn, signUp } from "../../api/user";
import { Storage } from "../../app/storage";

const storage = new Storage();

export interface IError {
  message: string;
}

export interface IUser {
  email?: string;
}

export interface IUserState {
  user: IUser;
  isAuthLoading: boolean;
  authError: string;
  token: string;
  isUserLoading: boolean;
  userError: string;
  isAuth: boolean;
}

export interface IUserQuery {
  email: string;
  password: string;
}

const token = storage.get("token");

const initialState: IUserState = {
  user: {},
  isUserLoading: false,
  userError: "",
  isAuthLoading: false,
  authError: "",
  token: token || "",
  isAuth: !!token,
};

export const registerThunk = createAsyncThunk(
  "user/register",
  async (userData: IUserQuery) => {
    const response = await signUp(userData);
    return response.data;
  }
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (userData: IUserQuery) => {
    const response = await signIn(userData);
    return response.data;
  }
);

export const getUserThunk = createAsyncThunk("user/current", async () => {
  const response = await getUser();
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = {};
      state.token = "";
      state.isAuth = false;
      storage.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.isAuthLoading = false;

          const token = action.payload?.token || "";

          state.token = token;
          storage.set("token", token);
        }
      )
      .addCase(registerThunk.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = (action.payload as IError)?.message || "";
      });

    builder
      .addCase(loginThunk.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.isAuthLoading = false;

          const token = action.payload?.token || "";

          state.token = token;
          storage.set("token", token);
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = (action.payload as IError)?.message || "";
      });

    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(
        getUserThunk.fulfilled,
        (state, action: PayloadAction<{ user: IUser }>) => {
          state.isUserLoading = false;
          state.user = action.payload?.user || {};
          state.isAuth = true;
        }
      )
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isUserLoading = false;
        state.userError = (action.payload as IError)?.message || "";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
