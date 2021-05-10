import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import Alert from "react-s-alert";

import styles from "./small_subscription_item.module.css";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { BabelLoading } from "react-loadingg";
import { selectSubscription } from "../../../redux/actions/subscriptionActions";
import ModalErrorSubscription from "../modals/modal_error_subscription";

export const Small_subscription_item = (props) => {
  let subscription = props.subscription;
  let handleSubscriptionClick = props.handleSubscriptionClick;
  let handleUnsubscribeClick = props.handleUnsubscribeClick;
  let item = props.subscription.description;
  let selectionable = props.selectionable;
  let statusView = props.statusView;

  const [modalErrorSubscription, setModalErrorSubscription] = useState(false);
  const [confirmUnsubscribe, setConfirmUnsubscribe] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [errorTypeSubscription, setErrorTypeSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const selected_subscription = useSelector(
    (store) => store.smallSubscriptions
  );

  const handleIconClick = async () => {
    setLoading(true);
    return await handleSubscriptionClick(subscription.id).then((result) => {
      setLoading(false);
      setData(result.result);
      if (result.success) {
        window.location.href = result.result.sourceUrl;
      } else {
        if (result.result) {
          setErrorTypeSubscription(result.result.status);
          setCurrentSubscription(result.result);
          setModalErrorSubscription(true);
        }
      }
    });
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    return await handleUnsubscribeClick(subscription.id).then((result) => {
      setLoading(false);
      setData(null);
      setConfirmUnsubscribe(false);
      if (result.success) {
        Alert.success(result.result, {
          position: "bottom",
          effect: "stackslide",
        });
      } else {
        Alert.success("Ocurrió un error al dar de baja la suscripción", {
          position: "bottom",
          effect: "stackslide",
        });
      }
    });
  };

  const handleUnsubscribeModal = () => {
    setConfirmUnsubscribe(true);
  };

  const handleCloseErrorModal = () => {
    setModalErrorSubscription(false);
  };

  const handleCloseUnsubscribe = () => {
    setConfirmUnsubscribe(false);
  };

  return (
    <>
      {modalErrorSubscription ? (
        <ModalErrorSubscription
          errorType={errorTypeSubscription}
          currentSubscription={currentSubscription}
          handleCloseErrorModal={handleCloseErrorModal}
        />
      ) : null}

      {confirmUnsubscribe ? (
        <Dialog
          fullScreen={fullScreen}
          maxWidth="sm"
          open={confirmUnsubscribe}
          onClose={handleCloseUnsubscribe}
          className="center responsive_dashboard_modal"
        >
          <DialogTitle>
            <img src="/icons/error.svg" id={styles.unsubscribe_img} />
            <p style={{ fontWeight: "bold" }}>
              ¿Seguro que deseas darte de baja?
            </p>
          </DialogTitle>
          <DialogContent>
            <p>
              Te recordamos que una vez realizada esta acción volverás a ser
              usuario <span style={{ fontWeight: "bold" }}>Free </span>
              inmediatamente aunque tu suscripción no haya vencido!
            </p>
          </DialogContent>
          <DialogActions style={fullScreen ? { marginTop: "10px" } : null}>
            {loading ? (
              <BabelLoading
                color="black"
                size="small"
                style={{ margin: "0 auto", marginBottom: "20px" }}
              />
            ) : (
              <>
                <Button color="secondary" onClick={handleCloseUnsubscribe}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={handleUnsubscribe}>
                  Continuar
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      ) : null}

      <Row
        md={12}
        sm={12}
        xs={12}
        onClick={() => dispatch(selectSubscription(subscription.id))}
      >
        <Col className={styles.responsive_container} md={12} sm={12} xs={12}>
          <div
            className={styles.subscription_cards}
            style={
              selected_subscription.idSubscription == subscription.id &&
              selectionable !== false
                ? { border: "solid 3px", borderColor: "#9bb2c7" }
                : subscription.role === "Premium"
                ? {
                    border: "solid 3px",
                    borderColor: "var(--pink)",
                    cursor: "pointer",
                  }
                : { cursor: "default" }
            }
          >
            <Row md={12} sm={12} xs={12}>
              <Col md={12} sm={12} xs={12}>
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <span className={styles.subscription_name}>
                      {subscription.name}
                    </span>
                    {props.user_subscription ? (
                      <p>
                        <span
                          style={{
                            color: "var(--pink)",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                        >
                          {props.user_subscription.status.replace(/_/g, " ")}
                        </span>
                      </p>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Row
                md={12}
                sm={12}
                xs={12}
                style={
                  !statusView ? { minHeight: "198px" } : { minHeight: "158px" }
                }
              >
                <Col md={12} sm={12} xs={12} className="left">
                  <p className={styles.subscription_total_price}>
                    <span className={styles.subscription_dollar}>$</span>{" "}
                    <span className={styles.subscription_price}>
                      {subscription.total}
                    </span>{" "}
                    /mes
                  </p>
                  <ul className={styles.subscription_list}>
                    {typeof item == "object"
                      ? item.map(function (description, i) {
                          return <li key={i}> {description} </li>;
                        })
                      : null}
                  </ul>
                </Col>
              </Row>
              <Row
                md={12}
                sm={12}
                xs={12}
                style={{ display: "block", width: "100%", margin: "0 auto" }}
              >
                {(selected_subscription.idSubscription == subscription.id &&
                  selectionable !== false) ||
                statusView == true ? (
                  <motion.div
                    initial={{ scale: 0.25, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                  >
                    <Row
                      className={
                        subscription.role !== "Free"
                          ? styles.continue_button
                          : null
                      }
                      style={
                        statusView && subscription.role !== "Free"
                          ? { backgroundColor: "var(--pink)" }
                          : null
                      }
                    >
                      {!loading ? (
                        statusView && subscription.role !== "Free" ? (
                          <Button onClick={handleUnsubscribeModal}>
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "10px",
                                marginTop: "12px",
                              }}
                            >
                              Dar de Baja
                            </span>
                          </Button>
                        ) : subscription.role !== "Free" ? (
                          <Button onClick={handleIconClick}>
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "10px",
                                marginTop: "12px",
                              }}
                            >
                              Seleccionar
                            </span>
                          </Button>
                        ) : null
                      ) : (
                        <BabelLoading
                          color="white"
                          size="small"
                          style={{ marginTop: "10px", marginLeft: "50%" }}
                        />
                      )}
                    </Row>
                  </motion.div>
                ) : null}
              </Row>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};
