import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  FormHelperText,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Alert from "react-s-alert";
import styles from "../../pages/register/register.module.css";
import { resendEmailCode } from "../../utils/user_crud";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function EmailConfirmationModal(email) {
  const [counter, setCounter] = useState(0);
  const [helpMessage, setHelpMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const Transition =
    counter == 0
      ? React.forwardRef(function Transition(props, ref) {
          return <Slide direction="up" ref={ref} {...props} />;
        })
      : null;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleResendCode = () => {
    setIsLoading(true);
    setCounter(counter + 1);
    if (counter === 2) {
      setHelpMessage(true);
    }
    resendEmailCode(email.email).then((result) => {
      setIsLoading(false);
      if (result.success) {
        Alert.success("Se reenvió el código correctamente", {
          position: "bottom",
          effect: "stackslide",
          html: true,
        });
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCounter(0);
  };

  return (
    <Dialog
      open={open}
      className="center responsive_dashboard_modal"
      TransitionComponent={Transition !== null ? Transition : "none"}
      fullScreen={fullScreen}
      fullWidth
    >
      <Link href="/login" onClick={handleCloseModal}>
        <div id={styles.close_container_confirm} title="Cerrar">
          <img
            id={styles.close_icon}
            src="/icons/close.svg"
            alt="close-login"
          />
        </div>
      </Link>

      <DialogTitle>
        <img src="/icons/resend_email.svg" id={styles.email_img} />
        <p id={styles.dialog_email_title} style={{ marginTop: 10 }}>
          Reenviar código de confirmación
        </p>
      </DialogTitle>
      <DialogContent id={styles.dialog_email_content}>
        <TextField
          label="Se enviará al siguiente email"
          value={email.email}
          id={styles.resend_email_input}
        />
        {helpMessage && (
          <FormHelperText style={{ color: "red" }}>
            ¡Si estas teniendo problemas con el código de verificación
            comunícate con nosotros para solucionarlo!
          </FormHelperText>
        )}
        {!isLoading ? (
          <button
            style={{ marginTop: 50 }}
            className={styles.resend_code_button}
            onClick={handleResendCode}
          >
            Reenviar código
          </button>
        ) : (
          <CircularProgress
            size={23}
            className="updating"
            color={"primary"}
            style={{ marginTop: "40px" } }
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
