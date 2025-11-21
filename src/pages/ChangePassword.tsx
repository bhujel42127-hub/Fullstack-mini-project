import { Button, Form, Input, type FormProps } from "antd";
import type { User } from "../Props";
import { api } from "../utlis/Api";

const validatePassword = () => {};

const onFinish: FormProps<User>["onFinish"] = async (values) => {

    
  await api.post("/users", values);
};

export const ChangePassword = () => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<User> label="Current Password" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item<User> label="New Password" name="newPass">
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Confirm
      </Button>
    </Form>
  );
};
