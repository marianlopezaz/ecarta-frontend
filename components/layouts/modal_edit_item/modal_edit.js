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
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalEdit = ({ editItem, name, description, item_type }) => {
  const [open, setOpen] = useState(false);
  const [localItem, setItem] = useState({
    name: name,
    description: description,
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (prop) => (event) => {
    setItem({ ...localItem, [prop]: event.target.value });
  };

  const handleEdit = () => {
    editItem(localItem);
    handleClose();
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
        <DialogTitle className="center">{`Editar ${item_type}: ${name}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            required
            value={localItem.name}
            onChange={handleChange("name")}
            style={{ marginTop: 20 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Descripción"
            multiline
            value={localItem.description}
            onChange={handleChange("description")}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </DialogContent>
        <DialogActions style={{ margin: 10 }}>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" onClick={handleEdit}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      {!fullScreen ? (
        <a
          id={styles.edit_btn}
          onClick={handleOpen}
          title={`Editar ${item_type}`}
        >
          Editar
        </a>
      ) : (
        <a
          id={styles.edit_btn}
          title={`Editar ${item_type}`}
          onClick={handleOpen}
        >
          <img src="/icons/edit.svg" alt="qr" />
        </a>
      )}
    </>
  );
};

export default ModalEdit;
