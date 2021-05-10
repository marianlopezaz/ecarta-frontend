import React, { useState } from "react";

// Import dependecias
import { Row, Col } from "react-bootstrap";
import { Button, DialogTitle, DialogActions, Dialog, DialogContent } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// Import componentes
import styles from "./styles.module.css";
import Link from "next/link";

const MenuItem = ({ menu, project, deleteMenu }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [modal_delete, setModalDelete] = useState(false);

  const deleteLocalProject = (menu_id) => {
    deleteMenu(menu_id);
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
        <div style={{ position: "relative", top: "32%" }}>
          <DialogTitle className="center">¿Eliminar menú?</DialogTitle>
          <DialogContent>
            <p className="delete_details center" style={{ color: "#a9a9aa" }}>
              Recordá que al eliminar el menú, se eliminarán todos los
              ítem que hayas creado para el mismo con sus imágenes!
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={deleteLocalProject.bind(this, menu.id)}
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
            <Link
              href="/dashboard/[project_id]/[project_name]/[menu_id]/[menu_name]"
              as={`/dashboard/${project.id}/${project.name}/${menu.id}/${menu.name}`}
            >
              <Col
                md={8}
                sm={8}
                xs={7}
                className={`left ${styles.left_col}`}
                style={{ position: "relative", bottom: 5, cursor: "pointer" }}
              >
                <Row md={12} sm={12} xs={12}>
                  <Col md={12} sm={12} xs={12}>
                    <p className={styles.menu_name}>{menu.name}</p>
                  </Col>
                </Row>
              </Col>
            </Link>
            <Col md={4} sm={4} xs={5} className={`right ${styles.right_col}`}>
              <Row md={12} sm={12} xs={12}>
                <Link
                  href="/dashboard/[project_id]/[project_name]/[menu_id]/[menu_name]"
                  as={`/dashboard/${project.id}/${project.name}/${menu.id}/${menu.name}`}
                >
                  <Col
                    md={12}
                    sm={12}
                    xs={6}
                    id={styles.inner_top_col}
                    className="center"
                  >
                    <a
                      className={styles.actions_container}
                      title="Ver Detalles"
                    >
                      <img src="/icons/details.svg" alt="delete" />
                      <span>Detalles</span>
                    </a>
                  </Col>
                </Link>
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
                    title="Eliminar Menú"
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

export default MenuItem;
