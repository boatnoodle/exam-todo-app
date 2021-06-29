import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { useApi } from "hooks/useApi";
import { GET_TASKS_ENDPOINT, GET_TASK_ENDPOINT } from "utils/constant";

const { Title, Text } = Typography;

export const TodoList: React.FC = () => {
  const [todoLists, setTodoLists] = useState([]);
  const history = useHistory();
  const { get } = useApi();

  const getTodoLists = async () => {
    const response = await get(GET_TASKS_ENDPOINT).then((response) => response);
    const todoLists = await response.json();
    setTodoLists(todoLists);
  };

  useEffect(() => {
    getTodoLists();
  }, []);

  return (
    <div>
      <Row justify="center" align="middle">
        <Col>
          <Title level={4}>Todo lists</Title>{" "}
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ marginBottom: "12px" }}>
        <Col>
          <Button onClick={() => history.push("/create-task")}>
            Create todo
          </Button>
        </Col>
      </Row>
      {todoLists?.map((todo) => {
        return (
          <Row key={todo?.createdAt} style={{ marginBottom: "12px" }}>
            <Col span={24}>
              <Card>
                <Row gutter={16} justify="space-between">
                  <Col flex="auto">
                    <Button
                      type="link"
                      onClick={() => history.push(`/task/${todo?._id}`)}
                    >
                      {todo?.title}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => history?.push(`/update-task/${todo?._id}`)}
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      danger
                      onClick={() => history?.push(`/update-task/${todo?._id}`)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};
