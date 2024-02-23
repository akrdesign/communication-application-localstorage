import ReactDOM from "react-dom";
import Button from "../common/Button";

import styles from "./styles.module.scss";

const ModalComponent = ({
  confirmHandler,
  handleClose,
  heading,
  ModalBody,
  className,
  footerVisible,
}) => {
  return ReactDOM.createPortal(
    <Modal
      close={handleClose}
      heading={heading}
      ModalBody={ModalBody}
      confirm={confirmHandler}
      className={className}
      footerVisible={footerVisible}
    />,
    document.getElementById("modal-root")
  );
};

export default ModalComponent;

const Modal = ({
  confirm,
  close,
  heading,
  ModalBody,
  className,
  footerVisible,
}) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={`${styles.modal} ${className}`}>
        <div className={styles.modal_header}>
          <h4>{heading}</h4>
          <button onClick={close}>&times;</button>
        </div>
        <div className={styles.modal_body}>
          <ModalBody />
        </div>
        {footerVisible && (
          <div className={styles.modal_footer}>
            <Button onClick={confirm}>Ok</Button>
            <Button onClick={close}>Cancel</Button>
          </div>
        )}
      </div>
    </div>
  );
};
