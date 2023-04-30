import { memo } from "react";
import { ITodo } from "../../../pages/todo/Todo";
import CustomButton from "../../ui/button/CustomButton";
import { TodoItemButtons, TodoItemRow, TodoItemTitle } from "./styles";

interface IProps extends ITodo {
  onDone: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = memo(
  ({ _id: id, label, isDone, onDone, onDelete }: IProps) => {
    return (
      <TodoItemRow>
        <TodoItemTitle isDone={isDone}>{label}</TodoItemTitle>
        <TodoItemButtons>
          {!isDone && (
            <CustomButton onClick={() => onDone(id)}>Done</CustomButton>
          )}
          <CustomButton onClick={() => onDelete(id)}>Delete</CustomButton>
        </TodoItemButtons>
      </TodoItemRow>
    );
  }
);

export default TodoItem;
