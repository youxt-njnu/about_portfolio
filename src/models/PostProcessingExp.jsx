import { Canvas } from '@react-three/fiber';
import React from 'react';

const PostProcessingExp = () => {
  return (
    <section className='absolute w-full h-full'>
      <Canvas camera={{
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [0, 0, 5]
      }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={2.5} position={[0, 0, 1]} />
        <group>
          <mesh position={[-2, 0, 0]}>
            <meshNormalMaterial />
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh position={[2, 0, 0]}>
            <meshNormalMaterial />
            {/* 给boxGeometry设置位置 */}
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
        </group>
      </Canvas>
    </section>
  )
}

export default PostProcessingExp