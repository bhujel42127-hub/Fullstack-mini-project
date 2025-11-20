import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { api } from "../components/Api";
import type { FieldType, User } from "../Props";
import { useNavigate } from "react-router-dom";
import { loginFailure } from "../utlis/openNotification";

export const Login = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // console.log("reached");

    const res = await api.get<User[]>("/users");
    // console.log("Users", res.data);

    const userExists = res.data.filter(
      (e) => e.email === values.email && e.password === values.password
    );
    // console.log("User value: ", userExists);

    if (userExists.length > 0) {
      const loggedUser = localStorage.setItem(
        "user",
        JSON.stringify(userExists)
      );

      navigate("/dashboard");
      return;
      // console.log("User logged in!", res.data);
    }
    loginFailure();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <a href="/signup" className="flex items-center">
          Already got an account? SignUp
        </a>
      </Form.Item>
    </Form>
  );
};
