import { Spin } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.min.css";
import { AppRoutes } from "./AppRoutes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const getLoginLayout = () => {
  return <AppRoutes />;
};
root.render(
  <Router>
    <Spin spinning={false} tip="Loading...">
      <div className="App">{getLoginLayout()}</div>
    </Spin>
  </Router>
);
