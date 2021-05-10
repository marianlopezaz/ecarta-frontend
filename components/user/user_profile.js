import React, { useState } from "react";

// Import
import styles from "../layouts/header/modals/user_preview.module.css";
import { Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MaskedInput from "react-text-mask";
import FormHelperText from "@material-ui/core/FormHelperText";
import { motion } from "framer-motion";
import Alert from "react-s-alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// Import dependencias
import { useDispatch, useSelector } from "react-redux";
import { updateUser, forcedLogout } from "../../redux/actions/userActions";

const User = () => {
  return (
    <svg
      width="55"
      height="55"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 0C7.85046 0 0 7.85046 0 17.5C0 27.1495 7.85046 35 17.5 35C27.1495 35 35 27.1495 35 17.5C35 7.85046 27.1495 0 17.5 0ZM17.5 32.9492C8.98126 32.9492 2.05078 26.0187 2.05078 17.5C2.05078 8.98126 8.98126 2.05078 17.5 2.05078C26.0187 2.05078 32.9492 8.98126 32.9492 17.5C32.9492 26.0187 26.0187 32.9492 17.5 32.9492Z"
        fill="var(--black)"
      />
      <path
        d="M17.5 18.457C21.4578 18.457 24.6777 15.2371 24.6777 11.2793C24.6777 7.32149 21.4578 4.10156 17.5 4.10156C13.5422 4.10156 10.3223 7.32149 10.3223 11.2793C10.3223 15.2371 13.5422 18.457 17.5 18.457ZM17.5 6.15234C20.327 6.15234 22.627 8.45229 22.627 11.2793C22.627 14.1063 20.327 16.4062 17.5 16.4062C14.673 16.4062 12.373 14.1063 12.373 11.2793C12.373 8.45229 14.673 6.15234 17.5 6.15234Z"
        fill="var(--black)"
      />
      <path
        d="M29.0287 22.9307C27.6661 21.3909 25.7065 20.5078 23.6523 20.5078H11.3477C9.29353 20.5078 7.33387 21.3909 5.97126 22.9307L5.48523 23.4799L5.84794 24.1174C8.22801 28.3001 12.6928 30.8984 17.5 30.8984C22.3072 30.8984 26.772 28.3001 29.1521 24.1173L29.5148 23.4799L29.0287 22.9307ZM17.5 28.8477C13.6899 28.8477 10.1335 26.9201 8.04023 23.7689C8.9598 22.9929 10.1306 22.5586 11.3477 22.5586H23.6523C24.8694 22.5586 26.0402 22.9929 26.9598 23.7689C24.8665 26.9201 21.3101 28.8477 17.5 28.8477Z"
        fill="var(--black)"
      />
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

const UserProfile = ({
  handleCloseUserProfile,
  view_user,
  handleOpenUserChangePassword,
}) => {
  const [state, setState] = useState(view_user);
  const isLoading = useSelector((store) => store.user.isLoading);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (prop) => (event) => {
    if (prop == "cellphone") {
      let value = event.target.value.replace("(", "");
      value = value.replace(")", "");
      value = value.replace("-", "");
      value = value.replace(" ", "");
      setState({ ...state, cellphone: value });
    } else {
      setState({ ...state, [prop]: event.target.value });
    }
  };

  const saveUser = () => {
    dispatch(updateUser(state, state.auth_token)).then((status) => {
      if (status === "unauthorized") {
        dispatch(forcedLogout()).then((status) => {
          if (status) {
            router.push("/login");
          }
        });
      } else if (status === true) {
        Alert.success("Listo, ya se actulizó la información de tu perfil!", {
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
          onClick={handleCloseUserProfile}
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
          <User />
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          className={`center ${styles.profile_field}`}
          style={{ marginTop: 30 }}
        >
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            required
            value={state.name}
            onChange={handleChange("name")}
          />
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          className={`center ${styles.profile_field}`}
          style={{ marginTop: 10 }}
        >
          <TextField
            margin="dense"
            name="surname"
            label="Apellido"
            type="text"
            required
            value={state.surname}
            onChange={handleChange("surname")}
          />
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          className={`left ${styles.profile_field}`}
          style={{ marginTop: 10 }}
        >
          <InputLabel
            htmlFor="cellphone"
            className="MuiInputLabel-shrink"
            required
          >
            Celular
          </InputLabel>
          <Input
            value={state.cellphone}
            onChange={handleChange("cellphone")}
            name="cellphone"
            id="cellphone"
            required
            className={styles.input}
            inputComponent={CellphoneCustom}
          />
          <FormHelperText id="helper-text">(cod area) xxx-xxxx</FormHelperText>
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          className={`center ${styles.profile_field}`}
          style={{ marginTop: 10 }}
        >
          <TextField
            margin="dense"
            name="email"
            label="E-mail"
            type="email"
            required
            value={state.email}
            onChange={handleChange("email")}
          />
        </Col>
        <Col
          md={11}
          sm={11}
          xs={11}
          title="Cambiar contraseña"
          onClick={handleOpenUserChangePassword}
          className={`${styles.profile_field}`}
          style={{ marginTop: 10, cursor: "pointer" }}
        >
          <Row md={12} sm={12} xs={12}>
            <Col md={6} sm={6} xs={6} style={{ padding: 5 }}>
              <p style={{ margin: 0, fontWeight: "700" }}>Cambiar contraseña</p>
            </Col>
            <Col className="right" md={6} sm={6} xs={6} style={{ padding: 5 }}>
              <img src="/icons/next.svg" style={{ width: 15 }} />
            </Col>
          </Row>
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
              onClick={saveUser}
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
      <style jsx global>{`
        #cellphone {
          padding-top: 0px !important;
        }
      `}</style>
    </motion.div>
  );
};

export default UserProfile;
