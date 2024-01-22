import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import Painting from "components/three/painting";
import { Loader as CanvasLoader, Preload } from "@react-three/drei";
import { Mesh } from "three";

const IndexPage = (): JSX.Element => {
  const [floor, setFloor] = useState<Mesh>();

  // Define a base position for the first painting
  const basePositionX = 0; // Starting X position
  const gap = 2; // Desired gap between paintings
  const paintingWidth = 1.5; // Average painting width, adjust based on aspect ratio

  // Calculate positions for each painting manually
  const positions = [
    [basePositionX, 1.6, -5.7], // Position for music1
    [basePositionX + paintingWidth + gap, 1.6, -5.7], // Position for music2, shifted right by one painting width plus a gap
    // Add more positions as needed for additional paintings
  ];

  return (
    <>
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <Controls floor={floor} />

          <Painting name="music1" position={positions[0]} />
          <Painting name="music2" position={positions[1]} />

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
