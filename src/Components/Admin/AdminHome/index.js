import Apptitle from "../Components/AppTitle";
import style from "./AdminHome.module.scss";
import classNames from "classnames/bind";
import { Col, Row } from "antd";
import {
  TeamOutlined,
  DatabaseOutlined,
  WarningOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";

const cx = classNames.bind(style);

function AdminHome() {
  return (
    <>
      <Apptitle title={"Bảng điều khiển"}></Apptitle>
      <div className={cx("container")}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <div className={cx("tag")}>
              <div
                style={{ background: "var(--success-color)", color: "green" }}
                className={cx("icon")}
              >
                <TeamOutlined />
              </div>
              <div className={cx("content")}>
                <div className={cx("content-wrapper")}>
                  <div className={cx("content-title")}>TỔNG KHÁCH HÀNG</div>
                  <div className={cx("content-count")}>56 khách hàng</div>
                </div>
                <div className={cx("content-des")}>
                  Tổng số khách hàng được quản lý.
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={cx("tag")}>
              <div
                style={{ background: "#adcbf3", color: "#1d5aab" }}
                className={cx("icon")}
              >
                <DatabaseOutlined />
              </div>
              <div className={cx("content")}>
                <div className={cx("content-wrapper")}>
                  <div className={cx("content-title")}>TỔNG SỐ SẢN PHẨM</div>
                  <div className={cx("content-count")}>124 sản phẩm</div>
                </div>
                <div className={cx("content-des")}>
                  Tổng số sản phẩm được quản lý.
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={cx("tag")}>
              <div
                style={{ background: "var(--warning-color)", color: "orange" }}
                className={cx("icon")}
              >
                <CarryOutOutlined />
              </div>
              <div className={cx("content")}>
                <div className={cx("content-wrapper")}>
                  <div className={cx("content-title")}>TỔNG ĐƠN HÀNG</div>
                  <div className={cx("content-count")}>274 đơn hàng</div>
                </div>
                <div className={cx("content-des")}>
                  Tổng số hóa đơn bán hàng trong tháng.
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={cx("tag")}>
              <div
                style={{ background: "var(--error-color)", color: "red" }}
                className={cx("icon")}
              >
                <WarningOutlined />
              </div>
              <div className={cx("content")}>
                <div className={cx("content-wrapper")}>
                  <div className={cx("content-title")}>SẮP HẾT HÀNG</div>
                  <div className={cx("content-count")}>4 sản phẩm</div>
                </div>
                <div className={cx("content-des")}>
                  Số sản phẩm cảnh báo hết cần nhập thêm.
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div class="tile">
        <h3 class="tile-title">Dữ liệu 6 tháng đầu vào</h3>
        <div class="embed-responsive embed-responsive-16by9">
          <canvas
            class="embed-responsive-item"
            id="lineChartDemo"
            width="752"
            height="423"
          ></canvas>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
