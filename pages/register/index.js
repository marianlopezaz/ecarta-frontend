// Register view
import React, { useState } from "react";

// Import dependencias
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import MaskedInput from "react-text-mask";
import FormHelperText from "@material-ui/core/FormHelperText";
import { BoxLoading } from "react-loadingg";
import Link from "next/link";
import Head from "next/head";
import Slide from "@material-ui/core/Slide";

// Import componentes
import styles from "./register.module.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  useTheme,
  useMediaQuery,
  DialogActions,
} from "@material-ui/core";
import EmailConfirmationModal from "../../components/user/resend_email_confirmation_modal";

const Arrow = () => {
  return (
    <svg
      id={styles.arrow}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path d="M0.976912 13.4766L21.6585 13.4766L18.2325 16.8859C17.8502 17.2664 17.8487 17.8847 18.2292 18.267C18.6097 18.6493 19.228 18.6507 19.6103 18.2703L24.713 13.1922C24.7134 13.1919 24.7136 13.1915 24.7139 13.1913C25.0952 12.8108 25.0964 12.1905 24.714 11.8087C24.7137 11.8084 24.7134 11.8081 24.7131 11.8078L19.6104 6.72969C19.2282 6.34932 18.6098 6.35064 18.2293 6.73301C17.8488 7.11528 17.8503 7.73359 18.2326 8.11406L21.6585 11.5234L0.976912 11.5234C0.437555 11.5234 0.000349045 11.9606 0.000349045 12.5C0.000349045 13.0393 0.437555 13.4766 0.976912 13.4766Z" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            x="25"
            y="25"
            width="25"
            height="25"
            transform="rotate(-180 25 25)"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const CellphoneCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  name: "",
  surname: "",
  cellphone: "",
  showPassword: false,
};

const INITIAL_VALIDATION = {
  email: false,
  password: false,
  name: false,
  surname: false,
  cellphone: false,
};

const Register = () => {
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [state, setState] = useState(INITIAL_STATE);
  const [validation, setValidation] = useState(INITIAL_VALIDATION);
  const user = useSelector((store) => store.user);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [resendCodeModal, setResendCodeModal] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const validate = (prop, value) => {
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
    } else {
      setValidation({
        ...validation,
        [prop]: !(value.split("").length > 0),
      });
    }
  };

  const handleChange = (prop) => (event) => {
    if (prop == "cellphone") {
      let value = event.target.value.replace("(", "");
      value = value.replace(")", "");
      value = value.replace("-", "");
      value = value.replace(" ", "");
      setState({ ...state, cellphone: value });
      validate(prop, value);
    } else {
      setState({ ...state, [prop]: event.target.value });
      validate(prop, event.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    let user = { ...state, role: "user" };
    delete user.showPassword;
    dispatch(register(user)).then((status) => {
      if (status) {
        setConfirmationModal(true);
      }
    });
  };

  const handleResendCode = () => {
    setConfirmationModal(false);
    setResendCodeModal(true);
  };

  return user.isLoading ? (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <Head>
        <title>Registro</title>
      </Head>
      <BoxLoading color="var(--pink)" />
    </motion.div>
  ) : !user.isLoggedIn ? (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <Head>
        <title>Registro</title>
      </Head>
      {confirmationModal ? (
        <Dialog
          open={confirmationModal}
          maxWidth="sm"
          className="center responsive_dashboard_modal"
          TransitionComponent={Transition}
          fullScreen={fullScreen}
        >
          <Link href="/login">
            <a>
              <div id={styles.close_container_confirm} title="Cerrar">
                <img
                  id={styles.close_icon}
                  src="/icons/close.svg"
                  alt="close-login"
                />
              </div>
            </a>
          </Link>
          <DialogTitle>
            <img src="/icons/email_sent.svg" id={styles.email_img} />
            <p id={styles.dialog_email_title} style={{ marginTop: 10 }}>
              ¡Confirmá tu email para continuar!
            </p>
          </DialogTitle>
          <DialogContent id={styles.dialog_email_content}>
            <p>
              ¡Muchas gracias por registrarte en E-cartaQR! Enviamos un email a:{" "}
              <span style={{ fontWeight: "700" }}>{state.email}</span>. Confirmá
              tu correo electrónico para completar el registro.
            </p>
            <p style={{ marginBottom: 0, marginTop: 40 }}>
              ¿No obtuviste un email de verificación?
            </p>
            <button
              className={styles.resend_code_button}
              onClick={handleResendCode}
            >
              Reenviar código
            </button>
          </DialogContent>
        </Dialog>
      ) : resendCodeModal ? (
        <EmailConfirmationModal email={state.email} />
      ) : null}
      <Link href="/">
        <a>
          <div id={styles.close_container} title="Cerrar">
            <img
              id={styles.close_icon}
              src="/icons/close.svg"
              alt="close-login"
            />
          </div>
        </a>
      </Link>
      <Row
        md={12}
        sm={12}
        xs={12}
        style={{ width: "100%" }}
        id={styles.register_container}
      >
        <Col
          lg={5}
          md={6}
          sm={8}
          xs={12}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Row md={12} sm={12} xs={12}>
            <Col md={12} sm={12} xs={12} className="center">
              <img src="/images/logo.svg" alt="logo" id={styles.logo} />
            </Col>
            <Col
              md={12}
              sm={12}
              xs={12}
              style={{ paddingLeft: 0, marginTop: 20 }}
            >
              <h1 id={styles.title}>Bienvenido,</h1>
            </Col>
            <Col md={12} sm={12} xs={12} style={{ paddingLeft: 0 }}>
              <h3 className={styles.sub_title}>
                creá una cuenta para continuar.
              </h3>
            </Col>
            <Row
              md={12}
              sm={12}
              xs={12}
              style={{ width: "100%", marginTop: 30 }}
            >
              <form id="form_register" style={{ width: "100%" }}>
                <Col md={12} sm={12} xs={12} style={{ paddingLeft: 0 }}>
                  <FormControl>
                    <Col md={12} sm={12} xs={12} style={{ paddingRight: 0 }}>
                      <TextField
                        id="name"
                        name="name"
                        label="Nombre"
                        value={state.name}
                        onChange={handleChange("name")}
                        error={validation.name}
                        autoFocus={true}
                        className={styles.input}
                      />
                      {validation.name && (
                        <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                          Este campo no debe estar vacío.
                        </FormHelperText>
                      )}
                    </Col>
                  </FormControl>
                  <FormControl>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ marginTop: 30, paddingRight: 0 }}
                    >
                      <TextField
                        id="surname"
                        name="surname"
                        label="Apellido"
                        value={state.surname}
                        onChange={handleChange("surname")}
                        error={validation.surname}
                        className={styles.input}
                      />
                      {validation.surname && (
                        <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                          Este campo no debe estar vacío.
                        </FormHelperText>
                      )}
                    </Col>
                  </FormControl>
                  <FormControl>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ marginTop: 30, paddingRight: 0 }}
                    >
                      <InputLabel
                        error={validation.cellphone}
                        htmlFor="cellphone"
                        className="cellphone-label"
                      >
                        Celular
                      </InputLabel>
                      <Input
                        value={state.cellphone}
                        onChange={handleChange("cellphone")}
                        name="cellphone"
                        id="cellphone"
                        inputComponent={CellphoneCustom}
                        error={validation.cellphone}
                        className={styles.input}
                      />
                      {validation.cellphone && (
                        <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                          Este campo no debe estar vacío.
                        </FormHelperText>
                      )}
                      <FormHelperText
                        id="helper-text"
                        style={
                          validation.cellphone
                            ? { color: "rgb(182, 60, 47)" }
                            : null
                        }
                      >
                        (cod area) xxx-xxxx
                      </FormHelperText>
                    </Col>
                  </FormControl>
                  <FormControl>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ marginTop: 10, paddingRight: 0 }}
                    >
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={state.email}
                        onChange={handleChange("email")}
                        error={validation.email}
                        className={styles.input}
                      />
                      {validation.email && (
                        <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                          Debe tener el formato x@x.x.
                        </FormHelperText>
                      )}
                    </Col>
                  </FormControl>
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
                        Contraseña
                      </InputLabel>
                      <Input
                        id="password"
                        type={state.showPassword ? "text" : "password"}
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
                              {state.showPassword ? (
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
                <Col md={12} sm={12} xs={12} style={{ marginTop: 30 }}>
                  <button id={styles.login} onClick={handleClickRegister}>
                    <span>Crear cuenta </span>
                    <Arrow />
                  </button>
                </Col>
                <Col md={12} sm={12} xs={12} style={{ marginTop: 20 }}>
                  <p>
                    Ya tengo cuenta,{" "}
                    <span id={styles.redirect}>
                      <Link href="/login">
                        <a>ingresar</a>
                      </Link>
                    </span>
                  </p>
                </Col>
              </form>
            </Row>
          </Row>
        </Col>
      </Row>
    </motion.div>
  ) : (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <Head>
        <title>Registro - ecarta</title>
      </Head>
      <BoxLoading color="var(--pink)" />
    </motion.div>
  );
};

export default Register;
