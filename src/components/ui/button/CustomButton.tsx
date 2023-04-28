import { FC, ReactElement, memo } from "react";
import { CustomButtonStyles } from "./styles";

interface ICustomButton {
  children: ReactElement | string;
  onClick: () => void;
}

const CustomButton: FC<ICustomButton> = memo(
  ({ children, onClick, ...prop }) => {
    return (
      <CustomButtonStyles onClick={onClick} {...prop}>
        {children}
      </CustomButtonStyles>
    );
  }
);

export default CustomButton;
