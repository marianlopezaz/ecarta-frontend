import React, { useState } from "react";

// Import dependencias
import styles from "./styles.module.css";
import project_styles from "../project_item/styles.module.css";
import { Row, Col } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import QRCode from "qrcode.react";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalQR = ({ project }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const downloadQR = (project_id) => {
    const canvas = document.getElementById(project_id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${project.name}_qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        className="responsive_dashboard_modal"
        TransitionComponent={Transition}
        keepMounted
      >
        <div id={styles.close_menu_container} title="Cerrar">
          <img
            id={styles.close_icon}
            src="/icons/close.svg"
            alt="close"
            onClick={handleClose}
          />
        </div>
        <DialogTitle id="qr_project_title" className="center">
          {project.name}
        </DialogTitle>
        <DialogContent>
          <Row lg={12} md={12} sm={12} xs={12}>
            <Col lg={12} md={12} sm={12} xs={12} className="center">
              <QRCode
                id={project.id}
                className={styles.qr}
                value={`${window.location.origin}/projects/${project.qr}`}
                size={400}
                level={"L"}
                includeMargin={true}
              />
            </Col>
            <Col
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="center"
              style={{ marginTop: 50, marginBottom: 50 }}
            >
              <button
                onClick={downloadQR.bind(this, project.id)}
                className={styles.download_btn}
              >
                Descargar
              </button>
            </Col>
          </Row>
        </DialogContent>
      </Dialog>
      {!fullScreen ? (
        <a
          className={project_styles.actions_btn}
          onClick={handleOpen}
          title="Ver QR"
        >
          Ver QR
        </a>
      ) : (
        <a
          className={project_styles.icons_btn}
          title="Ver QR"
          onClick={handleOpen}
        >
          <img src="/icons/qr_download.svg" alt="qr" />
        </a>
      )}
    </>
  );
};

export default ModalQR;
