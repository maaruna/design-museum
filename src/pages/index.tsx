import React from "react";
import Painting from "components/three/painting"; // Adjust the path as necessary
import Canvas from "components/three/canvas";
import SEO from "components/main/seo/seo";
import "./index.scss";

const IndexPage = (): JSX.Element => (
  <>
    <SEO title="Home" />
    <div id="scene-container" style={{ height: "100vh", width: "100%" }}>
      <Canvas />
    </div>
  </>
);

export default IndexPage;