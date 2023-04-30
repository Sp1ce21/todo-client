import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkTodo,
  createTodo,
  deleteTodo,
  getUser,
  signIn,
  signUp,
} from "../../api/user";
import { Storage } from "../../app/storage";
import { ITodo } from "../../pages/todo/Todo";

const storage = new Storage();

export interface IError {
  message: string;
}

export interface IUser {
  email?: string;
  todos?: ITodo[];
}

export interface IUserState {
  user: IUser;
  isAuthLoading: boolean;
  authError: string;
  token: string;
  isUserLoading: boolean;
  userError: string;
  isAuth: boolean;
  isTodoCreateLoading: boolean;
  todoCreateError: string;
  isTodoCheckLoading: boolean;
  todoCheckError: string;
  isTodoDeleteLoading: boolean;
  todoDeleteError: string;
}

export interface IUserQuery {
  email: string;
  password: string;
}

export interface ITodoQuery {
  label: string;
}

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

export const createTodoAsync = createAsyncThunk(
  "todo/create",
  async (todo: string) => {
    const response = await createTodo(todo);
    return response.data;
  }
);

export const checkTodoAsync = createAsyncThunk(
  "todo/check",
  async (id: string) => {
    const response = await checkTodo(id);
    return response.data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/delete",
  async (id: string) => {
    const response = await deleteTodo(id);
    return response.data;
  }
);

const token = storage.get("token");

const initialState: IUserState = {
  user: {},
  isUserLoading: false,
  userError: "",
  isAuthLoading: false,
  authError: "",
  token: token || "",
  isAuth: !!token,
  isTodoCreateLoading: false,
  todoCreateError: "",
  isTodoCheckLoading: false,
  todoCheckError: "",
  isTodoDeleteLoading: false,
  todoDeleteError: "",
};

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

    builder
      .addCase(createTodoAsync.pending, (state) => {
        state.isTodoCreateLoading = true;
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.isTodoCreateLoading = false;
        state.user.todos = [...(state.user.todos || []), action.payload];
      })
      .addCase(createTodoAsync.rejected, (state, action) => {
        state.isTodoCreateLoading = false;
        state.todoCreateError = (action.payload as IError)?.message || "";
      });

    builder
      .addCase(checkTodoAsync.pending, (state) => {
        state.isTodoCheckLoading = true;
      })
      .addCase(checkTodoAsync.fulfilled, (state, action) => {
        state.isTodoCheckLoading = false;

        const updatedTodo = action.payload;
        const todos =
          state.user.todos?.filter((todo) => todo._id !== updatedTodo._id) ||
          [];

        state.user.todos = [...todos, updatedTodo];
      })
      .addCase(checkTodoAsync.rejected, (state, action) => {
        state.isTodoCheckLoading = false;
        state.todoCheckError = (action.payload as IError)?.message || "";
      });

    builder
      .addCase(deleteTodoAsync.pending, (state) => {
        state.isTodoDeleteLoading = true;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.isTodoDeleteLoading = false;
        const deletedTodoId = action.payload?.id;

        state.user.todos =
          state.user.todos?.filter((todo) => todo._id !== deletedTodoId) || [];
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.isTodoDeleteLoading = false;
        state.todoDeleteError = (action.payload as IError)?.message || "";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
