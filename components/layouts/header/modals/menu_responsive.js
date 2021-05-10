import { motion } from "framer-motion";
import styles from "../header.module.css";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { User } from "../../../icons";
import { useState, useEffect } from "react";
import { SubscriptionHandler } from "../../../../utils/subscriptions_handler";
import moment from "moment";

const MenuResponsive = ({
  user,
  hadleOpenUserProfile,
  handleSignOut,
  handleCloseMenu,
}) => {
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  if (user.role !== "admin") {
    SubscriptionHandler().then((result) => {
      if (result !== undefined) {
        setSubscriptionType(result.suscription.role);
        setSubscription(result);
      }
    });
  }

  useEffect(() => {
    if (subscriptionType === "Premium") {
      let interval = subscription.suscription.interval.split("");
      switch (interval[1]) {
        case "d":
          let days = moment(subscription.user_suscription.updated_at)
            .add(interval[0], "days")
            .format("DD-MM-YYYY");
          setRemainingTime(days);
          break;

        case "m":
          let months = moment(subscription.user_suscription.updated_at)
            .add(interval[0], "month")
            .format("DD-MM-YYYY");
          setRemainingTime(months);
          break;

        case "y":
          let years = moment(subscription.user_suscription.updated_at)
            .add(interval[0], "years")
            .format("DD-MM-YYYY");
          setRemainingTime(years);
          break;

        default:
          break;
      }
    }
  }, [subscription]);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ x: -100, opacity: 0 }}
    >
      <Row md={12} sm={12} xs={12}>
        <Col
          onClick={hadleOpenUserProfile}
          style={{ cursor: "pointer" }}
          md={11}
          sm={11}
          xs={11}
          className={styles.menu_card}
        >
          <div
            style={{
              display: "inline-block",
              position: "relative",
              top: -10,
            }}
          >
            <User classes={styles.svg} />
          </div>
          <div
            style={{
              display: "inline-block",
              position: "relative",
              left: 15,
              top: 2,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "700",
                  textTransform: "capitalize",
                  marginBottom: 0,
                }}
              >{`${user.name} ${user.surname}`}</p>
            </div>
            {user.role === "user" ? (
              <>
                {subscriptionType === "Free" ? (
                  <div>
                    <p id={styles.subscription_details}>
                      <span id={styles.license}>Sin licencia</span>{" "}
                      <span>- Funciones restringidas - </span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p id={styles.license_date}>
                      Fecha de vencimiento licencia {remainingTime}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: "block", fontSize: "15px" }}>
                <span id={styles.role_name}>{user.role}</span>
              </div>
            )}
          </div>
        </Col>
        {user.role === "user" && subscriptionType === "Free" ? (
          <Link href="/dashboard/subscriptions">
            <Col
              md={11}
              sm={11}
              xs={11}
              onClick={handleCloseMenu}
              title="¡Probá Premium!"
              style={{
                marginTop: 20,
                marginLeft: "auto",
                marginRight: "auto",
                cursor: "pointer",
              }}
            >
              <p id={styles.premium_details}>
                <a
                  id={styles.premium_link}
                  title="¡Probá Premium!"
                  onClick={handleCloseMenu}
                >
                  {" "}
                  ¡Probá Premium!
                </a>
              </p>
            </Col>
          </Link>
        ) : null}
        {user.role === "user" && subscriptionType === "Premium" ? (
          <Link href="/dashboard/subscriptions/status">
            <Col
              md={11}
              sm={11}
              xs={11}
              onClick={handleCloseMenu}
              title="Ver detalles del plan"
              style={{
                marginTop: 20,
                marginLeft: "auto",
                marginRight: "auto",
                cursor: "pointer",
              }}
            >
              <p id={styles.premium_details}>
                <a
                  id={styles.premium_link}
                  title="¡Probá Premium!"
                  onClick={handleCloseMenu}
                >
                  {" "}
                  Ver detalles del plan
                </a>
              </p>
            </Col>
          </Link>
        ) : null}
        <Col md={11} sm={11} xs={11} className={styles.navigation_reference}>
          <p>Navegación</p>
        </Col>
        {user.role === "user" ? (
          <Link href="/dashboard">
            <Col
              md={11}
              sm={11}
              xs={11}
              className={styles.menu_card}
              onClick={handleCloseMenu}
              style={{ marginTop: 20 }}
            >
              <a>Restaurantes</a>
            </Col>
          </Link>
        ) : (
          <>
            <Link href="/dashboard">
              <Col
                md={11}
                sm={11}
                xs={11}
                className={styles.menu_card}
                onClick={handleCloseMenu}
                style={{ marginTop: 20 }}
              >
                <a>Suscripciones</a>
              </Col>
            </Link>
            <Link href="/dashboard/advertisement">
              <Col
                md={11}
                sm={11}
                xs={11}
                className={styles.menu_card}
                onClick={handleCloseMenu}
                style={{ marginTop: 20 }}
              >
                <a>Anuncios</a>
              </Col>
            </Link>
            <Link href="/dashboard/clients">
              <Col
                md={11}
                sm={11}
                xs={11}
                className={styles.menu_card}
                onClick={handleCloseMenu}
                style={{ marginTop: 20 }}
              >
                <a>Clientes</a>
              </Col>
            </Link>
          </>
        )}
        <div style={{ position: "absolute", bottom: 20, left: 35 }}>
          <div>
            <Link href="/">
              <a style={{ cursor: "pointer", color: "var(--black)" }}>
                <img
                  src="/icons/home.svg"
                  alt="logout"
                  className={styles.logout_icon}
                />
                <p className={styles.logout_text}>Inicio</p>
              </a>
            </Link>
          </div>
          <div>
            <button
              style={{
                border: "none",
                background: "none",
                position: "relative",
                right: 12,
              }}
              onClick={handleSignOut}
            >
              <img
                src="/icons/logout.svg"
                alt="logout"
                className={styles.logout_icon}
              />
              <p className={styles.logout_text}>Cerrar Sesión</p>
            </button>
          </div>
        </div>
      </Row>
    </motion.div>
  );
};

export default MenuResponsive;
