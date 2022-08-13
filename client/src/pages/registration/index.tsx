import { Alert, Button, Form, Input, InputNumber, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./registration.css";
import axios from "axios";
import { IType } from "../../types/users";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      const data = await form.validateFields();
      console.log(data);
      await axios.post("http://localhost:3001/users", data);
    } catch (err: any) {
      setErrorMsg("დაფიქსირდა შეცდომა.");
      setLoading(false);
    }
  };

  return (
    <div className="login-warp">
      <Form form={form} name="normal_login" className="login-form">
        <div className="text-center mb-4">
          <h6 className="login-header-txt">რეგისტრაცია</h6>
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

        <Form.Item
          name="type"
          rules={[
            {
              required: true,
              message: "ტიპის მითითება სავალდებულოა",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Tag / User"
            style={{ width: "100%" }}
          >
            <Option value={IType.TAG}>Tag</Option>
            <Option value={IType.USER}>User</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="mediaCount"
          rules={[
            {
              required: true,
              message: "ველის შევსება სავალდებულოა",
            },
          ]}
        >
          <InputNumber
            min={0}
            size="large"
            placeholder="The number of media"
            style={{ width: "100%" }}
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
            რეგისტრაცია
          </Button>

          <div className="text-center pt-2">
            <Button
              className="footer-button"
              onClick={() => {
                navigate(`/login`);
              }}
            >
              ავტორიზაცია
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
