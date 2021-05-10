import { Row, Col } from "react-bootstrap";
import styles from "../../pages/index.module.css";

const CuartaSeccion = () => {
  return (
    <Col md={12} sm={12} xs={12} style={{ marginTop: "8%" }}>
      <Row md={12} sm={12} xs={12} className={styles.responsive_container}>
        <Col
          md={11}
          sm={11}
          xs={11}
          style={{
            background: "var(--black)",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 30,
            paddingBottom: "4%",
          }}
        >
          <Row md={12} sm={12} xs={12}>
            <Col md={12} sm={12} xs={12} className="center">
              <p
                className={styles.sections_title}
                style={{
                  fontWeight: "700",
                  color: "#fff",
                  marginTop: "4%",
                  marginBottom: "5%",
                }}
              >
                ¡Hacemos todo más fácil!
              </p>
            </Col>
            <Col
              md={12}
              sm={12}
              xs={12}
              className="center"
              style={{
                color: "#fff",
              }}
            >
              <Row md={12} sm={12} xs={12}>
                <Col lg={3} md={6} sm={6} xs={12} className="center">
                  <Row md={12} sm={12} xs={12}>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className={`center ${styles.list_icon_container}`}
                    >
                      <div style={{ background: "#fff" }}>
                        <img src="/icons/recycle.svg" alt="create" />
                      </div>
                    </Col>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className="center"
                      style={{ marginTop: 10 }}
                    >
                      <p className={styles.list_title}>QR reutilizable</p>
                    </Col>
                    <Col md={12} sm={12} xs={12} className="center">
                      <p
                        className={styles.list_description}
                        style={{ width: "90%" }}
                      >
                        Cambiá el contenido del código QR tantas veces como lo
                        necesites.
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={3} md={6} sm={6} xs={12} className="center">
                  <Row md={12} sm={12} xs={12}>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className={`center ${styles.list_icon_container}`}
                    >
                      <div style={{ background: "#fff" }}>
                        <img src="/icons/like.svg" alt="create" />
                      </div>
                    </Col>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className="center"
                      style={{ marginTop: 10 }}
                    >
                      <p className={styles.list_title}>Seguro y práctico</p>
                    </Col>
                    <Col md={12} sm={12} xs={12} className="center">
                      <p
                        className={styles.list_description}
                        style={{ width: "90%" }}
                      >
                        Sorprendé a tus clientes y ofreceles tu carta de manera
                        rápida y segura.
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={3} md={6} sm={6} xs={12} className="center">
                  <Row md={12} sm={12} xs={12}>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className={`center ${styles.list_icon_container}`}
                    >
                      <div style={{ background: "#fff" }}>
                        <img src="/icons/environment.svg" alt="create" />
                      </div>
                    </Col>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className="center"
                      style={{ marginTop: 10 }}
                    >
                      <p className={styles.list_title}>
                        Contribuye con el medio ambinte
                      </p>
                    </Col>
                    <Col md={12} sm={12} xs={12} className="center">
                      <p
                        className={styles.list_description}
                        style={{ width: "90%" }}
                      >
                        No genera desperdicio de papel.
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={3} md={6} sm={6} xs={12} className="center">
                  <Row md={12} sm={12} xs={12}>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className={`center ${styles.list_icon_container}`}
                    >
                      <div style={{ background: "#fff" }}>
                        <img src="/icons/social-distancing.svg" alt="create" />
                      </div>
                    </Col>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className="center"
                      style={{ marginTop: 10 }}
                    >
                      <p className={styles.list_title}>
                        Cumple con el distanciamiento social
                      </p>
                    </Col>
                    <Col md={12} sm={12} xs={12} className="center">
                      <p
                        className={styles.list_description}
                        style={{ width: "90%" }}
                      >
                        Cumplí con los protocolos de higiene y distanciamiento
                        social.
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default CuartaSeccion;
