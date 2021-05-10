import React, { useState } from "react";

// Import dependencias
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import Collapse from "@material-ui/core/Collapse";
import Alert from "react-s-alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";

// Import componentes
import styles from "./styles.module.css";
import { addMedia, deleteMedia } from "../../../utils/media_crud";

// Import Redux
import { useDispatch } from "react-redux";
import { forcedLogout } from "../../../redux/actions/userActions";

const FileUpload = ({
  use_case,
  type,
  data_to_send,
  add_url,
  delete_url,
  pdf,
  auth_token,
  user_role,
  mutateMedia,
  created_media,
  upload_sizes,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    [type]: false,
  });
  const [file, setFile] = useState({
    [type]: [],
  });

  const addFile = (e) => {
    setOpen({ ...open, [type]: true });
    let new_files = [];
    Array.from(e.target.files).forEach((element) => {
      new_files.push({
        file: element,
        loading: false,
        loaded: true,
      });
    });
    setFile({
      ...file,
      [type]: new_files,
    });
  };

  const setLoadingUpload = (media_name) => {
    let new_files = Array.from(file[type]).map((element) => {
      if (element.file.name === media_name) {
        element.loading = true;
      }
      return element;
    });
    setFile({
      ...file,
      [type]: new_files,
    });
  };

  const unsetLoadingUpload = (media_name) => {
    let new_files = Array.from(file[type]).map((element) => {
      if (element.file.name === media_name) {
        element.loading = false;
      }
      return element;
    });
    setFile({
      ...file,
      [type]: new_files,
    });
  };

  const setNotLoadedFile = (media_name) => {
    let new_files = Array.from(file[type]).map((element) => {
      if (element.file.name === media_name) {
        element.loaded = false;
      }
      return element;
    });
    setFile({
      ...file,
      [type]: new_files,
    });
  };

  const removeFile = (media_name) => {
    let new_files = [];
    Array.from(file[type]).forEach((element) => {
      if (element.file.name !== media_name) {
        new_files.push(element);
      }
    });
    setFile({
      ...file,
      [type]: new_files,
    });
  };

  const openFileManager = () => {
    if (user_role === "Free") {
      Alert.warning(
        "¡Tu suscripción no permite realizar esa acción! Pasate a Premium para más beneficios.",
        {
          position: "bottom",
          effect: "stackslide",
        }
      );
    } else {
      if (
        type === "logo" ||
        type === "background" ||
        type === "portada" ||
        type === "menu"
      ) {
        if (created_media !== undefined && created_media.length > 0) {
          Alert.info(
            "Ya tenés una archivo cargado! Para modificarlo, eliminá el anterior.",
            {
              position: "bottom",
              effect: "stackslide",
            }
          );
        } else {
          let input = document.getElementById(`regular_${type}`);
          input.click();
        }
      } else {
        let input = document.getElementById(`regular_${type}`);
        input.click();
      }
    }
  };

  const fileAccept = (e) => {
    if (
      type === "logo" ||
      type === "background" ||
      type === "portada" ||
      type === "menu"
    ) {
      if (e.target.files.length > 1) {
        Alert.warning(
          "Solo se puede agregar una imagen en este caso. Seleccionamos una de ellas automaticamente!",
          {
            position: "bottom",
            effect: "stackslide",
          }
        );
        setOpen({ ...open, [type]: true });
        setFile({
          ...file,
          [type]: [{ file: e.target.files[0], loading: false, loaded: true }],
        });
      } else {
        addFile(e);
      }
    } else {
      addFile(e);
    }
  };

  const uploadMedia = (data, media_name) => {
    addMedia(add_url, data, auth_token).then((result) => {
      if (result.success) {
        Alert.success("Archivo guardado!", {
          position: "bottom",
          effect: "stackslide",
        });
        // Unset Loading
        unsetLoadingUpload(media_name);
        // MutateMedia
        mutateMedia();
        // Delete file
        removeFile(media_name);
      } else {
        if (result.unauthorized) {
          dispatch(forcedLogout()).then((status) => {
            if (status) {
              router.push("/login");
            }
          });
        }
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
        // Unset Loading
        unsetLoadingUpload(media_name);
        // Show error
        setNotLoadedFile(media_name);
      }
    });
  };

  const fileUpload = (media_name) => {
    const data = new FormData();
    if (use_case === "project") {
      data.append("project_id", data_to_send.reference_id);
      data.append("media_type", data_to_send.media_type);
    } else if (use_case === "menu") {
      data.append("menu_id", data_to_send.reference_id);
      data.append("menu_media_type", data_to_send.menu_media_type);
      Array.from(file[type]).forEach((element) => {
        if (
          element.file.name === media_name &&
          element.file.type === "application/pdf"
        ) {
          data.append("type", "pdf");
        } else if (element.file.name === media_name) {
          data.append("type", "image");
        }
      });
    }
    data.append("name", data_to_send.name);
    data.append("description", data_to_send.description);
    data.append(
      "media",
      Array.from(file[type]).find((element) => element.file.name === media_name)
        .file
    );
    // Set Loading
    setLoadingUpload(media_name);
    // UploadMedia
    uploadMedia(data, media_name);
  };

  const removeMedia = (media_id) => {
    deleteMedia(delete_url, media_id, auth_token).then((result) => {
      if (result.success) {
        Alert.success("Archivo eliminado correctamente!", {
          position: "bottom",
          effect: "stackslide",
        });
        mutateMedia();
      } else {
        if (result.unauthorized) {
          dispatch(forcedLogout()).then((status) => {
            if (status) {
              router.push("/login");
            }
          });
        }
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    });
    // MutateMedia
    mutateMedia();
  };

  return (
    <Row md={12} sm={12} xs={12}>
      <Col md={12} sm={12} xs={12} className={styles.card_container}>
        <Row md={12} sm={12} xs={12}>
          <Col
            md={11}
            sm={11}
            xs={11}
            className="center"
            style={{
              marginBottom: 20,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p className={styles.title}>
              {type === "logo"
                ? "Logo"
                : type === "background"
                ? "Fondo"
                : type === "footer"
                ? "Pié"
                : type === "header"
                ? "Encabezado"
                : type === "portada"
                ? "Imagen representativa del menú"
                : type === "menu"
                ? "Menú en archivo"
                : null}
            </p>
          </Col>
          <Col
            md={11}
            sm={11}
            xs={11}
            onClick={openFileManager}
            className={`center ${styles.upload_container}`}
          >
            <Col md={12} sm={12} xs={12} style={{ marginTop: 20 }}>
              <img src="/images/dashboard/add_file.svg" alt="img" />
            </Col>
            <Col md={12} sm={12} xs={12} style={{ marginTop: 20 }}>
              <p className={styles.info}>
                {!pdf ? (
                  <span onClick={openFileManager}>
                    Seleccioná una o más imágenes
                  </span>
                ) : (
                  <span onClick={openFileManager}>Seleccioná un archivo</span>
                )}
              </p>
            </Col>
            <Col md={12} sm={12} xs={12} style={{ marginTop: 10 }}>
              <p className={styles.supports}>
                Formato: PNG, JPEG, JPG{pdf && ", PDF"}
              </p>
              {upload_sizes !== undefined && (
                <p className={`${styles.supports} ${styles.recomendations}`}>
                  Tamaños recomendados: {upload_sizes.width}{" "}
                  <span style={{ fontWeight: "700" }}>X</span>{" "}
                  {upload_sizes.height}
                </p>
              )}
            </Col>
            <div style={{ height: 0, width: 0, overflow: "hidden" }}>
              <input
                id={`regular_${type}`}
                type="file"
                name={`regular_${type}`}
                multiple
                accept={!pdf ? "image/*" : "image/*|application/pdf"}
                onChange={fileAccept}
              />
            </div>
          </Col>
          <Col
            md={11}
            sm={11}
            xs={11}
            className="center"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <Collapse in={open[type]}>
              {file[type].length > 0 &&
                Array.from(file[type]).map((element) => {
                  return (
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      key={element.file.name}
                      className={`center ${styles.view_file_container}`}
                    >
                      <Row md={12} sm={12} xs={12}>
                        <Col
                          md={8}
                          sm={6}
                          xs={6}
                          className={`left ${styles.img_name_container}`}
                        >
                          {element.file.type === "application/pdf" ? (
                            <img
                              src="/icons/pdf.svg"
                              alt="pdf"
                              className={styles.img_icon}
                            />
                          ) : (
                            <img
                              src="/images/dashboard/add_img.svg"
                              alt="img"
                              className={styles.img_icon}
                            />
                          )}
                          <span className={styles.file_name}>
                            {element.file.name}
                          </span>
                        </Col>
                        <Col md={4} sm={6} xs={6} className="right">
                          {element.loading ? (
                            <div style={{ marginTop: 7 }}>
                              <CircularProgress size={20} color={"primary"} />
                            </div>
                          ) : !element.loaded ? (
                            <div
                              title="Error"
                              className={styles.delete_icon_container}
                              style={{ cursor: "default" }}
                            >
                              <div>
                                <img src="/icons/error.svg" alt="done" />
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={fileUpload.bind(this, element.file.name)}
                              className={styles.upload_icon}
                            >
                              <img src="/icons/upload_media.svg" />
                              <span>Subir</span>
                            </button>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
            </Collapse>
          </Col>
          {created_media !== undefined && created_media.length > 0 && (
            <Col
              md={11}
              sm={11}
              xs={11}
              className="center"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              {created_media.map((media) => {
                return (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      key={media.id}
                      className={`center ${styles.view_file_container}`}
                    >
                      <Row md={12} sm={12} xs={12}>
                        <Col md={8} sm={8} xs={8} className={`left`}>
                          {media.media_type === "image" ? (
                            <>
                              <img
                                src={media.url_regular}
                                alt="img"
                                className={styles.file_img}
                              />
                              <a
                                target="_blank"
                                href={media.url_regular}
                                className={styles.view}
                              >
                                Ver imagen
                              </a>
                            </>
                          ) : (
                            <>
                              <img
                                src="/icons/pdf.svg"
                                alt="pdf"
                                className={styles.file_img}
                              />
                              <a
                                target="_blank"
                                href={media.url_regular}
                                className={styles.view}
                              >
                                Descargar PDF
                              </a>
                            </>
                          )}
                        </Col>
                        <Col md={4} sm={4} xs={4} className="right">
                          <div
                            title="Eliminar Imagen"
                            onClick={removeMedia.bind(this, media.media_id)}
                            className={styles.delete_icon_container}
                          >
                            <img src="/icons/delete_img.svg" alt="done" />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </motion.div>
                );
              })}
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default FileUpload;
