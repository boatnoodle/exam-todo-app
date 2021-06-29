import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  background: black;
`;

export const LayoutAuth: React.FC<any> = ({ children }) => {
  return <Container>{children}</Container>;
};
