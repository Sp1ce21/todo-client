import axios from "axios";
import { IUserQuery } from "../store/slices/userSlice";

export const signUp = (userData: IUserQuery) =>
  axios.post("/user/signup", userData);

export const signIn = (userData: IUserQuery) =>
  axios.post("/user/signin", userData);

export const getUser = () => axios.get("/user/current");

export const createTodo = (todo: string) =>
  axios.post("/todo/create", { label: todo });

export const checkTodo = (id: string) => axios.post(`/todo/check/${id}`);

export const deleteTodo = (id: string) => axios.delete(`/todo/${id}`);
