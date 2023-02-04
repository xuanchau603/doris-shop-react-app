import Apptitle from "./../Components/AppTitle/index";
import style from "./AdminOrder.module.scss";
import classNames from "classnames/bind";
import { Col, Row, Skeleton, Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { useState } from "react";
import { StepBackwardOutlined } from "@ant-design/icons";
const cx = classNames.bind(style);

function OrderDetail() {
  const { state } = useLocation();
  const [orderDetail, setOrderDetail] = useState([]);

  const getOrderDetail = async (id) => {
    const res = await axios.get(`http://localhost:3001/order/?order_Id=${id}`);
    if (res) {
      setOrderDetail(res.data);
      console.log(res.data);
    }
  };
  useEffect(() => {
    if (state) {
      getOrderDetail(state.order_ID);
    }
  }, []);

  const date = new Date(state.order_Date);
  console.log(date);
  const date_up = new Date(state.order_Date_up);
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
    },
    {
      title: "Tên Sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
    },

    {
      title: "Đơn giá",
      dataIndex: "price",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
    },
  ];
  const data = orderDetail.map((item) => {
    return {
      key: item.id,
      id: item.product.product_ID,
      name: item.product.product_Name,
      image: (
        <img
          width="200px"
          height="100px"
          alt=""
          src={Buffer.from(item.product.product_Image || "", "base64").toString(
            "ascii",
          )}
        ></img>
      ),
      price: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item.product.product_Price),
      quantity: item.quantity,
    };
  });
  let type;
  if (state.type === 1) {
    type = "Thanh toán khi nhận hàng";
  } else if (state.type === 2) {
    type = "Thanh toán qua MoMo";
  } else if (state.type === 3) {
    type = "Thanh toán qua VNPAY";
  } else {
    type = "Chuyển khoản quan ngân hàng";
  }

  return (
    <>
      <div className={cx("wrapper")}>
        <Apptitle title={"Chi tiết đơn hàng"}></Apptitle>
        <div className={cx("container")}>
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              span={12}
            >
              <Link className={cx("back")} to={"/admin/order"}>
                <StepBackwardOutlined />
                Trở về
              </Link>
              <div className={cx("detail-left")}>
                <div className={cx("detail-id")}>
                  <h2>Mã đơn hàng:</h2> <span>{state.order_ID}</span>
                </div>
                <p className={cx("detail-day")}>
                  <b>Ngày tạo đơn hàng:</b>{" "}
                  <span>{`${date.toDateString()} ${date.toLocaleTimeString()}`}</span>
                </p>
                <p className={cx("detail-day")}>
                  <b>Chỉnh sửa lần cuối:</b>{" "}
                  <span>{`${date_up.toDateString()} ${date_up.toLocaleTimeString()}`}</span>
                </p>
                <p className={cx("payment-type")}>
                  <b>Hình thức thanh toán:</b> <span>{type}</span>
                </p>
                <p className={cx("detail-status")}>
                  <b>Tình trạng:</b>{" "}
                  <span>
                    {state.status === 0 ? "Chờ xác nhận" : "Đã thanh toán"}
                  </span>
                </p>
                <p className={cx("detail-name")}>
                  <b>Tên khách hàng:</b> <span>{state.fullName}</span>
                </p>
                <p className={cx("detail-status")}>
                  <b>Số điện thoại:</b> <span>{state.phone}</span>
                </p>
                <p className={cx("detail-status")}>
                  <b>Địa chỉ:</b> <span>{state.address}</span>
                </p>
                <p className={cx("detail-status")}>
                  <b>Ghi chú:</b> <span>{state.note}</span>
                </p>
                <p className={cx("detail-status")}>
                  <b>Tổng tiền đơn hàng:</b>{" "}
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(state.total)}{" "}
                  </span>
                </p>
              </div>
            </Col>
            <Col span={12}>
              <h2>Danh sách sản phẩm</h2>

              <div className={cx("middle")}>
                {orderDetail.length > 0 ? (
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
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
