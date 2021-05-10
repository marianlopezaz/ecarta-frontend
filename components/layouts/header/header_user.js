// Import dependencias
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";

// Import componentes
import styles from "./header.module.css";
import MenuResponsive from "./modals/user_preview_responsive";
import MenuDesktop from "./modals/user_preview_desktop";

const HeaderUser = (props) => {


  return (

    <Row md={12} sm={12} xs={12} id={styles.header_container}>
      <Col md={4} className={`center ${styles.navigation_title}`} >
        <Link href="/dashboard">
          <a title="Ver todos los restaurantes">Restaurantes</a>
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

export default HeaderUser;
