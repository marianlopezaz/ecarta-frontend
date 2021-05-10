import { Row, Col } from "react-bootstrap";
import styles from "../../pages/index.module.css";

const Footer = () => {
  return (
    <Col md={12} sm={12} xs={12} style={{ marginTop: "8%" }}>
      <Row md={12} sm={12} xs={12}>
        <Col
          md={12}
          sm={12}
          xs={12}
          style={{
            background: "var(--black)",
            color: "#fff",
            padding: 10,
          }}
        >
          <Row md={12} sm={12} xs={12}>
            <Col md={12} sm={12} xs={12} className="center">
              <p className={styles.socials}>
                <img src="/icons/instagram.svg" alt="instagram" />
              </p>
              <p className={styles.socials}>
                <img src="/icons/facebook.svg" alt="instagram" />
              </p>
            </Col>
            <Col md={12} sm={12} xs={12} className="center">
              <p style={{ fontSize: 12 }}>Copyright © 2020 Proline SI.</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Footer;
