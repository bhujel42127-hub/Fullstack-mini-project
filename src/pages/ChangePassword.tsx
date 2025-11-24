import { Button, Form, Input, type FormProps } from "antd";
import type { FieldType } from "../Props";
import { api } from "../utlis/Api";
import { useNavigate } from "react-router-dom";

// const validatePassword = async (newPassword: string) => {
//   const res = await api.get<User[]>("/users");

//   return passwordExists;
// };

export const ChangePassword = () => {
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    const userId = localStorage.getItem("resetUser");
    const res = await api.get(`/users/${userId}`);

    const user = res.data;
    // console.log("user info", user);

    const validatePassword = user.password === values.password;

    if (validatePassword) {
      await api.patch(`/users/${userId}`, { password: values.newPassword });
      console.log("Password updated!!");
      localStorage.removeItem("resetUser");
      navigate("/login");
      return;
    } else {
      console.log("Password not matched!!!");
    }

    // const res = await api.get<User[]>("/users");

    // const user = await res.data.find((e) => e.email === values.email);
    // // console.log("email verified");

    // if (user) {
    //   const passwordValid = user.password === values.password.trim();
    //   console.log("password checked", passwordValid);
    //   console.log("user password: ", user.password);

    //   if (passwordValid) {
    //     await api.patch(`users/${user.id}`, { password: values.newPassword });
    //     console.log("password changed!!");
    //     console.log("updated user", user);
    //     return;
    //   }
    //   console.log("password did not match!!");
    // }
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
        <Form.Item label="Current Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="New Password" name="newPassword">
          <Input.Password />
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
