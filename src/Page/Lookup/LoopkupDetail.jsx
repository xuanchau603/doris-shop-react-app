import style from "./Lookup.module.scss";
import className from "classnames/bind";
import { Buffer } from "buffer";
import { Col, Row } from "antd";
import { MessageOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Format from "../../Format";
import { Link, useLocation } from "react-router-dom";

const cx = className.bind(style);

function LoopkupDetail() {
  const [orderDetail, setOrderDetail] = useState([]);

  const { state } = useLocation();
  const getOrderDetail = async (id) => {
    const res = await axios.get(`http://localhost:3001/order/?order_Id=${id}`);
    if (res) {
      setOrderDetail(res.data);
    }
  };
  useEffect(() => {
    if (state) {
      getOrderDetail(state.id);
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Row gutter={20}>
        <Col span={6}>
          <ul className={cx("sidebar")}>
            <div className={cx("sidebar-item")}>
              <UnorderedListOutlined /> Danh sách đơn hàng đã mua
            </div>
          </ul>
        </Col>
        <Col span={18}>
          <div className={cx("main")}>
            <div className={cx("main-top")}>
              <span>
                Chào anh{" "}
                <b>
                  {state.name} - {state.phone}
                </b>
              </span>
              <span>
                <MessageOutlined /> Phản hồi, góp ý
              </span>
            </div>
            <div className={cx("main-content")}>
              <h3>Chi tiết đơn hàng #{state.id}</h3>
              {orderDetail.map((item) => {
                return (
                  <Row gutter={10} className={cx("main-content-data")}>
                    <Col span={24}>
                      <div className={cx("detail-status")}>
                        Trạng thái: {Format.formatStatusOrder(state.status)}
                      </div>
                    </Col>
                    <Col span={24} className={cx("detail")}>
                      <img
                        className={cx("detail-img")}
                        src={Buffer.from(
                          item.product.product_Image || "",
                          "base64",
                        ).toString("ascii")}
                        alt=""
                      ></img>
                      <div className={cx("detail-content")}>
                        <span className={cx("name")}>
                          {item.product.product_Name}
                        </span>
                        <span className={cx("quantity")}>
                          Số lượng: {item.quantity}
                        </span>
                      </div>
                      <span className={cx("detail-price")}>
                        {Format.formatPrice(item.product.product_Price)}
                      </span>
                    </Col>
                  </Row>
                );
              })}
              <div className={cx("total")}>
                <div className={cx("total-es")}>
                  Giá tạm tính: <span>{Format.formatPrice(state.total)}</span>
                </div>
                <div className={cx("total-ac")}>
                  <b>Tổng tiền:</b>{" "}
                  <span>{Format.formatPrice(state.total)}</span>
                </div>
              </div>
              <div className={cx("info")}>
                <h3>Địa chỉ và thông tin người nhận hàng</h3>
                <li>
                  {state.name} - {state.phone}
                </li>
                <li>Địa chỉ nhận hàng: {state.address}</li>
              </div>
              <div className={cx("btn-back")}>
                <Link to="/lookup">Quay lại danh sách đơn hàng</Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoopkupDetail;
