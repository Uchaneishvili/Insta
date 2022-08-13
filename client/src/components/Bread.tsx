import React, { FC } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";

interface IBreadProp {
  routes: Route[];
}

const { Item } = Breadcrumb;

const Bread: FC<IBreadProp> = (prop) => {
  const extraBreadcrumbItems = prop.routes.map((row: Route, index: number) => {
    const last = prop.routes.length === index + 1;
    return last ? (
      <Item key={row.path}>{row.breadcrumbName}</Item>
    ) : (
      <Item key={row.path}>
        <a href={row.path}>{row.breadcrumbName}</a>
      </Item>
    );
  });
  const breadcrumbItems = [
    <Item key="home">
      <a href="/">
        <HomeOutlined />
      </a>
    </Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <div className="breadCrumb">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};
export default Bread;
