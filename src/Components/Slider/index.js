import style from "./Slider.module.scss";
import classNames from "classnames/bind";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const cx = classNames.bind(style);

function Sliders() {
  function SamplePrevArrow({ onClick }) {
    return (
      <div onClick={onClick} className={cx("prevArrow")}>
        <LeftOutlined></LeftOutlined>
      </div>
    );
  }

  function SampleNextArrow({ onClick }) {
    return (
      <div onClick={onClick} className={cx("nextArrow")}>
        <RightOutlined></RightOutlined>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider className={cx("wrapper")} {...settings}>
      <img
        src={
          "https://adminbeauty.hvnet.vn/Upload/Files/bannerweb-xmas.png?width=1170&height=450&v=15042020"
        }
        alt="banner"
        className={cx("slick-item")}
      ></img>

      <img
        src={
          "https://adminbeauty.hvnet.vn/Upload/Files/bannerweb-HD.png?width=1170&height=450&v=15042020"
        }
        alt="banner"
        className={cx("slick-item")}
      ></img>

      <img
        src={
          "https://adminbeauty.hvnet.vn/Upload/Files/cocoon-my-pham-thuan-chay-viet-nam.jpg?width=1170&height=450&v=15042020"
        }
        alt="banner"
        className={cx("slick-item")}
      ></img>

      <img
        src={
          "https://adminbeauty.hvnet.vn/Upload/Files/banner/chinhanh.jpg?width=1170&height=450&v=15042020"
        }
        alt="banner"
        className={cx("slick-item")}
      ></img>

      <img
        src={
          "https://adminbeauty.hvnet.vn/Upload/files/anhr-hihihi-19062019113819.jpg?width=268&height=179&v=18042020"
        }
        alt="banner"
        className={cx("slick-item")}
      ></img>

      <img
        src={
          "https://adminbeauty.hvnet.vn/Upload/files/2M8A9937%20(2).jpg?width=268&height=179&v=18042020"
        }
        alt="banner"
        className={cx("slick-item")}
      ></img>
    </Slider>
  );
}

export default Sliders;
