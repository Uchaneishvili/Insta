import React, { useEffect, useState } from "react";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  notification,
  PageHeader,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Bread from "../../components/Bread";
import axios from "axios";
import { IType } from "../../types/users";
import { Link } from "react-router-dom";

const User: React.FC = () => {
  const [dataIndex, setDataIndex] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/users");
        setDataIndex(data.data.users);
      } catch (err) {
        console.error("Users cannot be loaded", err);
      }
    };
    fetchData();
  }, []);

  const getTypeTitle = (val: number) => {
    switch (val) {
      case IType.USER:
        return "User";
      case IType.TAG:
        return "Tag";

      default:
        return "";
    }
  };

  const routes: Route[] = [
    {
      path: "/user",
      breadcrumbName: "მომხმარებლები",
    },
  ];

  const columns = [
    {
      title: "მომხმარებლის / თეგის სახელი",
      dataIndex: "userName",
      width: 150,
      key: "code",
    },
    {
      title: "ტიპი",
      dataIndex: "type",
      width: 150,
      key: "type",
      render: (val: number) => getTypeTitle(val),
    },
    {
      title: "MediaCount",
      dataIndex: "mediaCount",
      width: 150,
      key: "mediaCount",
    },

    {
      title: "ქმედება",
      dataIndex: "_id",
      width: 100,
      key: "action",
      render: (id: string) => {
        return (
          <Space>
            <Button type="primary" size="small">
              <Link to={`/users/${id}`}>
                <EditOutlined />
              </Link>
            </Button>
            <Popconfirm
              title={"ნამდვილად გსურთ ჩანაწერის წაშლა ?"}
              okText={"დადასტურება"}
              cancelText={"გაუქმება"}
              onConfirm={() => {
                axios.delete(`http://localhost:3001/users/${id}`).then(
                  () => {
                    notification.success({
                      message: "წარმატება ! ",
                      description: "ჩანაწერი წაშლილია",
                    });
                    window.location.reload();
                  },
                  (e) => {
                    console.log("Failed:", e);
                  }
                );
              }}
            >
              <Button danger type="primary" size="small">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Bread routes={routes}></Bread>
      <PageHeader
        onBack={() => window.history.back()}
        title={"მონაცემების მართვა"}
        className="site-page-header"
      />
      <div className="page-wrapper">
        <Table
          rowKey={(row) => row._id}
          columns={columns}
          dataSource={dataIndex}
        />
      </div>
    </>
  );
};

export default User;
