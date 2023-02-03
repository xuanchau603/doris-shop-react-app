import style from "./Cart.module.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import { Col, message, Popconfirm, Radio, Row, Select } from "antd";
import {
  CloseCircleOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  minusQuantity,
  removeFromCart,
} from "../../Redux/cartSlice";

import { iconcartEmpty } from "../../Image";
import axios from "axios";

const cx = className.bind(style);

function Cart() {
  const [data, setData] = useState({});
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [optionDeliver, setOptionDeliver] = useState("1");
  const [optionPayment, setOptionPayment] = useState("recieve");

  const getProvince = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/?depth=1");
    setProvince(res.data);
  };
  const HandleDistricts = (code) => {
    const getDistrict = async () => {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/p/${code}?depth=2`,
      );
      setDistricts(res.data.districts);
    };
    getDistrict();
  };
  const HandleWards = (code) => {
    const getWards = async () => {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/d/${code}?depth=2`,
      );
      setWards(res.data.wards);
    };
    getWards();
  };
  useEffect(() => {
    getProvince();
  }, []);

  const cart = useSelector((state) => {
    return state.cart.cart;
  });
  const totalCart = cart?.reduce((acc, currentValue) => {
    return acc + currentValue.productPrice * currentValue.quantity;
  }, 0);

  const dispatch = useDispatch();

  const handleCheckOut = async () => {
    const product = cart.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });

    if (!data?.sex) {
      message.error("Vui lòng chọn giới tính!", 2);
    } else if (!data?.fullName) {
      message.error("Vui lòng chọn nhập họ tên!", 2);
    } else if (!data?.phone) {
      message.error("Vui lòng chọn nhập số điện thoại!", 2);
    } else if (!data?.city) {
      message.error("Vui lòng chọn tỉnh / thành phố", 2);
    } else if (!data?.districts) {
      message.error("Vui lòng chọn quận / huyện!", 2);
    } else if (!data?.wards) {
      message.error("Vui lòng chọn phường / xã!", 2);
    } else if (!data?.address) {
      message.error("Vui lòng nhập số nhà, tên đường!!", 2);
    } else {
      const address = `${data.city} / ${data.districts} / ${data.wards} / ${data.address}`;

      const final_data = {
        ...data,
        total: totalCart,
        product: product,
        address: address,
      };

      const res = await axios.post(
        "http://localhost:3001/order/create",
        final_data,
      );
      if (res.status === 200) {
        message.success("Đặt hàng thành công!", 2);
      }
    }
  };

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
                <Radio.Group
                  onChange={(e) => setData({ ...data, sex: e.target.value })}
                >
                  <Radio value={"Nam"}>Anh</Radio>
                  <Radio value={"Nữ"}>Chị</Radio>
                </Radio.Group>
              </div>
              <div className={cx("fill-customer")}>
                <div className={cx("form-group")}>
                  <input
                    required
                    placeholder=" "
                    onChange={(e) => {
                      if (e.target.value === " ") return;
                      setData({
                        ...data,
                        fullName: e.target.value.toUpperCase(),
                      });
                    }}
                    id="fullname"
                    type="text"
                  />
                  <label htmlFor="fullname" className={cx("label")}>
                    Họ và tên
                  </label>
                </div>
                <div className={cx("form-group")}>
                  <input
                    id="phone"
                    type="text"
                    placeholder=" "
                    onChange={(e) => {
                      if (e.target.value === " ") return;
                      setData({
                        ...data,
                        phone: e.target.value,
                      });
                    }}
                  />
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
                            defaultValue={"Chọn Tỉnh / Thành Phố"}
                            options={province.map((item) => {
                              return {
                                value: item.code,
                                label: item.name,
                              };
                            })}
                            onChange={(value, item) => {
                              setData({ ...data, city: item.label });
                              HandleDistricts(value);
                            }}
                          ></Select>
                        </Col>

                        <Col span={12}>
                          <Select
                            style={{ width: "100%" }}
                            defaultValue={"Chọn Quận / Huyện"}
                            options={districts.map((item) => {
                              return {
                                value: item.code,
                                label: item.name,
                              };
                            })}
                            onChange={(value, item) => {
                              setData({ ...data, districts: item.label });
                              HandleWards(value);
                            }}
                          ></Select>
                        </Col>
                        <Col span={12}>
                          <Select
                            style={{ width: "100%" }}
                            defaultValue={"Chọn Phường / Xã"}
                            options={wards.map((item) => {
                              return {
                                value: item.code,
                                label: item.name,
                              };
                            })}
                            onChange={(value, item) => {
                              setData({ ...data, wards: item.label });
                            }}
                          ></Select>
                        </Col>

                        <Col span={12}>
                          <div className={cx("form-group")}>
                            <input
                              id="phone"
                              type="text"
                              placeholder=" "
                              onChange={(e) => {
                                setData({ ...data, address: e.target.value });
                              }}
                            />
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
                <input
                  onChange={(e) =>
                    setData({ ...data, Other_requirements: e.target.value })
                  }
                  id="ip-more"
                  placeholder=" "
                  type="text"
                />
                <label className={cx("label")} htmlFor="ip-more">
                  Yêu cầu khác (không bắt buộc)
                </label>
              </div>
            </div>
            <div className={cx("payments-form")}>
              <p className={cx("title")}>Chọn hình thức thanh toán</p>
              <ul className={cx("options-pay")}>
                <Radio.Group
                  defaultValue={"a"}
                  onChange={(e) => {
                    setOptionPayment(e.target.value);
                    setData({ ...data, type: e.target.value });
                  }}
                >
                  <Radio value={0}>
                    <span>Thanh toán khi nhận hàng</span>
                    <img
                      width={"60px"}
                      height="60px"
                      src="https://vanchuyentrungquoc247.com/wp-content/uploads/2015/04/icon-3.png"
                      alt=""
                    ></img>
                  </Radio>
                  <Radio value={1}>
                    <span>Thanh toán qua MoMo</span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                      alt=""
                    ></img>
                  </Radio>
                  <Radio value={2}>
                    <span>Thanh toán qua VNPAY</span>
                    <img
                      width={"60px"}
                      height="60px"
                      src="https://vnsky.vn/imgs/Logo.png"
                      alt=""
                    ></img>
                  </Radio>
                  <Radio value={3}>
                    <span>Chuyển khoản quan ngân hàng</span>
                    <img
                      width={"60px"}
                      height="60px"
                      src="http://go.ocb.com.vn/upload/blog/blog_86.jpg"
                      alt=""
                    ></img>
                  </Radio>
                </Radio.Group>
                {optionPayment === 3 && (
                  <div className={cx("transfer")}>
                    <img
                      src="https://brademar.com/wp-content/uploads/2022/09/Vietcombank-Logo-PNG-3.png"
                      alt=""
                    ></img>
                    <b>VIETCOMBANK</b>{" "}
                    <span>
                      STK <b>0271000953173</b>
                    </span>{" "}
                    <b>LE XUAN CHAU</b>
                    Nội dung chuyển khoản: SDT KHÁCH HÀNG
                  </div>
                )}
              </ul>
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
              <button type="submit" onClick={handleCheckOut}>
                Đặt Hàng
              </button>
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
