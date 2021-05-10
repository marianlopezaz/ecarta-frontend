// Landing view
import React from "react";

// Import dependencias
import { Row } from "react-bootstrap";

// Import componentes
import styles from "./index.module.css";
import { motion } from "framer-motion";
import Hero from "../components/landing/hero";
import SegundaSeccion from "../components/landing/second_section";
import TerceraSeccion from "../components/landing/third_section";
import CuartaSeccion from "../components/landing/quarter_section";
import QuintaSeccion from "../components/landing/fifth_section";
import SextaSeccion from "../components/landing/sixth_section";
import SeptimaSeccion from "../components/landing/seventh_section";
import Footer from "../components/landing/footer_section";
import NavBar from "../components/landing/navbar";

// Import Redux
import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((store) => store.user);
  user.isLoading = false;
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ scale: 0.95, opacity: 0 }}
      style={{ overflowX: "hidden" }}
    >
      <img
        src="/images/landing/hero_background.png"
        alt="background"
        id={styles.hero_background}
      />
      <Row
        md={12}
        sm={12}
        xs={12}
        style={{ paddingLeft: 15, color: "var(--black)" }}
      >
        {/* NavBar */}
        <NavBar user={user} />
        {/* Seccion portada */}
        <Hero isLoggedIn={user.isLoggedIn} />
        {/* Seccion como usar el sistema */}
        <SegundaSeccion />
        {/* Seccion comunica tus productos */}
        <TerceraSeccion isLoggedIn={user.isLoggedIn} />
        {/* Seccion beneficios */}
        <CuartaSeccion />
        {/* Seccion suscripciones */}
        <QuintaSeccion />
        {/* Seccion empezar ahora */}
        <SextaSeccion isLoggedIn={user.isLoggedIn} />
        {/* seccion FAQs */}
        <SeptimaSeccion />
        {/* Footer */}
        <Footer />
      </Row>
    </motion.div>
  );
}
