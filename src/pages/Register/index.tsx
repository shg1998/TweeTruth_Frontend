import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
} from "antd";
import { lazy } from "react";
import { Link } from "react-router-dom";
import registerImg from "../../assets/images/register.png";
import { registerUser, useUserDispatch } from "../../context/UserContext";
const Container = lazy(() => import("../../common/Container"));

const Register = () => {
  var userDispatch = useUserDispatch();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    // registerUser(userDispatch,)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Container>
      <Content >
        <Row gutter={[24, 0]} justify="space-around">
          <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
            <Card
              title={<h5>Register Now !</h5>}
              bordered={false}
            >
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="Username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>
                <Form.Item
                  name="FullName"
                  rules={[
                    { required: true, message: "Please input your fullname!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input placeholder="Password"  type="password"/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree the{" "}
                    <a href="#pablo">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p >
                Already have an account?{" "}
                <Link to="/login">
                  Sign In
                </Link>
              </p>
            </Card>
          </Col>
          <Col
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img src={registerImg} alt="" width={560}/>
          </Col>
        </Row>
      </Content>
    </Container>
  );
};

export default Register;
