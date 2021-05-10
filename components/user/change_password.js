import React, { useState } from "react";

// Import
import styles from "../layouts/header/modals/user_preview.module.css";
import { Row, Col } from "react-bootstrap";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import { motion } from "framer-motion";
import Alert from "react-s-alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";

// Import dependencias
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, forcedLogout } from "../../redux/actions/userActions";

const INITIAL_STATE = {
  old_password: "",
  new_password: "",
  show_old_password: false,
  show_new_password: false,
};

const INITIAL_VALIDATION_STATE = {
  old_password: false,
  new_password: false,
};

const ChangePassword = ({ handleCloseUserChangePassword, user_auth_token }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [validation, setValidation] = useState(INITIAL_VALIDATION_STATE);
  const isLoading = useSelector((store) => store.user.isLoading);
  const dispatch = useDispatch();
  const router = useRouter();

  const validate = (prop, value) => {
    setValidation({
      ...validation,
      [prop]: !(value.split("").length >= 8),
    });
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
    validate(prop, event.target.value);
  };

  const handleClickShowPassword = (prop) => {
    setState({ ...state, [prop]: !state[prop] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = () => {
    let data = {
      old_password: state.old_password,
      new_password: state.new_password,
    };
    dispatch(updatePassword(data, user_auth_token)).then((status) => {
      if (status === "unauthorized") {
        dispatch(forcedLogout()).then((status) => {
          if (status) {
            router.push("/login");
          }
        });
      } else if (status === true) {
        setState(INITIAL_STATE);
        Alert.success("Contraseña cambiada correctamente.", {
          position: "bottom",
          effect: "stackslide",
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ x: 100, opacity: 0 }}
    >
      <div id={styles.close_user_container} title="Cerrar">
        <img
          id={styles.back_icon}
          src="/icons/arrows.svg"
          alt="close"
          onClick={handleCloseUserChangePassword}
        />
      </div>
      <Row md={12} sm={12} xs={12}>
        <Col
          md={11}
          sm={11}
          xs={11}
          className="center"
          style={{ marginTop: 30, marginLeft: "auto", marginRight: "auto" }}
        >
          <p style={{ fontWeight: "700", fontSize: 18 }}>
            Cambio de contraseña
          </p>
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          className={`center ${styles.profile_field}`}
          style={{ marginTop: 20 }}
        >
          <FormControl>
            <Col md={12} sm={12} xs={12}>
              <InputLabel
                error={validation.old_password}
                className="password-label"
                htmlFor="password"
              >
                Vieja contraseña
              </InputLabel>
              <Input
                id="old_password"
                type={state.show_old_password ? "text" : "password"}
                value={state.old_password}
                onChange={handleChange("old_password")}
                error={validation.old_password}
                className={styles.input}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword.bind(
                        this,
                        "show_old_password"
                      )}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {state.show_old_password ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {validation.old_password && (
                <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                  Debe tener más de 8 caracteres.
                </FormHelperText>
              )}
            </Col>
          </FormControl>
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          className={`center ${styles.profile_field}`}
          style={{ marginTop: 10 }}
        >
          <FormControl>
            <Col md={12} sm={12} xs={12}>
              <InputLabel
                error={validation.new_password}
                className="password-label"
                htmlFor="password"
              >
                Nueva contraseña
              </InputLabel>
              <Input
                id="new_password"
                type={state.show_new_password ? "text" : "password"}
                value={state.new_password}
                onChange={handleChange("new_password")}
                error={validation.new_password}
                className={styles.input}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword.bind(
                        this,
                        "show_new_password"
                      )}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {state.show_new_password ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {validation.new_password && (
                <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                  Debe tener más de 8 caracteres.
                </FormHelperText>
              )}
            </Col>
          </FormControl>
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          className="center"
          style={{
            marginTop: 30,
            marginBottom: 10,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {!isLoading ? (
            <button
              title="Guardar"
              onClick={changePassword}
              id={styles.save_profile_btn}
            >
              GUARDAR
            </button>
          ) : (
            <button
              disabled
              color="primary"
              style={{ width: 110 }}
              id={styles.save_profile_btn}
            >
              <CircularProgress
                size={22}
                color={"secondary"}
                style={{ marginBottom: -3 }}
              />
            </button>
          )}
        </Col>
      </Row>
    </motion.div>
  );
};

export default ChangePassword;
