// Import dependecias
import { Row, Col } from "react-bootstrap";

// Import componentes
import styles from "./styles.module.css";
import ModalEdit from "../modal_edit_item/modal_edit";

const ItemResume = ({ item_type, handleEdit, name, description }) => {
  return (
    <Row md={12} sm={12} xs={12}>
      <Col lg={10} md={11} sm={11} xs={11} className={styles.item_resume_card}>
        <Row md={12} sm={12} xs={12}>
          <Col
            md={7}
            sm={7}
            xs={7}
            className={`left`}
            style={{ position: "relative", top: 5 }}
          >
            <Row md={12} sm={12} xs={12}>
              <Col md={12} sm={12} xs={12}>
                <p className={styles.item_resume_name}>{name}</p>
              </Col>
              <Col md={12} sm={12} xs={12}>
                <p className={styles.item_resume_description}>{description}</p>
              </Col>
            </Row>
          </Col>
          <Col md={5} sm={5} xs={5} className={`right`}>
            <Row md={12} sm={12} xs={12}>
              <Col md={12} sm={12} xs={12} style={{ marginTop: 30 }}>
                {name !== undefined && description !== undefined && (
                  <ModalEdit
                    editItem={handleEdit}
                    name={name}
                    description={description}
                    item_type={item_type}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ItemResume;
