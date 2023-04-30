import { ITodo } from "../../../pages/todo/Todo";
import TodoItem from "./TodoItem";
import { TodoListColumn, TodoListNoItems } from "./styles";

interface IProps {
  todos: ITodo[];
  onDone: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onDone, onDelete }: IProps) => {
  return (
    <TodoListColumn>
      {!!todos.length ? (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            {...todo}
            onDone={onDone}
            onDelete={onDelete}
          />
        ))
      ) : (
        <TodoListNoItems>No todos</TodoListNoItems>
      )}
    </TodoListColumn>
  );
};

export default TodoList;
