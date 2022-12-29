import style from "./Login.module.scss";
import classNames from "classnames/bind";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Login() {
  const [showPass, setShowPass] = useState(false);
  const refPass = useRef();
  const ref_btnLogin = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
  const handleLogin = () => {
    if (email.match(regexEmail) && password.length >= 6) {
      console.log({ email, password });
    }
  };

  useEffect(() => {
    if (email.match(regexEmail) && password.length >= 6) {
      ref_btnLogin.current.style.opacity = "1";
      ref_btnLogin.current.style.cursor = "pointer";
    } else {
      ref_btnLogin.current.style.opacity = "0.6";
      ref_btnLogin.current.style.cursor = "not-allowed";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const handleShowPass = () => {
    showPass ? setShowPass(false) : setShowPass(true);
    refPass.current.type === "text"
      ? (refPass.current.type = "password")
      : (refPass.current.type = "text");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("logo")}></div>
        <h1>
          Đăng nhập vào <b>Doris</b>
        </h1>
        <div className={cx("login-with")}>
          <img
            title="Đăng nhập bằng facebook"
            alt="facebook"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
          ></img>
          <img
            title="Đăng nhập bằng google"
            alt="google"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
          ></img>
          <img
            title="Đăng nhập bằng zalo"
            alt="zalo"
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png"
          ></img>
        </div>
        <div className={cx("form-control")}>
          <label>
            Email <b title="Đây là trường bắt buộc">*</b>
          </label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          ></input>
        </div>
        <div className={cx("form-control")}>
          <label>
            Mật khẩu <b title="Đây là trường bắt buộc">*</b>
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={refPass}
            type="password"
            required
            placeholder="Mật khẩu"
          ></input>
          {showPass && (
            <EyeOutlined
              onClick={handleShowPass}
              className={cx("show")}
            ></EyeOutlined>
          )}
          {!showPass && (
            <EyeInvisibleOutlined
              onClick={handleShowPass}
              className={cx("hide")}
            ></EyeInvisibleOutlined>
          )}
        </div>
        <button ref={ref_btnLogin} onClick={handleLogin}>
          Đăng nhập
        </button>
        <div className={cx("no-acc")}>
          Bạn chưa có tài khoản?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
          >
            Đăng ký
          </span>
        </div>
        <div className={cx("forgot-pass")}>Quên mật khẩu?</div>
        <span className={cx("acceptTerm")}>
          Việc bạn sử dụng trang web này đồng nghĩa bạn đồng ý với<br></br>
          <span>Điều khoản sử dụng</span> của chúng tôi.
        </span>
      </div>
      <div className={cx("about")}>
        <span>Giới thiệu về Doris</span>
        <span>Doris trên Youtube</span>
        <span>Doris trên facebook</span>
      </div>
    </div>
  );
}

export default Login;
