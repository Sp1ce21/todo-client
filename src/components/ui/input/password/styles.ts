import styled from "styled-components";

export const PasswordInputStyles = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  & input {
    width: 100%;
  }
`;

export const PasswordIcon = styled.div<{ isText: boolean }>`
  position: relative;
  width: 15px;
  height: 15px;
  background-color: black;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  cursor: pointer;

  ${(props) => props.isText && `background-color: #bababa;`}
`;
