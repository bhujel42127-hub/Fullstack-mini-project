import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import type { FieldType, User } from "../Props";
import { api } from "../utlis/Api";
import { dupEmailNotification } from "../utlis/openNotification";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("clicked");

    const res = await api.get<User[]>("/users");
    const userExists = res.data.some((e) => e.email === values.email);

    console.log("User exists: ", userExists);

    if (userExists) {
      dupEmailNotification();
      return;
    }
    if (!userExists) {
      const timeStamp = new Date().toISOString();

      const newUser = {
        ...values,
        createdAt: timeStamp,
      };

      await api.post("/users", newUser);
      navigate("/login");
      console.log("User added", newUser);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Bio" name="bio">
          <Input />
        </Form.Item>
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

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <a href="/login" className="items-center">
          Already got an account? Login
        </a>
      </Form>
    </div>
  );
};
