import React from "react";

// Import dependencias
import styles from "../../pages/index.module.css";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Arrow from "./arrow";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const User = () => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 0C7.85046 0 0 7.85046 0 17.5C0 27.1495 7.85046 35 17.5 35C27.1495 35 35 27.1495 35 17.5C35 7.85046 27.1495 0 17.5 0ZM17.5 32.9492C8.98126 32.9492 2.05078 26.0187 2.05078 17.5C2.05078 8.98126 8.98126 2.05078 17.5 2.05078C26.0187 2.05078 32.9492 8.98126 32.9492 17.5C32.9492 26.0187 26.0187 32.9492 17.5 32.9492Z"
        fill="var(--black)"
      />
      <path
        d="M17.5 18.457C21.4578 18.457 24.6777 15.2371 24.6777 11.2793C24.6777 7.32149 21.4578 4.10156 17.5 4.10156C13.5422 4.10156 10.3223 7.32149 10.3223 11.2793C10.3223 15.2371 13.5422 18.457 17.5 18.457ZM17.5 6.15234C20.327 6.15234 22.627 8.45229 22.627 11.2793C22.627 14.1063 20.327 16.4062 17.5 16.4062C14.673 16.4062 12.373 14.1063 12.373 11.2793C12.373 8.45229 14.673 6.15234 17.5 6.15234Z"
        fill="var(--black)"
      />
      <path
        d="M29.0287 22.9307C27.6661 21.3909 25.7065 20.5078 23.6523 20.5078H11.3477C9.29353 20.5078 7.33387 21.3909 5.97126 22.9307L5.48523 23.4799L5.84794 24.1174C8.22801 28.3001 12.6928 30.8984 17.5 30.8984C22.3072 30.8984 26.772 28.3001 29.1521 24.1173L29.5148 23.4799L29.0287 22.9307ZM17.5 28.8477C13.6899 28.8477 10.1335 26.9201 8.04023 23.7689C8.9598 22.9929 10.1306 22.5586 11.3477 22.5586H23.6523C24.8694 22.5586 26.0402 22.9929 26.9598 23.7689C24.8665 26.9201 21.3101 28.8477 17.5 28.8477Z"
        fill="var(--black)"
      />
    </svg>
  );
};

const ResponsiveMenu = ({ user }) => {
  const [open, setOpen] = React.useState(false);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleOpenMenu = () => {
    setOpen(true);
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseMenu}
        TransitionComponent={Transition}
      >
        <div id={styles.close_menu_container} title="Cerrar">
          <img
            id={styles.close_icon}
            src="/icons/close.svg"
            alt="close"
            onClick={handleCloseMenu}
          />
        </div>
        <DialogContent>
          <Row md={12} sm={12} xs={12} style={{ marginTop: 60 }}>
            {user !== undefined ? (
              !user.isLoggedIn ? (
                <>
                  <Col md={12} sm={12} xs={12} className="center">
                    <Link href="/login">
                      <a id={styles.ingresar_responsive}>Ingresar</a>
                    </Link>
                  </Col>
                  <Col
                    md={12}
                    sm={12}
                    xs={12}
                    className="center"
                    style={{ marginTop: 40 }}
                  >
                    <Link href="/register">
                      <a id={styles.register_responsive}>
                        Crear cuenta <Arrow />
                      </a>
                    </Link>
                  </Col>
                </>
              ) : (
                <>
                  <Col
                    md={12}
                    sm={12}
                    xs={12}
                    className="center"
                    id={styles.responsive_user_container}
                  >
                    <User />
                    <p id={styles.responsive_user_id}>
                      Bienvenido <span>{user.user.name}!</span>
                    </p>
                  </Col>
                  <Col
                    md={12}
                    sm={12}
                    xs={12}
                    className="center"
                    style={{ marginTop: 35 }}
                  >
                    <Link href="/dashboard">
                      <a id={styles.register_responsive}>
                        Entrar <Arrow />
                      </a>
                    </Link>
                  </Col>
                </>
              )
            ) : null}
          </Row>
          <div style={{ width: "100%", position: "absolute", bottom: "5%" }}>
            <div
              className="center"
              style={{ width: "100%", position: "relative", right: 20 }}
            >
              <p className={styles.responsive_socials}>
                <img src="/icons/instagram.svg" alt="instagram" />
              </p>
              <p className={styles.responsive_socials}>
                <img src="/icons/facebook.svg" alt="instagram" />
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <img
        src="/icons/menu_landing.svg"
        alt="menu"
        id={styles.menu}
        title="Abrir Menú"
        onClick={handleOpenMenu}
      />
      <style jsx global>{`
        .MuiPaper-root {
          background-color: rgba(255, 255, 255, 0.95) !important;
        }
        .MuiBackdrop-root {
          background-color: transparent !important;
        }
      `}</style>
    </>
  );
};

export default ResponsiveMenu;
