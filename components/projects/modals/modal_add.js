import React, { useState } from "react";

// Import dependencias
import styles from "./styles.module.css";
import { Row, Col } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RESTAURANT_INITIAL_STATE = {
  name: "",
  description: "",
  type: "menu",
};

const ModalAdd = ({ addRestaurant }) => {
  const [open, setOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(RESTAURANT_INITIAL_STATE);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
    setLoadingAdd(false);
    setRestaurant(RESTAURANT_INITIAL_STATE);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (prop) => (event) => {
    setRestaurant({ ...restaurant, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setLoadingAdd(true);
    addRestaurant(restaurant).then((result) => {
      handleClose();
    });
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
        <DialogTitle className="center">Nuevo Restaurante</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            required
            value={restaurant.name}
            onChange={handleChange("name")}
            style={{ marginTop: 20 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Descripción"
            multiline
            value={restaurant.description}
            onChange={handleChange("description")}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </DialogContent>
        <DialogActions style={{ margin: 10 }}>
          {!loadingAdd ? (
            <>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary" onClick={handleSubmit}>
                Guardar
              </Button>
            </>
          ) : (
            <Button
              disabled
              type="submit"
              color="primary"
              style={{ width: 90 }}
            >
              <CircularProgress
                size={20}
                color={"secondary"}
                style={{ marginBottom: 5 }}
              />
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <button
        id={styles.add_btn}
        title="Nuevo Restaurante"
        onClick={handleOpen}
      >
        <img src="/icons/add.svg" alt="add" />
        {!fullScreen && <p>Añadir</p>}
      </button>
    </>
  );
};

export default ModalAdd;
