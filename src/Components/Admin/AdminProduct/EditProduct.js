import { Col, Row } from "antd";
import Form from "../Components/Form";
import Apptitle from "../Components/AppTitle";
import style from "./AdminOrder.module.scss";
import classNames from "classnames/bind";
import { Buffer } from "buffer";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function EditProduct() {
  const [listCate, setListCate] = useState([]);
  const [listPromotion, setListPromotion] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [cateID, setCateID] = useState("");
  const [promotionID, setPromotionID] = useState("");
  const [description, setDescription] = useState("");
  const refImage = useRef();
  const refName = useRef();
  const cateIDRef = useRef();
  const promoIDRef = useRef();

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const getData = async () => {
      const resCate = await axios.get("http://localhost:3001/category/min");
      await setListCate(resCate.data);

      const resPromotion = await axios.get("http://localhost:3001/promotion");
      await setListPromotion(resPromotion.data);

      setName(state.name);
      setPrice(state.price);
      setImage(Buffer.from(state.image || "", "base64").toString("ascii"));
      setQuantity(state.quantity);
      setDescription(state.description);
      setCateID(state.cateID);
      setPromotionID(state.promotionID === null ? "0" : state.promotionID);
      cateIDRef.current.value = state.cateID;
      promoIDRef.current.value =
        state.promotionID === null ? "0" : state.promotionID;
    };
    getData();
  }, []);

  const handleEdit = async () => {
    if (
      !name ||
      !price ||
      quantity === "" ||
      !image ||
      !cateID ||
      !promotionID
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      console.log({
        name,
        price,
        quantity,
        image,
        cateID,
        promotionID,
        description,
      });
    } else {
      const data = {
        name,
        price,
        quantity,
        image,
        cateID,
        promotionID,
        description,
      };
      try {
        const res = await axios.put(
          `http://localhost:3001/product/update/?id=${state.id}`,
          data
        );
        if (res.status === 200) {
          setName("");
          setPrice("");
          setQuantity("");
          setImage("");
          setDescription("");
          cateIDRef.current.value = "";
          promoIDRef.current.value = "";
          refName.current.focus();
          alert("Cập nhật sản phẩm thành công!");
        }
      } catch (error) {
        alert(error?.response?.data);
      }
    }
  };

  return (
    <>
      <Apptitle title='Sửa sản phẩm'></Apptitle>
      <Form title={"Cập nhật sản phẩm"}>
        <Row className={cx("form")} gutter={[30, 20]}>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label for=''>
                Tên sản phẩm <b>*</b>
              </label>
              <input
                ref={refName}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nhập tên sản phẩm...'
              ></input>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label for=''>
                Giá sản phẩm <b>*</b>
              </label>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Nhập giá sản phẩm...'
              ></input>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label for=''>
                Số lượng <b>*</b>
              </label>
              <input
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder='Nhập số lượng...'
              ></input>
            </div>
          </Col>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label for=''>
                Ảnh sản phẩm <b>*</b>
              </label>
              <input
                ref={refImage}
                type='file'
                onChange={(e) => {
                  const reader = new FileReader();
                  if (e.target.files.length === 0) {
                    return setImage("");
                  }
                  if (e.target.files[0]) {
                    reader.readAsDataURL(e.target.files[0]);
                    reader.addEventListener("load", () => {
                      setImage(reader.result);
                    });
                  }
                }}
              ></input>
              <img
                className={cx("preview")}
                width='100%'
                alt=''
                src={image}
              ></img>
            </div>
          </Col>

          <Col span={6}>
            <div className={cx("form-group")}>
              <label for=''>
                Danh mục <b>*</b>
              </label>
              <select
                value={cateID}
                ref={cateIDRef}
                onChange={(e) => setCateID(e.target.value)}
              >
                <option value={""}>--Chọn danh mục--</option>
                {listCate.map((item) => {
                  return (
                    <option key={item.cate_ID} value={item.cate_ID}>
                      {item.cate_Name}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>

          <Col span={6}>
            <div className={cx("form-group")}>
              <label for=''>
                Khuyến mãi <b>*</b>
              </label>
              <select
                value={promotionID}
                ref={promoIDRef}
                onChange={(e) => setPromotionID(e.target.value)}
              >
                <option value={""}>--Chọn khuyến mãi--</option>
                <option value={0}>Không có khuyến mãi</option>
                {listPromotion.map((item, index) => {
                  return (
                    <option key={index} value={item.promotion_ID}>
                      {item.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>

          <Col span={6}>
            <div className={cx("form-group")}>
              <label for=''>Ghi chú sản phẩm </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Ghi chú sản phẩm(không bắt buộc)...'
              ></textarea>
            </div>
          </Col>
        </Row>
        <div className={cx("actions")}>
          <button onClick={handleEdit}>Lưu lại</button>
          <button onClick={() => navigate("/admin/product")}>Hủy bỏ</button>
        </div>
      </Form>
    </>
  );
}

export default EditProduct;
