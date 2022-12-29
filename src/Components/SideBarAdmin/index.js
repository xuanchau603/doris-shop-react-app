import classNames from "classnames/bind";
import { useRef, useState } from "react";
import style from "./SideBarAdmin.module.scss";
import {
  ContainerOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SketchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function SideBarAdmin() {
  const [itemActive, setItemActive] = useState(0);
  const navigate = useNavigate();

  const item = [
    {
      title: "Trang chủ",
      icon: <HomeOutlined />,
      path: "/admin",
    },
    {
      title: "Đơn hàng",
      icon: <ShoppingCartOutlined />,
      path: "/admin/order",
    },
    {
      title: "Sản phẩm",
      icon: <SketchOutlined />,
      path: "/admin",
    },
    {
      title: "Tài khoản",
      icon: <UserOutlined />,
      path: "/admin",
    },
    {
      title: "Nhập kho",
      icon: <ContainerOutlined />,
      path: "/admin",
    },
    {
      title: "Doanh số",
      icon: <DollarCircleOutlined />,
      path: "/admin",
    },
    {
      title: "Cài đặt",
      icon: <SettingOutlined />,
      path: "/admin",
    },
  ];

  const lineRef = useRef();
  const refSidebar = useRef();

  return (
    <ul ref={refSidebar} className={cx("wrapper")}>
      {item.map((item, index) => {
        return (
          <li
            key={index}
            onClick={(e) => {
              lineRef.current.style.top = e.target.offsetTop + "px";
              lineRef.current.style.height = e.target.offsetHeight + "px";
              setItemActive(index);
              navigate(item.path);
            }}
            className={
              itemActive === index ? cx("function", "active") : cx("function")
            }
          >
            {item.icon} {item.title}
          </li>
        );
      })}
      <div ref={lineRef} className={cx("line")}></div>
    </ul>
  );
}

export default SideBarAdmin;
