import React, { useState, useEffect } from "react";

import styles from "./modal_error_subscription.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalErrorSubscription = ({
  errorType,
  currentSubscription,
  handleCloseErrorModal,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useSelector((store) => store.user);

  const handleAcceptModal = () => {
    if (errorType === "pendiente_de_pago") {
      window.location.href = currentSubscription.sourceUrl;
    } else {
      router.push("/dashboard/subscriptions/status");
    }
  };

  const handleClose = () => {
    handleCloseErrorModal();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        className="responsive_dashboard_modal"
        TransitionComponent={Transition}
      >
        <DialogTitle className="center">
          <img src="/icons/error.svg" id={styles.email_img} />
          <p id={styles.modal_title}>
            ¡Atención! Ya tenés una suscripción asociada a tu cuenta
          </p>
        </DialogTitle>
        <DialogContent>
          <p>
            Hola <span id={styles.username}>{user.user.name}</span>!, hemos
            detectado que ya cuentas con la suscripción{" "}
            <span style={{ fontWeight: "bold" }}>PREMIUM</span> en estado:
            <span id={styles.subscription_status}>
              {" "}
              {currentSubscription.status.replace(/_/g, " ")}{" "}
            </span>
          </p>
          <hr></hr>
          <h5>
            <p>Detalles de la compra</p>
          </h5>
          <hr></hr>
          <h5>Pasos a seguir</h5>

          {errorType === "pendiente_de_pago" ? (
            <>
              <p>
                1. Los pagos pueden demorar en acreditarse debido a la demanda
                que estamos experimentando. Te sugerimos aguardar unas horas
                después de realizada la compra. Estas a pocos pasos de ser{" "}
                <span style={{ fontWeight: "bold" }}>PREMIUM</span>
              </p>
              <p>
                2. Hacé click en el botón "Aceptar" para re ingresar los datos
                de tu tarjeta
              </p>
              <p>
                3. Dirigite a la sección "Detalles del plan" y tendrás la opción
                de darle de baja a la suscripción realizada para crear una nueva
              </p>
              <p>
                4. Comunicarse a:{" "}
                <a href="mailto:ventas@e-cartaqr.com" target="_blank">
                  ventas@e-cartaqr.com
                </a>{" "}
                para consultarnos el estado tu pago
              </p>
            </>
          ) : errorType === "activo" ? (
            <>
              <p>
                Para dar de alta a una nueva suscripción{" "}
                <span style={{ fontWeight: "bold" }}>PREMIUM</span> primero
                debes darte de baja de la suscripción actual
              </p>
              <p>
                1. Hacé click en el botón "Aceptar" para redirigirte a la
                sección en donde podrás dar de baja a tu suscripción
              </p>
              <p>
                2. Dirigite a la sección "Detalles del plan" y tendrás la opción
                para darte de baja en la suscripción actual
              </p>
              <p>
                3. Para más consultas comunicarse a:{" "}
                <a href="mailto:ventas@e-cartaqr.com" target="_blank">
                  ventas@e-cartaqr.com
                </a>
              </p>
            </>
          ) : null}
        </DialogContent>
        <DialogActions className={styles.actions_container}>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAcceptModal} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalErrorSubscription;
