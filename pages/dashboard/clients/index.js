import React, { useLayoutEffect } from "react";

// Import Dependencias
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import Alert from "react-s-alert";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "mui-datatables";

// Import de componentes
import styles from "./styles.module.css";
import api from "../../../utils/config";
import { getClients } from "../../../utils/client_crud";
import Loader from "../../../components/layouts/loader/loader_table";

// Import Redux
import { useDispatch } from "react-redux";
import { forcedLogout } from "../../../redux/actions/userActions";

const container = {
  hidden: { opacity: 1, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

const url = `${api.api_url}/user/list`;

const columns = [
  {
    name: "name",
    label: "Nombre",
  },
  {
    name: "role",
    label: "Suscripción",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value === "FREE") {
          return <p>Free</p>;
        } else {
          return <p>Premium</p>;
        }
      },
    },
  },
  {
    name: "status",
    label: "Estado",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value === "activo") {
          return <p className="active_client_status">ACTIVA</p>;
        } else if (value === "pendiente_de_pago") {
          return <p className="pending_client_status">PENDIENTE</p>;
        } else {
          return <p className="inactive_client_status">INACTIVA</p>;
        }
      },
    },
  },
];

const options = {
  downloadOptions: { filename: "Clientes E-carta.csv" },
  viewColumns: false,
  sort: false,
  selectableRowsHeader: false,
  selectableRows: "none",
  filter: false,
  textLabels: {
    body: {
      noMatch: "No se encontraron registros.",
    },
    pagination: {
      next: "Siguiente Página",
      previous: "Página Anterior",
      rowsPerPage: "Filas por página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
    },
  },
};

const Clients = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();
  let { data, isValidating } = useSWR(url, (url) =>
    getClients(url, user.user.auth_token).then((result) => {
      if (result.success == true) {
        return result.result;
      } else {
        if (result.unauthorized) {
          dispatch(forcedLogout()).then((status) => {
            if (status) {
              router.push("/login");
            }
          });
        }
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    })
  );

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
  }, []);

  return (
    <>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ scale: 0.95, opacity: 0 }}
        id="clients_container"
        style={{
          overflowX: "hidden",
        }}
      >
        <Row
          md={12}
          sm={12}
          xs={12}
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            color: "var(--black)",
          }}
        >
          <Col
            md={12}
            sm={12}
            xs={12}
            className="center"
            style={{ marginTop: 30 }}
          >
            <Row md={12} sm={12} xs={12}>
              <Col lg={6} md={6} sm={8} xs={9} className="center">
                {!isValidating ? (
                  <p id={styles.title_name}>CLIENTES</p>
                ) : (
                  <div id={styles.updating_container}>
                    <CircularProgress
                      size={23}
                      className="updating"
                      color={"primary"}
                      id={styles.updating_spinner}
                    />
                    <span id={styles.updating_text}>Actualizando...</span>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
          <Col
            md={12}
            sm={12}
            xs={12}
            className="center"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <motion.div variants={container} initial="hidden" animate="visible">
              <Row md={12} sm={12} xs={12} style={{ margin: 0 }}>
                {data === undefined ? (
                  <Col
                    md={11}
                    sm={11}
                    xs={12}
                    className="center"
                    style={{
                      marginTop: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <Loader />
                  </Col>
                ) : (
                  <>
                    <Col
                      md={11}
                      sm={11}
                      xs={12}
                      className="center"
                      style={{ marginLeft: "auto", marginRight: "auto" }}
                    >
                      <motion.div variants={item} key={1}>
                        <Row md={12} sm={12} xs={12} style={{ margin: 0 }}>
                          <Col
                            md={5}
                            sm={5}
                            xs={11}
                            className={`center ${styles.totals_cards}`}
                          >
                            <img src="/icons/free.svg" />
                            <div>
                              <p className={styles.totals_name}>Free</p>
                              <p className={styles.totals_amount}>
                                {data.free_count}
                              </p>
                            </div>
                          </Col>
                          <Col
                            md={5}
                            sm={5}
                            xs={11}
                            className={`center ${styles.totals_cards}`}
                          >
                            <img src="/icons/paid.svg" />
                            <div>
                              <p className={styles.totals_name}>Premium</p>
                              <p className={styles.totals_amount}>
                                {data.premium_count}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </motion.div>
                    </Col>
                    <Col
                      md={11}
                      sm={11}
                      xs={11}
                      className="center"
                      style={{
                        marginTop: 20,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 30,
                      }}
                    >
                      <motion.div variants={item} key={3}>
                        <MUIDataTable
                          title={"Clientes"}
                          data={data.users}
                          columns={columns}
                          options={options}
                        />
                      </motion.div>
                    </Col>
                  </>
                )}
              </Row>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </>
  );
};

export default Clients;
