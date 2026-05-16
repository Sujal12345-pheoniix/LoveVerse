"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function CrystalHeart() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.position.y = Math.sin(t) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <extrudeGeometry
          args={[
            heartShape(),
            { depth: 0.4, bevelEnabled: true, bevelSegments: 5, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 }
          ]}
        />
        <MeshDistortMaterial
          color="#ff4d6d"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#ff85a1"
          emissiveIntensity={0.5}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}

function heartShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0, 0.3, -0.6, 0.3, -0.6, 0);
  shape.bezierCurveTo(-0.6, -0.3, 0, -0.6, 0, -1);
  shape.bezierCurveTo(0, -0.6, 0.6, -0.3, 0.6, 0);
  shape.bezierCurveTo(0.6, 0.3, 0, 0.3, 0, 0);
  return shape;
}
