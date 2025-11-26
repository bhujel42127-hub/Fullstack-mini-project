import { useEffect, useState } from "react";
import type { User } from "../Props";
import { api } from "../utlis/Api";
import { Button, Form, Input, type FormProps } from "antd";
import { openNotification } from "../utlis/openNotification";

export default function ProfilePage() {
  const [user, setUser] = useState<User[]>([]);
  const [form] = Form.useForm();

  const fetchUser = async () =>{
    const userId = localStorage.getItem("userId");
    // console.log("user id", userId);
    
    if (!userId) return;
    try {
      const res = await api.get(`/users/${userId}`);
      const userData = res.data.user;
      setUser(userData);      
      console.log("User state:", user);
      
      form.setFieldsValue(userData);
      
    } catch (error) {
      console.log("Getting user info error:", error);
      
    }
    // console.log("User data: ", res.data);
    
  }
  useEffect(() => {
    fetchUser();
    form.setFieldsValue(user[0]);

  }, []);


  const onFinish: FormProps<User>["onFinish"] = async (values) => {
    // console.log("reached");
    // const loggedUser = localStorage.getItem("user");
    // if (!loggedUser) return;

    // const userInfo: User[] = JSON.parse(loggedUser);
    // fetchUser();  
    const userId = localStorage.getItem("userId");
    // console.log("User id", userId);
    
    if (!userId) return;
    
    await api.put(`/users/${userId}`, values);
    
    openNotification("success", "Profile Updated", "Your profile has been updated successfully");
    await api.get(`/users/${userId}`).then((res) => {
      const updatedUser = res.data.user;
      console.log("Updated user:", updatedUser);
    });

    


    // window.location.reload();

    // setUser(updatedUser)
  };

  const onFinishFailed: FormProps<User>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // <div className="flex justify-center items-center h-full">
    //   <Card title="tile" variant="borderless" style={{ width: 300 }}>
    //     <h1></h1>
    //     <p>Card content</p>
    //     <p>Card content</p>
    //   </Card>
    // </div>

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
        <Form.Item<User> label="Email" name="email">
          <Input />
        </Form.Item>
        {/* <Form.Item<User> label="Password" name="password">
          <Input.Password readOnly />
        </Form.Item> */}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>

      {/* <Table<User> dataSource={user} rowKey="id" className="flex w-full">
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Bio" dataIndex="bio" key="bio" />
        <Column title="Email" dataIndex="email" key="email" />
      </Table> */}
    </div>
  );
}
