// Import dependencias
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";

// Import componentes
import styles from "./css/demo.module.css";
import Link from "next/link";

const Menu2 = () => {
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
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <div
              className={styles.menu_header_img}
              style={{ backgroundImage: "url(/images/demo/menu2/menu2.jpg)" }}
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
                <p className={styles.inter_menu_title}>Bebidas</p>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <p className={styles.inter_menu_desciption}>
                  Todo tipo de bebidas y tragos
                </p>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu2/beverage1.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Botella de vino - $200
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Botella de vino.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu2/beverage2.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Vaso de cerveza - $100
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Vaso de cerveza de 500.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu2/beverage3.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>Tragos - $150</p>
                  <p className={styles.inter_menu_item_description}>
                    Distintos tipos de tragos.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu2/beverage4.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>Gaseosas - $50</p>
                  <p className={styles.inter_menu_item_description}>
                    Bebida gaseosa linea Coca-Cola de 500.
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

export default Menu2;
