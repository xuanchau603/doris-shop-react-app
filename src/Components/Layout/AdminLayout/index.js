import style from "./AdminLayout.module.scss";
import classNames from "classnames/bind";
import SideBarAdmin from "../../SideBarAdmin";
import { PoweroffOutlined, CaretDownOutlined } from "@ant-design/icons";
import { logo } from "../../../Image/index";
import DropDownList from "../../DropDownList";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function AdminLayout({ children }) {
  const itemsDropdown = [
    {
      label: (
        <Link to="/" style={{ fontSize: 20 }}>
          <PoweroffOutlined style={{ marginRight: 6 }}></PoweroffOutlined> Đăng
          xuất
        </Link>
      ),
      key: "0",
      danger: true,
    },
  ];

  return (
    <>
      <header className={cx("header")}>
        <div className={cx("logo")}>
          <img alt="logo" src={logo}></img>
        </div>
        <div className={cx("user")}>
          <DropDownList
            items={itemsDropdown}
            trigger={"hover"}
            label={
              <Link to="/" style={{ color: "black" }}>
                Xin chào, <b style={{ color: "green" }}>Lê Xuân Châu</b>{" "}
                <CaretDownOutlined />
              </Link>
            }
          ></DropDownList>
        </div>
      </header>
      <div className={cx("container")}>
        <div>
          <SideBarAdmin></SideBarAdmin>
        </div>
        {children}
      </div>
    </>
  );
}

export default AdminLayout;
