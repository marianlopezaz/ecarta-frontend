import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import styles from "../../pages/index.module.css";
import Arrow from "./arrow";

const TerceraSeccion = ({ isLoggedIn }) => {
  return (
    <Col md={12} sm={12} xs={12} style={{ marginTop: "10%" }}>
      <Row md={12} sm={12} xs={12} className={styles.responsive_container}>
        <Col lg={6} md={12} sm={12} xs={12} className="center">
          <img
            src="/images/landing/illustration1.png"
            alt="illustration1"
            id={styles.illustration1}
          />
        </Col>
        <Col
          lg={6}
          md={10}
          sm={12}
          xs={12}
          className="left"
          id={styles.third_section_text_container}
        >
          <Col md={12} sm={12} xs={12} className="left">
            <p className={styles.sections_title} style={{ fontWeight: "700" }}>
              Comunicá tus productos
            </p>
          </Col>
          <Col md={12} sm={12} xs={12} className="left">
            <p className={styles.describing_text}>
              Con e-cartaQR podrás compartir el código QR de tus ofertas y
              llegar a tus seguidores, en forma rápida y distinta. Podrás
              generar historias atractivas para mejorar el vínculo con tus
              clientes.
            </p>
          </Col>
          <Col
            md={12}
            sm={12}
            xs={12}
            className={styles.first_redirect_container}
          >
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
          </Col>
        </Col>
      </Row>
    </Col>
  );
};

export default TerceraSeccion;
