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
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalAdd = ({ addItem, menu_id }) => {
  const ITEM_INITIAL_STATE = {
    reference_id: menu_id,
    item_name: "",
    item_description: "",
    item_price: 0,
    item_order: "",
    media: {},
    type: "image",
    name: "",
    description: "",
  };
  const [open, setOpen] = useState(false);
  const [openMediaPreview, setOpenMediaPreview] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [item, setItem] = useState(ITEM_INITIAL_STATE);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
    setLoadingAdd(false);
    setItem(ITEM_INITIAL_STATE);
    setOpenMediaPreview(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (prop) => (event) => {
    setItem({ ...item, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setLoadingAdd(true);
    const data_send = new FormData();
    data_send.append("reference_id", item.reference_id);
    data_send.append("item_name", item.item_name);
    data_send.append("item_description", item.item_description);
    data_send.append("item_price", item.item_price);
    data_send.append(
      "item_order",
      item.item_order === "" ? 0 : item.item_order
    );
    data_send.append("media", item.media);
    data_send.append("type", item.type);
    data_send.append("name", item.name);
    data_send.append("description", item.description);
    addItem(data_send).then((result) => {
      handleClose();
    });
  };

  const openFileManager = () => {
    let input = document.getElementById(`regular_item_add`);
    input.click();
  };

  const fileAccept = (e) => {
    setOpenMediaPreview(true);
    setItem({
      ...item,
      media: e.target.files[0],
    });
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        className="responsive_dashboard_modal"
        TransitionComponent={Transition}
      >
        <DialogTitle className="center">Nuevo Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            required={true}
            value={item.item_name}
            onChange={handleChange("item_name")}
          />
          <TextField
            margin="dense"
            name="description"
            label="Descripción"
            multiline
            required={true}
            value={item.item_description}
            onChange={handleChange("item_description")}
            style={{ marginTop: 30 }}
          />
          <TextField
            margin="dense"
            name="price"
            label="Precio"
            type="number"
            value={item.item_price}
            onChange={handleChange("item_price")}
            style={{ marginTop: 30 }}
          />
          <TextField
            margin="dense"
            name="order"
            label="Posición del ítem en el menú"
            type="number"
            value={item.item_order}
            onChange={handleChange("item_order")}
            style={{ marginTop: 30, marginBottom: 30 }}
          />
          <Row md={12} sm={12} xs={12}>
            <Col
              md={11}
              sm={11}
              xs={11}
              className={`left ${styles.reference_media}`}
            >
              <p>Imagen reprensetativa del ítem</p>
              <p
                className="delete_details"
                style={{ fontWeight: "300", fontSize: 13 }}
              >
                Te recomendamos que la imagen sea de entre 1100-1300px{" "}
                <span style={{ fontWeight: "700" }}>X</span> 800-1100px.
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
                <p className={styles.supports}>Formato: PNG, JPEG, JPG</p>
              </Col>
              <div style={{ height: 0, width: 0, overflow: "hidden" }}>
                <input
                  id={`regular_item_add`}
                  type="file"
                  name={`regular_item_add`}
                  accept="image/*"
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
                  key={item.media.name}
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
                        {item.media.name}
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
      <button id={styles.add_btn} title="Nuevo Item" onClick={handleOpen}>
        <img src="/icons/add.svg" alt="add" />
      </button>
    </>
  );
};

export default ModalAdd;
