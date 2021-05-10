import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../../pages/index.module.css";

const container = {
  hidden: { opacity: 1, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 150, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const SecondSection = () => {
  return (
    <Col md={12} sm={12} xs={12} id={styles.second_section_container}>
      <Row md={12} sm={12} xs={12} className={styles.responsive_container}>
        <Col md={12} sm={12} xs={12} className="center">
          <motion.p
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ x: -200, opacity: 0 }}
            className={styles.sections_title}
            style={{ fontWeight: "700" }}
          >
            ¿Cómo crear un código QR con un menú con e-carta?
          </motion.p>
        </Col>
        <Col md={12} sm={12} xs={12} className="center">
          <motion.p
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ x: 200, opacity: 0 }}
            className={styles.describing_text}
          >
            Sólo con 3 simples pasos, tendras un menú digital en un mismo QR.
          </motion.p>
        </Col>
      </Row>
      <motion.div variants={container} initial="hidden" animate="visible">
        <Row md={12} sm={12} xs={12} style={{ marginTop: "5%" }}>
          <Col md={4} sm={12} xs={12} className="center">
            <motion.div variants={item} key="5">
              <Row md={12} sm={12} xs={12}>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className={`center ${styles.list_icon_container}`}
                >
                  <div>
                    <img src="/icons/create.svg" alt="create" />
                  </div>
                </Col>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className="center"
                  style={{ marginTop: 10 }}
                >
                  <p className={styles.list_title}>Creá tu menú</p>
                </Col>
                <Col md={12} sm={12} xs={12} className="center">
                  <p className={styles.list_description}>
                    Formulario de creación. Fotos, descripción y precio.
                  </p>
                </Col>
              </Row>
            </motion.div>
          </Col>
          <Col md={4} sm={12} xs={112} className="center">
            <motion.div variants={item} key="6">
              <Row md={12} sm={12} xs={12}>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className={`center ${styles.list_icon_container}`}
                >
                  <div>
                    <img src="/icons/upload.svg" alt="create" />
                  </div>
                </Col>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className="center"
                  style={{ marginTop: 10 }}
                >
                  <p className={styles.list_title}>Subí tu carta</p>
                </Col>
                <Col md={12} sm={12} xs={12} className="center">
                  <p className={styles.list_description}>
                    Si ya la creaste, dale click en guardar. Si ya tenés carta,
                    solo subi el archivo.
                  </p>
                </Col>
              </Row>
            </motion.div>
          </Col>
          <Col md={4} sm={12} xs={12} className="center">
            <motion.div variants={item} key="7">
              <Row md={12} sm={12} xs={12}>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className={`center ${styles.list_icon_container}`}
                >
                  <div>
                    <img src="/icons/qr.svg" alt="create" />
                  </div>
                </Col>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className="center"
                  style={{ marginTop: 10 }}
                >
                  <p className={styles.list_title}>Imprimí el código QR</p>
                </Col>
                <Col md={12} sm={12} xs={12} className="center">
                  <p className={styles.list_description}>
                    Imprimí y listo, podés publicar en tus redes.
                  </p>
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </Col>
  );
};

export default SecondSection;
