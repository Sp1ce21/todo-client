import styled from "styled-components";

export const CustomInputStyles = styled.input`
  background-color: #f69300;
  outline: none;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  color: black;
  font-weight: 700;

  &::placeholder {
    color: inherit;
    font-weight: 300;
  }
`;
