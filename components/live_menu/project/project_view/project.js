// Import dependencias
import { motion } from "framer-motion";
import { Row, Col, Carousel } from "react-bootstrap";

// Import componentes
import styles from "./styles.module.css";
import MenuItem from "../menu_item/menu_item";

const ProjectView = ({ project, qr }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ x: -100, opacity: 0 }}
      style={{ overflowX: "hidden" }}
    >
      <Row
        md={12}
        sm={12}
        xs={12}
        id={styles.menu_background}
        style={
          project !== undefined &&
          project.medias.length > 0 &&
          project.medias.find((media) => {
            return media.type === "background";
          })
            ? {
                backgroundImage: `url(${
                  project.medias.find((media) => {
                    return media.type === "background";
                  }).url_regular
                })`,
              }
            : null
        }
      >
        <Col
          md={6}
          sm={8}
          xs={10}
          id={
            project !== undefined && project.medias.length > 0
              ? styles.menu_container
              : styles.menu_w_medias_container
          }
        >
          <Row md={12} sm={12} xs={12}>
            {project !== undefined &&
            project.medias.length > 0 &&
            project.medias.find((media) => {
              return media.type === "header";
            }) ? (
              <Col md={12} sm={12} xs={12} className={styles.info_container}>
                <Carousel indicators={false} pause={false} interval={3000}>
                  {project.medias.map((advertisement) => {
                    if (advertisement.type === "header") {
                      return (
                        <Carousel.Item className={styles.carousel_item}>
                          <div
                            style={{
                              backgroundImage: `url(${advertisement.url_regular})`,
                            }}
                            className={styles.advertisement_blur}
                          ></div>
                          <img src={advertisement.url_regular} />
                        </Carousel.Item>
                      );
                    }
                  })}
                </Carousel>
              </Col>
            ) : null}
            <Col
              md={11}
              sm={11}
              xs={11}
              className="center"
              style={{
                height: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 20,
              }}
            >
              <Row md={12} sm={12} xs={12}>
                <Col md={12} sm={12} xs={12} className={styles.info_container}>
                  {project !== undefined &&
                  project.medias.length > 0 &&
                  project.medias.find((media) => {
                    return media.type === "logo";
                  }) ? (
                    <img
                      src={
                        project.medias.find((media) => {
                          return media.type === "logo";
                        }).url_regular
                      }
                      id={styles.logo_img}
                    />
                  ) : null}
                </Col>
                <Col md={12} sm={12} xs={12} className={styles.info_container}>
                  <p className={styles.restaurant_title}>
                    {project !== undefined && project.project_name}
                  </p>
                </Col>
                <Col md={12} sm={12} xs={12} className={styles.info_container}>
                  <p className={styles.restaurant_desciption}>
                    {project !== undefined && project.project_description}
                  </p>
                </Col>
                <Col md={12} sm={12} xs={12} className={styles.info_container}>
                  <p className={styles.menu_title}>Menú</p>
                </Col>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles.info_container}
                  style={{ marginTop: 10 }}
                >
                  {project !== undefined && project.menus.length > 0 ? (
                    <Carousel
                      indicators={false}
                      pause={false}
                      interval={7000}
                      id="menu_items_carousel"
                    >
                      {project.menus.map((menu) => {
                        return (
                          <Carousel.Item key={menu.id}>
                            <MenuItem menu={menu} qr={qr} />
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  ) : null}
                  {/* <motion.div
                    animate={{ scale: 0.85 }}
                    transition={{
                      yoyo: Infinity,
                      duration: 1,
                      ease: "easeInOut",
                    }}
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    <span id={styles.next_slide}>
                      Deslizá para ver más!
                      <img
                        src="/icons/arrows.svg"
                        id={styles.next_slide_arrow}
                      />
                    </span>
                  </motion.div> */}
                </Col>
              </Row>
            </Col>
            {project !== undefined &&
            project.medias.length > 0 &&
            project.medias.find((media) => {
              return media.type === "footer";
            }) ? (
              <Col md={12} sm={12} xs={12} className={styles.info_container}>
                <Carousel indicators={false} pause={false} interval={3000}>
                  {project.medias.map((advertisement) => {
                    if (advertisement.type === "footer") {
                      return (
                        <Carousel.Item className={styles.carousel_item}>
                          <div
                            style={{
                              backgroundImage: `url(${advertisement.url_regular})`,
                            }}
                            className={styles.advertisement_blur}
                          ></div>
                          <img src={advertisement.url_regular} />
                        </Carousel.Item>
                      );
                    }
                  })}
                </Carousel>
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
      <style jsx global>{`
        #menu_items_carousel .carousel-control-prev {
          display: none !important;
        }
        .carousel-inner {
          border-radius: 5px !important;
        }
        .carousel-control-prev {
          background-color: var(--black);
          border-radius: 100%;
          width: 35px !important;
          height: 35px !important;
          top: 30% !important;
          left: 10px !important;
        }
        .carousel-control-prev-icon {
          background-image: url("/icons/back_carousel.svg");
        }
        .carousel-control-next {
          background-color: var(--black);
          border-radius: 100%;
          width: 35px !important;
          height: 35px !important;
          top: 30% !important;
          right: 10px !important;
        }
        .carousel-control-next-icon {
          background-image: url("/icons/next_carousel.svg");
        }
        .carousel-item:not(.active) {
          position: relative;
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectView;
