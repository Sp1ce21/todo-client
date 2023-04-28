import { ChangeEvent, FC, memo } from "react";
import { CustomInputStyles } from "./styles";

export interface ICustomInput {
  name: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const CustomInput: FC<ICustomInput> = memo(
  ({
    name = "",
    type = "text",
    placeholder = "",
    onChange,
    value = "",
    ...prop
  }) => {
    return (
      <CustomInputStyles
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...prop}
      />
    );
  }
);

export default CustomInput;
