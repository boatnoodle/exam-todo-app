import React, { useEffect, useState } from "react";
import { Col, Row, Form, Input, Button, Typography } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useApi } from "hooks/useApi";
import { GET_TASK_ENDPOINT } from "utils/constant";

const { Title, Text } = Typography;

export const UpdateTask: React.FC = () => {
  const history = useHistory();
  const { id } = useParams() as any;
  const [task, setTask] = useState(null);

  const { get, put } = useApi();

  const getTask = async () => {
    const response = await get(`${GET_TASK_ENDPOINT}/${id}`);
    const task = await response?.json();
    setTask(task);
  };

  const updateTask = async (payload) => {
    return await put(`${GET_TASK_ENDPOINT}/${id}`, payload);
  };

  useEffect(() => {
    getTask();
  }, [id]);

  if (!task) return <>loading</>;
  return (
    <div>
      <Row justify="center" align="middle">
        <Col>
          <Title level={4}>Update Task</Title>{" "}
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
            initialValues={{
              title: task?.title,
              description: task?.description,
            }}
            onFinish={async ({ title, description }) => {
              const response = await updateTask({ title, description });
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
                    Edit
                  </Button>
                </Col>
                <Col>
                  <Button danger onClick={() => history?.push(`/todo-list`)}>
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
