import React, { useLayoutEffect, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import useSWR from "swr";
import Alert from "react-s-alert";
import api from "../../../utils/config";
import Loader from "../../../components/layouts/loader/loader_cards";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

//Styles
import styles from "./subscriptions.module.css";

//Components
import { Small_subscription_item } from "../../../components/subscriptions/subscription_item/small_subscription_item";
import { useRouter } from "next/router";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { forcedLogout } from "../../../redux/actions/userActions";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Slide,
  Button,
} from "@material-ui/core";
import { SubscriptionHandler } from "../../../utils/subscriptions_handler";
import { suspendSubscriptor } from "../../../utils/subscriptors_crud";

const url = `${api.api_url}/subscription`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SubscriptionStatus = () => {
  const url = `${api.api_url}/subscription`;

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store) => store.user);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [modalOpen, setModalOpen] = useState(false);

  const item = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

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

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
  }, []);

  //LLAMAR ACÁ LA SUSCRIPCIÓN ACTIVA CUANDO ESTE EL ENDPOINT

  const [subscription, setSubscription] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  SubscriptionHandler().then((result) => {
    if (result !== undefined) {
      setSubscriptionStatus(result.user_suscription.status);
      setSubscription(result);
    }
  });

  useEffect(() => {
    if (subscriptionStatus === "pendiente_de_pago") {
      setModalOpen(true);
    }
  }, [subscriptionStatus]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUnsubscribeClick = async (subscription_id) => {
    return await suspendSubscriptor(subscription_id, user.user.auth_token).then(
      (result) => {
        if (result.success == true) {
          router.push("/dashboard/subscriptions/status");
          return result;
        } else {
          if (result.unauthorized) {
            dispatch(forcedLogout()).then((status) => {
              if (status) {
                router.push("/login");
              }
            });
          }

          if (result.result.message) {
            Alert.error(result.result.message, {
              position: "bottom",
              effect: "stackslide",
            });
          }

          return result;
        }
      }
    );
  };

  return (
    <>
      {
        <Dialog
          fullScreen={fullScreen}
          maxWidth="sm"
          open={modalOpen}
          className="center responsive_dashboard_modal"
          TransitionComponent={Transition}
        >
          <DialogTitle>
            <img src="/icons/done.svg" id={styles.tick_img_id} />
            <p
              className={styles.modal_paragraph}
              style={{ fontWeight: "bold" }}
            >
              Tu pago está siendo procesado
            </p>
          </DialogTitle>
          <DialogContent>
            <p className={styles.modal_paragraph}>
              En unos minutos podrás disfrutar de tus beneficios{" "}
              <span style={{ fontWeight: "bold" }}>PREMIUM</span>.
            </p>
            <p>
              <i style={{ fontSize: "12px" }}>
                Por cualquier consulta comuncarse con:{" "}
                <a href="mailto:ventas@e-cartaqr.com" target="_blank">
                  ventas@e-cartaqr.com
                </a>
              </i>
            </p>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              style={
                !fullScreen
                  ? {
                      marginRight: "41%",
                      marginTop: "30px",
                      marginBottom: "10px",
                    }
                  : null
              }
              onClick={handleCloseModal}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      }
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
          <Col md={12} sm={12} xs={12} className="center">
            <motion.div variants={container} initial="hidden" animate="visible">
              {subscription === undefined || subscription === null ? (
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
              ) : (
                <Row
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ marginTop: "30px" }}
                >
                  <Col style={{ marginTop: "20px" }} md={12} sm={12} xs={12}>
                    <p id={styles.title}>Suscripción actual</p>
                    <div
                      className={styles.subscriptions_container}
                      style={{ display: "inline-block" }}
                    >
                      <motion.div
                        variants={item}
                        className={styles.subscription_status_container}
                      >
                        <Small_subscription_item
                          subscription={subscription.suscription}
                          user_subscription={subscription.user_suscription}
                          handleUnsubscribeClick={handleUnsubscribeClick}
                          selectionable={false}
                          statusView={true}
                        />
                      </motion.div>
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

export default SubscriptionStatus;
