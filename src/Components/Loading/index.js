import style from "./Loading.module.scss";
import classNames from "classnames/bind";
import { LoadingOutlined } from "@ant-design/icons";

const cx = classNames.bind(style);

function Loading({ tip }) {
  return (
    <div className={cx("wrapper")}>
      <span>{tip}</span>
      <LoadingOutlined />
    </div>
  );
}

export default Loading;
