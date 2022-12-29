import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
} from "@ant-design/icons";
import { Row, Col, Avatar, Image } from "antd";
import TippyHeadless from "@tippyjs/react/headless";
import Popper from "../../../Popper";
import { logo } from "../../../../Image";
import Marquee from "react-fast-marquee";

const cx = classNames.bind(style);

function Header() {
  const [loading, setLoading] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

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

  const handleChange = (e) => {
    setLoading(true);
  };

  const header = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
          <Link className={cx("logo")} to={"/"}>
            <img alt="logo" src={logo}></img>
          </Link>
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
            {/* <div className={cx("border-col")}></div> */}
            {/* <Link to={"/login"} className={cx("login")}>
              <UserAddOutlined></UserAddOutlined>
              <Link to={"/login"}>Đăng nhập</Link>
            </Link> */}
            <TippyHeadless
              render={(attrs) => (
                <ul className={cx("user-menu")}>
                  <Popper>
                    <li className={cx("menu-item")}>
                      <SettingOutlined /> Cài đặt tài khoản
                    </li>
                    <Link to={"/admin"} className={cx("menu-item")}>
                      <LockOutlined /> Quản lý hệ thống
                    </Link>
                    <li className={cx("menu-item")}>
                      <FontColorsOutlined /> Ngôn ngữ
                    </li>
                    <li className={cx("menu-item")}>
                      <SkinOutlined /> Giao diện
                    </li>
                    <li className={cx("menu-item")}>
                      <CommentOutlined /> Hướng dẫn
                    </li>
                    <li className={cx("menu-item")}>
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
                      src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/308991716_1225308318318724_7314307188888730009_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=B2dJEegMS0YAX-EQpIV&_nc_ht=scontent.fdad3-6.fna&oh=00_AfAydJpDw1JSVKp5D-K4i52O-XvP9Fk5G2lXs1lvD8qEqQ&oe=63AF3668"
                      style={{
                        width: 44,
                      }}
                    />
                  }
                />
              </div>
            </TippyHeadless>
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
