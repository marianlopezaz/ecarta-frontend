// Import dependencias
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";

// Import componentes
import styles from "./css/demo.module.css";
import Link from "next/link";

const Menu1 = () => {
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
              style={{ backgroundImage: "url(/images/demo/menu1/menu1.jpg)" }}
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
                <p className={styles.inter_menu_title}>Comida Oriental</p>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <p className={styles.inter_menu_desciption}>
                  Sushi y todo tipo de comida oriental
                </p>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu1/sushi.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Tabla de sushi - $1000
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Tabla de sushi con 40 piezas, para compartir.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu1/sushi2.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Wok de mariscos - $500
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Incluye camarones, langostinos y verdes.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu1/wrap.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Wrap oriental- $450
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    2 Wraps con mariscos, arroz oriental y verdes.
                  </p>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <div
                  className={styles.inter_menu_picture}
                  style={{
                    backgroundImage: "url(/images/demo/menu1/chinese.jpg)",
                  }}
                ></div>
                <div className={styles.inter_items_container}>
                  <p className={styles.inter_menu_item_title}>
                    Wok de salmón - $600
                  </p>
                  <p className={styles.inter_menu_item_description}>
                    Incluye salmón fresco y ahumado, con verdes.
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

export default Menu1;
