import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  useTheme,
  useMediaQuery,
  DialogActions,
  Button,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import styles from "../../pages/register/register.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SuccessConfirmationEmailModal(closeModal) {
  const [open, setOpen] = useState(true);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const theme = useTheme();
  const router = useRouter();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseModal = () => {
    setOpen(false);
    closeModal.closeSuccessEmailModal();
  };

  return (
    <Dialog
      open={open}
      className="center responsive_dashboard_modal"
      TransitionComponent={Transition !== null ? Transition : "none"}
      fullScreen={fullScreen}
      fullWidth
    >
      <div
        onClick={handleCloseModal}
        id={styles.close_container_confirm}
        title="Cerrar"
      >
        <img id={styles.close_icon} src="/icons/close.svg" alt="close-login" />
      </div>
      <DialogTitle>
        <img src="/icons/done.svg" id={styles.email_img} />
        <p id={styles.dialog_email_title}>Email confirmado correctamente.</p>
      </DialogTitle>
      <DialogContent id={styles.dialog_email_content}>
        <p id={styles.dialog_email_content}>
          ¡Felicitaciones! Ya podés comenzar a utilizar E-CartaQR!
        </p>
        <button
          style={{ marginTop: 30 }}
          className={styles.resend_code_button}
          onClick={handleCloseModal}
        >
          Aceptar
        </button>
      </DialogContent>
    </Dialog>
  );
}
