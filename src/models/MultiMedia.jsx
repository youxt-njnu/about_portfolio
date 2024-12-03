import catAudio from '@/assets/audio/cat.mp3'
import cowAudio from '@/assets/audio/cow.mp3'
import bgImg from '@/assets/images/bg.png'
import perlinImg from '@/assets/images/perlinnoise.png'
import sparkImg from '@/assets/images/sparknoise.png'
import imgPath from '@/assets/images/text.png'
import * as dat from 'dat.gui'
import { useEffect, useRef } from 'react'
import * as Three from 'three'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'

const MultiMedia = () => {
  const ref = useRef(null)

  let scene,
    camera,
    renderer,
    firstPersonControl = null
  let textGeom = null

  let sizes = {
    width: 0,
    height: 0,
  }

  const onResize = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  const initThree = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    scene = new Three.Scene()
    camera = new Three.PerspectiveCamera(
      50,
      sizes.width / sizes.height,
      1,
      100000
    )
    camera.position.set(-200, 25, 0) // 要看到物体，需要合理设置相机的位置
    camera.lookAt(0.1, 0.1, 0.1)
    scene.add(camera)
    renderer = new Three.WebGLRenderer({ canvas: ref.current, antialias: true, alpha: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.render(scene, camera)

    const directionalLight = new Three.DirectionalLight(0xffffff, 1)
    // directionalLight.castShadow = true
    // directionalLight.shadow.camera.far = 15
    // directionalLight.shadow.mapSize.set(1024, 1024)
    // directionalLight.shadow.normalBias = 0.05
    directionalLight.position.set(0, 0.5, 1).normalize()
    scene.add(directionalLight)

    // const ambientLight = new Three.AmbientLight(0xffffff, 1.2)
    // scene.add(ambientLight)

    // controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true

    firstPersonControl = new FirstPersonControls(camera, renderer.domElement)
    firstPersonControl.movementSpeed = 50
    firstPersonControl.lookSpeed = 0.1
    firstPersonControl.noFly = true
    firstPersonControl.lookVertical = false
  }

  const loadModel = () => {
    //  font
    // const fontLoader = new FontLoader()
    // fontLoader.load('/fonts/Abduction2002_Regular.json', (font) => {
    //   textGeom = new TextGeometry('Hello!', {
    //     font: font,
    //     size: 100,
    //     height: 20,
    //   })
    //   let textMesh = new Three.Mesh(
    //     textGeom,
    //     new Three.MeshBasicMaterial({ color: 0xfff8f7 })
    //   )
    //   textMesh.position.set(-250, -20, 0)
    //   scene.add(textMesh)
    // })

    // image
    // let imageMesh = new Three.Mesh(
    //   new Three.PlaneGeometry(108, 36),
    //   new Three.MeshBasicMaterial({
    //     map: new Three.TextureLoader().load(imgPath),
    //     transparent: true,
    //     side: Three.DoubleSide,
    //   })
    // )
    // imageMesh.position.set(250, 150, 0)
    // scene.add(imageMesh)
    scene.background = new Three.TextureLoader().load(bgImg)

    // audio
    loadAudio(cowAudio, perlinImg, 0, 20, -50)
    loadAudio(catAudio, sparkImg, 0, 20, 50)
  }

  const loadAudio = (urlAudio, urlTexture, x, y, z) => {
    let listener1 = new Three.AudioListener()
    camera.add(listener1)

    let soundMesh1 = new Three.Mesh(
      new Three.BoxGeometry(40, 40, 40),
      new Three.MeshBasicMaterial({
        map: new Three.TextureLoader().load(urlTexture),
      })
    )
    soundMesh1.position.set(x, y, z)
    scene.add(soundMesh1)

    var posSound1 = new Three.PositionalAudio(listener1)
    var audioLoader = new Three.AudioLoader()
    audioLoader.load(urlAudio, (buffer) => {
      posSound1.setBuffer(buffer)
      posSound1.setRefDistance(30) // 该属性指定声音从距离声源多远的位置开始衰减其音量
      posSound1.play()
      posSound1.setRolloffFactor(10) // 该属性指定声源音量随着距离衰减的速度
      posSound1.setLoop(true)
    })
  }

  const interact = () => {
    const gui = new dat.GUI()
  }

  const clock = new Three.Clock()
  const tick = () => {
    renderer.render(scene, camera)
    // controls.update()
    // checkCamera(camera)
    firstPersonControl.update(clock.getDelta())
    requestAnimationFrame(tick)
  }

  function checkCamera (camera) {
    console.log(
      `Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`
    )
    console.log(
      `Camera rotation: x=${camera.rotation.x}, y=${camera.rotation.y}, z=${camera.rotation.z}`
    )

    // 检查是否有非有限的值
    if (
      !isFinite(camera.position.x) ||
      !isFinite(camera.position.y) ||
      !isFinite(camera.position.z)
    ) {
      console.error('Camera position contains non-finite values.')
    }
  }

  useEffect(() => {
    initThree()
    loadModel()
    // interact()
    tick()

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="w-screen h-screen">
      <canvas className="w-screen h-screen" ref={ref}></canvas>
    </div>
  )
}

export default MultiMedia