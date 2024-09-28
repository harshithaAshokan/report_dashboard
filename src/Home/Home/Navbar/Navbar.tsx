import { useState } from "react";
import { Col, Layout, Menu, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import dashboard from "../../../assets/dashboard.png";
import users from "../../../assets/users.png";
import device from "../../../assets/device.png";
import report from "../../../assets/file (1).png";
import readingreport from "../../../assets/file (3).png";
import history from "../../../assets/history.png";
import alert from "../../../assets/alert.png";
import notification from "../../../assets/notification.png";
import subscription from "../../../assets/subscription.png";
import failure from "../../../assets/failure.png";
import power from '../../../assets/electricity.png'
import logout from '../../../assets/out.png'
import HeaderComponent from "../Header/HeaderComponent";

import classes from './Navbar.module.css'
import { Helmet } from "react-helmet";
const { Header, Sider, Content } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const key = (localStorage.getItem("selectedKey") === "11" ? "1" : localStorage.getItem("selectedKey"))
  const storedKey = key ?? "1";

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const Navigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleMenuSelect = ({ key }: { key: string }) => {
    localStorage.setItem("selectedKey", key);
    console.log("Selected key:", key);
  };

  const userType = localStorage.getItem("userType");

 
  const items: any = [
   
    {
      key: "1",
      icon: (
        <img src={dashboard} className={classes.iconimg} alt="Dashboard Icon" />
      ),
      label: "Dashboard",
      onClick: () => Navigate("/dashboard"),
    },
    {
      key: "2",
      icon: (
        <img src={device} className={classes.iconimg} alt="Dashboard Icon" />
      ),
      label: "Device",
    },
    {
      key: "3",
      icon: <img src={users} className={classes.iconimg} alt="Dashboard Icon" />,
      label: "User",
    },
    {
      key: "4",
      label: "Reports",
      icon: (
        <img
          src={report}
          className={classes.iconimg}
          alt="User Management Icon"
        />
      ),
      children: [
        {
          key: "5",
          label: "Reading Report",
          icon: (
            <img
              src={readingreport}
              className={classes.iconimg}
              alt="Admin Icon"
            />
          ),
        },
        {
              key: "6",
              label: "Consumption Report",
              icon: (
                <img
                  src={readingreport}
                  className={classes.iconimg}
                  alt="Dealer Icon"
                />
              ),
            },
         
        {
          key: "7",
          label: "History Report",
          icon: (
            <img src={history} className={classes.iconimg} alt="Employee Icon" />
          ),
        },
        {
          key: "8",
          label: "Notification Report",
          icon: (
            <img
              src={notification}
              width="20px"
              height="20px"
              alt="Employee Icon"
            />
          ),
          onClick: () => Navigate("/notificationReport"),
        },
        {
          key: "9",
          label: "Alert Report",
          icon: (
            <img src={alert} className={classes.iconimg} alt="Employee Icon" />
          ),
        },
        {
          key: "10",
          label: "Failure Analysis",
          icon: (
            <img src={failure} className={classes.iconimg}  alt="Employee Icon" />
          ),
          onClick: () => Navigate("/failureReport"),
        },
      ].filter(Boolean),
    },
    {
      key: "11",
      icon: (
        <img src={subscription} className={classes.iconimg} alt="Logout Icon" />
      ),
      label: "Subscription",
    },
    {
      key: "12",
      icon: (
        <img src={logout} className={classes.iconimg} alt="Logout Icon" />
      ),
      label: "Logout",
      onClick: handleLogout,
    },
  ].filter(Boolean); // filter out any `null` or `undefined` items

  return (
    <>
    <Helmet><title>Navbar</title></Helmet>
    <Layout className={classes.layout}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        breakpoint="lg"
        collapsedWidth={80}
        width={200}
      >
        <Row gutter={[5,5]} className="mt-5">
          <Col xs={24} md={6} ><img src={power} className={`ms-3 ${classes.userimg}`}/></Col>
        {!collapsed && (<Col xs={24} md={18}><p className="mt-2 fs-4 fw-bold">M-POWER</p></Col>)}  
        </Row>
        
        
        <Menu mode="inline" items={items}  defaultSelectedKeys={[storedKey]}
          onSelect={handleMenuSelect} className="mt-4" />
      </Sider>

      <Layout className="mt-3 me-3 mb-3">
        <Header
          className={classes.header}
        >
         <HeaderComponent/>
        </Header>

        <Content className="mt-3 ms-3 me-3 mb-3">
          <Outlet />
        </Content>
      </Layout>
    </Layout></>
  );
}
export default Navbar;
