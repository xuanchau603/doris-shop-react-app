import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { banner } from "../../Image";
import Sliders from "../../Components/Slider";
import { Row, Col, Pagination, Skeleton, Spin } from "antd";
import { Buffer } from "buffer";
import {
  CaretDownOutlined,
  PlusCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import DropdownList from "../../Components/DropDownList";
import { getAllproduct } from "../../Redux/apiRequest";
import { addQuantity, addToCart, initCart } from "../../Redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import UploadFile from "./test";

const cx = classNames.bind(style);

const pageSize = 12;

const trigger = ["click"];

function Home() {
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [pagination, setPagination] = useState({
    totalPage: listProduct.length / pageSize,
    current: 1,
    minIndex: 0,
    maxIndex: pageSize,
  });
  const cart = useSelector((state) => {
    return state.cart.cart;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePagin = (page) => {
    setPagination({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };

  const getData = async () => {
    const data = await getAllproduct();
    setListProduct(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const items = [
    {
      label: <Link to={"/"}>Nổi bật</Link>,
      key: "0",
    },
    {
      label: (
        <Link
          onClick={async () => {
            setLoading(true);
            const res = await axios.get(
              "http://localhost:3001/product/?sort=desc",
            );
            await setListProduct(res.data);
            setLoading(false);
          }}
          to={"/"}
        >
          Giá cao đến thấp
        </Link>
      ),
      key: "1",
    },
    // {
    //   type: "divider",
    // },
    {
      label: (
        <Link
          onClick={async () => {
            setLoading(true);
            const res = await axios.get(
              "http://localhost:3001/product/?sort=asc",
            );
            await setListProduct(res.data);
            setLoading(false);
          }}
          to={"/"}
        >
          Giá thấp đến cao
        </Link>
      ),
      key: "3",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner")}>
        <img src={banner} alt="banner" className={cx("banner-img")}></img>
        <div className={cx("slider-banner")}>
          <Sliders></Sliders>
        </div>
      </div>
      <ul className={cx("option-promo")}>
        <li className={cx("promo-item")}>
          <Link href="/">
            <img
              src="https://cdn.tgdd.vn//content/iv-100x100.png"
              alt=""
              style={{ width: "70px", height: "70px" }}
            ></img>
            <span>Săn Sale Online</span>
          </Link>
        </li>
        <li className={cx("promo-item")}>
          <Link href="/">
            <img
              src="https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/homev2/goiy-1.png"
              alt=""
              style={{ width: "70px", height: "70px" }}
            ></img>
            <span>Dành cho bạn</span>
          </Link>
        </li>
        <li className={cx("promo-item")}>
          <Link href="/">
            <img
              src="https://cdn.tgdd.vn//content/icon-dien-thoai-120x120.png"
              alt=""
              style={{ width: "70px", height: "70px" }}
            ></img>
            <span>Độc quyền tại Doris</span>
          </Link>
        </li>
        <li className={cx("promo-item")}>
          <Link href="/">
            <img
              src="https://cdn.tgdd.vn//content/icon-TGDD-OF-100x100.gif"
              alt=""
              style={{ width: "70px", height: "70px" }}
            ></img>
            <span>Giảm đến 50%</span>
          </Link>
        </li>
      </ul>

      <div className={cx("all-product")}>
        <h1>
          <div className={cx("heading")}>
            <img
              src="https://cdn.tgdd.vn/mwgcart/mwg-site/ContentMwg/images/noel/icon-huu-desktop.png?v=1"
              alt=""
            ></img>
            Danh sách sản phẩm
          </div>
          <div className={cx("sort")}>
            <DropdownList
              items={items}
              trigger={trigger}
              label={
                <Link href="/">
                  Sắp xếp theo <CaretDownOutlined />
                </Link>
              }
            ></DropdownList>
          </div>
        </h1>
        {!loading ? (
          <Row gutter={[16, 16]}>
            {listProduct.map((item, index) => {
              return (
                index >= pagination.minIndex &&
                index < pagination.maxIndex && (
                  <Col key={item.product_ID} span={6}>
                    <div
                      onClick={() => {
                        navigate("/detail", {
                          state: {
                            id: item.product_ID,
                          },
                        });
                      }}
                      title={item.product_Name}
                      className={cx("product-tag")}
                    >
                      <div className={cx("item-sale")}>
                        {item.promotion_ID === null ? (
                          <span style={{ display: "none" }}></span>
                        ) : (
                          <span>{item.promotion?.description}</span>
                        )}
                        {item.promotion_ID ? (
                          <small>Giảm {item.promotion.discount + "%"}</small>
                        ) : (
                          <small style={{ display: "none" }}></small>
                        )}
                      </div>
                      <img
                        src={Buffer.from(
                          item.product_Image || "",
                          "base64",
                        ).toString("ascii")}
                        alt=""
                      ></img>
                      <div className={cx("sale-status")}>
                        {item.product_Quantity > 0 ? (
                          <p className={cx("status")}>Còn hàng</p>
                        ) : (
                          <p
                            style={{ background: "#ff4444" }}
                            className={cx("status")}
                          >
                            Hết hàng
                          </p>
                        )}
                      </div>
                      <div className={cx("name")}>
                        <span>{item.product_Name}</span>
                      </div>
                      <div className={cx("price")}>
                        <strong>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            item.product_Price -
                              (item.promotion_ID
                                ? (item.product_Price *
                                    item.promotion.discount) /
                                  100
                                : 0),
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
                      <div className={cx("vote")}>
                        <div>
                          <b>4.4</b>
                          <i>
                            <StarOutlined></StarOutlined>
                          </i>
                          <span>(16)</span>
                        </div>
                        {item.product_Quantity > 0 ? (
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              const base64 = await fetch(
                                Buffer.from(
                                  item.product_Image || "",
                                  "base64",
                                ).toString("ascii"),
                              );
                              const blob = await base64.blob();
                              const file = new File([blob], "name", {
                                type: "image/png",
                              });
                              const linkImage = URL.createObjectURL(file);
                              if (cart) {
                                const index = cart.findIndex(
                                  (product) =>
                                    product.productName === item.product_Name,
                                );
                                if (index === -1) {
                                  <Spin spinning tip="Đang xử lý"></Spin>;

                                  dispatch(
                                    addToCart({
                                      id: item.product_ID,
                                      productName: item.product_Name,
                                      productImage: linkImage,
                                      quantity: 1,
                                      productPrice: item.promotion_ID
                                        ? item.product_Price -
                                          (item.promotion.discount *
                                            item.product_Price) /
                                            100
                                        : item.product_Price,
                                      productOldPrice: item.promotion_ID
                                        ? item.product_Price
                                        : "",
                                    }),
                                  );
                                  <Spin
                                    spinning={false}
                                    tip="Đang xử lý"
                                  ></Spin>;
                                } else {
                                  dispatch(addQuantity(index));
                                }
                              } else {
                                dispatch(
                                  initCart([
                                    {
                                      id: item.product_ID,
                                      productName: item.product_Name,
                                      productImage: linkImage,
                                      quantity: 1,
                                      productPrice: item.promotion_ID
                                        ? item.product_Price -
                                          (item.promotion.discount *
                                            item.product_Price) /
                                            100
                                        : item.product_Price,
                                      productOldPrice: item.product_Price,
                                    },
                                  ]),
                                );
                              }
                            }}
                            title="Thêm vào giỏ hàng"
                          >
                            <PlusCircleOutlined /> Thêm vào giỏ hàng
                          </button>
                        ) : (
                          <button
                            onClick={(e) => e.stopPropagation()}
                            style={{ opacity: "0.4", cursor: "not-allowed" }}
                            title="Hết hàng"
                          >
                            <PlusCircleOutlined /> Thêm vào giỏ hàng
                          </button>
                        )}
                      </div>
                    </div>
                  </Col>
                )
              );
            })}
          </Row>
        ) : (
          <Skeleton active></Skeleton>
        )}

        <div className={cx("pagination")}>
          <Pagination
            pageSize={pageSize}
            onChange={handleChangePagin}
            total={listProduct.length}
            current={pagination.current}
            showQuickJumper
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
