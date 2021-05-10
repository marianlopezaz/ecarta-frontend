import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={"90%"}
    height={700}
    viewBox="0 0 600 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{
      width: "100%",
      height: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
    }}
    {...props}
  >
    <rect x="25" y="13" rx="20" ry="20" width="550" height="240" />
  </ContentLoader>
);

export default MyLoader;
