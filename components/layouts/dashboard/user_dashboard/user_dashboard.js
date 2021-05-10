import React, { useLayoutEffect, useState, useEffect } from "react";

// Import Dependencias
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import Alert from "react-s-alert";
import { Row, Col } from "react-bootstrap";
import {
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  DialogContent,
  Link,
} from "@material-ui/core";
import { BoxLoading } from "react-loadingg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "../../loader/loader_skeleton";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Import de componentes
import api from "../../../../utils/config";
import {
  getProjects,
  addProject,
  deleteProject,
} from "../../../../utils/projects_crud";

import styles from "./user_dashboard.module.css";
import RestaurantItem from "../../../../components/projects/project_item/project_list";
import AddRestaurant from "../../../../components/projects/modals/modal_add";

// Import Redux
import { useDispatch } from "react-redux";
import { forcedLogout } from "../../../../redux/actions/userActions";

const container = {
  hidden: { opacity: 1, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const url = `${api.api_url}/project`;

const Userdashboard = () => {
  const [modal_delete, setModalDelete] = useState(false);
  const [loading_delete, setLoadingDelete] = useState(false);
  const [modalPremium, setModalPremium] = useState(false);
  const [delete_project_id, setDeleteProjectId] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();
  let { data, isValidating } = useSWR(url, (url) =>
    getProjects(url, user.user.auth_token).then((result) => {
      if (result.success == true) {
        return result.result;
      } else {
        if (result.unauthorized) {
          dispatch(forcedLogout()).then((status) => {
            if (status) {
              router.push("/login");
            }
          });
        }
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    })
  );

  useEffect(() => {
    let modal_premium = localStorage.getItem("modalPremium");
    if (modal_premium !== "false") {
      setModalPremium(true);
    }
  }, []);

  const handleCloseModalPremium = () => {
    setModalPremium(false);
    localStorage.setItem("modalPremium", "false");
  };

  const addRestaurant = async (restaurant) => {
    return await addProject(restaurant, user.user.auth_token).then((result) => {
      if (result.success) {
        router.push(`/dashboard/${result.result.id}/${result.result.name}`);
      } else {
        if (result.unauthorized) {
          dispatch(forcedLogout()).then((status) => {
            if (status) {
              router.push("/login");
            }
          });
        }
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    });
  };

  const deleteLocalProject = (project_id) => {
    setModalDelete(true);
    setDeleteProjectId(project_id);
  };

  const handleCloseDelete = () => {
    setModalDelete(false);
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    deleteProject(delete_project_id, user.user.auth_token).then((result) => {
      if (result.success) {
        setModalDelete(false);
        setLoadingDelete(false);
        Alert.success(result.result, {
          position: "bottom",
          effect: "stackslide",
        });
        mutate(url);
      } else {
        if (result.unauthorized) {
          dispatch(forcedLogout()).then((status) => {
            if (status) {
              router.push("/login");
            }
          });
        }
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    });
    mutate(url);
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
        {!loading_delete ? (
          <div style={{ position: "relative", top: "32%" }}>
            <DialogTitle className="center">¿Eliminar restaurante?</DialogTitle>
            <DialogContent>
              <p className="delete_details center" style={{ color: "#a9a9aa" }}>
                Recordá que al eliminar el restaurante, se eliminarán todos los
                menús que hayas creado para el mismo con sus ítems e imágenes!
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleDelete} color="primary">
                Eliminar
              </Button>
            </DialogActions>
          </div>
        ) : (
            <DialogContent>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ x: 100, opacity: 0 }}
              >
                {!fullScreen ? (
                  <Row md={12} sm={12} xs={12}>
                    <Col
                      md={11}
                      sm={11}
                      xs={11}
                      style={{ height: 300 }}
                      className="center"
                    >
                      <BoxLoading color="var(--pink)" />
                    </Col>
                  </Row>
                ) : (
                    <Row md={12} sm={12} xs={12}>
                      <Col
                        md={11}
                        sm={11}
                        xs={11}
                        style={{ height: "90vh" }}
                        className="center"
                      >
                        <BoxLoading color="var(--pink)" />
                      </Col>
                    </Row>
                  )}
              </motion.div>
            </DialogContent>
          )}
      </Dialog>

      {/* Vista */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <Row
          md={12}
          sm={12}
          xs={12}
          style={{ paddingLeft: 15, color: "var(--black)", width: "100%" }}
        >
          <Col
            md={12}
            sm={12}
            xs={12}
            className="center"
            style={{ marginTop: 50 }}
          >
            {modalPremium ? (
              <Dialog
                fullScreen={fullScreen}
                maxWidth="sm"
                open={modalPremium}
                onClose={handleCloseModalPremium}
                className="center responsive_dashboard_modal"
                TransitionComponent={Transition}
              >
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ x: 50, opacity: 0 }}
                >
                  <img
                    src="/icons/close.svg"
                    alt="cerrar"
                    className={styles.close_modal}
                    onClick={handleCloseModalPremium}
                  />
                  <DialogTitle>
                    <img src="/images/long_logo.svg" className={styles.modal_logo} />
                  </DialogTitle>
                  <DialogContent>
                    <div className={styles.container_modal_premium}>
                      <p>
                        ¡Bienvenido{" "}
                        <span
                          className={styles.title_modal_premium}
                        >{`${user.user.name}`}</span>
                        !
                      </p>
                      <p>
                        No te pierdas los beneficios de la cuenta{" "}
                        <span className={styles.title_modal_premium}>
                          PREMIUM
                        </span>
                      </p>
                    </div>


                    <Link href="/dashboard/subscriptions"  style={{textDecoration:'none'}}>
                      <Col
                        md={11}
                        sm={11}
                        xs={11}
                        title="¡Probá Premium!"
                        style={{
                          marginTop: 20,
                          marginLeft: "auto",
                          marginRight: "auto",
                          cursor: "pointer",
                        
                        }}
                      >
                        <a>

                          <Button
                            style={{ width: "90%", marginTop: 20, marginBottom: 20 }}
                            color="primary"
                            id={styles.button_premium}
                          >
                            Probar ahora
                    </Button>
                        </a>
                      </Col>
                    </Link>
                  </DialogContent>
                </motion.div>
              </Dialog>
            ) : (
                <div></div>
              )}
            <Row md={12} sm={12} xs={12}>
              <Col lg={6} md={6} sm={8} xs={9}>
                {!isValidating ? (
                  <p id={styles.title_name}>Restaurantes</p>
                ) : (
                    <div id={styles.updating_container}>
                      <CircularProgress
                        size={23}
                        className="updating"
                        color={"primary"}
                        id={styles.updating_spinner}
                      />
                      <span id={styles.updating_text}>Actualizando...</span>
                    </div>
                  )}
              </Col>
              <Col lg={6} md={6} sm={4} xs={3} className="center">
                <AddRestaurant addRestaurant={addRestaurant} />
              </Col>
            </Row>
          </Col>
          <Col
            md={12}
            sm={12}
            xs={12}
            className="center"
            style={{ marginTop: 20, paddingLeft: 0, paddingRight: 0 }}
          >
            <motion.div variants={container} initial="hidden" animate="visible">
              {data === undefined ? (
                <Col
                  md={11}
                  sm={11}
                  xs={11}
                  className="center"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  <Loader />
                </Col>
              ) : (data || []).length === 0 ? (
                <>
                  <Row md={12} sm={12} xs={12}>
                    <Col lg={12} md={12} sm={12} xs={12} className="center">
                      <p className="default_text">
                        No hay restaurantes creados todavia. Creá uno!
                      </p>
                    </Col>
                  </Row>
                </>
              ) : (
                    (data || []).map((project) => (
                      <motion.div variants={item} key={project.id}>
                        <RestaurantItem
                          key={project.id}
                          project={project}
                          deleteLocalProject={deleteLocalProject}
                        />
                      </motion.div>
                    ))
                  )}
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </>
  );
};

export default Userdashboard;
