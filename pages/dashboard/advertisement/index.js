import React, { useLayoutEffect } from "react";

// Import Dependencias
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import Alert from "react-s-alert";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import de componentes
import styles from "./styles.module.css";
import api from "../../../utils/config";
import {
  getAdvertisements,
  createAdvertisement,
  deleteAdvertisement,
  editAdvertisement,
} from "../../../utils/advertisement_crud";
import AddAdvertisement from "../../../components/advertisements/modal_add/modal_add";
import Loader from "../../../components/layouts/loader/loader_cards";
import AdvertisementItem from "../../../components/advertisements/advertisement_item/advertisement_item";

// Import Redux
import { useDispatch } from "react-redux";
import { forcedLogout } from "../../../redux/actions/userActions";

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
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

const url = `${api.api_url}/advertisement`;

const Anuncios = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();
  let { data, isValidating } = useSWR(url, (url) =>
    getAdvertisements(url, user.user.auth_token).then((result) => {
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

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
  }, []);

  const handleAddAdvertisement = async (data_send) => {
    return await createAdvertisement(data_send, user.user.auth_token).then(
      (result) => {
        if (result.success) {
          Alert.success("Anuncio agregado correctamente!", {
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
      }
    );
  };

  const handleDeleteAdvertisement = (advertisement_id) => {
    deleteAdvertisement(advertisement_id, user.user.auth_token).then(
      (result) => {
        if (result.success) {
          Alert.success("Anuncio eliminado correctamente!", {
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
      }
    );
    mutate(url);
  };

  const handleEditAdvertisement = (data) => {
    editAdvertisement(data, user.user.auth_token).then((result) => {
      if (result.success) {
        Alert.success("Anuncio editado correctamente!", {
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
          style={{
            paddingLeft: 15,
            color: "var(--black)",
            width: "100%",
          }}
        >
          <Col
            md={12}
            sm={12}
            xs={12}
            className="center"
            style={{ marginTop: 50 }}
          >
            <Row md={12} sm={12} xs={12}>
              <Col lg={6} md={6} sm={8} xs={9} className="center">
                {!isValidating ? (
                  <p id={styles.title_name}>ANUNCIOS</p>
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
                <AddAdvertisement addAdvertisement={handleAddAdvertisement} />
              </Col>
            </Row>
          </Col>
          <Col
            md={12}
            sm={12}
            xs={12}
            className="center"
            style={{ marginTop: 30, paddingLeft: 0, paddingRight: 0 }}
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
              ) : (data.medias || []).length === 0 ? (
                <>
                  <Col lg={12} md={12} sm={12} xs={12} className="center">
                    <p className="default_text">
                      No hay anuncios creados todavia. Creá uno!
                    </p>
                  </Col>
                </>
              ) : (
                <Row>
                  <Col
                    md={12}
                    sm={12}
                    xs={12}
                    className="center"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    <div className={styles.advertisements_container}>
                      {(data.medias || []).map((advertisement) => (
                        <motion.div
                          variants={item}
                          key={advertisement.id}
                          className={styles.advertisement_container}
                        >
                          <AdvertisementItem
                            advertisement={advertisement}
                            handleDeleteAdvertisement={
                              handleDeleteAdvertisement
                            }
                            handleEditAdvertisement={handleEditAdvertisement}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </Col>
                </Row>
              )}
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </>
  );
};

export default Anuncios;
