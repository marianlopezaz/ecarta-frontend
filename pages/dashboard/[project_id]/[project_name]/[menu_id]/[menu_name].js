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
import foler_styles from "../styles.module.css";
import styles from "./styles.module.css";
import api from "../../../../../utils/config";
import { getMenus, editMenu } from "../../../../../utils/menu_crud";
import { addItem, editItem, deleteItem } from "../../../../../utils/item_crud";
import MenuResume from "../../../../../components/layouts/item_resume/item_resume";
import FileUpload from "../../../../../components/layouts/file_upload/file_upload";
import ItemAdd from "../../../../../components/item/modal_add/modal_add";
import Loader from "../../../../../components/layouts/loader/loader_skeleton";
import Item from "../../../../../components/item/list_item/item";

// Import Redux
import { useSelector, useDispatch } from "react-redux";
import { forcedLogout } from "../../../../../redux/actions/userActions";

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

const Menu = () => {
  const router = useRouter();
  const { project_id, project_name, menu_id, menu_name } = router.query;
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const url = `${api.api_url}/menu/${menu_id}`;
  const media_data = {
    reference_id: parseInt(menu_id),
    name: "",
    description: "",
    media: {},
  };
  let { data, isValidating } = useSWR(
    menu_id !== undefined ? url : null,
    (url) =>
      getMenus(url, user.user.auth_token).then((result) => {
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

  const handleEditMenu = (menu) => {
    let data_send = {
      menu_id: data.menu_id,
      name: menu.name,
      description: menu.description,
    };
    editMenu(data_send, user.user.auth_token).then((result) => {
      if (result.success) {
        Alert.success("Menú editado correctamente!", {
          position: "bottom",
          effect: "stackslide",
        });
        mutate(url, {
          ...data,
          menu_name: menu.name,
          menu_description: menu.description,
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
      menu_name: menu.name,
      menu_description: menu.description,
    });
  };

  const mutateMedia = () => {
    mutate(url);
  };

  const handleAddItem = async (item) => {
    return await addItem(item, user.user.auth_token).then((result) => {
      if (result.success) {
        Alert.success("Ítem agregado correctamente!", {
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
  };

  const handleEditItem = async (item) => {
    return await editItem(item, user.user.auth_token).then((result) => {
      if (result.success) {
        Alert.success("Ítem editado correctamente!", {
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
  };

  const handleDeleteItem = (item_id) => {
    deleteItem(item_id, user.user.auth_token).then((result) => {
      if (result.success) {
        Alert.success("Ítem eliminado correctamente!", {
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
          className={`left ${foler_styles.folder_container}`}
        >
          <Link
            href="/dashboard/[project_id]/[project_name]"
            as={`/dashboard/${project_id}/${project_name}`}
          >
            <a
              className={foler_styles.folder}
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
                className={foler_styles.go_back_icon}
              />
            </a>
          </Link>
          <Link href="/dashboard">
            <a className={foler_styles.folder} title="Volver">
              <p className={foler_styles.folder_item}>Restaurantes</p>
            </a>
          </Link>
          <div className={foler_styles.folder}>
            <p className={foler_styles.folder_item}>
              {" "}
              <img
                src="/icons/next.svg"
                alt=""
                className={foler_styles.folder_separator}
              />{" "}
            </p>
          </div>
          <div className={foler_styles.folder}>
            <Link
              href="/dashboard/[project_id]/[project_name]"
              as={`/dashboard/${project_id}/${project_name}`}
            >
              <a className={foler_styles.folder} title="Volver">
                <p className={foler_styles.folder_item}>{project_name}</p>
              </a>
            </Link>
          </div>
          <div className={foler_styles.folder}>
            <p className={foler_styles.folder_item}>
              {" "}
              <img
                src="/icons/next.svg"
                alt=""
                className={foler_styles.folder_separator}
              />{" "}
            </p>
          </div>
          <div className={foler_styles.folder}>
            <p
              className={foler_styles.folder_item}
              style={{ fontWeight: "700" }}
            >
              {menu_name}
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
                  <MenuResume
                    item_type="Menú"
                    handleEdit={handleEditMenu}
                    name={(data || {}).menu_name}
                    description={(data || {}).menu_description}
                  />
                </Col>
              </motion.div>
              <motion.div variants={item} key={2}>
                <Col
                  lg={10}
                  md={11}
                  sm={11}
                  xs={11}
                  className={foler_styles.items_container}
                >
                  <Row md={12} sm={12} xs={12}>
                    <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                      <p className={foler_styles.titles_legend}>Media</p>
                    </Col>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ marginBottom: 20 }}
                      className={styles.media_container}
                    >
                      <FileUpload
                        use_case="menu"
                        type="portada"
                        pdf={false}
                        add_url={"/menu/addMedia"}
                        delete_url={"/menu/deleteMedia"}
                        data_to_send={{
                          ...media_data,
                          menu_media_type: "portada",
                        }}
                        auth_token={user.user.auth_token}
                        mutateMedia={mutateMedia}
                        created_media={
                          data !== undefined
                            ? selectMedia(data, "portada")
                            : undefined
                        }
                        upload_sizes={{
                          width: "1100-1300px",
                          height: "800-1100px",
                        }}
                      />
                    </Col>
                    {data !== undefined && (data.items || []).length === 0 ? (
                      <Col
                        md={12}
                        sm={12}
                        xs={12}
                        style={{ marginBottom: 20 }}
                        className={styles.media_container}
                      >
                        <FileUpload
                          use_case="menu"
                          type="menu"
                          pdf={true}
                          add_url={"/menu/addMedia"}
                          delete_url={"/menu/deleteMedia"}
                          data_to_send={{
                            ...media_data,
                            menu_media_type: "menu",
                          }}
                          auth_token={user.user.auth_token}
                          mutateMedia={mutateMedia}
                          created_media={
                            data !== undefined
                              ? selectMedia(data, "menu")
                              : undefined
                          }
                          upload_sizes={{
                            width: "1000-1300px",
                            height: "1700-2000px",
                          }}
                        />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
              </motion.div>
              {data !== undefined &&
              data.medias.find((media) => {
                return media.type === "menu";
              }) ? null : (
                <motion.div variants={item} key={3}>
                  <Col
                    lg={10}
                    md={11}
                    sm={11}
                    xs={11}
                    style={{ marginBottom: 50 }}
                    className={foler_styles.items_container}
                  >
                    <Row md={12} sm={12} xs={12}>
                      <Col md={7} sm={7} xs={8}>
                        {!isValidating ? (
                          <p
                            className={foler_styles.titles_legend}
                            id={foler_styles.menu_legend}
                          >
                            Ítems del menú
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
                              className={foler_styles.titles_legend}
                              id={foler_styles.menu_legend}
                              style={{ left: 10 }}
                            >
                              Actualizando...
                            </span>
                          </>
                        )}
                      </Col>
                      <Col md={5} sm={5} xs={4} className="right">
                        {menu_id !== undefined && (
                          <ItemAdd
                            addItem={handleAddItem}
                            menu_id={parseInt(menu_id)}
                          />
                        )}
                      </Col>
                      <Col md={12} sm={12} xs={12}>
                        {data === undefined ? (
                          <Loader />
                        ) : data !== undefined &&
                          (data.items || []).length === 0 ? (
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
                                  No hay ítems creados todavia. Creá uno!
                                </p>
                              </Col>
                            </Row>
                          </>
                        ) : (
                          data !== undefined &&
                          (data.items || []).map((item) => (
                            <Item
                              editItem={handleEditItem}
                              item={item}
                              deleteItem={handleDeleteItem}
                            />
                          ))
                        )}
                      </Col>
                    </Row>
                  </Col>
                </motion.div>
              )}
            </motion.div>
          </Row>
        </Col>
      </Row>
    </motion.div>
  );
};

export default Menu;
