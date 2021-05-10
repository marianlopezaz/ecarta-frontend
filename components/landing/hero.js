import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../../pages/index.module.css";
import Arrow from "./arrow";

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
  hidden: { x: -150, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Hero = ({ isLoggedIn }) => {
  const handleZoomStart = () => {
    const qr = document.getElementById("zoomed_img");
    qr.style.display = "initial";
  };

  const handleZoomEnd = () => {
    const qr = document.getElementById("zoomed_img");
    qr.style.display = "none";
  };

  return (
    <Col md={12} sm={12} xs={12} style={{ marginTop: 50 }}>
      <Row md={12} sm={12} xs={12} className={styles.responsive_container}>
        <Col
          md={6}
          sm={12}
          xs={12}
          className="left"
          id={styles.right_hero_container}
        >
          <motion.div variants={container} initial="hidden" animate="visible">
            <Col md={12} sm={12} xs={12} className="left">
              <motion.p variants={item} key="1" className={styles.first_text}>
                No imprimás más tus cartas,
              </motion.p>
            </Col>
            <Col md={12} sm={12} xs={12} className="left">
              <motion.p
                variants={item}
                key="2"
                className={styles.highlighted_text}
              >
                con e-cartasQR compartí tu menú en un mismo QR.
              </motion.p>
            </Col>
            <Col md={12} sm={12} xs={12} className="left">
              <motion.p
                variants={item}
                key="3"
                className={styles.describing_text}
              >
                Tus visitantes solo escanean el código QR para ver la carta
                digital de tu restaurante. ¡Así de fácil!
              </motion.p>
            </Col>
            <Col
              md={12}
              sm={12}
              xs={12}
              className={styles.first_redirect_container}
            >
              <motion.div variants={item} key="4">
                <Link href="/projects/demo">
                  <a id={styles.see_demo}>Ver demo</a>
                </Link>
                {!isLoggedIn ? (
                  <Link href="/register">
                    <a className={styles.start_now}>
                      Empezar <Arrow />
                    </a>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <a className={styles.start_now}>
                      Empezar <Arrow />
                    </a>
                  </Link>
                )}
              </motion.div>
            </Col>
          </motion.div>
        </Col>
        <Col
          md={6}
          sm={12}
          xs={12}
          className="center"
          id={styles.first_image_container}
        >
          <motion.img
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ x: 150, opacity: 0 }}
            src="/images/landing/hero_carta.png"
            alt="hero"
            style={{ cursor: "pointer" }}
            onHoverStart={handleZoomStart}
            id={styles.first_image}
          />
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/images/landing/big_qr.png"
            id="zoomed_img"
            className={styles.styled_zoomed_img}
            onHoverEnd={handleZoomEnd}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default Hero;
