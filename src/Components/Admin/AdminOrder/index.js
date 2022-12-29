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
} from "@ant-design/icons/lib/icons";
import Selection from "../../Select";
import { Spin, Table } from "antd";
import Apptitle from "../Components/AppTitle";

const cx = classNames.bind(style);

function AdminOrder() {
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
      title: "Khách hàng",
      dataIndex: "customer",
    },
    {
      title: "Đơn hàng",
      dataIndex: "order",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
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
  const data = [
    {
      key: "1",
      id: "1",
      customer: "Lê xuân châu",
      order: "Kem chống nắng Skin Aqua",
      quantity: 2,
      total: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(4990000),
      status: <span>Hoàn thành</span>,
      action: (
        <span>
          <EditOutlined /> <DeleteOutlined />
        </span>
      ),
    },
    {
      key: "2",
      id: "1",
      customer: "gfdsg",
      order: "Kem chống nắng Skin Aqua",
      quantity: 2,
      total: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(4990000),
      status: <span>Hoàn thành</span>,
      action: (
        <span>
          <EditOutlined /> <DeleteOutlined />
        </span>
      ),
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Apptitle title={"Danh sách đơn hàng"}></Apptitle>
      <div className={cx("container")}>
        <div className={cx("action")}>
          <button style={{ background: "#9df99d" }}>
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
              Hiện{" "}
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
