import React, { useLayoutEffect, useEffect } from "react";

// Import dependencias
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import useSWR, { mutate } from "swr";
import Alert from "react-s-alert";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import componentes
import styles from "./styles.module.css";
import api from "../../../../utils/config";
import {
  getResumeMenus,
  addMenu,
  deleteMenu,
} from "../../../../utils/menu_crud";
import { editProject } from "../../../../utils/projects_crud";
import RestaurantResume from "../../../../components/layouts/item_resume/item_resume";
import FileUpload from "../../../../components/layouts/file_upload/file_upload";
import MenuItem from "../../../../components/menu/menu_item/menu_item";
import MenuAdd from "../../../../components/menu/modal_add/modal_add";
import Loader from "../../../../components/layouts/loader/loader_skeleton";

// Import Redux
import { useSelector, useDispatch } from "react-redux";
import { forcedLogout } from "../../../../redux/actions/userActions";

const container = {
  hidden: { opacity: 1, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const selectMedia = (data, type) => {
  let medias_send = [];
  data.medias.forEach((media) => {
    if (media.type === type) {
      medias_send.push(media);
    }
  });
  return medias_send;
};

const Restaurante = () => {
  const router = useRouter();
  const { project_id, project_name } = router.query;
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const url = `${api.api_url}/menu/list/${project_id}`;
  const media_data = {
    reference_id: parseInt(project_id),
    name: "",
    description: "",
    media: {},
  };
  let { data, isValidating } = useSWR(
    project_id !== undefined ? url : null,
    (url) =>
      getResumeMenus(url, user.user.auth_token).then((result) => {
        if (result.success == true) {
          return result.result;
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
      })
  );

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
  }, []);

  const handleEditProject = (project) => {
    let data_send = {
      id: data.project_id,
      name: project.name,
      description: project.description,
    };
    editProject(data_send, user.user.auth_token).then((result) => {
      if (result.success) {
        Alert.success("Restaurante editado correctamente!", {
          position: "bottom",
          effect: "stackslide",
        });
        mutate(url, {
          ...data,
          project_name: project.name,
          project_description: project.description,
        });
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
    mutate(url, {
      ...data,
      project_name: project.name,
      project_description: project.description,
    });
  };

  const mutateMedia = () => {
    mutate(url);
  };

  const handleDeleteMenu = (menu_id) => {
    deleteMenu(menu_id, user.user.auth_token).then((result) => {
      if (result.success) {
        Alert.success("Menú eliminado correctamente!", {
          position: "bottom",
          effect: "stackslide",
        });
        mutate(url);
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
    mutate(url);
  };

  const handleAddMenu = async (menu) => {
    return await addMenu(menu, user.user.auth_token).then((result) => {
      if (result.success) {
        router.push(
          `/dashboard/${project_id}/${project_name}/${result.result.menu_id}/${result.result.menu_name}`
        );
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
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ scale: 0.95, opacity: 0 }}
    >
      <Row
        md={12}
        sm={12}
        xs={12}
        style={{ color: "var(--black)", width: "100%" }}
      >
        <Col
          md={12}
          sm={12}
          xs={12}
          className={`left ${styles.folder_container}`}
        >
          <Link href="/dashboard">
            <a
              className={styles.folder}
              title="Volver"
              style={{
                background: "#ffffff",
                borderRadius: "100%",
                padding: "7px 6px",
              }}
            >
              <img
                src="/icons/arrows.svg"
                alt="back"
                className={styles.go_back_icon}
              />
            </a>
          </Link>
          <Link href="/dashboard">
            <a className={styles.folder} title="Volver">
              <p className={styles.folder_item}>Restaurantes</p>
            </a>
          </Link>
          <div className={styles.folder}>
            <p className={styles.folder_item}>
              {" "}
              <img
                src="/icons/next.svg"
                alt=""
                className={styles.folder_separator}
              />{" "}
            </p>
          </div>
          <div className={styles.folder}>
            <p className={styles.folder_item} style={{ fontWeight: "700" }}>
              {project_name}
            </p>
          </div>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <Row md={12} sm={12} xs={12}>
            <motion.div
              style={{ width: "100%" }}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={item} key={1}>
                <Col md={12} sm={12} xs={12}>
                  <RestaurantResume
                    handleEdit={handleEditProject}
                    name={(data || {}).project_name}
                    description={(data || {}).project_description}
                    item_type="Restaurante"
                  />
                </Col>
              </motion.div>
              <motion.div
                variants={item}
                key={2}
                style={
                  data !== undefined && data.user_role === "Free"
                    ? { opacity: "0.5" }
                    : {}
                }
              >
                <Col
                  lg={10}
                  md={11}
                  sm={11}
                  xs={11}
                  className={styles.items_container}
                >
                  <Row md={12} sm={12} xs={12}>
                    <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                      <p
                        className={styles.titles_legend}
                        style={
                          data !== undefined && data.user_role === "Free"
                            ? { opacity: "0.4" }
                            : {}
                        }
                      >
                        Media
                      </p>
                    </Col>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      id="restaurant_media_container"
                      className={styles.media_container}
                      style={
                        data !== undefined && data.user_role === "Free"
                          ? { opacity: "0.4", cursor: "default" }
                          : {}
                      }
                    >
                      <div className={styles.media_item_container}>
                        <FileUpload
                          use_case="project"
                          type="logo"
                          pdf={false}
                          add_url={"/project/addMedia"}
                          delete_url={"/project/deleteMedia"}
                          data_to_send={{ ...media_data, media_type: "logo" }}
                          auth_token={user.user.auth_token}
                          user_role={
                            data !== undefined ? data.user_role : undefined
                          }
                          mutateMedia={mutateMedia}
                          created_media={
                            data !== undefined
                              ? selectMedia(data, "logo")
                              : undefined
                          }
                          upload_sizes={{
                            width: "300-500px",
                            height: "300-500px",
                          }}
                        />
                      </div>
                      <div className={styles.media_item_container}>
                        <FileUpload
                          use_case="project"
                          type="background"
                          pdf={false}
                          add_url={"/project/addMedia"}
                          delete_url={"/project/deleteMedia"}
                          data_to_send={{
                            ...media_data,
                            media_type: "background",
                          }}
                          auth_token={user.user.auth_token}
                          user_role={
                            data !== undefined ? data.user_role : undefined
                          }
                          mutateMedia={mutateMedia}
                          created_media={
                            data !== undefined
                              ? selectMedia(data, "background")
                              : undefined
                          }
                          upload_sizes={{
                            width: "1000-1300px",
                            height: "1700-2000px",
                          }}
                        />
                      </div>
                      <div className={styles.media_item_container}>
                        <FileUpload
                          use_case="project"
                          type="header"
                          pdf={false}
                          add_url={"/project/addMedia"}
                          delete_url={"/project/deleteMedia"}
                          data_to_send={{ ...media_data, media_type: "header" }}
                          auth_token={user.user.auth_token}
                          user_role={
                            data !== undefined ? data.user_role : undefined
                          }
                          mutateMedia={mutateMedia}
                          created_media={
                            data !== undefined
                              ? selectMedia(data, "header")
                              : undefined
                          }
                          upload_sizes={{
                            width: "1000-1300px",
                            height: "600-800px",
                          }}
                        />
                      </div>
                      <div className={styles.media_item_container}>
                        <FileUpload
                          use_case="project"
                          type="footer"
                          pdf={false}
                          add_url={"/project/addMedia"}
                          delete_url={"/project/deleteMedia"}
                          data_to_send={{ ...media_data, media_type: "footer" }}
                          auth_token={user.user.auth_token}
                          user_role={
                            data !== undefined ? data.user_role : undefined
                          }
                          mutateMedia={mutateMedia}
                          created_media={
                            data !== undefined
                              ? selectMedia(data, "footer")
                              : undefined
                          }
                          upload_sizes={{
                            width: "1000-1300px",
                            height: "600-800px",
                          }}
                        />
                      </div>
                    </Col>
                    <div
                      className={styles.slide_backward}
                      style={
                        data !== undefined && data.user_role === "Free"
                          ? { opacity: "0.6" }
                          : {}
                      }
                      onClick={() => {
                        document.getElementById(
                          "restaurant_media_container"
                        ).scrollLeft -= 350;
                      }}
                    >
                      <img src="/icons/next.svg" alt="next" />
                    </div>
                    <div
                      className={styles.slide_forward}
                      style={
                        data !== undefined && data.user_role === "Free"
                          ? { opacity: "0.6" }
                          : {}
                      }
                      onClick={() => {
                        document.getElementById(
                          "restaurant_media_container"
                        ).scrollLeft += 350;
                      }}
                    >
                      <img src="/icons/next.svg" alt="next" />
                    </div>
                  </Row>
                </Col>
              </motion.div>
              <motion.div variants={item} key={3}>
                <Col
                  lg={10}
                  md={11}
                  sm={11}
                  xs={11}
                  style={{ marginTop: 20, marginBottom: 50 }}
                  className={styles.items_container}
                >
                  <Row md={12} sm={12} xs={12}>
                    <Col md={6} sm={6} xs={8}>
                      {!isValidating ? (
                        <p
                          className={styles.titles_legend}
                          id={styles.menu_legend}
                        >
                          Menú
                        </p>
                      ) : (
                        <>
                          <CircularProgress
                            size={20}
                            className="updating"
                            color={"primary"}
                            style={{ position: "relative", top: 12, left: 7 }}
                          />
                          <span
                            className={styles.titles_legend}
                            id={styles.menu_legend}
                            style={{ left: 10 }}
                          >
                            Actualizando...
                          </span>
                        </>
                      )}
                    </Col>
                    <Col md={6} sm={6} xs={4} className="right">
                      {project_id !== undefined && (
                        <MenuAdd
                          addMenu={handleAddMenu}
                          project_id={parseInt(project_id)}
                        />
                      )}
                    </Col>
                    <Col md={12} sm={12} xs={12}>
                      {data === undefined ? (
                        <Loader />
                      ) : data !== undefined &&
                        (data.menus || []).length === 0 ? (
                        <>
                          <Row md={12} sm={12} xs={12}>
                            <Col
                              lg={11}
                              md={11}
                              sm={11}
                              xs={11}
                              className="center"
                              style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            >
                              <p className="default_text">
                                No hay menús creados todavia. Creá uno!
                              </p>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        data !== undefined &&
                        (data.menus || []).map((menu) => (
                          <MenuItem
                            menu={menu}
                            project={{ id: project_id, name: project_name }}
                            deleteMenu={handleDeleteMenu}
                          />
                        ))
                      )}
                    </Col>
                  </Row>
                </Col>
              </motion.div>
            </motion.div>
          </Row>
        </Col>
      </Row>
    </motion.div>
  );
};

export default Restaurante;
