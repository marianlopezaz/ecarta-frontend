import React, { useRef, useState, useEffect } from "react";

// Import dependencias
import { Row, Col } from "react-bootstrap";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// Import componentes
import styles from "./styles.module.css";

const renderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

const AdvertisementView = ({ menuShow, advertisement }) => {
  const [showTimer, setShowTimer] = useState(false);

  const openTimer = () => {
    setShowTimer(true);
  };

  const showMenu = () => {
    menuShow();
  };

  return (
    <Row style={{ width: "100%", margin: 0 }} md={12} sm={12} xs={12}>
      <Col
        className="center"
        md={12}
        sm={12}
        xs={12}
        style={
          advertisement.type === "image"
            ? { backgroundImage: `url(${advertisement.url_regular})` }
            : { backgroundColor: "var(--black)" }
        }
        id={styles.advertisement_img_container}
      ></Col>
      {console.log(advertisement)}
      {showTimer && (
        <div id={styles.countdown_container}>
          <CountdownCircleTimer
            onComplete={showMenu}
            size={28}
            strokeWidth={2}
            isPlaying
            duration={advertisement.time}
            colors={[["#292d34"]]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      )}
      {advertisement.type === "video" ? (
        <video
          src={advertisement.url_regular}
          autoPlay
          muted
          loop
          controls={true}
          playsInline
          type="video/mp4"
          onLoadedData={openTimer}
          className={styles.advertisement_video}
        />
      ) : (
        <img
          onLoad={openTimer}
          src={advertisement.url_regular}
          className={styles.advertisement_img}
        />
      )}
    </Row>
  );
};

export default AdvertisementView;
