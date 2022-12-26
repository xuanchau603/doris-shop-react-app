import { Modal as MODAL } from "antd";
const Modal = ({ children, open, onCancel }) => {
  return (
    <>
      <MODAL
        // title="Vertically centered modal dialog"
        centered
        open={open}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        // onOk={() => setOpenModal(false)}
        onCancel={onCancel}
      >
        {children}
      </MODAL>
    </>
  );
};
export default Modal;
