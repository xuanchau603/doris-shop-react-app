import style from "./Cart.module.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import { Col, Popconfirm, Radio, Row, Select } from "antd";
import {
  CloseCircleOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { iconcartEmpty } from "../../Image";
import {
  addQuantity,
  minusQuantity,
  removeFromCart,
} from "../../Redux/cartSlice";

const cx = className.bind(style);

function Cart() {
  const cart = useSelector((state) => {
    return state.cart.cart;
  });
  const totalCart = cart?.reduce((acc, currentValue) => {
    return acc + currentValue.productPrice * currentValue.quantity;
  }, 0);
  const [optionDeliver, setOptionDeliver] = useState("1");

  const dispatch = useDispatch();

  return (
    <div className={cx("wrapper")}>
      {cart?.length > 0 ? (
        <>
          <div className={cx("top-content")}>
            <Link to={"/"}>
              <LeftOutlined /> Mua thêm sản phẩm khác
            </Link>
            <span>Giỏ hàng của bạn</span>
          </div>
          <div className={cx("middle-cart")}>
            <ul className={cx("listing-cart")}>
              {cart.map((item, index) => {
                return (
                  <li key={index} className={cx("item-cart")}>
                    <div className={cx("item-cart-left")}>
                      <img alt="" src={item.productImage}></img>
                      <Popconfirm
                        okText="Xóa"
                        cancelText="Hủy"
                        placement="topLeft"
                        title="Bạn có chắc chắn xóa sản phẩm này?"
                        onConfirm={() => {
                          dispatch(removeFromCart(index));
                        }}
                      >
                        <button title="Xóa">
                          <CloseCircleOutlined /> Xóa
                        </button>
                      </Popconfirm>
                    </div>
                    <div className={cx("item-cart-center")}>
                      <span className={cx("name")}>{item.productName}</span>
                      <span className={cx("description")}>
                        Tinh Dầu Dưỡng Tóc L'Oreal Paris Elseve Extraordinary
                        Oil Serum123123213213
                      </span>
                    </div>
                    <div className={cx("item-cart-right")}>
                      <div style={{ display: "block" }}>
                        <span className={cx("price-sale")}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.productPrice)}
                        </span>
                        {item.productOldPrice ? (
                          <span className={cx("price")}>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.productOldPrice)}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className={cx("quantity")}>
                        <span
                          title="Giảm số lượng"
                          onClick={() => {
                            dispatch(minusQuantity(index));
                          }}
                        >
                          <MinusOutlined />
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          title="Tăng số lượng"
                          onClick={() => {
                            dispatch(addQuantity(index));
                          }}
                        >
                          <PlusOutlined />
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
              <div className={cx("total-es")}>
                <span>Tạm tính (2 sản phẩm):</span>
                <span className={cx("total-price")}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalCart)}
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
                  <input id="fullname" type="text" />
                  <label htmlFor="fullname" className={cx("label")}>
                    Họ và tên
                  </label>
                </div>
                <div className={cx("form-group")}>
                  <input id="phone" type="text" />
                  <label htmlFor="phone" className={cx("label")}>
                    Số điện thoại
                  </label>
                </div>
              </div>
            </div>
            <div className={cx("delivery-form")}>
              <p>Chọn hình thức nhận hàng</p>
              <div className={cx("way")}>
                <Radio.Group
                  defaultValue={"1"}
                  onChange={(e) => setOptionDeliver(e.target.value)}
                >
                  <Radio value={"1"}>Giao tận nơi</Radio>
                  <Radio value={"2"}>Nhận hàng tại siêu thị</Radio>
                </Radio.Group>
              </div>
              {optionDeliver === "1" ? (
                <>
                  <div className={cx("content")}>
                    <p>
                      Chọn địa chỉ để biết thời gian nhận hàng và phí vận chuyển
                      (nếu có)
                    </p>
                    <div className={cx("address")}>
                      <Row
                        style={{ width: "100%", marginBottom: "1rem" }}
                        gutter={[8, 12]}
                      >
                        <Col span={12}>
                          <Select
                            style={{ width: "100%", fontSize: "1.6rem" }}
                            defaultValue={"Hồ Chí Minh"}
                            options={[
                              {
                                value: "jack",
                                label: "Jack",
                              },
                              {
                                value: "lucy",
                                label: "Lucy",
                              },
                              {
                                value: "Yiminghe",
                                label: "yiminghe",
                              },
                              {
                                value: "disabled",
                                label: "Disabled",
                                disabled: true,
                              },
                            ]}
                          ></Select>
                        </Col>

                        <Col span={12}>
                          <Select
                            style={{ width: "100%" }}
                            defaultValue={"Hồ Chí Minh"}
                            options={[
                              {
                                value: "jack",
                                label: "Jack",
                              },
                              {
                                value: "lucy",
                                label: "Lucy",
                              },
                              {
                                value: "Yiminghe",
                                label: "yiminghe",
                              },
                              {
                                value: "disabled",
                                label: "Disabled",
                                disabled: true,
                              },
                            ]}
                          ></Select>
                        </Col>
                        <Col span={12}>
                          <Select
                            style={{ width: "100%" }}
                            defaultValue={"Hồ Chí Minh"}
                            options={[
                              {
                                value: "jack",
                                label: "Jack",
                              },
                              {
                                value: "lucy",
                                label: "Lucy",
                              },
                              {
                                value: "Yiminghe",
                                label: "yiminghe",
                              },
                              {
                                value: "disabled",
                                label: "Disabled",
                                disabled: true,
                              },
                            ]}
                          ></Select>
                        </Col>

                        <Col span={12}>
                          <div className={cx("form-group")}>
                            <input id="phone" type="text" />
                            <label htmlFor="phone" className={cx("label")}>
                              Số nhà, tên đường
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={cx("content-1")}>
                    <Radio checked value={"1"}>
                      1041 Nguyễn Tất Thành, Phường Xuân Hà, Quận Thanh Khê,
                      Thành phố Đà Nẵng{" "}
                    </Radio>
                  </div>
                </>
              )}
              <div className={cx("more-option")}>
                <input id="ip-more" type="text" />
                <label className={cx("label")} htmlFor="ip-more">
                  Yêu cầu khác (không bắt buộc)
                </label>
              </div>
            </div>
            <div className={cx("total")}>
              <p>Tổng tiền</p>
              <b>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalCart)}
              </b>
            </div>
            <div className={cx("btn-order")}>
              <button>Đặt Hàng</button>
            </div>
            <p>Bạn có thể chọn hình thức thanh toán sau khi đặt hàng</p>
          </div>
        </>
      ) : (
        <div className={cx("cart-empty")}>
          <img alt="" width={300} src={iconcartEmpty}></img>
          <p>Không có sản phẩm nào trong giỏ hàng</p>
          <Link to={"/"}>Về trang chủ</Link>
          <p>
            Khi cần trợ giúp vui lòng gọi <b>1800.1060</b> hoặc{" "}
            <b>028.3622.1060</b> (7h30 - 22h)
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
