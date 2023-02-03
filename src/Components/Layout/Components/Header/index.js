import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";
import {
  SearchOutlined,
  Loading3QuartersOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  SettingOutlined,
  FontColorsOutlined,
  CommentOutlined,
  PoweroffOutlined,
  SkinOutlined,
  LockOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { cartEmpty } from "../../../../Image";
import { Row, Col, Avatar, Image, message, Popconfirm } from "antd";
import TippyHeadless from "@tippyjs/react/headless";
import Popper from "../../../Popper";
import { logo } from "../../../../Image";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../Redux/apiRequest";
import { useDebounce } from "../../../Hooks";
import axios from "axios";
import {
  addQuantity,
  minusQuantity,
  removeFromCart,
} from "../../../../Redux/cartSlice";

const cx = classNames.bind(style);

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showsr, setShowsr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [cate, setCate] = useState([]);
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  const cart = useSelector((state) => {
    return state.cart.cart;
  });

  const totalCart = cart?.reduce((acc, currentValue) => {
    return acc + currentValue.productPrice * currentValue.quantity;
  }, 0);

  localStorage.setItem("user", JSON.stringify(user));

  const image = Buffer.from(user?.data?.avatar || "", "base64").toString(
    "ascii",
  );

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.current.style.position = "fixed";
      header.current.style.top = "0";
      header.current.style.boxShadow = "0 0.4rem 1.4rem #333";
    } else {
      header.current.style.position = "fixed";
      header.current.style.top = "30px";
      header.current.style.boxShadow = "0 0 0 #000";
    }
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const header = useRef();

  const debounce = useDebounce(searchValue, 800);

  const getCategory = async () => {
    const res = await axios.get("http://localhost:3001/category/min");
    setCate(res.data);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    getCategory();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (debounce === "") {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    const res = axios.get(
      `http://localhost:3001/product/?name=${encodeURIComponent(debounce)}`,
    );
    res.then((res) => {
      setSearchResult(res.data);
      setLoading(false);
    });
  }, [debounce]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top-banner")}>
        <Marquee
          style={{
            height: "100%",
            fontSize: "2rem",
            fontWeight: "700",
          }}
          direction="right"
          speed={120}
          pauseOnHover
        >
          <p>💞💞💞 Chào mừng bạn đến với Doris Cosmetic 💞💞💞</p>
        </Marquee>
      </div>
      <div ref={header} className={cx("header")}>
        <div className={cx("header-top")}>
          <Link className={cx("logo")} to={"/"}>
            <img alt="logo" src={logo}></img>
          </Link>
          <div>
            <TippyHeadless
              onClickOutside={(e) => {
                setShowsr(false);
              }}
              visible={searchResult.length > 0 && showsr}
              interactive
              offset={[40, 6]}
              placement="bottom"
              render={(attr) => {
                return (
                  <div className={cx("search-result")}>
                    <Popper>
                      <p className={cx("search-title")}>Kết quả tìm kiếm...</p>
                      {searchResult.map((item) => (
                        <div
                          key={item.product_ID}
                          className={cx("search-result-item")}
                        >
                          <img
                            alt=""
                            src={Buffer.from(
                              item.product_Image || "",
                              "base64",
                            ).toString("ascii")}
                          ></img>
                          <div className={cx("content")}>
                            <span className={cx("name")}>
                              {item.product_Name}
                            </span>
                            <div className={cx("price")}>
                              <strong>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  item.promotion_ID
                                    ? item.product_Price -
                                        (item.promotion.discount *
                                          item.product_Price) /
                                          100
                                    : item.product_Price,
                                )}
                              </strong>
                              {item.promotion_ID ? (
                                <b>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.product_Price)}
                                </b>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </Popper>
                  </div>
                );
              }}
            >
              <div className={cx("search")}>
                <input
                  className={cx("search-input")}
                  type="text"
                  value={searchValue}
                  placeholder="Bạn tìm gì..."
                  onFocus={() => setShowsr(true)}
                  onChange={(e) => {
                    if (e.target.value === " ") return;
                    setSearchValue(e.target.value);
                  }}
                ></input>
                {!loading && (
                  <SearchOutlined
                    title="Tìm kiếm"
                    size={"large"}
                    className={cx("icon-search")}
                    style={{ fontSize: "24px" }}
                  ></SearchOutlined>
                )}
                {loading && (
                  <Loading3QuartersOutlined
                    className={cx("icon-loading")}
                    spin
                  ></Loading3QuartersOutlined>
                )}
              </div>
            </TippyHeadless>
          </div>
          <div title="Tra cứu đơn hàng" className={cx("lookup")}>
            Tra cứu đơn hàng
          </div>
          <div>
            <TippyHeadless
              // visible
              interactive
              offset={[80, 10]}
              render={(attr) => {
                return (
                  <div className={cx("cart-list")}>
                    <Popper>
                      {cart?.length > 0 ? (
                        <>
                          <h3>Sản phẩm đã thêm</h3>
                          {cart?.map((item, index) => (
                            <div key={index} className={cx("cart-item")}>
                              <img alt="" src={item.productImage}></img>
                              <div className={cx("content")}>
                                <div className={cx("name")}>
                                  {item.productName}
                                </div>
                                <span className={cx("price")}>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.productPrice)}
                                </span>
                                <span className={cx("count")}>
                                  {" "}
                                  x {item.quantity}
                                </span>
                                <span className={cx("update-quantity")}>
                                  <PlusCircleOutlined
                                    title="Tăng số lượng"
                                    onClick={() => {
                                      dispatch(addQuantity(index));
                                    }}
                                  />
                                  <MinusCircleOutlined
                                    title="Giảm số lượng"
                                    onClick={() => {
                                      dispatch(minusQuantity(index));
                                    }}
                                  />
                                </span>
                              </div>

                              <Popconfirm
                                okText="Xóa"
                                cancelText="Hủy"
                                placement="topLeft"
                                title="Bạn có chắc chắn xóa sản phẩm này?"
                                onConfirm={() => {
                                  dispatch(removeFromCart(index));
                                }}
                              >
                                <span title="Xóa sản phẩm">
                                  <DeleteOutlined />
                                </span>
                              </Popconfirm>
                            </div>
                          ))}

                          <div className={cx("checkout")}>
                            <div className={cx("es-total")}>
                              Tổng tiền tạm tính:{" "}
                              <b>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(totalCart)}
                              </b>
                            </div>
                            <Link to={"/cart"} title="Thanh toán">
                              Tiến hành thanh toán
                            </Link>
                          </div>
                        </>
                      ) : (
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          src={cartEmpty}
                          alt="cart-empty"
                        ></img>
                      )}
                    </Popper>
                  </div>
                );
              }}
            >
              <div
                title="Giỏ hàng"
                onClick={() => {
                  navigate("/cart");
                }}
                className={cx("cart")}
              >
                <ShoppingCartOutlined
                  count={cart?.length > 0 ? cart.length : 0}
                  className={cx("icon-cart")}
                ></ShoppingCartOutlined>
                Giỏ hàng
              </div>
            </TippyHeadless>
          </div>
          <div
            className={cx("action")}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* <div className={cx("border-col")}></div> */}
            {!user && (
              <Link to={"/login"} className={cx("login")}>
                <UserAddOutlined></UserAddOutlined>
                <strong>Đăng nhập</strong>
              </Link>
            )}
            {user && (
              <TippyHeadless
                render={(attrs) => (
                  <ul className={cx("user-menu")}>
                    <Popper>
                      <li className={cx("menu-item")}>
                        <SettingOutlined /> Cài đặt tài khoản
                      </li>
                      {user?.data?.Role?.role_Name === "ADMIN" && (
                        <Link to={"/admin"} className={cx("menu-item")}>
                          <LockOutlined /> Quản lý hệ thống
                        </Link>
                      )}
                      <li className={cx("menu-item")}>
                        <FontColorsOutlined /> Ngôn ngữ
                      </li>
                      <li className={cx("menu-item")}>
                        <SkinOutlined /> Giao diện
                      </li>
                      <li className={cx("menu-item")}>
                        <CommentOutlined /> Hướng dẫn
                      </li>
                      <li
                        onClick={() => {
                          logoutUser(dispatch);
                        }}
                        className={cx("menu-item")}
                      >
                        <PoweroffOutlined /> Đăng xuất
                      </li>
                    </Popper>
                  </ul>
                )}
                interactive
                placement="bottom"
                visible={userMenu}
                onClickOutside={() => setUserMenu(false)}
                offset={[30, 4]}
              >
                <div
                  onClick={() => setUserMenu(!userMenu)}
                  className={cx("user")}
                >
                  <Avatar
                    size={44}
                    src={
                      <Image
                        preview={false}
                        src={image}
                        style={{
                          width: 44,
                        }}
                      />
                    }
                  />
                </div>
              </TippyHeadless>
            )}
          </div>
        </div>
        <div className={cx("header-main")}>
          {cate.map((item) => {
            return (
              <div key={item.cate_Id} className={cx("popper")}>
                <TippyHeadless
                  // offset={[0, 10]}
                  placement="auto-start"
                  interactive
                  render={(attrs) => (
                    <div key={item.cate_Id} className={cx("category")}>
                      <Popper>
                        <Row gutter={[16, 16]}>
                          {item?.products?.map((item) => {
                            return (
                              <Col className={cx("col")} span={8}>
                                <div className={cx("cate-item")}>
                                  {item.product_Name}
                                </div>
                              </Col>
                            );
                          })}
                        </Row>
                      </Popper>
                    </div>
                  )}
                >
                  <Link key={item.cate_Id} style={{ with: "100%" }}>
                    {item.cate_Name}
                  </Link>
                </TippyHeadless>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Header;
