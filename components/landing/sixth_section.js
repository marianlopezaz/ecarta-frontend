import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import styles from "../../pages/index.module.css";
import Arrow from "./arrow";

const SextaSeccion = ({ isLoggedIn }) => {
  return (
    <Col md={12} sm={12} xs={12} style={{ marginTop: "5%" }}>
      <Row md={12} sm={12} xs={12} className={styles.responsive_container}>
        <Col md={12} sm={12} xs={12} className="center">
          <p className={styles.principal_text}>Comenzá tu prueba gratis</p>
        </Col>
        <Col md={12} sm={12} xs={12} className="center">
          <p
            className={styles.describing_text}
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Si tenés un restó, bar, drugstore, servi-centro, restaurante con
            menú ejecutivo o cualquier lugar que necesites tener una lista de
            precio, activá tu cuenta y arrancá ya mismo. En 5 tenés tu lista de
            precios en código QR.
          </p>
        </Col>
        <Col md={12} sm={12} xs={12} className={styles.last_redirect_container}>
          {!isLoggedIn ? (
            <Link href="/register">
              <a>
                Empezar <Arrow />
              </a>
            </Link>
          ) : (
            <Link href="/dashboard">
              <a>
                Empezar <Arrow />
              </a>
            </Link>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default SextaSeccion;
