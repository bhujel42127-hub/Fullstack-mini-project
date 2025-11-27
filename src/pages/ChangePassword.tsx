import { Button, Form, Input } from "antd";
import type { ChangePasswordFieldType } from "../Props";
import { api } from "../utlis/Api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { openNotification } from "../utlis/openNotification";

// const validatePassword = async (newPassword: string) => {
//   const res = await api.get<User[]>("/users");

//   return passwordExists;
// };

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const onFinish = async (values: ChangePasswordFieldType) => {
    // console.log("reset token: ", token);
    if (values.newPassword !== values.confirmPassword) {
      openNotification(
        "error",
        "Password change failed!",
        "Passwords do not match!"
      );
      return;
    }
    try {
      console.log("before reset pass post");

      const res = await api.post("/auth/reset-password", {
        token,
        newPassword: values.newPassword,
      });
      openNotification(
        "success",
        "Password change",
        "Password changed successfully!"
      );
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log("Password change error:", error);
    }

    // console.log("user info", user);

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
        <Form.Item label="New Password" name="newPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword">
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
