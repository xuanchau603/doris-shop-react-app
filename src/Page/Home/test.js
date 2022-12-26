import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
// const fileList = [];
const UploadFile = () => {
  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  return (
    <>
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          const reader = new FileReader();

          reader.onload = (e) => {
            console.log(e.target.result);
            toDataURL(
              "https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0"
            ).then((dataUrl) => {
              console.log("RESULT:", dataUrl);
            });
          };
          reader.readAsText(file);

          // Prevent upload
          return false;
        }}
      >
        <Button>
          <UploadOutlined></UploadOutlined> Click to Upload
        </Button>
      </Upload>
    </>
  );
};

export default UploadFile;
