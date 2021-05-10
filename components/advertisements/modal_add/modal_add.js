import React, { useState } from "react";

// Import dependencias
import styles from "./styles.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Row, Col, Collapse } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "react-s-alert";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalAdd = ({ addAdvertisement }) => {
  const ADVERTISEMENT_INITIAL_STATE = {
    name: "",
    description: "",
    media: {
      isEmpty: true,
    },
    time: 0,
  };
  const [open, setOpen] = useState(false);
  const [openMediaPreview, setOpenMediaPreview] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [advertisement, setAdvertisement] = useState(
    ADVERTISEMENT_INITIAL_STATE
  );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
    setLoadingAdd(false);
    setAdvertisement(ADVERTISEMENT_INITIAL_STATE);
    setOpenMediaPreview(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (prop) => (event) => {
    setAdvertisement({ ...advertisement, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    if (
      advertisement.name === "" ||
      advertisement.media.isEmpty ||
      advertisement.time === 0
    ) {
      Alert.warning(
        "Completá todos los campos para continuar! La descripción no es requerida y el tiempo debe ser distinto a 0.",
        {
          position: "bottom",
          effect: "stackslide",
        }
      );
    } else {
      setLoadingAdd(true);
      const data_send = new FormData();
      data_send.append("name", advertisement.name);
      data_send.append("description", advertisement.description);
      data_send.append("media", advertisement.media);
      data_send.append("time", advertisement.time);
      addAdvertisement(data_send).then((result) => {
        handleClose();
      });
    }
  };

  const openFileManager = () => {
    let input = document.getElementById(`regular_advertisement_add`);
    input.click();
  };

  const fileAccept = (e) => {
    setOpenMediaPreview(true);
    setAdvertisement({
      ...advertisement,
      media: e.target.files[0],
    });
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        className="responsive_dashboard_modal"
        TransitionComponent={Transition}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="center">Nuevo Anuncio</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            required={true}
            value={advertisement.name}
            onChange={handleChange("name")}
          />
          <TextField
            margin="dense"
            name="description"
            label="Descripción"
            multiline
            value={advertisement.description}
            onChange={handleChange("description")}
            style={{ marginTop: 30 }}
          />
          <TextField
            margin="dense"
            name="time"
            required
            label="Tiempo de duración del anuncio (segundos)"
            type="number"
            value={advertisement.time}
            onChange={handleChange("time")}
            style={{ marginTop: 30 }}
          />
          <Row md={12} sm={12} xs={12}>
            <Col
              md={11}
              sm={11}
              xs={11}
              className={`left ${styles.reference_media}`}
            >
              <p>Imagen del anuncio</p>
              <p
                className="delete_details"
                style={{ fontWeight: "300", fontSize: 13 }}
              >
                Te recomendamos que la imagen sea de entre 1000-1300px{" "}
                <span style={{ fontWeight: "700" }}>X</span> 1700-2000px.
              </p>
            </Col>
            <Col
              md={11}
              sm={11}
              xs={11}
              onClick={openFileManager}
              className={`center ${styles.upload_container}`}
            >
              <Col md={12} sm={12} xs={12} style={{ marginTop: 20 }}>
                <img src="/images/dashboard/add_file.svg" alt="img" />
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginTop: 20 }}>
                <p className={styles.info}>
                  <span onClick={openFileManager}>Seleccioná una imagen</span>
                </p>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginTop: 10 }}>
                <p className={styles.supports}>Formato: PNG, JPEG, JPG, GIF, MP4</p>
              </Col>
              <div style={{ height: 0, width: 0, overflow: "hidden" }}>
                <input
                  id={`regular_advertisement_add`}
                  type="file"
                  name={`regular_advertisement_add`}
                  accept="image/*, video/*"
                  onChange={fileAccept}
                />
              </div>
            </Col>
            <Col
              md={11}
              sm={11}
              xs={11}
              className="center"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <Collapse in={openMediaPreview}>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  key={advertisement.media.name}
                  className={`center ${styles.view_file_container}`}
                >
                  <Row md={12} sm={12} xs={12}>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className={`left ${styles.img_name_container}`}
                    >
                      <img
                        src="/images/dashboard/add_img.svg"
                        alt="img"
                        className={styles.img_icon}
                      />
                      <span className={styles.file_name}>
                        {advertisement.media.name}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Collapse>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions style={{ margin: 10 }}>
          {!loadingAdd ? (
            <>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary" onClick={handleSubmit}>
                Guardar
              </Button>
            </>
          ) : (
            <Button
              disabled
              type="submit"
              color="primary"
              style={{ width: 90 }}
            >
              <CircularProgress
                size={20}
                color={"secondary"}
                style={{ marginBottom: 5 }}
              />
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <button id={styles.add_btn} title="Nuevo Anuncio" onClick={handleOpen}>
        <img src="/icons/add.svg" alt="add" />
        {!fullScreen && <p>Añadir</p>}
      </button>
    </>
  );
};

export default ModalAdd;
