import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import React from 'react';

const PostProcessingExp = () => {
  return (
    <section>
      <Canvas camera={{
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
      }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={2.5} position={[0, 0, 1]} />
        <group>
          <mesh>
            <meshNormalMaterial />
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh>
            <meshNormalMaterial />
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
        </group>
        <EffectComposer>

        </EffectComposer>
      </Canvas>
    </section>
  )
}

export default PostProcessingExp