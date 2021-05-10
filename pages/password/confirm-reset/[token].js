import React, { useState, useEffect } from "react";

// Import dependencias
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import Alert from "react-s-alert";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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

// Redux
import { useDispatch } from "react-redux";
import { resetUserPassword } from "../../../redux/actions/userActions";

const INITIAL_VALIDATION = {
  email: false,
  password: false,
  showPassword: false,
};

const ResetPasswordView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = router.query;
  const INITIAL_STATE = {
    email: "",
    resset_password_token: token,
    password: "",
  };
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [state, setState] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(INITIAL_VALIDATION);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setState({ ...state, resset_password_token: token });
  }, [token]);

  const hadleValidation = (prop, value) => {
    if (prop == "email") {
      setValidation({
        ...validation,
        email: !email_regex.test(value.toLowerCase()),
      });
    } else if (prop == "password") {
      setValidation({
        ...validation,
        password: !(value.split("").length >= 8),
      });
    }
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
    hadleValidation(prop, event.target.value);
  };

  const handleClickShowPassword = () => {
    setValidation({ ...validation, showPassword: !validation.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(resetUserPassword(state)).then((status) => {
      if (status) {
        setOpenModalSuccess(true);
        setIsLoading(false);
      }else{
        setIsLoading(false);
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
              <img src="/icons/password_changed.svg" />
            </Col>
            <Col
              md={10}
              sm={10}
              xs={10}
              className="center"
              style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30 }}
            >
              <h1>¡Contraseña cambiada correctamente!</h1>
            </Col>
            <Col
              md={10}
              sm={10}
              xs={10}
              className="center"
              style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
            >
              <p>
                Listo! Ya restablecimos tu contraseña. Hacé click en el botón
                debajo para ingresar al sistema.
              </p>
            </Col>
            <Col
              md={10}
              sm={10}
              xs={10}
              className="center"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <button onClick={() => router.push("/dashboard")}>
                Ingresar
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
          <title>Ecarta - Restablecer contraseña</title>
        </Head>
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
                  Ingresá el email de tu cuenta y la nueva contraseña a
                  continuación.
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
                          label="Email de tu cuenta"
                          value={state.email}
                          onChange={handleChange("email")}
                          autoFocus={true}
                          error={validation.email}
                          className={styles.input}
                        />
                        {validation.email && (
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
                  <Col md={12} sm={12} xs={12} style={{ paddingLeft: 0 }}>
                    <FormControl>
                      <Col
                        md={12}
                        sm={12}
                        xs={12}
                        style={{ marginTop: 30, paddingRight: 0 }}
                      >
                        <InputLabel
                          error={validation.password}
                          className="password-label"
                          htmlFor="password"
                        >
                          Nueva contraseña
                        </InputLabel>
                        <Input
                          id="password"
                          type={validation.showPassword ? "text" : "password"}
                          value={state.password}
                          onChange={handleChange("password")}
                          error={validation.password}
                          className={styles.input}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {validation.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {validation.password && (
                          <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                            Debe tener más de 8 caracteres.
                          </FormHelperText>
                        )}
                      </Col>
                    </FormControl>
                  </Col>
                  <Col md={12} sm={12} xs={12} style={{ marginTop: 40 }}>
                    {!isLoading ? (
                      <button
                        id={styles.login}
                        onClick={(e) => changePassword(e)}
                      >
                        <span>Restablecer</span>
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
