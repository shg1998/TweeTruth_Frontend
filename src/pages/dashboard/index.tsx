import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, MenuProps, Row } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { signOut, useUserDispatch } from "../../context/UserContext";
import Accounts from '../../components/Accounts';
import "./index.css";
import Users from "../../components/Users";


const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: 1,
    icon: React.createElement(LaptopOutlined),
    label: "Accounts",
  },
  {
    key: 2,
    icon: React.createElement(UserOutlined),
    label: "Users",
  },
];

const Dashboard: React.FC = () => {
  const userDispatch = useUserDispatch();
  const history = useHistory();
  const minHeight : number = window.innerHeight - 66;
  const [selectedItem, setSelectedItem] = React.useState<string>("1");

  const linkTo = (item: any): void => {
    setSelectedItem(item.key);
  };

  const ContentDisplayer = () => {
    switch(selectedItem){
      case '1':
        return <Accounts/>
      case '2':
        return <Users/>
    }
  };

  return (
    <>
       <Layout style={{ minHeight: minHeight }}>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedItem]}
              style={{ height: "100%", borderRight: 0 }}
              items={items}
              onClick={linkTo}
            />
          </Sider>
          <Layout style={{ padding: "24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
              }}
            >
              {ContentDisplayer()}
            </Content>
          </Layout>
        </Layout>
    </>
  );
};

export default Dashboard;
