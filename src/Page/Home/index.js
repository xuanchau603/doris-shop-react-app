import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { banner } from "../../Image";
import Sliders from "../../Components/Slider";

const cx = classNames.bind(style);

function Home() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner")}>
        <img src={banner} alt="banner" className={cx("banner-img")}></img>
      </div>
      <div className={cx("slider-banner")}></div>
      <Sliders></Sliders>
    </div>
  );
}

export default Home;
