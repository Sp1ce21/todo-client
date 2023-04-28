import { FC, useCallback } from "react";
import { HeaderEmail, HeaderRow, HeaderStyles } from "./styles";
import { Container1200 } from "../../styles/globalStyles";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import CustomButton from "../ui/button/CustomButton";
import { logout } from "../../store/slices/userSlice";

const Header: FC = () => {
  const [user, isAuth] = useAppSelector(({ user }) => [user.user, user.isAuth]);
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <HeaderStyles>
      <Container1200>
        <HeaderRow>
          <HeaderEmail>{user.email}</HeaderEmail>
          {isAuth && <CustomButton onClick={onLogout}>Logout</CustomButton>}
        </HeaderRow>
      </Container1200>
    </HeaderStyles>
  );
};

export default Header;
