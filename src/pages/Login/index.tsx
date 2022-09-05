import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import { lazy } from "react";
import { Link } from "react-router-dom";
import singinImg from "../../assets/images/login.png";
const Container = lazy(() => import("../../common/Container"));

const Login = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24}}
            lg={{ span: 12}}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your username and password to sign in
            </Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}>
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}>
                <Input placeholder="Password" />
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
              <p className="font-semibold text-muted">
                Don't have an account?{" "}
                <Link to="/register" className="text-dark font-bold">
                  Sign Up
                </Link>
              </p>
            </Form>
          </Col>
          <Col
            className="sign-img"
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
  );
};

export default Login;
