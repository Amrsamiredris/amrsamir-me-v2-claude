'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';

function AbstractShape() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    
    // Slight mouse follow interaction
    meshRef.current.position.x = (state.pointer.x * 2) * 0.5;
    meshRef.current.position.y = (state.pointer.y * 2) * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshPhysicalMaterial 
          color="#3FB8C4"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
          ior={1.5}
          thickness={0.5}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.8, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <AbstractShape />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}
