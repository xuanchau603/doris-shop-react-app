import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import style from "./Captcha.module.scss";
import classNames from "classnames/bind";
import { ReloadOutlined } from "@ant-design/icons";

const cx = classNames.bind(style);

const Captcha = forwardRef((props, ref) => {
  //clear the contents of captcha div first
  const createCapcha = () => {
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@";
    var lengthOtp = 4;
    var cap = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (cap.indexOf(charsArray[index]) === -1) cap.push(charsArray[index]);
      else i--;
    }

    return cap.join("");
  };
  const initCaptcha = createCapcha();
  const [captcha, setCaptcha] = useState(initCaptcha);
  const handleReset = () => {
    const cp = createCapcha();
    setCaptcha(cp);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      handleReset();
    },
  }));
  useEffect(() => {
    props.getValue(captcha);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captcha]);
  return (
    <div className={cx("wrapper", [props.classNames])}>
      <span className={cx("content")}>{captcha}</span>
      <button className={cx("btn-reset")} onClick={handleReset}>
        <ReloadOutlined></ReloadOutlined>
      </button>
    </div>
  );
});

export default Captcha;
