// Import dependencias
import { Row, Col } from "react-bootstrap";
import Link from "next/link";

// Import componentes
import styles from "../../pages/index.module.css";
import Menu from "./responsive_menu";
import Arrow from "./arrow";

const NavBar = ({ user }) => {
  return (
    <Col md={12} sm={12} xs={12} id={styles.nav_container}>
      <Row md={12} sm={12} xs={12}>
        <Col
          md={6}
          sm={6}
          xs={6}
          className="left"
          style={{ position: "relative", top: 20, left: "12%" }}
          id={styles.logo_img_container}
        >
          <Link href="/">
            <img src="/images/long_logo.svg" id={styles.logo_img} alt="logo" />
          </Link>
        </Col>
        {/* Desktop Col */}
        <Col
          md={6}
          sm={6}
          xs={6}
          className="center"
          id={styles.desktop_menu_container}
          style={{ position: "relative", top: 20 }}
        >
          {user !== undefined ? (
            !user.isLoggedIn ? (
              <>
                <div className={styles.nav_link_login} title="Iniciar Sesión">
                  <Link href="/login">Iniciar Sesión</Link>
                </div>
                <div className={styles.nav_link_register}>
                  <Link href="/register">
                    <span title="Crear Cuenta">
                      Crear cuenta <Arrow />
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "inline-block" }}></div>
                <div className={styles.nav_link_register}>
                  <Link href="/dashboard">
                    <span title="Entrar">
                      Entrar <Arrow />
                    </span>
                  </Link>
                </div>
              </>
            )
          ) : null}
        </Col>
        {/* Responsive Col */}
        <Col
          md={6}
          sm={6}
          xs={6}
          className="center"
          id={styles.responsive_menu_container}
        >
          <Menu user={user} />
        </Col>
        {/* Respomsive background */}
        <img src='/images/landing/responsive_border.png' id={styles.responsive_navbar_background}/>
      </Row>
    </Col>
  );
};

export default NavBar;
