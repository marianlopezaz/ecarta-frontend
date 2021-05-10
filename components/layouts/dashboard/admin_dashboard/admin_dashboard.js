import React, { useState } from "react";

// Import Dependencias
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import Alert from "react-s-alert";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";

// Import de componentes
import api from "../../../../utils/config";
import Loader from "../../loader/loader_cards";

import {
  getSubscription,
  addNewSubscription,
  editSubscription,
  deleteSubscription,
} from "../../../../utils/subscription_crud";

//Styles
import styles from "./admin_dashboard.module.css";

// Import Redux
import { useDispatch } from "react-redux";
import { forcedLogout } from "../../../../redux/actions/userActions";
import ModalAddSubscription from "../../../subscriptions/modals/modal_add";
import { Subscription_item } from "../../../subscriptions/subscription_item/subscription_item";
import * as types from "../../../../redux/types";
import {
  noloadingNewSubscription,
  loadingNewSubscription,
} from "../../../../redux/actions/subscriptionActions";

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

const url = `${api.api_url}/subscription`;

export const Admindashboard = () => {
  const [loadingAction, setLoadingAction] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();
  let { data, isValidating } = useSWR(url, (url) =>
    getSubscription(url, user.user.auth_token).then((result) => {
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

  const addSubscription = (subscription) => {
    mutate(url, [...data, subscription], false);
    dispatch(loadingNewSubscription());
    addNewSubscription(subscription, user.user.auth_token).then((result) => {
      dispatch(noloadingNewSubscription());
      if (result.success) {
        Alert.success("Suscripción añadida correctamente", {
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

  const handleEditSuscription = (subscription) => {
    dispatch({
      type: types.LOADING_SUBSCRIPTION,
      payload: subscription.id,
    });
    editSubscription(subscription, user.user.auth_token).then((result) => {
      setLoadingAction(false);
      dispatch({ type: types.NO_LOADING_SUBSCRIPTION });
      if (result.success) {
        Alert.success("Suscriptión editada con éxito", {
          position: "bottom",
          effect: "stackslide",
        });
        mutate(url);
      } else {
        setLoadingAction(false);
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

  const handleDeleteSubscription = (subscription) => {
    dispatch({
      type: types.LOADING_SUBSCRIPTION,
      payload: subscription.index,
    });
    deleteSubscription(subscription.id, user.user.auth_token)
      .then((result) => {
        setLoadingAction(false);
        dispatch({ type: types.NO_LOADING_SUBSCRIPTION });
        if (result.success) {
          Alert.success("Suscripción eliminada correctamente", {
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
      })
      .catch((e) => {
        setLoadingAction(false);
        dispatch({ type: types.NO_LOADING_SUBSCRIPTION });
      });
    mutate(url);
  };

  return (
    <>
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
            <Row md={12} sm={12} xs={12}>
              <Col lg={6} md={6} sm={8} xs={9} className="center">
                {!isValidating ? (
                  <p id={styles.title_name}>SUSCRIPCIONES</p>
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
                <ModalAddSubscription addSubscription={addSubscription} />
              </Col>
            </Row>
          </Col>
          <Col md={12} sm={12} xs={12} className="center">
            <motion.div variants={container} initial="hidden" animate="visible">
              {data === undefined ? (
                <Col
                  md={11}
                  sm={11}
                  xs={11}
                  className="center"
                  style={{
                    marginTop: 40,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Loader />
                </Col>
              ) : (data || []).length === 0 ? (
                <>
                  <Col lg={12} md={12} sm={12} xs={12} className="center">
                    <p className="default_text">
                      No hay suscripciones creadas todavia. Creá una!
                    </p>
                  </Col>
                </>
              ) : (
                <Row lg={12} md={12} sm={12} xs={12}>
                  <Col
                    md={12}
                    sm={12}
                    xs={12}
                    className="center"
                    style={{
                      marginTop: 20,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <div className={styles.subscriptions_container}>
                      {(data || []).map((subscription) => (
                        <motion.div
                          variants={item}
                          key={subscription.id}
                          className={styles.subscription_container}
                        >
                          <Subscription_item
                            subscription={subscription}
                            editable={true}
                            loadingAction={loadingAction}
                            editSubscription={handleEditSuscription}
                            deleteSubscription={handleDeleteSubscription}
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
