import style from "./Lookup.module.scss";
import className from "classnames/bind";
import { Col, message, Row, Spin } from "antd";
import {
  MessageOutlined,
  PhoneOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import Format from "../../Format";
import { Link } from "react-router-dom";

const cx = className.bind(style);

function Lookup() {
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrder = async (phone) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3001/order/?phone=${phone}`,
      );
      setOrder(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Không tìn thấy kết quả phù hợp", 2);
    }
  };

  const handleLookup = async () => {
    if (phone.length < 10) {
      return message.error("Số điện thoại không hợp lệ", 2);
    } else {
      getOrder(phone);
    }
  };

  return (
    <div className={cx("wrapper")}>
      {order.length > 0 ? (
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
                  Chào anh <b>Lê Xuân Châu - 0796504819</b>
                </span>
                <span>
                  <MessageOutlined /> Phản hồi, góp ý
                </span>
              </div>
              <div className={cx("main-content")}>
                <h3>Danh sách đơn hàng đã mua</h3>
                <Row className={cx("main-content-top")}>
                  <Col span={3}>
                    <div>Mã đơn hàng</div>
                  </Col>
                  <Col span={12}>
                    <div>Địa chỉ nhận hàng</div>
                  </Col>
                  <Col span={3}>
                    <div>Giá</div>
                  </Col>
                  <Col span={3}>
                    <div>Ngày đặt mua</div>
                  </Col>
                  <Col span={3}>
                    <div>Trạng thái</div>
                  </Col>
                </Row>
                {order.map((item) => {
                  return (
                    <Row
                      gutter={10}
                      key={item.id}
                      className={cx("main-content-data")}
                    >
                      <Col span={3}>
                        <div className={cx("id")}>#{item.id}</div>
                      </Col>
                      <Col span={12}>
                        <div className={cx("name")}>{item.address}</div>
                        <Link
                          state={{
                            id: item.id,
                            name: item.full_Name,
                            phone: item.phone,
                            address: item.address,
                            total: item.total_Order,
                            status: item.status,
                          }}
                          to="./detail"
                          className={cx("detail")}
                        >
                          Xem chi tiết
                        </Link>
                      </Col>
                      <Col span={3}>
                        <div className={cx("price")}>
                          {Format.formatPrice(item.total_Order)}
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cx("date")}>
                          {Format.formatDate(item.createdAt)}
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cx("status")}>
                          {Format.formatStatusOrder(item.status)}
                        </div>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <div className={cx("search")}>
          <img
            src="https://www.thegioididong.com/lich-su-mua-hang/images/i1.png"
            alt=""
          ></img>
          <span>Tra cứu thông tin đơn hàng</span>
          <div className={cx("action")}>
            <PhoneOutlined />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type={"number"}
              placeholder="Nhập số điện thoại mua hàng"
            ></input>
          </div>
          {!loading ? (
            <button onClick={handleLookup}>Tiếp tục</button>
          ) : (
            <button style={{ cursor: "not-allowed", opacity: "0.6" }}>
              Đang tìm kiếm <Spin></Spin>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Lookup;
