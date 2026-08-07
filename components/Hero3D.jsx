'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

function Wave() {
  const meshRef = useRef();

  useFrame((state) => {
    // Slowly rotate the wave to simulate ocean movement
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    
    // Slight mouse follow interaction to make the wave react
    meshRef.current.position.x = (state.pointer.x * 2) * 0.1;
    meshRef.current.position.y = (state.pointer.y * 2) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, -2, -5]} rotation={[-Math.PI / 2.5, 0, 0]} scale={25}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <MeshDistortMaterial
        color="#1E7F8C"
        attach="material"
        distort={0.4} // Amount of distortion (wave height)
        speed={1.5}   // Speed of the waves
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.85, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3FB8C4" />
        
        <Wave />
      </Canvas>
    </div>
  );
}
