import style from "./AdminOrder.module.scss";
import classNames from "classnames/bind";
import { PlusOutlined } from "@ant-design/icons";
import { Buffer } from "buffer";
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
import { Skeleton, Spin, Table } from "antd";
import Apptitle from "../Components/AppTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function AdminProduct() {
  const [listProduct, setListProduct] = useState([]);

  const handleDeleteProduct = async (id) => {
    try {
      if (window.confirm("Bạn có chắn chắn muốn xóa danh mục này?") === true) {
        const res = axios.delete(
          `http://localhost:3001/product/delete/?id=${id}`
        );
        if (res) {
          alert("Delete successfully");
          getAllproduct();
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const getAllproduct = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product");
      if (res.status === 200) {
        setListProduct(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllproduct();
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
      title: "Mã sản phẩm",
      dataIndex: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },

    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
    },
    {
      title: "Khuyến mãi",
      dataIndex: "promotion",
    },
    {
      title: "Tính năng",
      dataIndex: "action",
    },
  ];

  const data = listProduct.map((item) => {
    return {
      key: item.product_ID,
      id: item.product_ID,
      name: item.product_Name,
      image: (
        <img
          width='200px'
          height='100px'
          alt=''
          src={Buffer.from(item?.product_Image || "", "base64").toString(
            "ascii"
          )}
        ></img>
      ),
      quantity: item.product_Quantity,
      status:
        item.product_Quantity > 0 ? (
          <span
            style={{
              color: "var(--primary-color)",
              fontWeight: 700,
            }}
            className={cx("stock")}
          >
            Còn hàng
          </span>
        ) : (
          <span
            style={{
              color: "red",
              fontWeight: 700,
            }}
            className={cx("unstock")}
          >
            Hết hàng
          </span>
        ),
      price: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item.product_Price),
      category: item.category.cate_Name,
      promotion: item.promotion?.description,
      action: (
        <span>
          <EditOutlined
            onClick={() => {
              navigate("/admin/product/edit", {
                state: {
                  id: item.product_ID,
                  price: item.product_Price,
                  name: item.product_Name,
                  image: item.product_Image,
                  quantity: item.product_Quantity,
                  cateID: item.cate_ID,
                  promotionID: item.promotion_ID,
                  description: item.product_Description,
                },
              });
            }}
            className={cx("edits")}
          />{" "}
          <DeleteOutlined
            onClick={() => {
              handleDeleteProduct(item.product_ID);
            }}
            className={cx("edits")}
          />
        </span>
      ),
    };
  });

  const navigate = useNavigate();

  const handleCreateOrder = () => {
    navigate("/admin/product/add");
  };

  return (
    <div className={cx("wrapper")}>
      <Apptitle title={"Danh sách sản phẩm"}></Apptitle>
      <div className={cx("container")}>
        <div className={cx("action")}>
          <button onClick={handleCreateOrder} style={{ background: "#9df99d" }}>
            <PlusOutlined /> Tạo mới sản phẩm
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
            {listProduct.length > 0 ? (
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

export default AdminProduct;
