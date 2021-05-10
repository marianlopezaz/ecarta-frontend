import { Row, Col } from "react-bootstrap";
import styles from "../../pages/index.module.css";
import useSWR from "swr";
import Alert from "react-s-alert";

import { getSubscription } from "../../utils/subscription_crud";
import { motion } from "framer-motion";

import api from "../../utils/config";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { Subscription_item } from "../subscriptions/subscription_item/subscription_item";

const item = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

const QuintaSeccion = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const url = `${api.api_url}/subscription`;

  const [data, setData] = useState([]);

  useSWR(url, (url) => {
    getSubscription(url, user.user.auth_token).then((result) => {
      if (result.success == true) {
        setData(result.result);
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    });
  });

  return (
    <Col
      md={12}
      sm={12}
      xs={12}
      style={{
        marginTop: "5%",
        background:
          "linear-gradient(180deg, rgba(234, 234, 234, 0) 0%, #F0F0F0 44.27%, #F0F0F0 62.5%, rgba(234, 234, 234, 0) 100%)",
      }}
    >
      <Row md={12} sm={12} xs={12} className={styles.responsive_container}>
        <Col md={12} sm={12} xs={12} className="center">
          <p
            className={styles.sections_title}
            style={{
              fontWeight: "700",
              marginTop: "4%",
              marginBottom: "6%",
            }}
          >
            ¡Empezá ya mismo!
          </p>
        </Col>
        <Col
          md={12}
          sm={12}
          xs={12}
          className="center"
          style={{
            paddingBottom: "5%",
          }}
        >
          <Row
            md={12}
            sm={12}
            xs={12}
            className="center"
            style={{ justifyContent: "center" }}
          >
            {(data || []).length == 0 ? (
              <>
                <Col lg={12} md={12} sm={12} xs={12} className="center">
                  <p className="default_text">
                    Por el momento no tenemos planes activos, te mantendremos al
                    tanto!
                  </p>
                </Col>
              </>
            ) : (
              <>
                {(data || []).map((subscription) => (
                  <Col lg={4} md={6} sm={6} xs={12} key={subscription.id}>
                    <motion.div variants={item} key={subscription.id}>
                      <Subscription_item
                        subscription={subscription}
                        classes={{
                          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </motion.div>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default QuintaSeccion;
