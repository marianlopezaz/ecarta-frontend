import React, { useState } from "react";

// Import dependencias
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import useSWR from "swr";
import Alert from "react-s-alert";
import Link from "next/link";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import componentes
import styles from "./styles.module.css";
import api from "../../../../utils/config";
import { getMenu } from "../../../../utils/menu_service";
import MenuItem from "../../../../components/live_menu/menu/menu_item/menu_item";

const Menu = () => {
  const router = useRouter();
  const { qr, menu_id } = router.query;
  const url = `${api.api_url}/advertisement/${menu_id}`;
  const [showImgVirtualMenu, setShowImgVirtualMenu] = useState(false);
  let { data } = useSWR(menu_id !== undefined ? url : null, (url) =>
    getMenu(url).then((result) => {
      if (result.success == true) {
        return result.result;
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    })
  );

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ x: 100, opacity: 0 }}
      className={styles.menu_background}
      style={
        data !== undefined && data.project_background
          ? {
              backgroundImage: `url(${data.project_background.url_regular})`,
            }
          : null
      }
    >
      {data !== undefined &&
      data.medias.find((media) => {
        return media.type === "menu" && media.media_type === "image";
      }) ? (
        <>
          <div
            style={{
              backgroundImage: `url(${
                data.medias.find((media) => {
                  return media.type === "menu" && media.media_type === "image";
                }).url_regular
              })`,
            }}
            className={styles.img_dital_menu_container}
          ></div>
          {qr !== undefined && (
            <Link href="/projects/[qr]" as={`/projects/${qr}`} alt="volver">
              <a className={styles.go_back_link} title="Volver">
                <img src="/icons/arrows.svg" />
              </a>
            </Link>
          )}
          {!showImgVirtualMenu && (
            <div
              className="center"
              style={{ width: "100%" }}
              id="loading_items_live_menu_container"
            >
              <CircularProgress size={25} color={"primary"} />
            </div>
          )}
          <img
            onLoad={() => {
              setShowImgVirtualMenu(true);
            }}
            src={
              data.medias.find((media) => {
                return media.type === "menu" && media.media_type === "image";
              }).url_regular
            }
            className={styles.img_dital_menu}
          />
        </>
      ) : (
        <>
          {qr !== undefined && (
            <Link href="/projects/[qr]" as={`/projects/${qr}`} alt="volver">
              <a className={styles.go_back_link} title="Volver">
                <img src="/icons/arrows.svg" />
              </a>
            </Link>
          )}
          <div className={styles.menu_container}>
            <Row md={12} sm={12} xs={12}>
              <Col
                md={11}
                sm={11}
                xs={11}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 20,
                }}
              >
                <div
                  className={styles.menu_header_img}
                  style={
                    data !== undefined &&
                    data.medias.length > 0 &&
                    data.medias.find((media) => {
                      return media.type === "portada";
                    })
                      ? {
                          backgroundImage: `url(${
                            data.medias.find((media) => {
                              return media.type === "portada";
                            }).url_regular
                          })`,
                          height: 150,
                        }
                      : {
                          height: 50,
                        }
                  }
                ></div>
              </Col>
              <Col
                md={11}
                sm={11}
                xs={11}
                className="center"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 20,
                }}
              >
                <Row md={12} sm={12} xs={12}>
                  <Col md={12} sm={12} xs={12}>
                    <p className={styles.inter_menu_title}>
                      {data !== undefined && data.menu_name}
                    </p>
                  </Col>
                  <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                    <p className={styles.inter_menu_desciption}>
                      {data !== undefined && data.menu_description}
                    </p>
                  </Col>
                  {data === undefined && (
                    <div
                      className="center"
                      style={{ width: "100%" }}
                      id="loading_items_live_menu_container"
                    >
                      <CircularProgress size={25} color={"primary"} />
                    </div>
                  )}
                  {data !== undefined &&
                  data.items.length === 0 &&
                  data.medias.find((media) => {
                    return media.type === "menu" && media.media_type === "pdf";
                  }) ? (
                    <a
                      target="_blank"
                      href={
                        data.medias.find((media) => {
                          return (
                            media.type === "menu" && media.media_type === "pdf"
                          );
                        }).url_regular
                      }
                      title="Descargar Menú"
                      className={styles.download_pdf}
                    >
                      Ver menú en PDF
                    </a>
                  ) : data !== undefined && data.items.length > 0 ? (
                    data.items.map((item) => {
                      return <MenuItem item={item} />;
                    })
                  ) : (
                    (data !== undefined && data.items.length) === 0 && (
                      <p
                        style={{ width: "100%", marginTop: 5 }}
                        className="center default_text"
                      >
                        ¡Todavía no hay ítems en este menú para mostrar!
                      </p>
                    )
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Menu;
