import { useCallback } from "react";
import TodoForm from "../../components/todo/form/TodoForm";
import TodoList from "../../components/todo/list/TodoList";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  checkTodoAsync,
  createTodoAsync,
  deleteTodoAsync,
} from "../../store/slices/userSlice";
import { Container1200 } from "../../styles/globalStyles";
import { TodoColumn, TodoStyles } from "./styles";

export interface ITodo {
  _id: string;
  label: string;
  isDone: boolean;
}

const TodoPage = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(({ user }) => user.user.todos);

  console.log(todos);

  const onAddTodo = useCallback(
    (todo: string) => {
      dispatch(createTodoAsync(todo));
    },
    [dispatch]
  );

  const onDone = useCallback(
    (id: string) => {
      dispatch(checkTodoAsync(id));
    },
    [dispatch]
  );

  const onDelete = useCallback(
    (id: string) => {
      dispatch(deleteTodoAsync(id));
    },
    [dispatch]
  );

  return (
    <TodoStyles>
      <Container1200>
        <TodoColumn>
          <TodoForm onAddTodo={onAddTodo} />
          <TodoList todos={todos || []} onDone={onDone} onDelete={onDelete} />
        </TodoColumn>
      </Container1200>
    </TodoStyles>
  );
};

export default TodoPage;
