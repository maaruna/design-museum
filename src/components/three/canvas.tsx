import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import Painting from "components/three/painting";
import { Loader as CanvasLoader, Preload } from "@react-three/drei";
import { Mesh } from "three";

const IndexPage = (): JSX.Element => {
  const [floor, setFloor] = useState<Mesh>();
  const gap = 1; // Define the constant gap you want between paintings
  const [positions, setPositions] = useState<Array<[number, number, number]>>([]);

  // Placeholder aspect ratios for "music1" and "music2"
  // You should replace these with the actual aspect ratios of your paintings
  const paintingData = [
    { name: "music1", aspectRatio: 1.5 },
    { name: "music2", aspectRatio: 1.5 },
    // Add more paintings as needed
  ];

  useEffect(() => {
    let currentPositionX = 0; // Starting X position for the first painting

    const newPositions = paintingData.map((painting, index) => {
      const position: [number, number, number] = [currentPositionX, 1.6, -5.7];
      // Assuming a constant height of 1.3 units to calculate the width using aspect ratio
      const width = painting.aspectRatio * 1.3; 
      currentPositionX += width + gap; // Update currentPositionX for the next painting
      return position;
    });

    setPositions(newPositions);
  }, [paintingData, gap]);

  return (
    <>
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <Controls floor={floor} />
          
          {positions.map((position, index) => (
            <Painting key={paintingData[index].name} name={paintingData[index].name} position={position} />
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
