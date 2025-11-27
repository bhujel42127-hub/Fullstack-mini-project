import { Button, Form, Input } from "antd";
import type { FieldType, User } from "../Props";
import { api } from "../utlis/Api";
import { useNavigate } from "react-router-dom";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    try {
      const res = await api.post("/auth/verify-email", {
        email: values.email,
      });
      if (!res.data) return;
      
      localStorage.setItem("resetUser", res.data.userId);
      navigate("/forgot-password");
    } catch (error) {
      console.log("Email verification error:", error);
    }
    // console.log("Found user:", user);
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
        <Form.Item<User>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-center items-center">
          <Button type="primary" htmlType="submit">
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
