import React from "react";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div`
  max-width: calc(1280px + 16px * 2);
  /* max-width: calc(768px + 16px * 2); */
  margin-top: 90px;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};
