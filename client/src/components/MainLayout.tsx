import { Layout } from "antd";
import { FC } from "react";
import { AppRoutes } from "../AppRoutes";
import PageHeader from "./PageHeader";
import { Sidebar } from "./Sidebar";

const MainLayout: FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout id="contextWrapper" style={{ marginLeft: 250 }}>
        <PageHeader />
        <AppRoutes />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
