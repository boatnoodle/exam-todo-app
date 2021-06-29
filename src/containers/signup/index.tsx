import React from "react";
import { Col, Row, Form, Input, Button, notification } from "antd";
import fetch from "isomorphic-unfetch";
import { API_ENDPOINT, REGISTER_ENDPOINT } from "utils/constant";
import { useHistory } from "react-router-dom";

export const SignUp: React.FC = () => {
  const history = useHistory();

  const signup = async (payload: { username: string; password: string }) => {
    return await fetch(`${API_ENDPOINT}${REGISTER_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ marginBottom: "24px" }}>
        <Col>สมัครสมาชิก</Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={async ({ username, password }) => {
              const response = await signup({ username, password });
              if (response) {
                const data = await response.json();
                if (data?.message?.includes("This username is already exist")) {
                  notification["error"]({
                    message: "This username is already exist",
                    description: "Please try again",
                  });
                } else if (data) {
                  notification["success"]({
                    message: "Register successfully",
                  });
                  history.push("/sign-in");
                }
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

            <Form.Item wrapperCol={{ span: 24 }}>
              <Row gutter={6} justify="center" align="middle">
                <Col>
                  <Button type="primary" htmlType="submit">
                    สมัครสมาชิก
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    onClick={() => history.push("sign-in")}
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
