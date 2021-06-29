import React from "react";
import { Col, Row, Form, Input, Button } from "antd";
import fetch from "isomorphic-unfetch";
import { API_ENDPOINT } from "utils/constant";
import { useHistory } from "react-router-dom";

export const SignIn: React.FC = () => {
  const history = useHistory();

  const signIn = async (payload: { username: string; password: string }) => {
    return await fetch(`${API_ENDPOINT}/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div>
      <Row justify="center" align="middle">
        <Col>เข้าสู่ระบบ</Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={async ({ username, password }) => {
              const response = await signIn({ username, password });
              if (response) {
                const data = await response.json();
                localStorage.setItem("token", data?.token);
                history.push("/todo-list");
              }
            }}
          >
            <Form.Item
              label="ชื่อผู้ใช้งาน"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="รหัสผ่าน"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
