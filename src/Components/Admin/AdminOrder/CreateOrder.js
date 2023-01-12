import { Col, Row } from "antd";
import Form from "../Components/Form";
import Apptitle from "../Components/AppTitle";
import style from "./AdminOrder.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function CreateOrder() {
  return (
    <>
      <Apptitle title='Thêm đơn hàng'></Apptitle>
      <Form title={"Tạo mới đơn hàng"}>
        <Row className={cx("form")} gutter={[30, 20]}>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Tên khách hàng <b>*</b>
              </label>
              <input type='text' placeholder='Nhập tên khách hàng...'></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Số điện thoại khách hàng <b>*</b>
              </label>
              <input type='number' placeholder='Nhập số điện thoại...'></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Địa chỉ khách hàng <b>*</b>
              </label>
              <input
                type='text'
                placeholder='Nhập địa chỉ khách hàng...'
              ></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Tên người bán <b>*</b>
              </label>
              <input type='text' placeholder='Nhập tên người bán...'></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Ngày lập đơn hàng <b>*</b>
              </label>
              <input type='date' placeholder='Nhập ngày lập đơn...'></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Tên sản phẩm <b>*</b>
              </label>
              <input type='text' placeholder='Nhập tên sản phẩm...'></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Mã sản phẩm <b>*</b>
              </label>
              <input type='text' placeholder='Nhập mã sản phẩm...'></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Số lượng <b>*</b>
              </label>
              <input type='number' placeholder='Nhập số lượng...'></input>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>
                Tình trạng <b>*</b>
              </label>
              <select>
                <option>--Chọn tình trạng--</option>
                <option>Đã xử lý</option>
                <option>Đang xử lý</option>
                <option>Đã hủy</option>
              </select>
            </div>
          </Col>
          <Col span={8}>
            <div className={cx("form-group")}>
              <label for=''>Ghi chú đơn hàng </label>
              <textarea placeholder='Ghi chú đơn hàng(không bắt buộc)...'></textarea>
            </div>
          </Col>
        </Row>
        <div className={cx("actions")}>
          <button>Lưu lại</button>
          <button>Hủy bỏ</button>
        </div>
      </Form>
    </>
  );
}

export default CreateOrder;
