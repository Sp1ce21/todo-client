import styled from "styled-components/macro";

export const TodoListColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TodoItemRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TodoItemButtons = styled.div`
  display: flex;
  gap: 16px;
`;

export const TodoItemTitle = styled.div<{ isDone: boolean }>`
  color: #f69300;

  ${(props) => props.isDone && "text-decoration: line-through;"}
`;

export const TodoListNoItems = styled.div`
  color: #f69300;
`;
