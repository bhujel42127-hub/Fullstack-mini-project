import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { api } from "../utlis/Api";
import type { FieldType, User } from "../Props";
import { useNavigate } from "react-router-dom";
import { loginFailure } from "../utlis/openNotification";

export const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    //   // console.log("reached");
    try {
      const res = await api.post("/auth/login", values);
      localStorage.setItem("userId", res.data.user.id);

      navigate("/dashboard");
    } catch (err) {
      console.log("Login error: ", err);
    }

    //   const res = await api.get<User[]>("/users");
    //   // console.log("Users", res.data);

    //   const userExists = res.data.filter(
    //     (e) => e.email === values.email && e.password === values.password
    //   );
    //   // console.log("User value: ", userExists);

    //   if (userExists.length > 0) {
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify(userExists)
    //     );

    //     navigate("/dashboard");
    //     return;
    //     // console.log("User logged in!", res.data);
    //   }
    //   loginFailure();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-bold">My Brand</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center ">
        <div className="w-full max-w-md px-8">
          <Form
            name="basic"
            layout="vertical"
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
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Submit
              </Button>
            </Form.Item>

            <div className="text-center">
              <a href="/signup" className="text-blue-500 hover:text-blue-700">
                Don't have an account? SignUp
              </a>
              <br />
              <a
                href="/verify-email"
                className="text-blue-500 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
