// Import dependencias
import { Row } from "react-bootstrap";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import Componentes
import styles from "./header.module.css";
import HeaderUser from "./header_user";
import HeaderAdmin from "./header_admin";


const Header = ({router}) => {
  const user = useSelector(store => store.user)
  const [role, setRole] = useState();


  useEffect(() => {
    setRole(user.user.role)
  }, [user])

  return role === "user" ? (
    /* HEADER USER */
    <HeaderUser/>
  ) : role === "admin" ? (
    /* HEADER ADMIN */
    <HeaderAdmin router={router}/>
  ) : (
    <Row md={12} sm={12} xs={12} id={styles.header_container}></Row>
  );
};

export default withRouter(Header);
