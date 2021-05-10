import styles from "./styles.module.css";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// Import componentes
import QRModal from "../modal_qr_view/modal_qr_view";

const ProjectItem = ({ project, deleteLocalProject }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = (project_id) => {
    deleteLocalProject(project_id);
  };

  return (
    <Row md={12} sm={12} xs={12}>
      <Col lg={8} md={10} sm={11} xs={11} className={styles.restaurant_card}>
        <img
          src="/icons/close.svg"
          alt="delete"
          className={styles.delete_btn}
          title="Eliminar Restaurante"
          onClick={handleDelete.bind(this, project.id)}
        />
        <Row lg={12} md={12} sm={12} xs={12}>
          <Link
            href="/dashboard/[project_id]/[project_name]"
            as={`/dashboard/${project.id}/${project.name}`}
          >
            <Col
              lg={6}
              md={12}
              sm={12}
              xs={12}
              title="Editar Restaurante"
              className="left"
            >
              <Row lg={12} md={12} sm={12} xs={12}>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <p className={styles.restaurant_name}>{project.name}</p>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <p className={styles.restaurant_description}>
                    {project.description}
                  </p>
                </Col>
              </Row>
            </Col>
          </Link>
          <Col lg={6} md={12} sm={12} xs={12} className="right">
            <Row lg={12} md={12} sm={12} xs={12}>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ position: "relative", top: 10 }}
                className={styles.restaurant_options_desktop}
              >
                <Row lg={12} md={12} sm={12} xs={12}>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={styles.options_inter_cols}
                  >
                    <Link
                      href="/dashboard/[project_id]/[project_name]"
                      as={`/dashboard/${project.id}/${project.name}`}
                    >
                      {!fullScreen ? (
                        <a
                          className={styles.actions_btn}
                          title="Ver Restaurate"
                        >
                          Ver
                        </a>
                      ) : (
                        <a className={styles.icons_btn} title="Ver Restaurate">
                          <img src="/icons/edit.svg" alt="edit" />
                        </a>
                      )}
                    </Link>
                    <QRModal project={project} />
                    <Link href="/projects/[qr]" as={`/projects/${project.qr}`}>
                      {!fullScreen ? (
                        <a className={styles.actions_btn} title="Ver URL">
                          Vista Previa
                        </a>
                      ) : (
                        <a className={styles.icons_btn} title="Ver URL">
                          <img src="/icons/preview.svg" alt="preview" />
                        </a>
                      )}
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProjectItem;
