import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button, Typography } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useApi } from "hooks/useApi";
import { GET_TASK_ENDPOINT } from "utils/constant";

const { Title, Text } = Typography;

export const TaskDetail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams() as any;
  const [task, setTask] = useState(null);

  const { get } = useApi();

  const getTask = async () => {
    const response = await get(`${GET_TASK_ENDPOINT}/${id}`);
    const task = await response?.json();
    setTask(task);
  };

  useEffect(() => {
    getTask();
  }, []);

  if (!task) return <>loading..</>;

  return (
    <div>
      <Row justify="center" align="middle">
        <Col>
          <Title level={4}>Todo Detail</Title>{" "}
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ marginBottom: "12px" }}>
        <Col>
          <Button type="link" onClick={() => history.push("/todo-list")}>
            Todo lists
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card title={task?.title}>
            <p>{task?.description}</p>
            <Row gutter={6}>
              <Col>
                <Button danger onClick={() => history?.push(`/todo-list`)}>
                  Back
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => history?.push(`/update-task/${task?._id}`)}
                >
                  Edit
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
