import { useTexture } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { MeshBasicMaterial, PlaneGeometry, sRGBEncoding } from "three";

interface PaintingProps {
  name: string;
  position: [number, number, number];
}

const Painting = ({ name = "", position }: PaintingProps): JSX.Element => {
  const [aspectRatio, setAspectRatio] = useState(1); // Default aspect ratio
  const texture = useTexture(`paintings/${name}.png`);

  useEffect(() => {
    // Set aspect ratio based on the image dimensions
    if (texture.image) {
      const { width, height } = texture.image;
      setAspectRatio(width / height);
    }
  }, [texture, texture.image]);

  texture.encoding = sRGBEncoding;

  // Adjust the PlaneGeometry to have a constant height. The width is dynamically calculated.
  const geometry = new PlaneGeometry(aspectRatio * 1.3, 1.3); // Multiply the constant height by aspect ratio to get width
  const material = new MeshBasicMaterial({
    map: texture,
  });

  return (
    <>
      <mesh position={position} args={[geometry, material]} />
      <mesh position={[position[0] + 0.01, position[1] + 0.01, position[2] - 0.06]}>
        <boxGeometry args={[aspectRatio * 1.3 + 0.1, 1.4, 0.1]} />
        <meshStandardMaterial color="PeachPuff" />
      </mesh>
    </>
  );
};

export default Painting;