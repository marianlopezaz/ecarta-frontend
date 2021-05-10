import styles from "./user_preview.module.css";
import { Row, Col } from "react-bootstrap";
import { User } from "../../../icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { SubscriptionHandler } from "../../../../utils/subscriptions_handler";
import { useState, useEffect } from "react";
import moment from 'moment'


const MenuDesktop = ({
  user,
  handleSignOut,
  hadleOpenUserProfile,
  handleCloseMenu,
}) => {

  const [subscription, setSubscription] = useState(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)
  const [subscriptionType, setSubscriptionType] = useState(null)
  const [remainingTime, setRemainingTime] = useState(null)

if(user.role !== "admin"){
  SubscriptionHandler().then((result) => {
    if (result !== undefined) {
      setSubscriptionType(result.suscription.role)
      setSubscription(result)
    }
  });
}
  

  useEffect(() => {
    if (subscriptionType === "Premium") {
      let interval = subscription.suscription.interval.split("")
      switch (interval[1]) {
        case "d":
          let days = moment(subscription.user_suscription.updated_at).add(interval[0], "days").format('DD-MM-YYYY')
          setRemainingTime(days)
          break;

        case "m":
          let months = moment(subscription.user_suscription.updated_at).add(interval[0], "month").format('DD-MM-YYYY')
          setRemainingTime(months)
          break;

        case "y":
          let years = moment(subscription.user_suscription.updated_at).add(interval[0], "years").format('DD-MM-YYYY')
          setRemainingTime(years)
          break;

        default:
          break;
      }

      setSubscriptionStatus(subscription.user_suscription.status.replace(/_/g, " "))

    }
  }, [subscription])

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ x: -100, opacity: 0 }}
    >

      <Row md={12} sm={12} xs={12}>
        <Col
          md={11}
          sm={11}
          xs={11}
          className={styles.menu_card}
          onClick={hadleOpenUserProfile}
          title="Ver Perfil"
          style={{ marginTop: 70, cursor: "pointer" }}
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
                {subscriptionType === "Free" ?
                  <div>
                    <p id={styles.subscription_details}>
                      <span id={styles.license}>Sin licencia</span>{" "}
                      <span>
                        - Algunas características no estarán disponibles -{" "}
                      </span>
                    </p>
                  </div>
                  :
                  <div>
                    <p id={styles.license_date}>Fecha de vencimiento licencia: {remainingTime}</p>
                  </div>
                }
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
          <>
            <Col
              md={11}
              sm={11}
              xs={11}
              style={{
                marginTop: 20,
                marginLeft: "auto",
                marginRight: "auto",
                cursor: "pointer",
              }}
            >
              <p id={styles.plan_details}>Detalles del plan</p>
            </Col>
            <Link href="/dashboard/subscriptions/status">
              <Col
                md={11}
                sm={11}
                xs={11}
                title="Ver detalles del plan"
                onClick={handleCloseMenu}
                className={styles.menu_card}
                style={{
                  marginTop: 0,
                  padding: 15,
                  cursor: "pointer",
                }}
              >
                {

                  (subscription !== null) ?

                  <>
                    <p style={{margin:'0 auto', fontWeight:'bold',textTransform: 'capitalize'}}>
                      <span id={styles.plan_details_role}>
                        {subscription.suscription.role}
                      </span>
                      <span style={{ color: 'var(--pink)'}}> - {subscriptionStatus}</span>
                    </p>
                    
                    </>
                    : null
                }

              </Col>
            </Link>
          </>
        ) : null}
        <Col
          md={11}
          sm={11}
          xs={11}
          className={styles.menu_card}
          style={{
            marginTop: 20,
            padding: 15,
            cursor: "pointer",
          }}
        >
          <Link href="/">
            <a style={{ color: "var(--black)" }} title="Inicio">
              <img
                src="/icons/home.svg"
                alt="inicio"
                className={styles.logout_icon}
              />
              <p className={styles.logout_text}>Inicio</p>
            </a>
          </Link>
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          className={styles.menu_card}
          style={{
            marginTop: 20,
            marginBottom: 20,
            padding: 15,
            cursor: "pointer",
          }}
        >
          <button
            style={{
              border: "none",
              background: "none",
              position: "relative",
              right: 3,
            }}
            onClick={handleSignOut}
            title="Cerrar Sesión"
          >
            <img
              src="/icons/logout.svg"
              alt="logout"
              className={styles.logout_icon}
            />
            <p className={styles.logout_text}>Cerrar Sesión</p>
          </button>
        </Col>
      </Row>
    </motion.div>
  );
};

export default MenuDesktop;
