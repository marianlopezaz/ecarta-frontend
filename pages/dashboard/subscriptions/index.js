import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import useSWR from "swr";
import Alert from "react-s-alert";
import api from "../../../utils/config";
import Loader from "../../../components/layouts/loader/loader_cards";

//Styles
import styles from "./subscriptions.module.css";

//Components
import { Small_subscription_item } from "../../../components/subscriptions/subscription_item/small_subscription_item";
import { addNewSubscriptor } from "../../../utils/subscriptors_crud";
import { useRouter } from "next/router";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { forcedLogout } from "../../../redux/actions/userActions";
import { getSubscription } from "../../../utils/subscription_crud";
import { SubscriptionHandler } from "../../../utils/subscriptions_handler";

const url = `${api.api_url}/subscription`;

const Subscriptions = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store) => store.user);

  const [subscription, setSubscription] = useState(null);
  const [subscriptionType, setSubscriptionType] = useState(null);

  SubscriptionHandler().then((result) => {
    if (result !== undefined) {
      setSubscriptionType(result.suscription.role);
      setSubscription(result);
    }
  });

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

  let { data } = useSWR(url, (url) =>
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

  const handleSubscriptionClick = async (subscription_id) => {
    return await addNewSubscriptor(subscription_id, user.user.auth_token).then(
      (result) => {
        if (result.success == true) {
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
            <Row style={{ marginTop: "50px" }}>
              <p id={styles.title}>Suscripciones disponibles</p>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <p id={styles.subtitle}>¡Seleccioná una para continuar!</p>
            </Row>
            <motion.div variants={container} initial="hidden" animate="visible">
              {data === undefined ? (
                <Col
                  md={12}
                  sm={12}
                  xs={12}
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
                      No hay suscripciones disponibles todavía!
                    </p>
                  </Col>
                </>
              ) : (
                <Row lg={12} md={12} sm={12} xs={12}>
                  <Col md={12} sm={12} xs={12}>
                    <>
                      {(data || []).map((subscription) =>
                        subscription.role === "Free" ? null : (
                          <motion.div
                            variants={item}
                            key={subscription.id}
                            className={styles.subscription_container}
                          >
                            <Small_subscription_item
                              subscription={subscription}
                              handleSubscriptionClick={handleSubscriptionClick}
                            />
                          </motion.div>
                        )
                      )}
                    </>
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

export default Subscriptions;
