import style from "./AdminUser.module.scss";
import classNames from "classnames/bind";
import { PlusOutlined } from "@ant-design/icons";
import {
  CopyOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons/lib/icons";
import Selection from "../../Select";
import { Skeleton, Spin, Table } from "antd";
import Apptitle from "../Components/AppTitle";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { getCookie } from "../../../Redux/cookie";

const cx = classNames.bind(style);

function AdminUser() {
  const [listUser, setListUser] = useState([]);
  const [showpass, setShowPasss] = useState(false);

  const handleDeleteCate = async (id) => {
    try {
      if (window.confirm("Bạn có chắn chắn muốn xóa tài khoản này?") === true) {
        const res = axios.delete(`http://localhost:3001/user/delete/${id}`);
        if (res) {
          alert("Delete successfully");
          getAllCate();
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  const getAllCate = async () => {
    try {
      const res = await axios.get("http://localhost:3001/user", {
        headers: {
          token: getCookie("token"),
        },
      });
      setListUser(res.data);
    } catch (error) {
      alert(error?.message);
    }
  };

  useEffect(() => {
    getAllCate();
  }, []);

  const passwordRef = useRef();

  const optionsSelect = [
    {
      value: "10",
      label: "10",
    },
    {
      value: "25",
      label: "25",
    },
    {
      value: "50",
      label: "50",
    },
    {
      value: "100",
      label: "100",
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Tính năng",
      dataIndex: "action",
    },
  ];
  console.log(passwordRef);

  const data = listUser.map((item, index) => {
    return {
      key: index,
      id: item.user_ID,
      fullName: <b style={{ fontSize: "1.8rem" }}>{item.full_Name}</b>,
      email: item.email,
      password: (
        <>
          <input
            ref={passwordRef}
            type={"password"}
            value={item.password}
          ></input>{" "}
          {showpass ? (
            <EyeOutlined
              onClick={() => {
                passwordRef.current.type = "password";
                setShowPasss(false);
              }}
            ></EyeOutlined>
          ) : (
            <EyeInvisibleOutlined
              onClick={() => {
                // passwordRef.current.type = "text";
                // setShowPasss(true);
                console.log(passwordRef);
              }}
            ></EyeInvisibleOutlined>
          )}
        </>
      ),
      role: item.Role.role_Name,
      image: (
        <img
          width="200px"
          height="100px"
          alt=""
          src={Buffer.from(item.avatar || "", "base64").toString("ascii")}
        ></img>
      ),
      action: (
        <span>
          <EditOutlined
            onClick={() => {
              navigate("/admin/user/edit", {
                state: {
                  id: item.user_ID,
                  role: item.role_ID,
                  image: item.avatar,
                  email: item.email,
                  password: item.password,
                  fullName: item.full_Name,
                  address: item.address,
                },
              });
            }}
            className={cx("edits")}
          />{" "}
          <DeleteOutlined
            onClick={() => {
              handleDeleteCate(item.user_ID);
            }}
            className={cx("edits")}
          />
        </span>
      ),
    };
  });

  const navigate = useNavigate();

  const handleCreateCategory = () => {
    navigate("/admin/user/add");
  };

  return (
    <div className={cx("wrapper")}>
      <Apptitle title={"Danh sách tài khoản"}></Apptitle>
      <div className={cx("container")}>
        <div className={cx("action")}>
          <button
            onClick={handleCreateCategory}
            style={{ background: "#9df99d" }}
          >
            <PlusOutlined /> Tạo mới tài khoản
          </button>
          <button style={{ background: "#e1ec86" }}>
            <FileAddOutlined /> Tải từ file
          </button>
          <button style={{ background: "#bfbeef" }}>
            <PrinterOutlined /> In dữ liệu
          </button>
          <button style={{ background: "#bfbeef" }}>
            <CopyOutlined /> Sao chép dữ liệu
          </button>
          <button style={{ background: "#a2ecb5" }}>
            <FileExcelOutlined /> Xuất Excel
          </button>
          <button style={{ background: "#efcaca" }}>
            <FilePdfOutlined /> Xuất PDF
          </button>
          <button style={{ background: "#d0d0d0" }}>
            <DeleteOutlined /> Xóa tất cả
          </button>
        </div>
        <div className={cx("table-data")}>
          <div className={cx("top")}>
            <div className={cx("top-left")}>
              Hiện{"  "}
              <Selection
                options={optionsSelect}
                onChange={(value) => {}}
              ></Selection>{" "}
              tài khoản
            </div>
            <div className={cx("top-right")}>
              <span>Tìm kiếm:</span>
              <input type={"text"}></input>
              <Spin className={cx("spin")}></Spin>
            </div>
          </div>
          <div className={cx("middle")}>
            {listUser.length > 0 ? (
              <Table
                bordered
                pagination={{
                  position: ["bottomRight"],
                  pageSize: 5,
                  showTotal: (total) => `Số lượng ${total}`,
                }}
                rowSelection={{
                  type: "checkbox",
                }}
                columns={columns}
                dataSource={data}
              ></Table>
            ) : (
              <Skeleton active></Skeleton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
