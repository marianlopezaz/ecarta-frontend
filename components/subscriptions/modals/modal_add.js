import React, { useState, useEffect } from "react";

import styles from "./modal_add.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import config from "../../../utils/config";
import InputLabel from "@material-ui/core/InputLabel";
import { FormHelperText } from "@material-ui/core";
import { SubscriptionPreviewResponsive } from "./preview_modal_add_responsive";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SUBSCRIPTION_INITIAL_STATE = {
  name: "",
  description: [],
  total: "0.00",
  interval: "1m",
  currency: "ARS",
  type: "dynamic",
  trial: "0",
  limit: "0",
  webhook: "", 
  return_url: `${config.return_url_mobex}`,
  role: "",
};

const INITIAL_VALIDATION = {
  name: false,
  description: false,
  total: false,
  interval: false,
  currency: false,
  type: false,
  trial: false,
  limit: false,
  webhook: false,
  return_url: false,
  role: false,
};

const ModalAddSubscription = ({ addSubscription }) => {
  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState(SUBSCRIPTION_INITIAL_STATE);
  const [oldDescriptions, setOldDescriptions] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const preview = useMediaQuery(theme.breakpoints.down("1055"));
  const [validation, setValidation] = useState(INITIAL_VALIDATION);
  const [newDescription, setNewDescription] = useState("");

  const validate = (prop, value) => {
    if (
      (prop === "total" && isNaN(value)) ||
      (prop === "trial" && isNaN(value)) ||
      JSON.stringify(value.split(" ", 1)) == JSON.stringify([""])
    ) {
      setValidation({
        ...validation,
        [prop]: true,
      });
    } else {
      setValidation({
        ...validation,
        [prop]: !value,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setValidation(INITIAL_VALIDATION);
    setSubscription(SUBSCRIPTION_INITIAL_STATE);
    setOldDescriptions([]);
    setNewDescription("");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (prop, index) => (event) => {
    validate(prop, event.target.value);

    if (prop === "oldDescriptions") {
      let editedDescriptions = [...oldDescriptions];
      editedDescriptions[index] = event.target.value;
      setSubscription({ ...subscription, description: editedDescriptions });
      setOldDescriptions(editedDescriptions);
    } else if (prop === "newDescription") {
      setNewDescription(event.target.value.split("\n"));
    } else {
      setSubscription({ ...subscription, [prop]: event.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { ...subscription };
    data.description = data.description.filter((element) => {
      return element !== "";
    });
    data.description = data.description.toString();
    data.total = Number.parseFloat(data.total).toFixed(2);
    addSubscription(data);
    handleClose();
  };

  const submitDescription = (e) => {
    let data = [...oldDescriptions];
    data = data.concat(newDescription);
    setSubscription({ ...subscription, description: data });
    setOldDescriptions(data);
    setNewDescription("");
  };

  return (
    <>
      {
        <SubscriptionPreviewResponsive
          subscription={subscription}
          open={open}
          newDescription={newDescription}
        />
      }
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        className="responsive_dashboard_modal"
        TransitionComponent={Transition}
      >
        <DialogTitle className="center">Nueva Suscripción</DialogTitle>

        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogContent>
            <TextField
              autoFocus
              required
              error={validation.name}
              margin="dense"
              name="name"
              label="Nombre"
              type="text"
              value={subscription.name}
              onChange={handleChange("name")}
            />
            {validation.name && (
              <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                Este campo no debe estar vací­o.
              </FormHelperText>
            )}
            <div className={styles.descriptionsContainer}>
              <InputLabel style={{ marginTop: "10px", fontWeight: "700" }}>
                Características
              </InputLabel>
              {oldDescriptions.map((desc, i) => {
                return desc !== "" ? (
                  <TextField
                    key={i}
                    id={desc.id}
                    margin="dense"
                    name="description"
                    multiline
                    required
                    error={validation.description}
                    value={desc}
                    onChange={handleChange("oldDescriptions", i)}
                    style={{ marginTop: 20, marginBottom: 20 }}
                  />
                ) : null;
              })}
              <TextField
                margin="dense"
                name="newDescription"
                label="Agregar nuevas caracterí­sticas"
                multiline
                error={validation.description}
                value={newDescription}
                onChange={handleChange("newDescription")}
                onKeyUp={(e) => {
                  e.preventDefault();
                  if (e.key == "Enter") {
                    submitDescription(e);
                  }
                }}
                style={{ marginTop: 10, marginBottom: 20 }}
              />
              <FormHelperText style={{ color: "var(--pink)" }}>
                Presione ENTER por cada caracterí­stica. Se recomineda colocar no más de 3 características
              </FormHelperText>
              {validation.description && (
                <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                  Este campo no debe estar vacÃ­o.
                </FormHelperText>
              )}
            </div>

            <TextField
              margin="dense"
              name="total"
              label="Total ARS"
              multiline
              required
              error={validation.total}
              value={subscription.total}
              onChange={handleChange("total")}
              style={{ marginTop: 30 }}
            />
            {validation.total && (
              <FormHelperText style={{ color: "red", marginBottom: "20px" }}>
                Este campo debe ser un nÃºmero entero o decimal dividido por un
                punto (100.50)
              </FormHelperText>
            )}
            {subscription.total === "" && (
              <FormHelperText style={{ color: "red", marginBottom: "20px" }}>
                Este campo no puede ser vacÃ­o
              </FormHelperText>
            )}

            <InputLabel id="role_select_label" style={{ marginTop: 30 }}>
              Tipo de Suscripción
            </InputLabel>
            <select
              value={subscription.role}
              onChange={handleChange("role")}
              className={styles.select_input}
              required
            >
              <option value={""}>Seleccionar un tipo de Suscripción</option>
              <option value={"Premium"}>Premium</option>
              <option value={"Free"}>Free</option>
            </select>

            <TextField
              required
              margin="dense"
              name="trial"
              label="Periodo de prueba"
              type="number"
              multiline
              error={validation.trial}
              value={subscription.trial}
              onChange={handleChange("trial")}
              style={{ marginTop: 30 }}
            />
            {validation.trial && (
              <FormHelperText style={{ color: "rgb(182, 60, 47)" }}>
                Este campo debe ser un nÃºmero entero
              </FormHelperText>
            )}
            {subscription.trial === "" && (
              <FormHelperText style={{ color: "red", marginBottom: "20px" }}>
                Este campo no puede ser vacÃ­o
              </FormHelperText>
            )}

            <InputLabel id="interval_select_label" style={{ marginTop: 30 }}>
              Intervalo
            </InputLabel>
            <select
              required
              id="interval_select_id"
              value={subscription.interval}
              onChange={handleChange("interval")}
              className={styles.select_input}
              required={true}
              style={{ marginBottom: 60 }}
            >
              <option value={"15d"}>15 dí­as</option>
              <option value={"1m"}>1 Mes</option>
              <option value={"3m"}>3 Meses</option>
            </select>
          </DialogContent>
          <DialogActions className={styles.actions_container}>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <button
        id={styles.add_btn}
        title="Nueva Suscripción"
        onClick={handleOpen}
      >
        <img src="/icons/add.svg" alt="add" />
        {!fullScreen && <p>Añadir</p>}
      </button>
    </>
  );
};

export default ModalAddSubscription;
