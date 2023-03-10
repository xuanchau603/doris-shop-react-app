import style from "./Cart.module.scss";
import className from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Col, message, Popconfirm, Radio, Row, Select } from "antd";
import swal from "sweetalert";
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
  clearCart,
  minusQuantity,
  removeFromCart,
} from "../../Redux/cartSlice";

import { iconcartEmpty } from "../../Image";
import axios from "axios";
import Loading from "./../../Components/Loading/index";
import queryString from "query-string";

const cx = className.bind(style);

function Cart() {
  const [data, setData] = useState({});
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [optionDeliver, setOptionDeliver] = useState("1");
  const [optionPayment, setOptionPayment] = useState("recieve");
  const [loading, setLoading] = useState(false);

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
  const navigate = useNavigate();

  const handleCheckOut = async () => {
    if (optionDeliver === "2") {
      data.city = "Th??nh ph??? ???? N???ng";
      data.districts = "Qu???n Thanh Kh??";
      data.wards = "Ph?????ng Xu??n H??";
      data.address = "1041 Nguy???n T???t Th??nh";
    }

    const product = cart.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });

    if (!data?.sex) {
      message.error("Vui l??ng ch???n gi???i t??nh!", 2);
    } else if (!data?.fullName) {
      message.error("Vui l??ng ch???n nh???p h??? t??n!", 2);
    } else if (!data?.phone) {
      message.error("Vui l??ng ch???n nh???p s??? ??i???n tho???i!", 2);
    } else if (!data?.city) {
      message.error("Vui l??ng ch???n t???nh / th??nh ph???", 2);
    } else if (!data?.districts) {
      message.error("Vui l??ng ch???n qu???n / huy???n!", 2);
    } else if (!data?.wards) {
      message.error("Vui l??ng ch???n ph?????ng / x??!", 2);
    } else if (!data?.address) {
      message.error("Vui l??ng nh???p s??? nh??, t??n ???????ng!!", 2);
    } else if (!data?.type) {
      message.error("Vui l??ng ch???n h??nh th???c thanh to??n!!", 2);
    } else {
      const address = `${data.city} / ${data.districts} / ${data.wards} / ${data.address}`;

      const final_data = {
        ...data,
        total: totalCart,
        product: product,
        address: address,
      };
      const vnp_TxnRef = new Date().getTime().toString();
      const vnp_Amount = 10000;
      const vnp_Command = "pay";
      const vnp_CreateDate = new Date().toISOString();
      const vnp_IpAddr = "127.0.0.1";
      const vnp_Locale = "vn";
      const vnp_OrderInfo = "Thanh to??n ????n h??ng LXC";
      const vnp_ReturnUrl = "http://localhost:3000/success";
      const vnp_TmnCode = "YOUR_VNPAY_TMN_CODE";
      const vnp_TransactionNo = "";
      const vnp_Version = "2.0.0";

      const params = {
        vnp_TxnRef,
        vnp_Amount,
        vnp_Command,
        vnp_CreateDate,
        vnp_IpAddr,
        vnp_Locale,
        vnp_OrderInfo,
        vnp_ReturnUrl,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_Version,
      };
      const p = queryString.stringify(params);
      console.log(p);
      // const vnpay = new vnpay(params);

      // const vnpayUrl = vnpay.getUrl();
      // window.location.href = `https://sandbox.vnpayment.vn/paymentv2/?${p}`;

      // setLoading(true);
      // const res = await axios.post(
      //   "http://localhost:3001/order/create",
      //   final_data,
      // );
      // if (res.status === 200) {
      //   setLoading(false);
      //   const redirect = await swal({
      //     closeOnClickOutside: false,
      //     title: "?????t h??ng th??nh c??ng",
      //     icon: "success",
      //   });
      //   if (redirect) {
      //     dispatch(clearCart());
      //     navigate("/");
      //   }
      // }
    }
  };

  return (
    <div className={cx("wrapper")}>
      {cart?.length > 0 ? (
        <>
          {loading && <Loading tip={"??ang x??? l??..."}></Loading>}
          <div className={cx("top-content")}>
            <Link to={"/"}>
              <LeftOutlined /> Mua th??m s???n ph???m kh??c
            </Link>
            <span>Gi??? h??ng c???a b???n</span>
          </div>

          <div className={cx("middle-cart")}>
            <ul className={cx("listing-cart")}>
              {cart.map((item, index) => {
                return (
                  <li key={index} className={cx("item-cart")}>
                    <div className={cx("item-cart-left")}>
                      <img alt="" src={item.productImage}></img>
                      <Popconfirm
                        okText="X??a"
                        cancelText="H???y"
                        placement="topLeft"
                        title="B???n c?? ch???c ch???n x??a s???n ph???m n??y?"
                        onConfirm={() => {
                          dispatch(removeFromCart(index));
                        }}
                      >
                        <button title="X??a">
                          <CloseCircleOutlined /> X??a
                        </button>
                      </Popconfirm>
                    </div>
                    <div className={cx("item-cart-center")}>
                      <Link
                        to={"/detail"}
                        state={{ id: item.id }}
                        className={cx("name")}
                      >
                        {item.productName}
                      </Link>
                      <span className={cx("description")}>
                        Tinh D???u D?????ng T??c L'Oreal Paris Elseve Extraordinary
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
                          title="Gi???m s??? l?????ng"
                          onClick={() => {
                            dispatch(minusQuantity(index));
                          }}
                        >
                          <MinusOutlined />
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          title="T??ng s??? l?????ng"
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
                <span>T???m t??nh ({cart.length} s???n ph???m):</span>
                <span className={cx("total-price")}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalCart)}
                </span>
              </div>
            </ul>
            <div className={cx("info-customer")}>
              <p>Th??ng tin kh??ch h??ng</p>
              <div className={cx("sex-customer")}>
                <Radio.Group
                  onChange={(e) => setData({ ...data, sex: e.target.value })}
                >
                  <Radio value={"Nam"}>Anh</Radio>
                  <Radio value={"N???"}>Ch???</Radio>
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
                    H??? v?? t??n
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
                    S??? ??i???n tho???i
                  </label>
                </div>
              </div>
            </div>
            <div className={cx("delivery-form")}>
              <p>Ch???n h??nh th???c nh???n h??ng</p>
              <div className={cx("way")}>
                <Radio.Group
                  defaultValue={"1"}
                  onChange={(e) => setOptionDeliver(e.target.value)}
                >
                  <Radio value={"1"}>Giao t???n n??i</Radio>
                  <Radio value={"2"}>Nh???n h??ng t???i si??u th???</Radio>
                </Radio.Group>
              </div>
              {optionDeliver === "1" ? (
                <>
                  <div className={cx("content")}>
                    <p>
                      Ch???n ?????a ch??? ????? bi???t th???i gian nh???n h??ng v?? ph?? v???n chuy???n
                      (n???u c??)
                    </p>
                    <div className={cx("address")}>
                      <Row
                        style={{ width: "100%", marginBottom: "1rem" }}
                        gutter={[8, 12]}
                      >
                        <Col span={12}>
                          <Select
                            style={{ width: "100%", fontSize: "1.6rem" }}
                            defaultValue={"Ch???n T???nh / Th??nh Ph???"}
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
                            defaultValue={"Ch???n Qu???n / Huy???n"}
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
                            defaultValue={"Ch???n Ph?????ng / X??"}
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
                              S??? nh??, t??n ???????ng
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
                      1041 Nguy???n T???t Th??nh, Ph?????ng Xu??n H??, Qu???n Thanh Kh??,
                      Th??nh ph??? ???? N???ng{" "}
                    </Radio>
                  </div>
                </>
              )}
              <div className={cx("more-option")}>
                <input
                  onChange={(e) => setData({ ...data, note: e.target.value })}
                  id="ip-more"
                  placeholder=" "
                  type="text"
                />
                <label className={cx("label")} htmlFor="ip-more">
                  Y??u c???u kh??c (kh??ng b???t bu???c)
                </label>
              </div>
            </div>
            <div className={cx("payments-form")}>
              <p className={cx("title")}>Ch???n h??nh th???c thanh to??n</p>
              <ul className={cx("options-pay")}>
                <Radio.Group
                  defaultValue={"a"}
                  onChange={(e) => {
                    setOptionPayment(e.target.value);
                    setData({ ...data, type: e.target.value });
                  }}
                >
                  <Radio value={1}>
                    <span>Thanh to??n khi nh???n h??ng</span>
                    <img
                      width={"60px"}
                      height="60px"
                      src="https://vanchuyentrungquoc247.com/wp-content/uploads/2015/04/icon-3.png"
                      alt=""
                    ></img>
                  </Radio>
                  <Radio value={2}>
                    <span>Thanh to??n qua MoMo</span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                      alt=""
                    ></img>
                  </Radio>
                  <Radio value={3}>
                    <span>Thanh to??n qua VNPAY</span>
                    <img
                      width={"60px"}
                      height="60px"
                      src="https://vnsky.vn/imgs/Logo.png"
                      alt=""
                    ></img>
                  </Radio>
                  <Radio value={4}>
                    <span>Chuy???n kho???n quan ng??n h??ng</span>
                    <img
                      width={"60px"}
                      height="60px"
                      src="http://go.ocb.com.vn/upload/blog/blog_86.jpg"
                      alt=""
                    ></img>
                  </Radio>
                </Radio.Group>
                {optionPayment === 4 && (
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
                    N???i dung chuy???n kho???n: SDT KH??CH H??NG
                  </div>
                )}
              </ul>
            </div>
            <div className={cx("total")}>
              <p>T???ng ti???n</p>
              <b>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalCart)}
              </b>
            </div>
            <div className={cx("btn-order")}>
              <button type="submit" onClick={handleCheckOut}>
                ?????t H??ng
              </button>
            </div>
            <p>B???n c?? th??? ch???n h??nh th???c thanh to??n sau khi ?????t h??ng</p>
          </div>
        </>
      ) : (
        <div className={cx("cart-empty")}>
          <img alt="" width={300} src={iconcartEmpty}></img>
          <p>Kh??ng c?? s???n ph???m n??o trong gi??? h??ng</p>
          <Link to={"/"}>V??? trang ch???</Link>
          <p>
            Khi c???n tr??? gi??p vui l??ng g???i <b>1800.1060</b> ho???c{" "}
            <b>028.3622.1060</b> (7h30 - 22h)
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
