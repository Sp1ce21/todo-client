import styled from "styled-components";

export const AuthStyles = styled.main`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
`;

export const AuthForm = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: #bababa;
  padding: 0 15px 20px;
  gap: 10px;
`;

export const AuthTitle = styled.h2``;

export const AuthSwitch = styled.button`
  background-color: inherit;
  border: none;
  color: #000;
  align-self: flex-end;
  cursor: pointer;
`;
