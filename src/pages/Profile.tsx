import { useEffect, useState } from "react";
import type { User } from "../Props";
import { api } from "../components/Api";
import { Button, Form, Input, Table, type FormProps } from "antd";
import { editSuccess } from "../utlis/openNotification";

export default function ProfilePage() {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (!loggedUser) return;
    const userInfo: User[] = JSON.parse(loggedUser);
    setUser(userInfo);
    form.setFieldsValue(userInfo[0]);
  }, []);

  const { Column } = Table;
  const [form] = Form.useForm();

  const onFinish: FormProps<User>["onFinish"] = async (values) => {
    // console.log("reached");
    // const loggedUser = localStorage.getItem("user");
    // if (!loggedUser) return;

    // const userInfo: User[] = JSON.parse(loggedUser);
    const userId = user[0].id;

    await api.patch(`http://localhost:3000/users/${userId}`, values);
    await localStorage.setItem(
      "user",
      JSON.stringify([{ ...user[0], ...values }])
    );
    editSuccess();

    setUser([{ ...user[0], ...values }]);

    // window.location.reload();

    // setUser(updatedUser)
  };

  const onFinishFailed: FormProps<User>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<User>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<User> label="Bio" name="bio">
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>

      <Table<User> dataSource={user} rowKey="id" className="flex w-full">
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Bio" dataIndex="bio" key="bio" />
        <Column title="Email" dataIndex="email" key="email" />
      </Table>
    </div>
  );
}
