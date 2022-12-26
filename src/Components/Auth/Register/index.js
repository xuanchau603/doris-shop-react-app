import style from "./Register.module.scss";
import classNames from "classnames/bind";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons/lib/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Captcha from "../Captcha";
import { useFormik } from "formik";
import * as Yup from "yup";

const cx = classNames.bind(style);

function Register() {
  const [showPass, setShowPass] = useState(false);
  const [valueCaptcha, setValueCaptcha] = useState("");
  const ref_btnRegister = useRef();
  const refPass = useRef();
  const captChaRef = useRef();
  const refInputCaptcha = useRef();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      captcha: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Vui lòng điền vào trường này!")
        .min(4, "Tên của bạn không hợp lệ"),
      // .matches(
      //   "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹsW|_]+$",
      //   "Tên của bạn không hợp lệ"
      // ),
      email: Yup.string()
        .required("Vui lòng điền vào trường này!")
        .email("Email của bạn không hợp lệ!"),
      password: Yup.string()
        .min(6, "Mật khẩu của bạn quá ngắn!")
        .required("Vui lòng điền vào trường này!"),
      confirmPassword: Yup.string()
        .required("Vui lòng điền vào trường này!")
        .min(6, "Mật khẩu của bạn quá ngắn!")
        .oneOf([Yup.ref("password")], "Mật khẩu không trùng nhau!"),
      captcha: Yup.string().required("Vui lòng điền vào trường này!"),
    }),
    onSubmit: (value) => {
      console.log(value.captcha);
    },
  });

  useEffect(() => {
    if (
      formik.values.fullName &&
      formik.values.email &&
      formik.values.password &&
      formik.values.confirmPassword &&
      formik.values.captcha
    ) {
      ref_btnRegister.current.style.opacity = "1";
      ref_btnRegister.current.style.cursor = "pointer";
    } else {
      ref_btnRegister.current.style.opacity = "0.6";
      ref_btnRegister.current.style.cursor = "not-allowed";
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [
    formik.values.fullName,
    formik.values.email,
    formik.values.password,
    formik.values.confirmPassword,
    formik.values.captcha,
  ]);

  const handleShowPass = () => {
    showPass ? setShowPass(false) : setShowPass(true);
    refPass.current.type === "text"
      ? (refPass.current.type = "password")
      : (refPass.current.type = "text");
  };

  const getValueCaptCha = (value) => {
    setValueCaptcha(value);
  };

  // const handleRegister = () => {};

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("logo")}></div>
        <h1>
          Đăng ký tài khoản <b>Doris</b>
        </h1>

        <div className={cx("form-control")}>
          <label>Tên của bạn?</label>
          <input
            name="fullName"
            type="text"
            placeholder="Họ và tên của bạn"
            value={formik.fullName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></input>
          {formik.errors.fullName && formik.touched.fullName && (
            <span className={cx("error-mess")}>{formik.errors.fullName}</span>
          )}
        </div>
        <div className={cx("form-control")}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onBlur={formik.handleBlur}
            value={formik.email}
            onChange={formik.handleChange}
          ></input>
          {formik.errors.email && formik.touched.email && (
            <span className={cx("error-mess")}>{formik.errors.email}</span>
          )}
        </div>
        <div className={cx("form-control")}>
          <label>Mật khẩu</label>
          <input
            ref={refPass}
            name="password"
            type="password"
            required
            placeholder="Mật khẩu"
            value={formik.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></input>
          {formik.errors.password && formik.touched.password && (
            <span className={cx("error-mess")}>{formik.errors.password}</span>
          )}

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
        <div className={cx("form-control")}>
          <label>Nhập lại mật khẩu</label>
          <input
            // ref={refPass}
            name="confirmPassword"
            type="password"
            required
            placeholder="Nhập lại mật khẩu"
            value={formik.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></input>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className={cx("error-mess")}>
              {formik.errors.confirmPassword}
            </span>
          )}

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

        <div className={cx("form-control")}>
          <label>Mã xác nhận</label>
          <input
            name="captcha"
            ref={refInputCaptcha}
            type="text"
            placeholder="Nhập mã xác nhận"
            value={formik.captcha}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></input>
          {formik.errors.captcha && formik.touched.captcha && (
            <span className={cx("error-mess")}>{formik.errors.captcha}</span>
          )}
          <Captcha
            ref={captChaRef}
            classNames={cx("captcha")}
            getValue={getValueCaptCha}
          ></Captcha>
        </div>
        <button
          type="submit"
          ref={ref_btnRegister}
          onClick={formik.handleSubmit}
        >
          Đăng ký
        </button>

        <div className={cx("no-acc")}>
          Bạn đã có tài khoản?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Đăng nhập
          </span>
        </div>
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

export default Register;
