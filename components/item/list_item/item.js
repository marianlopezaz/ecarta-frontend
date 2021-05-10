import React, { useState } from "react";

// Import dependecias
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

// Import componentes
import styles from "./styles.module.css";
import EditItem from '../modal_edit/modal_edit';

const Item = ({ editItem, item, deleteItem }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [modal_delete, setModalDelete] = useState(false);

  const deleteLocalItem = (item_id) => {
    deleteItem(item_id);
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
          <DialogTitle className="center">¿Eliminar ítem?</DialogTitle>
          <DialogContent>
            <p className="delete_details center" style={{ color: "#a9a9aa" }}>
              Recordá que al eliminar un ítem, se eliminarán todas sus imágenes
              asociadas!
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={deleteLocalItem.bind(this, item.id)}
              color="primary"
            >
              Eliminar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      {/* Vista */}
      <Row md={12} sm={12} xs={12}>
        <Col lg={12} md={12} sm={12} xs={12} className={styles.menu_card}>
          <Row md={12} sm={12} xs={12}>
            <Col
              md={8}
              sm={8}
              xs={7}
              className={`left ${styles.left_col}`}
              style={{ position: "relative", bottom: 5 }}
            >
              <Row md={12} sm={12} xs={12}>
                {item.media.length > 0 ? (
                  <>
                    <Col md={2} sm={2} xs={3} className='center'>
                      <img
                        src={item.media[0].url_regular}
                        className={styles.item_media_img}
                      />
                    </Col>
                    <Col md={10} sm={10} xs={9}>
                      <p className={styles.menu_name}>{item.name}</p>
                      <p className={styles.menu_description}>
                        {item.description}
                      </p>
                    </Col>
                  </>
                ) : (
                  <Col md={12} sm={12} xs={12}>
                    <p className={styles.menu_name}>{item.name}</p>
                    <p className={styles.menu_description}>
                      {item.description}
                    </p>
                  </Col>
                )}
              </Row>
            </Col>
            <Col md={4} sm={4} xs={5} className={`right ${styles.right_col}`}>
              <Row md={12} sm={12} xs={12}>
                <Col
                  md={12}
                  sm={12}
                  xs={6}
                  id={styles.inner_top_col}
                  className="center"
                >
                  <EditItem reference_item={item} editItem={editItem} />
                </Col>
                <Col
                  md={12}
                  sm={12}
                  xs={6}
                  id={styles.inner_bottom_col}
                  className="center"
                  onClick={() => setModalDelete(true)}
                >
                  <button
                    className={styles.actions_container}
                    onClick={() => setModalDelete(true)}
                    title="Eliminar Ítem"
                  >
                    <img src="/icons/delete_item.svg" alt="delete" />
                    <span>Eliminar</span>
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Item;
