/**
 * Pagina demo estatica del sistema
 */
import React from "react";

//  Import dependencias
import { motion } from "framer-motion";
import { Row, Col, Carousel } from "react-bootstrap";
import Link from "next/link";

// Import componentes
import styles from "./css/demo.module.css";

const Demo = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ x: -100, opacity: 0 }}
      style={{ overflowX: "hidden" }}
    >
      <Row md={12} sm={12} xs={12} id={styles.menu_background}>
        <Col
          md={11}
          sm={11}
          xs={11}
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
        >
          <Link href="/">
            <a id={styles.home_redirect}>
              <img src="/icons/home.svg" /> Inicio
            </a>
          </Link>
        </Col>
        <Col md={6} sm={8} xs={10} id={styles.menu_container}>
          <Row md={12} sm={12} xs={12}>
            <Col md={12} sm={12} xs={12} className={styles.info_container}>
              <Carousel indicators={false} pause={false}>
                <Carousel.Item className={styles.carousel_item_header}>
                  <Carousel.Caption className={styles.carousel_caption}>
                    <p style={{ marginTop: 18, marginBottom: 10 }}>
                      Tu publicidad o foto deseada
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={styles.carousel_item_header}>
                  <Carousel.Caption className={styles.carousel_caption}>
                    <p style={{ marginTop: 18, marginBottom: 10 }}>
                      Tu publicidad o foto deseada
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
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
                  <img src="/images/logo.svg" id={styles.logo_img} />
                </Col>
                <Col md={12} sm={12} xs={12} className={styles.info_container}>
                  <p className={styles.restaurant_title}>E-carta Restaurante</p>
                </Col>
                <Col md={12} sm={12} xs={12} className={styles.info_container}>
                  <p className={styles.restaurant_desciption}>
                    Usamos e-cartaQR para mostrarte nuestro menú!
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
                  <Carousel
                    indicators={false}
                    id="menu_items_carousel"
                    pause={false}
                    interval={7000}
                  >
                    <Carousel.Item>
                      <Link href="/projects/demo/menu1" alt="menu1">
                        <a>
                          <div
                            className={styles.menu_img}
                            style={{
                              backgroundImage:
                                "url(/images/demo/menu1/menu1.jpg)",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                          ></div>
                          <p className={styles.menu_item_title}>
                            Comida Oriental
                          </p>
                          <p className={styles.menu_item_desciption}>
                            Tenemos sushi y todo tipo de comida oriental.
                          </p>
                        </a>
                      </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Link href="/projects/demo/menu2" alt="menu2">
                        <a>
                          <div
                            className={styles.menu_img}
                            style={{
                              backgroundImage:
                                "url(/images/demo/menu2/menu2.jpg)",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                          ></div>
                          <p className={styles.menu_item_title}>Bebidas</p>
                          <p className={styles.menu_item_desciption}>
                            Todo tipo de bebidas y tragos.
                          </p>
                        </a>
                      </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Link href="/projects/demo/menu3" alt="menu3">
                        <a>
                          <div
                            className={styles.menu_img}
                            style={{
                              backgroundImage:
                                "url(/images/demo/menu3/menu3.jpg)",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                          ></div>
                          <p className={styles.menu_item_title}>Hamburguesas</p>
                          <p className={styles.menu_item_desciption}>
                            Hamburguesas de todo tipo.
                          </p>
                        </a>
                      </Link>
                    </Carousel.Item>
                  </Carousel>
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
            <Col md={12} sm={12} xs={12} className={styles.info_container}>
              <Carousel indicators={false} pause={false}>
                <Carousel.Item className={styles.carousel_item_footer}>
                  <Carousel.Caption className={styles.carousel_caption}>
                    <p style={{ marginTop: 18, marginBottom: 10 }}>
                      Tu publicidad o foto deseada
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={styles.carousel_item_footer}>
                  <Carousel.Caption className={styles.carousel_caption}>
                    <p style={{ marginTop: 18, marginBottom: 10 }}>
                      Tu publicidad o foto deseada
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
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

export default Demo;
