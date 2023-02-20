import style from "./Detail.module.scss";
import classNames from "classnames/bind";
import { Breadcrumb, Col, Row } from "antd";
import {
  HomeOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Buffer } from "buffer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addQuantity, addToCart } from "../../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(style);

function Detail() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => {
    return state.cart.cart;
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Breadcrumb className={cx("bread-crumb")} separator=">">
          <Breadcrumb.Item>
            <Link to={"/"}>
              <HomeOutlined /> Trang chủ
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={cx("content")}>
        <Row gutter={16}>
          <Col span={18}>
            <div className={cx("main-content")}>
              <Row gutter={16}>
                <Col span={12}>
                  <div className={cx("main-image")}>
                    <img
                      alt=""
                      src={Buffer.from(state.image || "", "base64").toString(
                        "ascii",
                      )}
                    ></img>
                  </div>
                  <div className={cx("sub-images")}>List sub Image </div>
                </Col>
                <Col span={12}>
                  <div className={cx("detail")}>
                    <div className={cx("product-info")}>
                      <div className={cx("name")}>{state.name}</div>
                      <div className={cx("vote")}>
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                        <p>4 sao - 1 lượt đánh giá</p>
                      </div>
                      <div className={cx("price")}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(state.price)}
                      </div>
                      {state.discount !== 0 && (
                        <div className={cx("old-price")}>
                          Giá gốc:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(state.old)}{" "}
                          - Tiết kiệm:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format((state.old * state.discount) / 100)}{" "}
                          ({state.discount}%)
                        </div>
                      )}
                      <div className={cx("cate")}>Danh mục: {state.cate}</div>
                    </div>
                    <ul className={cx("product-uses")}>
                      <li>Cấp nước vượt trội, giúp da luôn mềm mịn.</li>
                      <li>
                        Loại bỏ bụi bẩn, bã nhờn còn nằm lại sau bước rửa mặt và
                        đồng thời cân bằng pH cho làn da.
                      </li>
                      <li>
                        Se khít lỗ chân lông và hấp thụ các dưỡng chất tốt hơn.
                      </li>
                      <li>
                        Không làm tắc nghẽn lỗ chân lông, giảm tình trạng gây
                        mụn.
                      </li>
                    </ul>
                    <div className={cx("actions")}>
                      {state.quantity > 0 ? (
                        <>
                          <button
                            onClick={async () => {
                              const base64 = await fetch(
                                Buffer.from(
                                  state.image || "",
                                  "base64",
                                ).toString("ascii"),
                              );
                              const blob = await base64.blob();
                              const file = new File([blob], "name", {
                                type: "image/png",
                              });
                              const linkImage = URL.createObjectURL(file);

                              const index = cart.findIndex((item) => {
                                return item.id === state.id;
                              });
                              if (index === -1) {
                                dispatch(
                                  addToCart({
                                    id: state.id,
                                    productName: state.name,
                                    productImage: linkImage,
                                    quantity: 1,
                                    productPrice: state.discount
                                      ? state.old -
                                        (state.old * state.discount) / 100
                                      : state.old,
                                    productOldPrice: state.old
                                      ? state.product_Price
                                      : "",
                                  }),
                                );
                              } else {
                                dispatch(addQuantity(index));
                              }
                            }}
                          >
                            <ShoppingCartOutlined /> Thêm vào giỏ hàng
                          </button>
                          <button
                            onClick={async () => {
                              const base64 = await fetch(
                                Buffer.from(
                                  state.image || "",
                                  "base64",
                                ).toString("ascii"),
                              );
                              const blob = await base64.blob();
                              const file = new File([blob], "name", {
                                type: "image/png",
                              });
                              const linkImage = URL.createObjectURL(file);

                              const index = cart.findIndex((item) => {
                                return item.id === state.id;
                              });
                              if (index === -1) {
                                dispatch(
                                  addToCart({
                                    id: state.id,
                                    productName: state.name,
                                    productImage: linkImage,
                                    quantity: 1,
                                    productPrice: state.discount
                                      ? state.old -
                                        (state.old * state.discount) / 100
                                      : state.old,
                                    productOldPrice: state.old
                                      ? state.product_Price
                                      : "",
                                  }),
                                );
                                navigate("/cart");
                              } else {
                                navigate("/cart");
                              }
                            }}
                          >
                            Mua nhanh
                          </button>
                        </>
                      ) : (
                        <div className={cx("sold-out")}>Hết hàng</div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={cx("product-content")}>
              <h3 className={cx("title-content")}>Thông tin sản phẩm</h3>
              <h4>Xuất xứ: Hàn Quốc</h4>
              <h4>Dung tích: 180ml</h4>
              <span>
                Nước Hoa Hồng Không Mùi Dear Klairs Dưỡng Ẩm Da Và Làm Mềm Da
                Supple Preparation Unscented 180ml có chiết xuất từ thực vật,
                giúp cân bằng độ pH, tăng cường hiệu quả chăm sóc da Toner có
                dạng trong suốt, không màu, lỏng, nhẹ, hơi nhớt, thấm rất nhanh
                trên da. Sản phẩm giúp loại bỏ bụi bẩn và bã nhờn dư thừa trên
                da sau khi rửa mặt đồng thời cân bằng độ pH để các bước skincare
                tiếp theo đạt hiệu quả hơn.
              </span>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("sub-content")}>
              <div className={cx("quality")}>
                <h3>-- CHẤT LƯỢNG CHO TẤT CẢ --</h3>
                <div className={cx("quality-list")}>
                  <div className={cx("quality-item")}>
                    <div className={cx("quality-item-image")}>
                      <img
                        alt=""
                        src="https://adminbeauty.hvnet.vn/Upload/files/chinh-sach-04.png?v=012"
                      ></img>
                    </div>
                    <span>
                      <b>MỸ PHẨM CHÍNH HÃNG</b>
                      <span>
                        Chất lượng sản phẩm luôn được chứng nhận bằng sự tin cậy
                        của Khách Hàng suốt nhiều năm qua
                      </span>
                    </span>
                  </div>
                  <div className={cx("quality-item")}>
                    <div className={cx("quality-item-image")}>
                      <img
                        alt=""
                        src="https://adminbeauty.hvnet.vn/Upload/files/chinh-sach-05.png?v=012"
                      ></img>
                    </div>
                    <span>
                      <b>LUÔN ĐƯỢC TÍCH ĐIỂM</b>
                      <span>
                        Đơn hàng từ 100k=1 điểm 10 điểm nhận voucher 100k
                      </span>
                    </span>
                  </div>
                  <div className={cx("quality-item")}>
                    <div className={cx("quality-item-image")}>
                      <img
                        alt=""
                        src="https://adminbeauty.hvnet.vn/Upload/files/chinh-sach-06.png?v=012"
                      ></img>
                    </div>
                    <span>
                      <b>MIỄN PHÍ GIAO HÀNG</b>
                    </span>
                  </div>
                  <div className={cx("quality-item")}>
                    <div className={cx("quality-item-image")}>
                      <img
                        alt=""
                        src="https://adminbeauty.hvnet.vn/Upload/files/chinh-sach-07.png?v=012"
                      ></img>
                    </div>
                    <span>
                      <b>TRI ÂN KHÁCH HÀNG</b>
                      <span>
                        Với các chương trình khuyến mãi, các sự kiện & quà tặng
                        đặc biệt vô cùng hấp dẫn
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={cx("category")}>
                <h3>DANH MỤC SẢN PHẨM</h3>
                <div className={cx("cate-list")}>
                  <div className={cx("cate-item")}>
                    <RightOutlined className={cx("icon")} /> <p>Dành cho bé</p>
                  </div>
                  <div className={cx("cate-item")}>
                    <RightOutlined className={cx("icon")} />{" "}
                    <p>Chăm sóc toàn thân</p>
                  </div>
                  <div className={cx("cate-item")}>
                    <RightOutlined className={cx("icon")} /> <p>Chăm sóc tóc</p>
                  </div>
                  <div className={cx("cate-item")}>
                    <RightOutlined className={cx("icon")} /> <p>Phụ kiện</p>
                  </div>
                  <div className={cx("cate-item")}>
                    <RightOutlined className={cx("icon")} /> <p>Trang điểm</p>
                  </div>
                  <div className={cx("cate-item")}>
                    <RightOutlined className={cx("icon")} /> <p>Nước hoa</p>
                  </div>
                  <div className={cx("cate-item")}>
                    <RightOutlined className={cx("icon")} />{" "}
                    <p>Chăm sóc da mặt</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Detail;
