import { ChangeEvent, FC, useCallback, useState } from "react";
import { AuthForm, AuthStyles, AuthSwitch, AuthTitle } from "./styles";
import CustomInput from "../../components/ui/input/CustomInput";
import PasswordInput from "../../components/ui/input/password/PasswordInput";
import CustomButton from "../../components/ui/button/CustomButton";
import { useAppDispatch } from "../../hooks/store";
import { loginThunk, registerThunk } from "../../store/slices/userSlice";

const initialFormValues = {
  email: "",
  password: "",
};

const AuthPage: FC = () => {
  const [auth, setAuth] = useState<"login" | "register">("login");
  const [formValues, setFormValues] = useState(initialFormValues);

  const dispatch = useAppDispatch();
  const isLogin = auth === "login";

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    },
    [formValues]
  );

  const onSubmit = useCallback(() => {
    if (isLogin) {
      dispatch(loginThunk(formValues));
    } else {
      dispatch(registerThunk(formValues));
    }
  }, [isLogin, formValues, dispatch]);

  const onSwitch = useCallback(() => {
    setAuth(auth === "login" ? "register" : "login");
  }, [auth]);

  return (
    <AuthStyles>
      <AuthForm>
        <AuthTitle>{isLogin ? "Sign in" : "Sign up"}</AuthTitle>
        <CustomInput
          name="email"
          placeholder="Email"
          type="email"
          onChange={onChange}
          value={formValues.email}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={formValues.password}
        />
        <CustomButton onClick={onSubmit}>
          {isLogin ? "Login" : "Register"}
        </CustomButton>
        <AuthSwitch onClick={onSwitch}>
          {isLogin ? "Don't have account?" : "Already have account?"}
        </AuthSwitch>
      </AuthForm>
    </AuthStyles>
  );
};

export default AuthPage;
