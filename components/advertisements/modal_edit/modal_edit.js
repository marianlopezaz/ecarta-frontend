import React, { useState } from "react";

// Import dependencias
import styles from "./styles.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "react-s-alert";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalEdit = ({ editAdvertisement, advertisement_edit }) => {
  const ADVERTISEMENT_INITIAL_STATE = {
    media_id: advertisement_edit.media_id,
    name: advertisement_edit.name,
    description: advertisement_edit.description,
    time: advertisement_edit.time,
  };
  const [open, setOpen] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [advertisement, setAdvertisement] = useState(
    ADVERTISEMENT_INITIAL_STATE
  );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
    setLoadingAdd(false);
    setAdvertisement(ADVERTISEMENT_INITIAL_STATE);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (prop) => (event) => {
    setAdvertisement({ ...advertisement, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    if (
      advertisement.name === "" ||
      advertisement.time === "0" ||
      advertisement.time === ""
    ) {
      Alert.warning(
        "Completá todos los campos para continuar! La descripción no es requerida y el tiempo debe ser distinto a 0.",
        {
          position: "bottom",
          effect: "stackslide",
        }
      );
    } else {
      setLoadingAdd(true);
      const data_send = new FormData();
      data_send.append("media_id", advertisement.media_id);
      data_send.append("name", advertisement.name);
      data_send.append("description", advertisement.description);
      data_send.append("time", advertisement.time);
      editAdvertisement(data_send);
      handleClose();
    }
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
        <DialogTitle className="center" style={{ textTransform: "capitalize" }}>
          Editar: {advertisement_edit.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            required={true}
            value={advertisement.name}
            onChange={handleChange("name")}
          />
          <TextField
            margin="dense"
            name="description"
            label="Descripción"
            multiline
            value={advertisement.description}
            onChange={handleChange("description")}
            style={{ marginTop: 30 }}
          />
          <TextField
            margin="dense"
            name="time"
            required
            label="Tiempo de duración del anuncio (en segundos)"
            type="number"
            value={advertisement.time}
            onChange={handleChange("time")}
            style={{ marginTop: 30 }}
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
      <div
        title="Editar Anuncio"
        onClick={handleOpen}
        className={styles.edit_icon_container}
      >
        <div>
          <img src="/icons/edit_item.svg" alt="done" />
        </div>
      </div>
    </>
  );
};

export default ModalEdit;
