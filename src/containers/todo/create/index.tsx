import React from "react";
import { Col, Row, Form, Input, Button, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { useApi } from "hooks/useApi";
import { CREATE_TASK_ENDPOINT } from "utils/constant";

const { Title, Text } = Typography;

export const CreateTask: React.FC = () => {
  const history = useHistory();
  const { post } = useApi();

  const createTask = async (payload) => {
    return await post(CREATE_TASK_ENDPOINT, payload);
  };

  return (
    <div>
      <Row justify="center" align="middle">
        <Col>
          <Title level={4}>Create Task</Title>{" "}
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ marginBottom: "20px" }}>
        <Col>
          <Button
            size="large"
            type="link"
            onClick={() => history.push("/todo-list")}
          >
            Todo Lists
          </Button>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={12}>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={async ({ title, description }) => {
              const response = await createTask({ title, description });
              if (response?.status === 200) history.push("/todo-list");
            }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>
              <Row gutter={6}>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button danger onClick={() => history.push("/todo-list")}>
                    Back
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
