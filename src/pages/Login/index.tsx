import React, { useState } from "react";
import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import { lazy } from "react";
import { Link, useHistory } from "react-router-dom";
import singinImg from "../../assets/images/login.png";
import { loginUser, useUserDispatch } from "../../context/UserContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Container = lazy(() => import("../../common/Container"));

const Login = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  var userDispatch = useUserDispatch();

  const onFinish = (values: any) => {
    loginUser(
      userDispatch,
      values.username,
      values.password,
      history,
      setIsLoading,
      setError
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Row gutter={[24, 0]} justify="space-around">
            <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
              <Title>Sign In</Title>
              <Title level={5}>
                Enter your username and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Form.Item
                  label="username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input placeholder="Password" type="password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                <p>
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
              </Form>
            </Col>
            <Col
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={singinImg} alt="" width={400} />
            </Col>
          </Row>
        </Content>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
