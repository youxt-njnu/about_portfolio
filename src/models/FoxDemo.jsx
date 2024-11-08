import { Canvas } from '@react-three/fiber';
import React from 'react';
import Fox from './Fox.jsx';

const FoxDemo = () => {
  return (
    <section className="absolute w-full h-full">
      <Canvas camera={{
        position: [0, 0, 5],
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000
      }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={2.5} position={[0, 0, 1]} />
        {/* 组件使用，直接传入idle */}
        <Fox
          currentAnimation={"idle"}
          position={[0.5, 0, 0]}
          rotation={[12.6, -0.5, 0]}
          scale={[.6, .6, .6]}
        />
      </Canvas>
    </section>
  )
}

export default FoxDemo