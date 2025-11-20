import { Layout, Menu } from "antd";
import { href, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export const DefaultLayout = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <a href="/product">Product</a>,
    },
    {
      key: "2",
      label: <a href="/profile">Profile</a>,
    },
    {
      key: "3",
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
    },
  ];

  return (
    <div>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <div
            style={{
              background: "#ffffff",
              minHeight: 280,
              padding: 24,
            }}
          >
            Content
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};
