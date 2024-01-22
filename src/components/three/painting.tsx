import { useTexture } from "@react-three/drei";
import React from "react";
import { MeshBasicMaterial, PlaneGeometry, sRGBEncoding } from "three";

interface PaintingProps {
  name: string;
  position: [number, number, number]; // Add position to the props
}

const Painting = ({ name = "", position }: PaintingProps): JSX.Element => {
  const texture = useTexture(`paintings/${name}.png`);
  texture.encoding = sRGBEncoding;
  const geometry = new PlaneGeometry(1, 1.3);
  const material = new MeshBasicMaterial({
    map: texture,
  });

  return (
    <>
      <mesh position={position} args={[geometry, material]} />
      <mesh position={[position[0] + 0.01, position[1] + 0.01, position[2] - 0.06]}>
        <boxGeometry args={[1.1, 1.4, 0.1]} />
        <meshStandardMaterial color="PeachPuff" />
      </mesh>
    </>
  );
};
export default Painting;
