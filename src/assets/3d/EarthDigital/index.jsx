import {useRef} from 'react'
import './index.scss'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene = null;
let camera = null;
let renderer = null;
let canvasRef = useRef(null);

const initThree = () => {
  scene = new Three.Scene();
  camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
  camera.position.set(0,0,15.5);
  scene.add(camera);

  renderer = new Three.WebGLRenderer({
    canvas: canvasRef.current,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = Three.CineonToneMapping;
  // renderer.render(scene, camera);
  
  let orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.enablePan = false;
}

const index = () => {
  return (
    <div className="earth-digital">
      <canvas ref={canvasRef} className="webgl">canvas</canvas>
      <header className="hud-header">header</header>
      <header>header</header>
      <aside className="hud-aside-left">left</aside>
      <aside className="hud-aside-right">right</aside>
      <footer className="hud-footer">footer</footer>
      <section className="background">section</section>
    </div>
  )
}

export default index