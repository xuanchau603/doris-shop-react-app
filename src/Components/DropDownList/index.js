import React from "react";
import { Dropdown } from "antd";

const DropDownList = ({ items, trigger, label }) => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={trigger}
  >
    {label}
  </Dropdown>
);
export default DropDownList;
