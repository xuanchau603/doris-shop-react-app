import { Col, Row } from "antd";
import Form from "../Components/Form";
import Apptitle from "../Components/AppTitle";
import style from "./AdminCategory.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { Buffer } from "buffer";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function EditCategory() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescripton] = useState("");
  const navigte = useNavigate();
  const refName = useRef();
  const refImage = useRef();
  const refDes = useRef();

  const { state } = useLocation();

  useEffect(() => {
    setName(state.name);
    setImage(Buffer.from(state.image || "", "base64").toString("ascii"));
    setDescripton(state.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = async () => {
    if (!name || !image)
      return alert("Vui lòng nhập đầy đủ thông tin yêu cầu!");
    const data = {
      name,
      image,
      description,
    };
    try {
      const res = await axios.put(
        `http://localhost:3001/category/update/${state.id}`,
        data
      );
      if (res) {
        alert("Cập nhật danh mục thành công!");
        setName("");
        setImage("");
        setDescripton("");
        refImage.current.value = "";
        refName.current.focus();
      }
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  return (
    <>
      <Apptitle title='Cập nhật danh mục'></Apptitle>
      <Form title={"Cập nhật danh mục"}>
        <Row className={cx("form")} gutter={[30, 20]}>
          <Col span={6}>
            <div className={cx("form-group")}>
              <label htmlFor=''>
                Tên danh mục <b>*</b>
              </label>
              <input
                ref={refName}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nhập tên danh mục...'
              ></input>
            </div>
          </Col>

          <Col span={6}>
            <div className={cx("form-group")}>
              <label htmlFor=''>
                Ảnh danh mục <b>*</b>
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
              <label htmlFor=''>Ghi chú danh mục </label>
              <textarea
                ref={refDes}
                value={description}
                onChange={(e) => setDescripton(e.target.value)}
                placeholder='Ghi chú danh mục(không bắt buộc)...'
              ></textarea>
            </div>
          </Col>
        </Row>
        <div className={cx("actions")}>
          <button type='submit' onClick={handleEdit}>
            Lưu lại
          </button>
          <button
            onClick={() => {
              navigte("/admin/category");
            }}
          >
            Hủy bỏ
          </button>
        </div>
      </Form>
    </>
  );
}

export default EditCategory;
