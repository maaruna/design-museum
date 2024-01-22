import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import Painting from "components/three/painting";
import { Loader as CanvasLoader, Preload } from "@react-three/drei";
import { Mesh } from "three";

const IndexPage = (): JSX.Element => {
  const [floor, setFloor] = useState<Mesh>();
  // Placeholder painting names and aspect ratios
  const paintings = [
    { name: "music1", aspectRatio: 1.5 },
    { name: "music2", aspectRatio: 1.5 }
  ];
  const gap = 0.5; // Constant gap size
  
  const [paintingPositions, setPaintingPositions] = useState([]);

  useEffect(() => {
    let currentPositionX = 0; // Start position for the first painting
    const positions = paintings.map(painting => {
      // Calculate width based on aspect ratio and a fixed height, here assumed to be 1.3
      const width = painting.aspectRatio * 1.3;
      const position = [currentPositionX, 1.6, -5.7]; // Using fixed Y and Z from your original positions
      currentPositionX += width + gap; // Update currentPositionX for the next painting
      return position;
    });
    setPaintingPositions(positions);
  }, [paintings, gap]);

  return (
    <>
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <Controls floor={floor} />
          
          {paintingPositions.map((position, index) => (
            <Painting key={paintings[index].name} name={paintings[index].name} position={position} />
          ))}

          <Gallery setFloor={setFloor} />
          <Preload all />
        </Suspense>
      </Canvas>
      <CanvasLoader
        barStyles={{ height: "10px" }}
        dataStyles={{ fontSize: "14px" }}
        dataInterpolation={(percent) => `Loading ${percent.toFixed(0)}%`}
      />
    </>
  );
};

export default IndexPage;
