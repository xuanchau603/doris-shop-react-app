import style from "./Cart.module.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import {
  CloseCircleOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const cx = className.bind(style);

function Cart() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("top-content")}>
        <Link to={"/"}>
          <LeftOutlined /> Mua thêm sản phẩm khác
        </Link>
        <span>Giỏ hàng của bạn</span>
      </div>
      <div className={cx("middle-cart")}>
        <ul className={cx("listing-cart")}>
          <li className={cx("item-cart")}>
            <div className={cx("item-cart-left")}>
              <img
                alt=''
                src='https://cdn.tgdd.vn/Products/Images/42/274359/samsung-galaxy-a23-den-thumb-200x200.jpg'
              ></img>
              <button title='Xóa'>
                <CloseCircleOutlined /> Xóa
              </button>
            </div>
            <div className={cx("item-cart-center")}>
              <span className={cx("name")}>
                Tinh Dầu Dưỡng Tóc L'Oreal Paris Elseve Extraordinary Oil Serum
              </span>
              <span className={cx("description")}>
                Tinh Dầu Dưỡng Tóc L'Oreal Paris Elseve Extraordinary Oil
                Serum123123213213
              </span>
            </div>
            <div className={cx("item-cart-right")}>
              <div style={{ display: "block" }}>
                <span className={cx("price-sale")}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(999000)}
                </span>
                <span className={cx("price")}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(769000)}
                </span>
              </div>
              <div className={cx("quantity")}>
                <span>
                  <MinusOutlined />
                </span>
                <span>4</span>
                <span>
                  <PlusOutlined />
                </span>
              </div>
            </div>
          </li>
          <div className={cx("total-es")}>
            <span>Tạm tính (2 sản phẩm):</span>
            <span className={cx("total-price")}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(999000)}
            </span>
          </div>
        </ul>
        <div className={cx("info-customer")}>
          <p>Thông tin khách hàng</p>
          <div className={cx("sex-customer")}>
            <Radio.Group onChange={(e) => console.log(e.target.value)}>
              <Radio value={"Nam"}>Anh</Radio>
              <Radio value={"Nữ"}>Chị</Radio>
            </Radio.Group>
          </div>
          <div className={cx("fill-customer")}>
            <div className={cx("form-group")}>
              <input id='fullname' type='text' />
              <label htmlFor='fullname' className={cx("label")}>
                Họ và tên
              </label>
            </div>
            <div className={cx("form-group")}>
              <input id='phone' type='text' />
              <label htmlFor='phone' className={cx("label")}>
                Số điện thoại
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
