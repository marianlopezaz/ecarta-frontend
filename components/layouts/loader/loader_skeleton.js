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
    }}
    {...props}
  >
    <rect x="10" y="10" rx="10" ry="10" width="97.5%" height="80" />
    <rect x="10" y="105" rx="10" ry="10" width="97.5%" height="80" />
    <rect x="10" y="200" rx="10" ry="10" width="97.5%" height="80" />
    <rect x="10" y="295" rx="10" ry="10" width="97.5%" height="80" />
    <rect x="10" y="390" rx="10" ry="10" width="97.5%" height="80" />
  </ContentLoader>
);

export default Loader;
