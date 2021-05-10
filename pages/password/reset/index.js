import React, { useState } from "react";

// Import dependencias
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import Alert from "react-s-alert";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Link from "next/link";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Import componentes
import styles from "./styles.module.css";
import { requestResetPassword } from "../../../utils/auth";

const INITIAL_STATE = {
  email: "",
};

const ResetPasswordView = () => {
  const router = useRouter();
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [state, setState] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [validateEmail, setValidationEmail] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const hadleValidationEmail = (value) => {
    setValidationEmail(!email_regex.test(value.toLowerCase()));
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
    if (prop == "email") {
      hadleValidationEmail(event.target.value);
    }
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);
    requestResetPassword(state.email).then((result) => {
      if (result.success) {
        setIsLoading(false);
        setOpenModalSuccess(true);
      } else {
        setIsLoading(false);
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    });
  };

  return (
    <>
      {/* Modal Exito */}
      <Dialog
        fullScreen={fullScreen}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        maxWidth="sm"
        open={openModalSuccess}
        className="responsive_dashboard_modal"
        TransitionComponent={Transition}
      >
        <DialogContent>
          <Row md={12} sm={12} xs={12} id={styles.modal_succes_styles}>
            <Col
              md={10}
              sm={10}
              xs={10}
              className="center"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <img src="/icons/email_sent.svg" />
            </Col>
            <Col
              md={10}
              sm={10}
              xs={10}
              className="center"
              style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30 }}
            >
              <h1>¡Revisá tu correo!</h1>
            </Col>
            <Col
              md={10}
              sm={10}
              xs={10}
              className="center"
              style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
            >
              <p>
                Enviamos un email a{" "}
                <span style={{ fontWeight: "700" }}>{state.email}</span> con
                instrucciones para restablecer la contraseña.
              </p>
            </Col>
            <Col
              md={10}
              sm={10}
              xs={10}
              className="center"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <button onClick={() => router.push("/login")}>
                Volver al inicio de sesión
              </button>
            </Col>
          </Row>
        </DialogContent>
      </Dialog>
      {/* Vista */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <Head>
          <title>Restablecer contraseña</title>
        </Head>
        <div></div>
        <Link href="/login">
          <a>
            <div id={styles.close_container} title="Volver">
              <img src="/icons/arrows.svg" alt="close-login" />
            </div>
          </a>
        </Link>
        <Row
          md={12}
          sm={12}
          xs={12}
          style={{ width: "100%" }}
          id={styles.login_container}
        >
          <Col
            lg={5}
            md={6}
            sm={8}
            xs={12}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <Row md={12} sm={12} xs={12}>
              <Col
                md={12}
                sm={12}
                xs={12}
                style={{ paddingLeft: 0, marginTop: 20 }}
                className="center"
              >
                <img src="/images/logo.svg" alt="logo" id={styles.logo} />
              </Col>
              <Col
                md={12}
                sm={12}
                xs={12}
                style={{ paddingLeft: 0, marginTop: 20 }}
              >
                <h1 id={styles.title}>Restablecer contraseña</h1>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ paddingLeft: 0 }}>
                <h3 className={styles.sub_title}>
                  Ingresá el email asociado con tu cuenta y te enviaremos las
                  instrucciones para restablecer tu contraseña.
                </h3>
              </Col>
              <Row
                md={12}
                sm={12}
                xs={12}
                style={{ width: "100%", marginTop: 30 }}
              >
                <form id="form_reset" style={{ width: "100%" }}>
                  <Col md={12} sm={12} xs={12} style={{ paddingLeft: 0 }}>
                    <FormControl>
                      <Col md={12} sm={12} xs={12} style={{ paddingRight: 0 }}>
                        <TextField
                          id="email"
                          name="email"
                          label="Email"
                          value={state.email}
                          onChange={handleChange("email")}
                          autoFocus={true}
                          error={validateEmail}
                          className={styles.input}
                        />
                        {validateEmail && (
                          <FormHelperText
                            id="helper-text"
                            style={{ color: "rgb(182, 60, 47)" }}
                          >
                            Debe tener el formato x@x.x
                          </FormHelperText>
                        )}
                      </Col>
                    </FormControl>
                  </Col>
                  <Col md={12} sm={12} xs={12} style={{ marginTop: 40 }}>
                    {!isLoading ? (
                      <button
                        id={styles.login}
                        onClick={(e) => handleSubmitEvent(e)}
                      >
                        <span>Enviar email</span>
                      </button>
                    ) : (
                      <button disabled id={styles.login} style={{ width: 195 }}>
                        <CircularProgress
                          size={22}
                          color={"secondary"}
                          style={{ marginBottom: -3 }}
                        />
                      </button>
                    )}
                  </Col>
                </form>
              </Row>
            </Row>
          </Col>
        </Row>
      </motion.div>
    </>
  );
};

export default ResetPasswordView;
