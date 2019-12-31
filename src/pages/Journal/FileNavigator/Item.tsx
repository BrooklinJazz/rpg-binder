import React from "react";
import styled from "styled-components";

export const Item = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-align: left;
  padding: 5px 0;
  padding-left: ${({ depth }: { depth: number }) => (depth + 1) * 7}px;
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;
