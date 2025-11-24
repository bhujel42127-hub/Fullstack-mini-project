import { Button, Form, Input } from "antd";
import type { FieldType, User } from "../Props";
import { api } from "../utlis/Api";
import { useNavigate } from "react-router-dom";

export const VerifyEmail = () => {
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    const res = await api.get<User[]>("/users");

    const user = res.data.find((e) => e.email === values.email);

    if (!user) return;

    localStorage.setItem("resetUser", String(user.id));

    console.log("user", user.bio);

    navigate("/forgot-password");
  };

  return (
    <div className="flex justify-center p-20">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <Form.Item<User> label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-center items-center">
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
