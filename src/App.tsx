import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import NotFound from "./pages/404/NotFound";
import AuthPage from "./pages/auth/AuthPage";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { useEffect } from "react";
import { getUserThunk } from "./store/slices/userSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(({ user }) => user.token);

  useEffect(() => {
    if (token) {
      dispatch(getUserThunk());
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [token, dispatch, navigate]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/auth" Component={AuthPage} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </div>
  );
};

export default App;
