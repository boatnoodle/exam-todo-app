import React from "react";
import styled from "styled-components";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
const { Header, Content } = Layout;

const Container = styled.div`
  max-width: calc(1280px + 16px * 2);
  /* max-width: calc(768px + 16px * 2); */
  margin-top: 90px;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export const LayoutMain: React.FC<any> = ({ children }) => {
  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">Todo lists</Menu.Item>
            {/* <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item> */}
          </Menu>
        </Header>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
