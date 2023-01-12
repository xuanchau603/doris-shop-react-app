import classNames from "classnames/bind";
import style from "./Form.module.scss";

const cx = classNames.bind(style);

const Form = ({ children, title }) => {
  return (
    <div className={cx("wrapper")}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Form;
