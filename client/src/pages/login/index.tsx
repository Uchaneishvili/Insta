import { Alert, Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./login.css";
const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const login = async () => {
    try {
      setLoading(true);
      const data = await form.validateFields();
      console.log(data);
      await fetch("http://localhost:3001/users/login", data);
    } catch (err: any) {
      setErrorMsg("დაფიქსირდა შეცდომა.");
      setLoading(false);
    }
  };

  return (
    <div className="login-warp">
      <Form form={form} name="normal_login" className="login-form">
        <div className="text-center mb-4">
          <h6 className="login-header-txt">ავტორიზაცია</h6>
        </div>
        {errorMsg && (
          <Alert
            style={{ marginBottom: 24 }}
            message="დაფიქსირდა შეცდომა"
            description={errorMsg}
            type="error"
            showIcon
          />
        )}
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "მომხმარებლის სახელი ან ელ-ფოსტა სავალდებულოა",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="მომხმარებლის სახელი ან ელ-ფოსტა"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "პაროლის შეყვანა სავალდებულოა",
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="შეიყვანეთ პაროლი"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={login}
            className="login-form-button"
            loading={loading}
          >
            ავტორიზაცია
          </Button>

          <div className="text-center pt-2">რეგისტრაცია </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
