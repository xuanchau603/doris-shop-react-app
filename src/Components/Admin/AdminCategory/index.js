import style from "./AdminCategory.module.scss";
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
} from "@ant-design/icons/lib/icons";
import Selection from "../../Select";
import { Spin, Table } from "antd";
import Apptitle from "../Components/AppTitle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";

const cx = classNames.bind(style);

function AdminCategory() {
  const [listCate, setListCate] = useState([]);

  const handleDeleteCate = async (id) => {
    try {
      if (window.confirm("Bạn có chắn chắn muốn xóa danh mục này?") === true) {
        const res = axios.delete(`http://localhost:3001/category/delete/${id}`);
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
      const res = await axios.get("http://localhost:3001/category");
      setListCate(res.data);
    } catch (error) {
      alert(error?.message);
    }
  };

  useEffect(() => {
    getAllCate();
  }, []);

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
      title: "Mã danh mục",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    {
      title: "Tính năng",
      dataIndex: "action",
    },
  ];

  const data = listCate.map((item, index) => {
    return {
      key: index,
      id: item.cate_ID,
      name: <b style={{ fontSize: "1.8rem" }}>{item.cate_Name}</b>,
      image: (
        <img
          width='200px'
          height='100px'
          alt=''
          src={Buffer.from(item.cate_Image || "", "base64").toString("ascii")}
        ></img>
      ),
      action: (
        <span>
          <EditOutlined
            onClick={() => {
              navigate("/admin/category/edit", {
                state: {
                  id: item.cate_ID,
                  name: item.cate_Name,
                  image: item.cate_Image,
                  description: item.cate_Description,
                },
              });
            }}
            className={cx("edits")}
          />{" "}
          <DeleteOutlined
            onClick={() => {
              handleDeleteCate(item.cate_ID);
            }}
            className={cx("edits")}
          />
        </span>
      ),
    };
  });

  const navigate = useNavigate();

  const handleCreateCategory = () => {
    navigate("/admin/category/add");
  };

  return (
    <div className={cx("wrapper")}>
      <Apptitle title={"Danh sách danh mục"}></Apptitle>
      <div className={cx("container")}>
        <div className={cx("action")}>
          <button
            onClick={handleCreateCategory}
            style={{ background: "#9df99d" }}
          >
            <PlusOutlined /> Tạo mới danh mục
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
              danh mục
            </div>
            <div className={cx("top-right")}>
              <span>Tìm kiếm:</span>
              <input type={"text"}></input>
              <Spin className={cx("spin")}></Spin>
            </div>
          </div>
          <div className={cx("middle")}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategory;
