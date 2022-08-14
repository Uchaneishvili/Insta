import React, { useCallback, useEffect } from "react";
import Bread from "../../../components/Bread";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import {
  PageHeader,
  Layout,
  Form,
  notification,
  Popconfirm,
  Button,
} from "antd";
import UserForm from "./form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Params = {
  id: string;
};

function SalaryEdit() {
  const [form] = Form.useForm();
  const params = useParams<Params>();
  const navigate = useNavigate();
  const routes: Route[] = [
    {
      path: "/users",
      breadcrumbName: "მომხმარებლების მართვა",
    },
    {
      path: "",
      breadcrumbName: "რედაქტირება",
    },
  ];

  const getUserInfo = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:3001/users/${params.id}`
    );

    form.setFieldsValue(data.data);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [form, params.id]);

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();
      await axios.put(`http://localhost:3001/users/${params.id}`, data).then(
        () => {
          notification.success({
            message: "წარმატება ! ",
            description: "ჩანაწერი წარმატებით შეიცვალა",
          });

          navigate("/users");
        },
        (e) => {
          notification.error({
            message: "შეცდომ ! ",
            description: "ჩანაწერის ცვლილებისას მოხდა შეცდომა",
          });
          console.log("Failed:", e);
        }
      );
    } catch (err: any) {
      console.error("Record cannot be updated", err);
    }
  };

  return (
    <>
      <Bread routes={routes} />

      <PageHeader
        className="site-page-header"
        title={"რედაქტირება"}
        onBack={() => window.history.back()}
        extra={[
          <Popconfirm
            key="salaryRuleTopButtons"
            placement="bottomRight"
            title={"ნამდვილად გსურთ გაუქმება?"}
            onConfirm={() => window.history.back()}
            okText={"დადასტურება"}
            cancelText={"გაუქმება"}
          >
            <Button type="primary" key="cancelsalaryRuleTop" danger>
              {"გაუქმება"}
            </Button>
          </Popconfirm>,

          <Button
            type="primary"
            key="savesalaryRuleTop"
            onClick={() => {
              handleSubmit();
            }}
          >
            {"დამახსოვრება"}
          </Button>,
        ]}
      />

      <div className="page-wrapper">
        <Layout.Content>
          <UserForm form={form} />
        </Layout.Content>
      </div>
    </>
  );
}

export default SalaryEdit;
