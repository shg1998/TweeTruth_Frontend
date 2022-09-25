
import { Col, Row } from "antd";
import { Layout } from "antd";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { signOut, useUserDispatch } from "../../context/UserContext";
import Dashboard from "../../pages/dashboard";
import AccountDetails from "../AccountDetails";

const { Header, Content, Sider } = Layout;

const CustomLayout: React.FC = () => {
  const userDispatch = useUserDispatch();
  const history = useHistory();

  return (
    <>
      <Layout className="main-layout">
        <Header className="header">
          <Row>
            <Col span={5}>
              <h4
                style={{ color: "beige", fontSize: "20px", marginTop: "20px" }}
              >
                TweeTruth:)
              </h4>
            </Col>
            <Col span={18} />
            <Col span={1}>
              <h6
                style={{
                  color: "beige",
                  fontSize: "15px",
                  marginTop: "25px",
                  cursor: "pointer",
                }}
                onClick={() => signOut(userDispatch, history)}
              >
                SignOut!
              </h6>
            </Col>
          </Row>
        </Header>
        <Switch>
          <Route path="/app/home" component={Dashboard} />
          <Route
            path={"/app/accountDetails/:accountId"}
            component={AccountDetails}
          />
        </Switch>
      </Layout>
    </>
  );
};

export default CustomLayout;
