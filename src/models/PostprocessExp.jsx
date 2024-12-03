import { useRef, useEffect } from 'react'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

const PostprocessExp = () => {
  const ref = useRef(null)
  let scene,
    camera,
    composer,
    mesh,
    renderer = null
  let sizes = { width: 0, height: 0 }
  let controls

  const onResize = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  const init = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    scene = new Three.Scene()
    camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(1, -1, 1)
    // camera.lookAt(new Three.Vector3(0, 0, 0))
    scene.add(camera)

    renderer = new Three.WebGLRenderer({ canvas: ref.current, antialias: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.autoClear = false // 为了后处理效果，关闭自动清除

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const textGeometry = new Three.BoxGeometry(1, 1, 1)
    const textMaterial = new Three.MeshBasicMaterial({
      color: 0x00ff00,
      // wireframe: true,
    })

    mesh = new Three.Mesh(textGeometry, textMaterial)
    scene.add(mesh)

    // 后处理效果 辉光效果
    const renderScene = new RenderPass(scene, camera)
    const bloomPass2 = new UnrealBloomPass(
      new Three.Vector2(sizes.width, sizes.height),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    )
    const bloomPass = new BloomPass(
      1.5, // strength
      25, // kernel size
      4, // sigma
      256 // resolution
    )
    const filmPass = new FilmPass(
      0.35, // noise intensity
      0.25, // scanline intensity
      648, // scanline count
      false // grayscale
    )
    composer = new EffectComposer(renderer)
    composer.renderToScreen = true

    composer.addPass(renderScene)
    composer.addPass(bloomPass)
    composer.addPass(filmPass)
    // composer.addPass(bloomPass2)
  }

  const tick = () => {
    controls && controls.update()
    mesh && (mesh.rotation.y += 0.002)
    mesh && (mesh.rotation.x += 0.002)
    composer && composer.render()
    composer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
  }
  useEffect(() => {
    init();
    tick();
  }, [])
  return (
    <div className="w-screen h-screen">
      <canvas ref={ref}></canvas>
    </div>
  )
}

export default PostprocessExp