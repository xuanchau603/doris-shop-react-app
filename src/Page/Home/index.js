import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { banner } from "../../Image";
import Sliders from "../../Components/Slider";
import { Row, Col, Pagination } from "antd";
import { CaretDownOutlined, StarOutlined } from "@ant-design/icons";
import DropdownList from "../../Components/DropDownList";
// import UploadFile from "./test";

const cx = classNames.bind(style);

const items = [
  {
    label: <a href="/">Nổi bật</a>,
    key: "0",
  },
  {
    label: <a href="/">Giá cao đến thấp</a>,
    key: "1",
  },
  // {
  //   type: "divider",
  // },
  {
    label: <a href="/">Giá thấp đến cao</a>,
    key: "3",
  },
];

const trigger = ["click"];

function Home() {
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
          <a href="/">
            <img
              src="https://cdn.tgdd.vn//content/iv-100x100.png"
              alt=""
              style={{ width: "70px", height: "70px" }}
            ></img>
            <span>Săn Sale Online</span>
          </a>
        </li>
        <li className={cx("promo-item")}>
          <a href="/">
            <img
              src="https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/homev2/goiy-1.png"
              alt=""
              style={{ width: "70px", height: "70px" }}
            ></img>
            <span>Dành cho bạn</span>
          </a>
        </li>
        <li className={cx("promo-item")}>
          <a href="/">
            <img
              src="https://cdn.tgdd.vn//content/icon-dien-thoai-120x120.png"
              alt=""
              style={{ width: "70px", height: "70px" }}
            ></img>
            <span>Độc quyền tại Doris</span>
          </a>
        </li>
        <li className={cx("promo-item")}>
          <a href="/">
            <img
              src="https://cdn.tgdd.vn//content/icon-TGDD-OF-100x100.gif"
              alt=""
              style={{ width: "70px", height: "70px" }}
            ></img>
            <span>Giảm đến 50%</span>
          </a>
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
                <a href="/">
                  Sắp xếp theo <CaretDownOutlined />
                </a>
              }
            ></DropdownList>
          </div>
        </h1>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <div className={cx("sale-status")}>
                <p className={cx("sale-label")}>
                  <img
                    src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                    alt=""
                  ></img>
                  <span>Sale giáng sinh</span>
                </p>
                <p className={cx("status")}>Còn hàng</p>
              </div>
              <div className={cx("name")}>
                <span>Iphone 14 Pro 1TB</span>
              </div>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("name")}>
                <span>Iphone 14 Pro 1T</span>
              </div>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("product-tag")}>
              <div className={cx("item-label")}>
                <span>Trả góp 0%</span>
              </div>
              <img
                src="https://cdn.tgdd.vn/Products/Images/42/289700/TimerThumb/iphone-14-pro-max-256gb-(2).jpg"
                alt=""
              ></img>
              <p className={cx("sale-label")}>
                <img
                  src="https://cdn.tgdd.vn/2022/12/content/label-giang-sinh-47x47.png"
                  alt=""
                ></img>
                <span>Sale giáng sinh</span>
              </p>
              <div className={cx("price")}>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4990000)}
                </strong>
                <small>-31%</small>
              </div>
              <div className={cx("vote")}>
                <b>4.4</b>
                <i>
                  <StarOutlined></StarOutlined>
                </i>
                <span>(16)</span>
              </div>
            </div>
          </Col>
        </Row>

        <div className={cx("pagination")}>
          <Pagination showQuickJumper defaultCurrent={1} total={100} />
        </div>
      </div>
    </div>
  );
}

export default Home;
