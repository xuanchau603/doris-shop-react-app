import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const items = [
  {
    label: <a href="/">Nổi bật</a>,
    key: "0",
  },
  {
    label: <a href="/">Giá cao đến thấp</a>,
    key: "1",
  },
  // {
  //   type: "divider",
  // },
  {
    label: <a href="/">Giá thấp đến cao</a>,
    key: "3",
  },
];
const DropDownList = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <a href="/" onClick={(e) => e.preventDefault()}>
      <Space>
        Xếp theo: Nổi bật
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default DropDownList;
