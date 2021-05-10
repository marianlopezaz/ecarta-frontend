import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={"90%"}
    height={700}
    viewBox="0 0 100% 400"
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
    <rect x="0" y="5" rx="20" ry="20" width="300" height="420" />
    <rect x="343" y="5" rx="20" ry="20" width="300" height="420" />
    <rect x="673" y="5" rx="20" ry="20" width="300" height="420" />
    <rect x="1003" y="5" rx="20" ry="20" width="300" height="420" />
    <rect x="1333" y="5" rx="20" ry="20" width="300" height="420" />
    <rect x="1663" y="5" rx="20" ry="20" width="300" height="420" />
    <rect x="1993" y="5" rx="20" ry="20" width="300" height="420" />
    <rect x="2323" y="5" rx="20" ry="20" width="300" height="420" />
  </ContentLoader>
);

export default Loader;
