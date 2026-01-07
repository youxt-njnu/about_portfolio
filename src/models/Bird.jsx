import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import birdScene from '../assets/3d/bird.glb'; //一定要加上.glb，不然找不着

const Bird = () => {
  const birdRef = useRef();
  const { scene, animations } = useGLTF(birdScene);

  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    actions['Take 001'].play();
  }, []);

  useFrame(({ clock, camera }) => { // 这里需要给clock, camera外面加上{}，不然会报错
    // Update the Y position simulate the flight moving in a sin wave 
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // 控制鸟在island的范围内（相机位置的前后10个单位）
    if (birdRef.current.position.x > camera.position.x + 10) {
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      birdRef.current.rotation.y = 0;
    }

    // 负责根据鸟的当前朝向来调整其在X和Z轴上的位置。如果鸟的rotation.y等于0（面向正前方），则使鸟沿X轴正方向和Z轴负方向微小移动，模拟鸟向前并稍微向左飞行的效果。如果rotation.y不等于0（面向后方，这里设定为Math.PI，即180度旋转），则使鸟沿X轴负方向和Z轴正方向微小移动，模拟鸟向后并稍微向右飞行的效果。这样的逻辑创建了一个简单的飞行路径控制，让鸟在一个虚拟的“岛屿”范围内飞行。
    if (birdRef.current.rotation.y === 0) {
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
  });

  return (
    <mesh
      ref={birdRef}
      position={[-5, 2, 1]}
      scale={[0.003, 0.003, 0.003]}

    >
      <primitive object={scene} />
    </mesh>
  )
}

export default Bird

