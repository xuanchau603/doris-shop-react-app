import { Spin } from "antd";
import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState("");

  const getTime = () => {
    const date = new Date();
    let s = date.getSeconds();
    let m = date.getMinutes();
    let h = date.getHours();
    let day = "";
    if (date.getDay() === 0) {
      day = "Chủ nhật";
    } else if (date.getDay() === 1) {
      day = "Thứ hai";
    } else if (date.getDay() === 2) {
      day = "Thứ ba";
    } else if (date.getDay() === 3) {
      day = "Thứ tư";
    } else if (date.getDay() === 4) {
      day = "Thứ năm";
    } else if (date.getDay() === 5) {
      day = "Thứ sáu";
    } else if (date.getDay() === 6) {
      day = "Thứ bảy";
    }
    let d = date.getDate();
    if (d < 10) {
    }
    const month = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    let mon = month[date.getMonth()];
    let year = date.getFullYear();

    let t =
      d < 10
        ? `${day}, 0${d}/${mon}/${year} - ${h} giờ ${m} phút ${s} giây`
        : `${day}, ${d}/${mon}/${year} - ${h} giờ ${m} phút ${s} giây`;
    setTime(t);
  };

  useEffect(() => {
    const interval = setInterval(getTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <span>{time ? time : <Spin></Spin>}</span>;
}

export default Clock;
