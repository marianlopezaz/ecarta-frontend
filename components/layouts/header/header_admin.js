// Import dependencias
import { Row, Col } from "react-bootstrap";
import Link from "next/link";

// Import componentes
import styles from "./header.module.css";
import MenuResponsive from "./modals/user_preview_responsive";
import MenuDesktop from "./modals/user_preview_desktop";
import { useState, useEffect } from "react";

const HeaderAdmin = (props) => {
  const [path, setPath] = useState();

  const selectedStyle = {
    borderBottom: "solid 2px",
    borderBottomWidth: "4px",
    borderOpacity: "1",
    borderBottomColor: "var(--pink)",
    transition: "all 0.5s",
  };
  const unSelectedStyle = {
    borderBottomColor: "#fff",
  };

  const router = props.router;

  useEffect(() => {
    setPath(router.route);
  }, [router.route]);

  return (
    <Row md={12} sm={12} xs={12} id={styles.header_container}>
      <Col
        md={2}
        className={`center ${styles.navigation_title}`}
        style={path == "/dashboard" ? selectedStyle : unSelectedStyle}
      >
        <Link href="/dashboard">
          <a title="Suscripciones">Suscripciones</a>
        </Link>
      </Col>

      <Col
        md={1}
        className={`center ${styles.navigation_title}`}
        style={
          path == "/dashboard/advertisement" ? selectedStyle : unSelectedStyle
        }
      >
        <Link href="/dashboard/advertisement">
          <a title="Anuncios">Anuncios</a>
        </Link>
      </Col>
      <Col
        md={1}
        className={`center ${styles.navigation_title}`}
        style={path == "/dashboard/clients" ? selectedStyle : unSelectedStyle}
      >
        <Link href="/dashboard/clients">
          <a title="Clientes">Clientes</a>
        </Link>
      </Col>
      <Col md={4} sm={8} xs={8} className={`center ${styles.navigation_logo}`}>
        <img src="/images/long_logo.svg" id={styles.logo_img} alt="logo" />
      </Col>
      <Col md={4} sm={4} xs={4} className={`center ${styles.menu_container}`}>
        <div id={styles.desktop_col}>
          <span className={styles.user_icon}>
            <MenuDesktop />
          </span>
        </div>
        <div id={styles.responsive_col}>
          <MenuResponsive />
        </div>
      </Col>
    </Row>
  );
};

export default HeaderAdmin;
