import { ChangeEvent, useCallback, useState } from "react";
import CustomButton from "../../ui/button/CustomButton";
import CustomInput from "../../ui/input/CustomInput";
import { TodoFormRow } from "./styles";

interface IProps {
  onAddTodo: (value: string) => void;
}

const TodoForm = ({ onAddTodo }: IProps) => {
  const [value, setValue] = useState("");

  const onClick = useCallback(() => {
    onAddTodo(value);
    setValue("");
  }, [onAddTodo, value]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <TodoFormRow>
      <CustomInput
        name="todo"
        onChange={onInputChange}
        value={value}
        placeholder="Type here..."
      />
      <CustomButton onClick={onClick}>Create</CustomButton>
    </TodoFormRow>
  );
};

export default TodoForm;
