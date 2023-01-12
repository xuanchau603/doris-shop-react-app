import Clock from "../Clock";
import style from "./Apptitle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
function Apptitle({ title }) {
  return (
    <div className={cx("app-title")}>
      <div className={cx("title")}>{title}</div>
      <div className={cx("clock")}>
        <Clock></Clock>
      </div>
    </div>
  );
}

export default Apptitle;
