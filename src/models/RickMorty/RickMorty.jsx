import { useEffect, useRef } from 'react'
// 存在的一个问题：就是shader的背景不透明：
// https://github.com/mrdoob/three.js/issues/14104
import * as dat from 'dat.gui'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
// import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'
import modelPath from '@/assets/3d/rickAndMorty.glb'
import perlinPath from '@/assets/images/perlinnoise.png'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import fragmentShader from './portal.frag.glsl'
import vertexShader from './portal.vert.glsl'

import sparkPath from '@/assets/images/sparknoise.png'

import noisePath from '@/assets/images/noise.png'
import waterPath from '@/assets/images/waterturbulence.png'

const RickMorty = () => {
  const ref = useRef(null)

  let scene,
    camera,
    renderer,
    controls = null

  let sizes = {
    width: 0,
    height: 0,
  }

  let plane,
    planeMaterial,
    model = null

  let composer = null

  const initThree = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    scene = new Three.Scene()
    camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 1, 5) // 要看到物体，需要合理设置相机的位置
    scene.add(camera)
    renderer = new Three.WebGLRenderer({ canvas: ref.current, antialias: true, alpha: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // note the following
    renderer.autoClear = false
    renderer.setClearAlpha(0)
    renderer.physicallyCorrectLights = true
    renderer.toneMapping = Three.CineonToneMapping
    renderer.toneMappingExposure = 2

    renderer.render(scene, camera)

    // 获取 WebGL 上下文
    // const gl = renderer.getContext()
    // const isWebGL2 = gl instanceof WebGL2RenderingContext

    // if (isWebGL2) {
    //   console.log('Using WebGL 2.0')
    // } else {
    //   console.log('Using WebGL 1.0')
    // }

    const directionalLight = new Three.DirectionalLight(0xffffff, 1)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.normalBias = 0.05
    directionalLight.position.set(0.25, 3, -1.25)
    scene.add(directionalLight)

    const ambientLight = new Three.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.minPolarAngle = 0.5 // 纬线方向，垂直上
    controls.maxPolarAngle = 2.5
    controls.minAzimuthAngle = -1 // 经线方向，水平上
    controls.maxAzimuthAngle = 1
  }

  const options = {
    exposure: 2.8,
    bloomStrength: 2.39,
    bloomThreshold: 0,
    bloomRadius: 0.38,
    color0: [1, 5, 1],
    color1: [2, 20, 2],
    color2: [44, 97, 15],
    color3: [14, 28, 5],
    color4: [255, 255, 255],
    color5: [74, 145, 0],
  }

  const postProcess = () => {
    const renderPass = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(
      new Three.Vector2(sizes.width, sizes.height),
      1.5,
      0.4,
      0.85
    )
    // const bloomPass = new BloomPass(
    //   1.5, // strength
    //   25, // kernel size
    //   40 // sigma
    // )
    bloomPass.threshold = options.bloomThreshold
    bloomPass.strength = options.bloomStrength
    bloomPass.radius = options.bloomRadius
    composer = new EffectComposer(renderer)
    composer.renderToScreen = true
    composer.addPass(renderPass)
    composer.addPass(bloomPass)
  }


  const loadModel = () => {
    const planeGeometry = new Three.PlaneGeometry(8, 8, 1, 1)

    const textureLoader = new Three.TextureLoader()
    planeMaterial = new Three.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0.0,
        },
        perlinNoise: {
          type: 't',
          value: textureLoader.load(perlinPath),
        },
        sparkNoise: {
          type: 't',
          value: textureLoader.load(sparkPath),
        },
        waterTurbulence: {
          type: 't',
          value: textureLoader.load(waterPath),
        },
        noiseText: {
          type: 't',
          value: textureLoader.load(noisePath),
        },
        color0: {
          value: new Three.Vector3(...options.color0),
        },
        color1: {
          value: new Three.Vector3(...options.color1),
        },
        color2: {
          value: new Three.Vector3(...options.color2),
        },
        color3: {
          value: new Three.Vector3(...options.color3),
        },
        color4: {
          value: new Three.Vector3(...options.color4),
        },
        color5: {
          value: new Three.Vector3(...options.color5),
        },
        resolution: {
          value: new Three.Vector2(sizes.width, sizes.height),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })
    plane = new Three.Mesh(planeGeometry, planeMaterial)
    plane.layers.enable(1)
    scene.add(plane)

    postProcess()

    const loadingManager = new Three.LoadingManager()
    loadingManager.onLoad = () => { } // 设置loadingManager

    const base = import.meta.env.BASE_URL
    const loader = new DRACOLoader()
    loader.setDecoderPath(`${base}/draco/`)
    loader.setDecoderConfig({ type: 'js' })
    const gltfLoader = new GLTFLoader(loadingManager)
    gltfLoader.setDRACOLoader(loader)

    gltfLoader.load(modelPath, (gltf) => {
      if (gltf.scene) {
        model = gltf.scene
        model.scale.set(0.02, 0.02, 0.02)
        model.position.x = -0.5
        model.rotation.y = Math.PI
        model.layers.set(0)
        scene.add(model)
      }
    })
  }

  const interact = () => {
    const gui = new dat.GUI()
    const bloom = gui.addFolder('bloom')
    bloom.add(options, 'bloomStrength', 0.0, 10.0).name('bloomStrength').listen()
    bloom.add(options, 'bloomRadius', 0.1, 10.0).name('bloomRadius').listen()
    bloom.open()
    const colors = gui.addFolder('Colors')
    colors.addColor(options, 'color0').name('layer0')
    colors.addColor(options, 'color1').name('layer1')
    colors.addColor(options, 'color2').name('layer2')
    colors.addColor(options, 'color3').name('layer3')
    colors.addColor(options, 'color4').name('layer4')
    colors.addColor(options, 'color5').name('layer5')
    colors.open()
  }

  // 这个deltaTime是requestAnimationFrame()返回的时间戳timestamp
  const tick = (deltaTime) => {
    const clock = new Three.Clock()

    // 更新shader材质
    planeMaterial.uniforms.time.value = deltaTime / 5000
    planeMaterial.uniforms.color5.value = new Three.Vector3(...options.color5)
    planeMaterial.uniforms.color4.value = new Three.Vector3(...options.color4)
    planeMaterial.uniforms.color3.value = new Three.Vector3(...options.color3)
    planeMaterial.uniforms.color2.value = new Three.Vector3(...options.color2)
    planeMaterial.uniforms.color1.value = new Three.Vector3(...options.color1)
    planeMaterial.uniforms.color0.value = new Three.Vector3(...options.color0)

    renderer.clear()
    camera.layers.set(1)
    composer.render()
    renderer.clearDepth()
    camera.layers.set(0)
    renderer.render(scene, camera)

    const elapsedTime = clock.getElapsedTime()
    const ghost1Angle = elapsedTime * 0.5
    if (model) {
      model.rotation.x = Math.cos(ghost1Angle) * 0.2
      model.rotation.z = Math.sin(ghost1Angle) * 0.1
      model.position.z += Math.cos(ghost1Angle) * 0.005
    }

    const scale = Math.cos(ghost1Angle) * 2 + 3
    plane && plane.scale.set(scale, scale, scale)

    controls.update()
    window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    initThree()
    loadModel()
    interact()
    tick()
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      <canvas ref={ref}></canvas>
    </div>
  )
}

export default RickMorty