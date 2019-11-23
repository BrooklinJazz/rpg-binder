import React, { ReactNode } from "react";
import styled from "styled-components";

import { FadeAnimation } from "../FadeAnimation";
import { Spinner } from "../Loading";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FetchContainer = ({
  children,
  loading
}: {
  children: ReactNode;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }
  return (
    <FadeAnimation open={!loading} mountOnEnter dismountOnExit timeout={200}>
      {children}
    </FadeAnimation>
  );
};
