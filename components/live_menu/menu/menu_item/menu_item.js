// Import dependencias
import { Row, Col } from "react-bootstrap";

// Import componentes
import styles from "../../../../pages/projects/[qr]/[menu_id]/styles.module.css";

const MenuItem = ({ item }) => {
  return (
    <Col md={12} sm={12} xs={12} style={{ marginBottom: 5, height: 70 }}>
      <div
        className={styles.inter_menu_picture}
        style={
          item.media.length > 0
            ? {
                backgroundImage: `url(${item.media[0].url_regular})`,
              }
            : {
                width: 0,
              }
        }
      ></div>
      <div className={styles.inter_items_container}>
        <p className={styles.inter_menu_item_title}>
          {item.name} - ${item.price}
        </p>
        <p className={styles.inter_menu_item_description}>{item.description}</p>
      </div>
    </Col>
  );
};

export default MenuItem;
