import { useRef, useEffect } from 'react'
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'

import px from '@/assets/images/environmentMaps/px.jpg'
import nx from '@/assets/images/environmentMaps/nx.jpg'
import py from '@/assets/images/environmentMaps/py.jpg'
import ny from '@/assets/images/environmentMaps/ny.jpg'
import pz from '@/assets/images/environmentMaps/pz.jpg'
import nz from '@/assets/images/environmentMaps/nz.jpg'
import iphoneModel from '@/assets/3d/iphone.glb'
import demoVideo from "@/assets/video/demo.mp4"

const MultiMedia2 = () => {
  const ref = useRef(null)
  const videoRef = useRef(null)

  let scene,
    camera,
    renderer,
    firstPersonControl = null
  let sizes = {
    width: 0,
    height: 0,
  }

  const initThree = () => {
    scene = new Three.Scene()
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera = new Three.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    )
    camera.position.set(0, 0, 20)
    camera.lookAt(new Three.Vector3(0, 0, 0))
    scene.add(camera)
    renderer = new Three.WebGLRenderer({ canvas: ref.current, antialias: true, alpha: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.physicallyCorrectLights = true
    renderer.toneMapping = Three.ACESFilmicToneMapping
    renderer.toneMappingExposure = 2
    renderer.outputColorSpace = Three.SRGBColorSpace


    firstPersonControl = new FirstPersonControls(camera, renderer.domElement)
    firstPersonControl.movementSpeed = 30
    firstPersonControl.lookSpeed = 0.1
    firstPersonControl.noFly = true
    // firstPersonControl.lookVertical = false
  }

  let envMap = null
  const addEnvTexture = () => {
    const cubeTextureLoader = new Three.CubeTextureLoader()
    envMap = cubeTextureLoader.load([
      px,
      nx,
      py,
      ny,
      pz,
      nz,
    ])
    envMap.colorSpace = Three.SRGBColorSpace
    scene.background = envMap
    scene.environment = envMap
  }

  let model = null
  let screen = {
    mesh: null,
    material: null,
    videoMaterial: null,
  }

  const addModelVideo = () => {
    const videoTexture = new Three.VideoTexture(videoRef.current)
    const videoMaterial = new Three.MeshPhysicalMaterial({
      map: videoTexture,
      envMap: envMap,
    }) // 记得还要再加上环境贴图

    screen.videoMaterial = videoMaterial

    const base = import.meta.env.BASE_URL
    const loader = new DRACOLoader()
    loader.setDecoderPath(`${base}/draco/`)
    loader.setDecoderConfig({ type: 'js' })

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(loader)

    gltfLoader.load(iphoneModel, (mesh) => {
      if (mesh.scene) {
        mesh.scene.traverse((child) => {
          if (
            child instanceof Three.Mesh &&
            child.material instanceof Three.MeshStandardMaterial
          ) {
            // 给所有的材质都加上环境贴图
            child.material.envMap = envMap
            child.material.envMapIntensity = 2

            // 根据不同的模型部位，设置不同的材质
            if (child.name === '屏幕') {
              screen.mesh = child
              screen.material = child.material
            }

            if (child.name.includes('logo')) {
              child.material.metalness = 1
            }
          }
        })
        model = mesh.scene
        model.scale.set(60, 60, 60)
        model.position.y = -5
        model.rotation.y = -Math.PI
        scene.add(model)
      }
    })
  }

  // 通过raycaster和点击事件来判断
  const clickSwitch = () => {
    const rayCaster = new Three.Raycaster()

    const mouse = new Three.Vector2()
    window.addEventListener('click', (e) => {
      mouse.x = (e.clientX / sizes.width) * 2 - 1
      mouse.y = -(e.clientY / sizes.height) * 2 + 1

      rayCaster.setFromCamera(mouse, camera)

      const intersects = rayCaster.intersectObjects([screen.mesh])
      if (intersects.length > 0) {
        const intersectObj = intersects[0].object
        if (intersectObj.material.type === 'MeshStandardMaterial') {
          // if (intersectObj.material instanceof Three.MeshStandardMaterial) { 不能这么写，因为：MeshPhysicalMaterial 是 MeshStandardMaterial 的一个扩展。这意味着 MeshPhysicalMaterial 继承自 MeshStandardMaterial，添加了一些额外的特性和属性以支持更复杂的物理效果
          intersectObj.material = screen.videoMaterial
        } else {
          intersectObj.material = screen.material
        }
      }
    })
  }
  const onResize = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  const clock = new Three.Clock()
  const tick = () => {
    renderer.render(scene, camera)
    firstPersonControl.update(clock.getDelta())
    requestAnimationFrame(tick)
  }

  useEffect(() => {
    initThree()
    addEnvTexture()
    addModelVideo()
    clickSwitch()
    tick()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <canvas ref={ref}></canvas>
      <video className="invisible fixed t-0 l-0" ref={videoRef}
        src={demoVideo}
        muted
        autoPlay={true}
        type="mp4"
        loop></video>
      <div className="w-64 h-12 bg-black-500 fixed top-0 left-1/2 -ml-32 rounded-b-md flex items-center py-3">
        <svg className="ml-4" width="26"
          height="26"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z"
            fill="none"
            stroke="#FFF"
            strokeWidth="4" />
          <path d="M24 19H12V29H24V19Z"
            fill="none"
            stroke="#FFF"
            strokeWidth="4"
            strokeLinejoin="bevel" />
          <path d="M35 18L30 22V26L35 30V18Z"
            fill="none"
            stroke="#FFF"
            strokeWidth="4"
            strokeLinejoin="bevel" />
        </svg>
        <span className="text-white text-lg align-middle pl-2">轻触手机屏幕与我聊天</span>
      </div>
    </div>
  )
}

export default MultiMedia2