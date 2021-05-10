// Import dependencias
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";

// Import componentes
import styles from "./css/demo.module.css";
import Link from "next/link";

const Menu3 = () => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ x: 100, opacity: 0 }}
      style={{ overflowX: "hidden" }}
      className={styles.menu_background}
    >
      <Link href="/projects/demo" alt="volver">
        <a className={styles.go_back_link} title="Volver">
          <img src="/icons/arrows.svg" />
        </a>
      </Link>
      <div className={styles.menu_container}>
        <Row md={12} sm={12} xs={12}>
          <Col
            md={11}
            sm={11}
            xs={11}
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
          >
            <div
              className={styles.menu_header_img}
              style={{ backgroundImage: "url(/images/demo/menu3/menu3.jpg)" }}
            ></div>
          </Col>
          <Col
            md={11}
            sm={11}
            xs={11}
            className="center"
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
          >
            <Row md={12} sm={12} xs={12}>
              <Col md={12} sm={12} xs={12}>
                <p className={styles.inter_menu_title}>Hamburguesas</p>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <p className={styles.inter_menu_desciption}>
                  Hamburguesas de todo tipo
                </p>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu3/hamburguesa1.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Hamburguesa simple - $350
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Un medallon de carne, queso, lechuga y tomate. Acompañada
                    con guarnición.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu3/hamburguesa2.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Hamburguesa doble - $500
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Dos medallones de carne, queso, lechuga y tomate. Acompañada
                    con guarnición.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu3/hamburguesa3.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Hamburguesa simple con huevo- $400
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Un medallon de carne, queso, lechuga, tomate y huevo.
                    Acompañada con guarnición.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu3/hamburguesa4.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Hamburguesa completa - $600
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Dos medallones de carne, queso, lechuga, tomate y panceta.
                    Acompañada con guarnición.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
};

export default Menu3;
