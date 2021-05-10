import React, { useState, useEffect } from "react";

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
import FormHelperText from "@material-ui/core/FormHelperText";
import { BoxLoading } from "react-loadingg";
import Link from "next/link";
import Head from "next/head";
import Alert from "react-s-alert";

// Import componentes
import styles from "./login.module.css";
import { verifyUserEmail } from "../../utils/user_crud";

//import redux tools
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { useRouter } from "next/router";
import EmailConfirmationModal from "../../components/user/resend_email_confirmation_modal";
import SuccessConfirmationEmailModal from "../../components/user/success_confirmation_email_modal";

const Arrow = () => {
  return (
    <svg
      className={styles.arrow}
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

const INITIAL_STATE = {
  email: "",
  password: "",
  showPassword: false,
};
const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store) => store.user);
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [state, setState] = useState(INITIAL_STATE);
  const [validateEmail, setValidationEmail] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [successEmailModal, setSuccessEmailModal] = useState(false);

  const hadleValidationEmail = (value) => {
    setValidationEmail(!email_regex.test(value.toLowerCase()));
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
    if (prop == "email") {
      hadleValidationEmail(event.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    //event.preventDefault();
  };

  const closeSuccessEmailModal = () => {
    setSuccessEmailModal(false);
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    dispatch(login(state.email, state.password)).then((status) => {
      if (status) {
        router.push("/dashboard");
      }
    });
  };

  useEffect(() => {
    if (router.query.resend) {
      setState({ ...state, email: router.query.email });
      setConfirmationModal(true);
    }

    if (router.query.verify_code !== undefined) {
      verifyUserEmail(router.query.verify_code).then((result) => {
        if (result.success) {
          setSuccessEmailModal(true);
        } else {
          result.result.forEach((element) => {
            Alert.error(element.message, {
              position: "bottom",
              effect: "stackslide",
            });
          });
        }
      });
    }
  }, [router]);

  return user.isLoading ? (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <Head>
        <title>Inicio de sesión</title>
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
        <title>Inicio de sesión</title>
      </Head>
      {confirmationModal ? (
        <EmailConfirmationModal email={state.email} />
      ) : null}
      {successEmailModal ? (
        <SuccessConfirmationEmailModal
          closeSuccessEmailModal={closeSuccessEmailModal}
        />
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
              <h1 id={styles.title}>Bienvenido,</h1>
            </Col>
            <Col md={12} sm={12} xs={12} style={{ paddingLeft: 0 }}>
              <h3 className={styles.sub_title}>
                iniciá sesión para continuar.
              </h3>
            </Col>
            <Row
              md={12}
              sm={12}
              xs={12}
              style={{ width: "100%", marginTop: 30 }}
            >
              <form id="form_login" style={{ width: "100%" }}>
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
                  <FormControl>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ marginTop: 30, paddingRight: 0 }}
                    >
                      <InputLabel className="password-label" htmlFor="password">
                        Contraseña
                      </InputLabel>
                      <Input
                        id="password"
                        type={state.showPassword ? "text" : "password"}
                        value={state.password}
                        onChange={handleChange("password")}
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
                    </Col>
                  </FormControl>
                </Col>
                <Col md={12} sm={12} xs={12} style={{ marginTop: 20 }}>
                  <p>
                    <span id={styles.redirect}>
                      <Link href="/password/reset">
                        <a>Olvidé mi contraseña</a>
                      </Link>
                    </span>
                  </p>
                </Col>
                <Col md={12} sm={12} xs={12} style={{ marginTop: 40 }}>
                  <button
                    id={styles.login}
                    onClick={(e) => handleSubmitEvent(e)}
                  >
                    <span>Ingresar </span>
                    <Arrow />
                  </button>
                </Col>
                <Col md={12} sm={12} xs={12} style={{ marginTop: 20 }}>
                  <p>
                    No tengo cuenta,{" "}
                    <span id={styles.redirect}>
                      <Link href="/register">
                        <a>crear una</a>
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

export default Login;
