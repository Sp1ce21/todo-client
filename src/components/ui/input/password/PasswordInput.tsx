import { FC, memo, useCallback, useState } from "react";
import CustomInput, { ICustomInput } from "../CustomInput";
import { PasswordIcon, PasswordInputStyles } from "./styles";

type PasswordInputTypes = "password" | "text";

interface ICustomPasswodInput extends ICustomInput {
  type?: PasswordInputTypes;
}

const PasswordInput: FC<ICustomPasswodInput> = memo(
  ({ type = "password", ...prop }) => {
    const [defaultType, setDefaultType] = useState<PasswordInputTypes>(type);

    const onIconClick = useCallback(() => {
      setDefaultType(defaultType === "text" ? "password" : "text");
    }, [defaultType]);

    return (
      <PasswordInputStyles>
        <CustomInput {...prop} type={defaultType} />
        <PasswordIcon isText={defaultType === "text"} onClick={onIconClick} />
      </PasswordInputStyles>
    );
  }
);

export default PasswordInput;
