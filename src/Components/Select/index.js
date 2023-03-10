import React from "react";
import { Select } from "antd";

const Selection = ({ options, onChange }) => (
  <Select
    labelInValue
    defaultValue={options[0]}
    style={{ width: "100%" }}
    onChange={onChange}
    options={options}
  />
);
export default Selection;
