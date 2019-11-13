import styled from "styled-components";
import { inputPadding, inputHeight } from "../../common/styles";

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: ${inputHeight};
  padding: ${inputPadding};
  outline: none;
`;
