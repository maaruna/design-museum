import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import Painting from "components/three/painting";
import { Loader as CanvasLoader, Preload } from "@react-three/drei";
import { Mesh } from "three";

const IndexPage = (): JSX.Element => {
  const [floor, setFloor] = useState<Mesh>();

  // Configuration based on your initial setup
  const basePositionX = 0; // Starting X position
  const gap = 1.5; // Desired gap between paintings
  const paintingWidth = 1.5; // Average painting width, adjust based on aspect ratio

  // Adjusting the approach to dynamically calculate positions for both sides
  const numPaintings = 3; // Adjust based on the total number of paintings you plan to display
  const positions = [];

  // Calculate positions dynamically for both sides
  // Left side (negative direction)
  for (let i = 1; i <= numPaintings; i++) {
    positions.unshift([basePositionX - (paintingWidth + gap) * i, 1.6, -5.7]);
  }

  // Center and Right side (positive direction)
  positions.push([basePositionX, 1.6, -5.7]); // Center position for the first painting
  for (let i = 1; i <= numPaintings; i++) {
    positions.push([basePositionX + (paintingWidth + gap) * i, 1.6, -5.7]);
  }

  return (
    <>
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <Controls floor={floor} />

          {positions.map((position, index) => (
            <Painting key={`music${index+1}`} name={`music${index+1}`} position={position} />
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
