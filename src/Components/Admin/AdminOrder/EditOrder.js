import { Col, Row } from "antd";
import Form from "../Components/Form";
import Apptitle from "../Components/AppTitle";
import style from "./AdminOrder.module.scss";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(style);

function EditOrder() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const [status, setStatus] = useState(0);
  const [type, setType] = useState(0);
  const [total, setTotal] = useState("");
  const [note, setNote] = useState("");

  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setFullName(state.fullName);
      setPhone(state.phone);
      setAdress(state.address);
      setStatus(state.status);
      setType(state.type);
      setTotal(state.total);
      setNote(state.note);
    }
  }, []);

  const handleUpdate = async (id) => {
    const data = {
      fullName,
      phone,
      address,
      status,
      type,
      total,
      note,
    };
    const res = await axios.put(
      `http://localhost:3001/order/update/?id=${id}`,
      data,
    );
    if (res.data) {
      alert("Cập nhật đơn hàng thành công!");
    }
  };

  return (
    <>
      <Apptitle title="Cập nhật đơn hàng"></Apptitle>
      <Form title={"Cập nhật đơn hàng"}>
        <Row className={cx("form")} gutter={[30, 20]}>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for="">
                Tên khách hàng <b>*</b>
              </label>
              <input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                type="text"
                placeholder="Nhập tên khách hàng..."
              ></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for="">
                Số điện thoại khách hàng <b>*</b>
              </label>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="number"
                placeholder="Nhập số điện thoại..."
              ></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for="">
                Địa chỉ khách hàng <b>*</b>
              </label>
              <input
                value={address}
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
                type="text"
                placeholder="Nhập địa chỉ khách hàng..."
              ></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for="">
                Tình trạng <b>*</b>
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option>--Chọn tình trạng--</option>
                <option value={0}>Chờ xác nhận</option>
                <option value={1}>Đã xác nhận</option>
                <option value={2}>Đã hủy</option>
              </select>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for="">
                Hình thức thanh toán <b>*</b>
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option>--Chọn hình thức--</option>
                <option value={0}>Thanh toán khi nhận hàng</option>
                <option value={1}>Thanh toán qua MoMo</option>
                <option value={2}>Thanh toán qua VNPAY</option>
                <option value={3}>Chuyển khoản qua ngân hàng</option>
              </select>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for="">
                Tổng tiền <b>*</b>
              </label>
              <input
                value={total}
                onChange={(e) => {
                  setTotal(e.target.value);
                }}
                type="number"
                placeholder="Nhập tổng tiền..."
              ></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for="">Ghi chú đơn hàng </label>
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                placeholder="Ghi chú đơn hàng(không bắt buộc)..."
              ></textarea>
            </div>
          </Col>
        </Row>
        <div className={cx("actions")}>
          <button
            onClick={() => {
              handleUpdate(state.order_ID);
            }}
          >
            Lưu lại
          </button>
          <Link to={"/admin/order"}>Trở về</Link>
        </div>
      </Form>
    </>
  );
}

export default EditOrder;
