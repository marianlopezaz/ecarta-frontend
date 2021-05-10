import { Row, Col } from "react-bootstrap";
import styles from "../../pages/index.module.css";

const SeptimaSeccion = () => {
  return (
    <Col md={12} sm={12} xs={12} style={{ marginTop: "8%" }}>
      <Row md={12} sm={12} xs={12} className={styles.responsive_container}>
        <Col lg={6} md={12} sm={12} xs={12} className="left">
          <Col
            md={12}
            sm={12}
            xs={12}
            className="left"
            id={styles.faq_title_container}
          >
            <p className={styles.sections_title} style={{ fontWeight: "700" }}>
              Algunas inquietudes de nuestros clientes
            </p>
          </Col>
          <Col
            md={12}
            sm={12}
            xs={12}
            className={`left ${styles.faq_text_container}`}
            style={{ marginLeft: "auto", marginRight: "auto", width: "90%" }}
          >
            <p className={styles.faq_titles} style={{ fontStyle: "italic" }}>
              No tengo digitalizado mi menú. ¿Debo contratar a un diseñador para
              que lo haga?
            </p>
            <p className={styles.describing_text}>
              Sería muy bueno que lo confecciones en modo profesional, pero si
              querés y tenés buenas fotos de tus menús, podrías usar
              directamente la plantilla de cartas que ofrece la plataforma.
            </p>
          </Col>
          <Col
            md={12}
            sm={12}
            xs={12}
            className={`${styles.first_redirect_container} ${styles.faq_text_container}`}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "90%",
            }}
          >
            <p className={styles.faq_titles} style={{ fontStyle: "italic" }}>
              ¿Cuántos productos se podrían incluir en la plantilla que ofrece
              la plataforma?
            </p>
            <p className={styles.describing_text}>
              No hay límites para la cantidad de productos que podrás incluir,
              además que los podés ordenar para que aparezcan en el orden que
              quieras.
            </p>
          </Col>
          <Col
            md={12}
            sm={12}
            xs={12}
            className={`${styles.first_redirect_container} ${styles.faq_text_container}`}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "90%",
            }}
          >
            <p className={styles.faq_titles} style={{ fontStyle: "italic" }}>
              ¿El único formato para subir mi menú es PDF?
            </p>
            <p className={styles.describing_text}>
              No, podes hacerlo en formato PDF o imagen JPG, JGEG o PNG, además
              de generarlo vos en el dashboard de administración. Te
              recomendamos que entrés con una cuenta gratis y pruebes, luego te
              pasas a Premium para más beneficios.
            </p>
          </Col>
        </Col>
        <Col
          lg={6}
          md={12}
          sm={12}
          xs={12}
          className="center"
          style={{ position: "relative", top: "20%" }}
        >
          <img
            src="/images/landing/illustration2.png"
            alt="illustration2"
            id={styles.illustration2}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default SeptimaSeccion;
