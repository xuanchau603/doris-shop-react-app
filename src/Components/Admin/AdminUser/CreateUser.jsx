import { Col, Row } from "antd";
import Form from "../Components/Form";
import Apptitle from "../Components/AppTitle";
import style from "./AdminUser.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function CreateUser() {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [fullName, setFulname] = useState("");
  const [address, setAddress] = useState("");
  const navigte = useNavigate();
  const refName = useRef();
  const refImage = useRef();
  const refDes = useRef();

  const handleEdit = async () => {
    if (!email || !image || !role || !password)
      return alert("Vui lòng nhập đầy đủ thông tin yêu cầu!");
    const data = {
      email,
      password,
      fullName,
      address,
      image,
      role,
    };
    try {
      const res = await axios.post(`http://localhost:3001/user/create/`, data);
      alert("Cập nhật tài khoản thành công!");
      refName.current.focus();
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  return (
    <>
      <Apptitle title="Tạo mới tài khoản"></Apptitle>
      <Form title={"Tạo mới tài khoản"}>
        <Row className={cx("form")} gutter={[30, 20]}>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label htmlFor="">
                Email <b>*</b>
              </label>
              <input
                ref={refName}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email..."
              ></input>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label htmlFor="">
                Mật khẩu <b>*</b>
              </label>
              <input
                ref={refDes}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
              ></input>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label htmlFor="">Họ tên</label>
              <input
                ref={refDes}
                value={fullName}
                onChange={(e) => setFulname(e.target.value)}
                placeholder="Nhập tên đầy đủ..."
              ></input>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label htmlFor="">Địa chỉ</label>
              <input
                ref={refDes}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ cụ thể..."
              ></input>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label htmlFor="">
                Quyền <b>*</b>
              </label>
              <select onChange={(e) => setRole(e.target.value)} value={role}>
                <option value={""}>--Chọn quyền--</option>
                <option value={"9d02849a-732e-495e-9d40-cab8adc53f91"}>
                  ADMIN
                </option>
                <option value={"395c9132-7e13-4918-98a2-0c75a99df17f"}>
                  CUSTOMER
                </option>
              </select>
            </div>
          </Col>

          <Col span={6}>
            <div className={cx("form-group")}>
              <label htmlFor="">
                Avatar <b>*</b>
              </label>
              <input
                ref={refImage}
                type="file"
                onChange={(e) => {
                  const reader = new FileReader();
                  if (e.target.files.length === 0) {
                    return setImage("");
                  }
                  if (e.target.files[0]) {
                    reader.readAsDataURL(e.target.files[0]);
                    reader.addEventListener("load", () => {
                      setImage(reader.result);
                    });
                  }
                }}
              ></input>
              <img
                className={cx("preview")}
                width="100%"
                alt=""
                src={image}
              ></img>
            </div>
          </Col>
        </Row>
        <div className={cx("actions")}>
          <button type="submit" onClick={handleEdit}>
            Lưu lại
          </button>
          <button
            onClick={() => {
              navigte("/admin/user");
            }}
          >
            Hủy bỏ
          </button>
        </div>
      </Form>
    </>
  );
}

export default CreateUser;
