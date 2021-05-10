import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import styles from "./subscription_item.module.css";
import ModalEditSubscription from "../modals/modal_edit";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Subscription_item = (props) => {
  let subscription = props.subscription;
  let item = props.subscription.description;
  let editable = props.editable;

  const [open, setOpen] = useState(false);
  const indexLoading = useSelector(
    (store) => store.subscriptions.indexSubscription
  );
  const loadingAction = useSelector(
    (store) => store.subscriptions.loadingAction
  );

  const handleOpen = (value) => {
    setOpen(value);
  };
  return (
    <>
      {open ? (
        <Row>
          <Col className="center">
            <ModalEditSubscription
              subscription={subscription}
              editSubscription={props.editSubscription}
              deleteSubscription={props.deleteSubscription}
              open={open}
              handleOpen={handleOpen}
            />
          </Col>
        </Row>
      ) : null}

      <Row md={12} sm={12} xs={12}>
        <Col md={12} sm={12} xs={12} className={styles.responsive_center}>
          <div
            className={styles.subscription_cards}
            style={
              props.classes
                ? subscription.role === "Premium"
                  ? {
                      border: "solid 3px",
                      borderColor: "var(--main-color)",
                      backgroundColor: "rgba(235, 214, 184, 0.05)",
                      boxShadow: props.classes.boxShadow,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }
                  : {
                      boxShadow: props.classes.boxShadow,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }
                : null
            }
          >
            <Row md={12} sm={12} xs={12}>
              <Col md={12} sm={12} xs={12}>
                <Row>
                  <Col md={6} sm={6} xs={6}>
                    <p className={styles.subscription_name}>
                      {subscription.name}
                    </p>
                  </Col>

                  {indexLoading == "new" ? null : editable &&
                    loadingAction &&
                    subscription.id == indexLoading ? (
                    <Col md={6} sm={6} xs={6} className={styles.editContainer}>
                      <CircularProgress
                        size={23}
                        className="updating"
                        color={"primary"}
                        id={styles.updating_spinner}
                      />
                    </Col>
                  ) : editable && subscription.id !== indexLoading ? (
                    <Col md={6} sm={6} xs={6} className={styles.editContainer}>
                      <div
                        title="Editar Anuncio"
                        onClick={() => {
                          handleOpen(true);
                        }}
                        className={styles.edit_icon_container}
                      >
                        <div>
                          <img src="/icons/edit_item.svg" alt="done" />
                        </div>
                      </div>
                    </Col>
                  ) : null}
                </Row>
              </Col>
            </Row>
            <Col md={12} sm={12} xs={12} className="left">
              <p className={styles.subscription_total_price}>
                <span className={styles.subscription_dollar}>$</span>{" "}
                <span className={styles.subscription_price}>
                  {subscription.total}
                </span>{" "}
                /mes
              </p>
            </Col>
            <Col
              md={12}
              sm={12}
              xs={12}
              className="left"
              style={{ marginTop: "40px" }}
            >
              <ul className={styles.subscription_list}>
                {typeof item == "object"
                  ? item.map(function (description) {
                      return (
                        <li key={`${description.id}+${Math.random()}`}>
                          {" "}
                          {description}{" "}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </Col>
          </div>
        </Col>
      </Row>
    </>
  );
};
