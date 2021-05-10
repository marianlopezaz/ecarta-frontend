import React from "react";
import styles from "./preview_modal_add_responsive.module.css";
import { Row, Col } from "react-bootstrap";

export const SubscriptionPreviewResponsive = (props) => {
  let subscription = props.subscription;
  let item = props.subscription.description;
  let open = props.open;
  let newItem = props.newDescription;
  return (
    <div className={styles.container} hidden={!open}>
      <Row md={12} sm={12} xs={12}>
        <Col md={12} sm={12} xs={12}>
          <div className={styles.subscription_cards}>
            <div className={styles.subscription_name}>{subscription.name}</div>
            <div className={styles.subscription_total_price}>
              <span className={styles.subscription_dollar}>$</span>{" "}
              <span className={styles.subscription_price}>
                {subscription.total}
              </span>
              <span className={styles.permonth}>/mes</span>
            </div>

            <div md={12} sm={12} xs={12} className="left">
              <ul className={styles.subscription_list}>
                {item.map(function (description) {
                  return description != "" ? (
                    <li key={`${description.id}+${Math.random()}`}>
                      {" "}
                      {description}{" "}
                    </li>
                  ) : null;
                })}

                {newItem !== "" ? <li>{newItem}</li> : null}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
