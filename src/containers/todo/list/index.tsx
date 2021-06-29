import React from "react";
import { Col, Row, Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

export const TodoList: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <Row justify="center" align="middle">
        <Col>เข้าสู่ระบบ</Col>
      </Row>
      todo list
    </div>
  );
};
