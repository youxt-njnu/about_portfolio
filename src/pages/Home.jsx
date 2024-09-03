import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { soundoff, soundon } from '../assets/icons'
import sakura from '../assets/sakura.mp3'
import HomeInfo from '../components/HomeInfo'
import Loader from '../components/Loader'
import Bird from '../models/Bird'
import Island from '../models/Island'
import Map2D from '../models/Map2D'
import Plane from '../models/Plane'
import Sky from '../models/Sky'

{/* <div className="absoute top-28 left-0 right-0 -10 flex items-center justify-center">
  POPUP
</div> */}

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) { audioRef.current.play(); }

    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, 7.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.2, 0.2, 0.2];

    } else {
      screenScale = [0.4, 0.4, 0.4];
    }
    return [screenScale, screenPosition, rotation];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [2, 0, -1];

    } else {
      screenScale = [3, 3, 3];
      screenPosition = [8, 0, -4];
    }
    return [screenScale, screenPosition];
  }

  const [planeScale, planePosition] = adjustPlaneForScreenSize();


  return (
    <section className='w-full h-screen relative'>
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {/* 在Island中，设置了不在特定角度下，currentStage为null，所以这里要对currentStage进行判断 */}
        {currentStage && <HomeInfo currentStage={currentStage} />} </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'} `}
        camera={{ near: 0.1, far: 1000 }}
      >
        {/* Suspense 用于解决加载组件时的白屏，可以显示其他的内容，而其他内容不允许使用 lazy加载 */}
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          {/* note: not directionLight  */}
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Bird />
          <Plane
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating}
            rotation={[10, 0, 10]} />
          {/* 使用planeScale和planePosition会使得拖动之后Plane和Island越来越大，所以换成了scale和position */}
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Map2D
            rotation={[0.1, 90, 0]}
            position={[0, -10, -80]}
            scale={[.6, .6, .6]}
          />
          {/* <Map3D
            position={[0, -0.5, 0]}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            scale={[2, 2, 2]}
          /> */}
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className='w-10 h-10 cursor-pointer object-contain'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section >
  )
}

export default Home