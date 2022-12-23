import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  Loading3QuartersOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";
import TippyHeadless from "@tippyjs/react/headless";
import Popper from "../../../Popper";
import Marquee from "react-fast-marquee";

const cx = classNames.bind(style);

function Header() {
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.current.style.position = "fixed";
      header.current.style.top = "0";
    } else {
      header.current.style.position = "fixed";
      header.current.style.top = "30px";
    }
  };

  const handleChange = (e) => {
    setLoading(true);
  };

  const header = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top-banner")}>
        {/* <img
          alt="top-banner"
          src="https://cdn.tgdd.vn/2022/12/banner/1200x44-a-1200x44.webp"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        ></img> */}
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
          <Link className={cx("logo")} to={"/"}></Link>
          <div className={cx("search")}>
            <input
              className={cx("search-input")}
              type="text"
              placeholder="Bạn tìm gì..."
              onChange={handleChange}
            ></input>
            <SearchOutlined
              title="Tìm kiếm"
              size={"large"}
              className={cx("icon-search")}
              style={{ fontSize: "24px" }}
            ></SearchOutlined>
            {loading && (
              <Loading3QuartersOutlined
                className={cx("icon-loading")}
                spin
              ></Loading3QuartersOutlined>
            )}
          </div>
          <div title="Tra cứu đơn hàng" className={cx("lookup")}>
            Tra cứu đơn hàng
          </div>
          <div title="Giỏ hàng" className={cx("cart")}>
            <ShoppingCartOutlined
              count="0"
              className={cx("icon-cart")}
            ></ShoppingCartOutlined>
            Giỏ hàng
          </div>
          <div
            className={cx("action")}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Link title="Đăng nhập" to={"/detail"}>
              Đăng nhập
            </Link>
            <div className={cx("border-col")}></div>
            <Link title="Đăng ký" to={"/detail"}>
              Đăng ký
            </Link>
          </div>
        </div>
        <div className={cx("header-main")}>
          <div className={cx("popper")}>
            <TippyHeadless
              render={(attrs) => (
                <div className={cx("category")}>
                  <Popper>
                    <Row gutter={[16, 16]}>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                    </Row>
                  </Popper>
                </div>
              )}
              interactive
              placement="bottom-end"
            >
              <Link style={{ with: "100%" }}>Trang điểm</Link>
            </TippyHeadless>
          </div>
          <div className={cx("popper")}>
            <TippyHeadless
              render={(attrs) => (
                <div className={cx("category")}>
                  <Popper>
                    <Row gutter={[16, 16]}>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                    </Row>
                  </Popper>
                </div>
              )}
              interactive
              placement="bottom-end"
              offset={[-160, 10]}
            >
              <Link style={{ with: "100%" }}>Chăm sóc da mặt</Link>
            </TippyHeadless>
          </div>
          <div className={cx("popper")}>
            <TippyHeadless
              render={(attrs) => (
                <div className={cx("category")}>
                  <Popper>
                    <Row gutter={[16, 16]}>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                    </Row>
                  </Popper>
                </div>
              )}
              interactive
              placement="bottom-end"
              offset={[740, 10]}
            >
              <Link style={{ with: "100%" }}>Chăm sóc tóc</Link>
            </TippyHeadless>
          </div>
          <div className={cx("popper")}>
            <TippyHeadless
              render={(attrs) => (
                <div className={cx("category")}>
                  <Popper>
                    <Row gutter={[16, 16]}>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                    </Row>
                  </Popper>
                </div>
              )}
              interactive
              placement="bottom-end"
              offset={[530, 10]}
            >
              <Link style={{ with: "100%" }}>Chăm sóc cá nhân</Link>
            </TippyHeadless>
          </div>
          <div className={cx("popper")}>
            <TippyHeadless
              render={(attrs) => (
                <div className={cx("category")}>
                  <Popper>
                    <Row gutter={[16, 16]}>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                    </Row>
                  </Popper>
                </div>
              )}
              interactive
              placement="bottom-end"
              offset={[340, 10]}
            >
              <Link style={{ with: "100%" }}>Dành cho Nam</Link>
            </TippyHeadless>
          </div>
          <div className={cx("popper")}>
            <TippyHeadless
              render={(attrs) => (
                <div className={cx("category")}>
                  <Popper>
                    <Row gutter={[16, 16]}>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                    </Row>
                  </Popper>
                </div>
              )}
              interactive
              placement="bottom-end"
              offset={[180, 10]}
            >
              <Link style={{ with: "100%" }}>Dành cho bé</Link>
            </TippyHeadless>
          </div>
          <div className={cx("popper")}>
            <TippyHeadless
              render={(attrs) => (
                <div className={cx("category")}>
                  <Popper>
                    <Row gutter={[16, 16]}>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                      <Col className={cx("col")} span={8}>
                        <div className={cx("cate-item")}>Chăm sóc da mặt</div>
                      </Col>
                    </Row>
                  </Popper>
                </div>
              )}
              interactive
              placement="right-end"
              offset={[24, -80]}
            >
              <Link style={{ with: "100%" }}>Thực phẩm</Link>
            </TippyHeadless>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
