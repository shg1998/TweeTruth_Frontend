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
const Container = lazy(() => import("../../common/Container"));

const Register = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Container>
      <Content className="p-0">
        <Row gutter={[24, 0]} justify="space-around">
          <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Register Now !</h5>}
              bordered={false}
            >
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="Name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Name" />
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
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input placeholder="Passwoed" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree the{" "}
                    <a href="#pablo" className="font-bold text-dark">
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
              <p className="font-semibold text-muted text-center">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
            </Card>
          </Col>
          <Col
            className="sign-img"
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
