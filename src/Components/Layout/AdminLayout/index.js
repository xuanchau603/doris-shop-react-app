import style from "./AdminLayout.module.scss";
import classNames from "classnames/bind";
import SideBarAdmin from "../../SideBarAdmin";
import { PoweroffOutlined, CaretDownOutlined } from "@ant-design/icons";
import { logo } from "../../../Image/index";
import DropDownList from "../../DropDownList";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../Redux/authSlice";

const cx = classNames.bind(style);

function AdminLayout({ children }) {
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();

  const itemsDropdown = [
    {
      label: (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          onClick={() => {
            dispatch(logoutSuccess());
            navigate("/");
          }}
          style={{ fontSize: 20 }}
        >
          <PoweroffOutlined style={{ marginRight: 6 }}></PoweroffOutlined> Đăng
          xuất
        </a>
      ),
      key: "0",
      danger: true,
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <header className={cx("header")}>
        <div
          onClick={() => {
            navigate("/");
          }}
          className={cx("logo")}
        >
          <img alt="logo" src={logo}></img>
        </div>
        <div className={cx("user")}>
          <DropDownList
            items={itemsDropdown}
            trigger={"hover"}
            label={
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a style={{ color: "black" }}>
                Xin chào,{" "}
                <b style={{ color: "green" }}>
                  {user.full_Name ? user.full_Name : user.email}
                </b>{" "}
                <CaretDownOutlined />
              </a>
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
