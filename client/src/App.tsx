import { Button, Spin } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./AppRoutes";
import MainLayout from "./components/MainLayout";

function App() {
  const location = useLocation();

  const getLoginLayout = () => {
    return <AppRoutes />;
  };
  return (
    <>
      <Spin spinning={false} tip="Loading...">
        <div className="App">
          {location.pathname === "/login" ? getLoginLayout() : <MainLayout />}
        </div>
      </Spin>
    </>
  );
}

export default App;
