import React, { useState } from "react";

// Import componentes
import styles from "./styles.module.css";
import EditAdvertisement from "../modal_edit/modal_edit";

// Import dependencias
import { Row, Col } from "react-bootstrap";
import {
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const AdvertisementItem = ({
  advertisement,
  handleDeleteAdvertisement,
  handleEditAdvertisement,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [modal_delete, setModalDelete] = useState(false);

  const deleteLocalAdvertisement = (item_id) => {
    handleDeleteAdvertisement(item_id);
    setModalDelete(false);
  };

  const handleCloseDelete = () => {
    setModalDelete(false);
  };

  return (
    <>
      {/* Modale Delete */}
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={modal_delete}
        onClose={handleCloseDelete}
      >
        <div style={{ position: "relative", top: "33%" }}>
          <DialogTitle className="center">¿Eliminar anuncio?</DialogTitle>
          <DialogContent>
            <p className="delete_details center" style={{ color: "#a9a9aa" }}>
              Recordá que siempre podes agregar uno nuevo!
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={deleteLocalAdvertisement.bind(
                this,
                advertisement.media_id
              )}
              color="primary"
            >
              Eliminar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      {/* Vsta */}
      <Row md={12} sm={12} xs={12}>
        <Col md={10} sm={10} xs={10} className={styles.media_container}>
          {advertisement.media_type === "video" ? (
            <video
              src={advertisement.url_regular}
              autoPlay
              muted
              loop
              controls={true}
              playsInline
              alt="video"
              type="video/mp4"
            />
          ) : (
            <img src={advertisement.url_regular} alt="photo" />
          )}
        </Col>
        <Col
          md={12}
          sm={12}
          xs={12}
          style={{ marginRight: "auto", marginLeft: "auto", marginTop: 10 }}
        >
          <Row md={12} sm={12} xs={12}>
            <Col md={7} sm={7} xs={7}>
              <p className={styles.advertisement_name}>{advertisement.name}</p>
              <p className={styles.advertisement_time}>
                <img src="/icons/duration.svg" /> {advertisement.time} seg
              </p>
            </Col>
            <Col md={5} sm={5} xs={5}>
              <EditAdvertisement
                editAdvertisement={handleEditAdvertisement}
                advertisement_edit={advertisement}
              />
              <div
                title="Eliminar Anuncio"
                className={styles.delete_icon_container}
                onClick={() => {
                  setModalDelete(true);
                }}
              >
                <img src="/icons/delete_img.svg" alt="done" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AdvertisementItem;
