import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button, Typography, Popconfirm, message } from "antd";
import { useHistory } from "react-router-dom";
import { useApi } from "hooks/useApi";
import { GET_TASKS_ENDPOINT, GET_TASK_ENDPOINT } from "utils/constant";

const { Title, Text } = Typography;

export const TodoList: React.FC = () => {
  const [todoLists, setTodoLists] = useState([]);
  const history = useHistory();
  const { get, remove } = useApi();

  const getTodoLists = async () => {
    const response = await get(GET_TASKS_ENDPOINT).then((response) => response);
    const todoLists = await response.json();
    setTodoLists(todoLists);
  };

  const removeTask = async (id) => {
    const response = await remove(`${GET_TASK_ENDPOINT}/${id}`);
    if (response?.status === 200) getTodoLists();
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
      {todoLists?.length === 0 ? (
        <Row justify="center" align="middle">
          <Col>
            <Title>Task is empty</Title>{" "}
          </Col>
        </Row>
      ) : (
        todoLists?.map((todo) => {
          return (
            <Row key={todo?.createdAt} style={{ marginBottom: "12px" }}>
              <Col span={24}>
                <Card>
                  <Row gutter={16} justify="space-between">
                    <Col flex="auto">
                      <Button
                        type="link"
                        onClick={() => history.push(`/task/${todo?._id}`)}
                        style={{ padding: 0 }}
                      >
                        {todo?.title}
                      </Button>
                      <div>
                        <Text style={{ color: "grey" }}>
                          สร้างเมื่อ :{" "}
                          {dayjs(todo?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                        </Text>
                        <Text style={{ color: "grey", marginLeft: "12px" }}>
                          แก้ไขล่าสุด :{" "}
                          {dayjs(todo?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                        </Text>
                      </div>
                    </Col>
                    <Col>
                      <Button
                        onClick={() =>
                          history?.push(`/update-task/${todo?._id}`)
                        }
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col>
                      <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => removeTask(todo?._id)}
                        // onCancel={}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          );
        })
      )}
    </div>
  );
};
