import style from "./AdminOrder.module.scss";
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
  InfoCircleOutlined,
} from "@ant-design/icons/lib/icons";
import Selection from "../../Select";
import { message, Popconfirm, Spin, Table } from "antd";
import Apptitle from "../Components/AppTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function AdminOrder() {
  const [orders, setOrders] = useState([]);

  const getAllOrder = async () => {
    const res = await axios.get("http://localhost:3001/order");
    if (res) {
      setOrders(res.data);
    }
  };

  useEffect(() => {
    getAllOrder();
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
      title: "ID đơn hàng",
      dataIndex: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Tính năng",
      dataIndex: "action",
    },
  ];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/order/delete/?id=${id}`,
      );
      if (res.status === 200) {
        message.success("Xóa thành công đơn hàng!", 2);
        getAllOrder();
      }
    } catch (error) {
      alert(error);
    }
  };

  const data = orders.map((item) => {
    let statusTag;
    if (item.status === 0) {
      statusTag = (
        <span
          style={{
            padding: "1rem",
            background: "var(--warning-color)",
            borderRadius: "8px",
          }}
        >
          Chờ xác nhận
        </span>
      );
    } else if (item.status === 1) {
      statusTag = (
        <span
          style={{
            padding: "1rem",
            background: "var(--success-color)",
            borderRadius: "8px",
          }}
        >
          Đã xác nhận
        </span>
      );
    } else {
      statusTag = (
        <span
          style={{
            padding: "1rem",
            background: "var(--error-color)",
            borderRadius: "8px",
          }}
        >
          Đã hủy
        </span>
      );
    }
    return {
      key: item.id,
      id: item.id,
      customer: item.full_Name,
      phone: item.phone,
      address: item.address,
      note: item.note,
      status: statusTag,
      action: (
        <span className={cx("action-table")}>
          <InfoCircleOutlined
            onClick={() => {
              navigate("/admin/order/detail", {
                state: {
                  order_ID: item.id,
                  order_Date: item.createdAt,
                  order_Date_up: item.updatedAt,
                  status: item.status,
                  fullName: item.full_Name,
                  phone: item.phone,
                  address: item.address,
                  type: item.payment_Type,
                  total: item.total_Order,
                },
              });
            }}
            title="Chi tiết đơn hàng"
          />{" "}
          <EditOutlined
            onClick={() => {
              navigate("/admin/order/edit", {
                state: {
                  order_ID: item.id,
                  status: item.status,
                  fullName: item.full_Name,
                  phone: item.phone,
                  address: item.address,
                  note: item.note,
                  type: item.payment_Type,
                  total: item.total_Order,
                },
              });
            }}
            title="Chỉnh sửa đơn hàng"
          />{" "}
          <Popconfirm
            okText="Xóa"
            cancelText="Hủy"
            placement="topLeft"
            title="Bạn có chắc chắn xóa đơn hàng này?"
            onConfirm={() => {
              handleDelete(item.id);
            }}
          >
            <DeleteOutlined title="Xóa đơn hàng" />
          </Popconfirm>
        </span>
      ),
    };
  });
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    navigate("/admin/order/add");
  };

  return (
    <div className={cx("wrapper")}>
      <Apptitle title={"Danh sách đơn hàng"}></Apptitle>
      <div className={cx("container")}>
        <div className={cx("action")}>
          <button onClick={handleCreateOrder} style={{ background: "#9df99d" }}>
            <PlusOutlined /> Tạo mới đơn hàng
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

export default AdminOrder;
