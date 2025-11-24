import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export const DefaultLayout = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <HomeOutlined />,
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      label: <a href="/product">Product</a>,
    },
    {
      key: "3",
      label: <a href="/profile">Profile</a>,
    },
    {
      key: "4",
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
    },
  ];

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content
        style={{
          flex: 1,
          padding: "24px",
          background: "#fff",
          justifyItems: "center",
        }}
      >
        <div
          style={{
            padding: "24px",
            borderRadius: "4px",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
