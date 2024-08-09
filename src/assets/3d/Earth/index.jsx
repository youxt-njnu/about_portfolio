import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import cloudsImg from './images/clouds.jpeg';
import earthBasicImg from './images/earth_basic.jpeg';
import earthNormalImg from './images/earth_normal.jpeg';
import earthRoughImg from './images/earth_rough.jpeg';
import moonBasicImg from './images/moon_basic.jpeg';
import moonNormalImg from './images/moon_normal.jpeg';
import moonRoughnessImg from './images/moon_roughness.jpeg';
import './index.styl';

import Stats from 'three/examples/jsm/libs/stats.module';

const Earth = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const moonRef = useRef(null);
  const earthRef = useRef(null);
  const atmosphereRef = useRef(null);
  let stats = null;
  let earth = null;
  
  let moon = null;
  let atmosphere =null;
  let textLoader = new THREE.TextureLoader()
  
  useEffect(() => {
    initThree();
    
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.removeChild(stats.dom);
      window.removeEventListener('resize', handleResize); // 在组件卸载（unmount）或下一次副作用执行之前执行
    }
  }, []); // mount之后执行一次

  const handleResize = () => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  };

  const initThree = () => {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.toneMapping = THREE.CineonToneMapping
    rendererRef.current = renderer;

    const scene = new THREE.Scene()
    sceneRef.current = scene;

    const frustumSize = 96
    const aspect = window.innerWidth / window.innerHeight
    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect,
      frustumSize * aspect,
      frustumSize,
      -frustumSize,
      1,
      1000
    )
    camera.position.set(0, 20, 200)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controlsRef.current = controls;

    setupLights(scene);
    setupEarth(scene);
    setupMoon(scene);
    animate()
  };

  const setupLights = (scene) => {
    const light = new THREE.DirectionalLight(0xffffff, 1.2)
    light.position.set(-10, 10, 5)
    light.castShadow = true
    // light.target = earth // 一开始的时候earth并没有被初始化，所以这里不需要这一句
    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512
    light.shadow.camera.top = 10
    light.shadow.camera.bottom = -5
    light.shadow.camera.left = -5
    light.shadow.camera.right = 10
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)
  }

  const setupEarth = (scene) => {
    // 🌏
    earth = new THREE.Group()
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(10, 64, 64),
      new THREE.MeshStandardMaterial({
        map: textLoader.load(earthBasicImg),
        normalMap: textLoader.load(earthNormalImg),
        roughnessMap: textLoader.load(earthRoughImg),
        normalScale: new THREE.Vector2(10, 10),
        metalness: 0.1,
      })
    )
    planet.rotation.y = -Math.PI
    atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(10.6, 64, 64),
      new THREE.MeshLambertMaterial({
        alphaMap: textLoader.load(cloudsImg),
        transparent: true,
        opacity: 0.4,
        depthTest: true,
      })
    )
    earth.add(planet)
    
    atmosphereRef.current = atmosphere;
    earth.add(atmosphere)
    earth.scale.set(6, 6, 6)
    earthRef.current = earth;
    scene.add(earth)
  }

  const setupMoon = (scene) => {
    // 🌑
    moon = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshStandardMaterial({
        map: textLoader.load(moonBasicImg),
        normalMap: textLoader.load(moonNormalImg),
        roughnessMap: textLoader.load(moonRoughnessImg),
        normalScale: new THREE.Vector2(10, 10),
        metalness: 0.1,
      })
    )
    moon.position.set(-120, 0, -120)
    moon.scale.set(6, 6, 6)
    moonRef.current = moon;
    scene.add(moon)
  }

  const clock = new THREE.Clock()
  const animate = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    const elapsedTime = clock.getElapsedTime()
    earth && (earth.rotation.y += 0.002)
    atmosphere && (atmosphere.rotation.y += 0.004)
    atmosphere && (atmosphere.rotation.x += 0.002)
    stats && stats.update();
    controlsRef.current && controlsRef.current.update()
    // 公转
    moon && (moon.position.x = Math.sin(elapsedTime * 0.5) * -120)
    moon && (moon.position.z = Math.cos(elapsedTime * 0.5) * -120)
    rendererRef.current.render(sceneRef.current, cameraRef.current)
    requestAnimationFrame(animate);
  };

  return (
    <div className="earth_page">
      <canvas ref={canvasRef} className='webgl'></canvas>
    </div>
  )
}

export default Earth;
