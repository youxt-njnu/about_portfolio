import { useRef, useEffect } from 'react'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import textVertexShader from './text.vert.glsl'
import textFragmentShader from './text.frag.glsl'

const ShaderPattern = () => {
  let scene,
    camera,
    renderer = null
  let sizes = { width: 0, height: 0 }
  let ref = useRef(null)
  let mesh, controls, bloomComposer = null

  const initThree = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    scene = new Three.Scene()
    camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(1, -1, 1)
    // camera.lookAt(new Three.Vector3(0, 0, 0))
    scene.add(camera)

    renderer = new Three.WebGLRenderer({ canvas: ref.current })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.autoClear = false // 为了后处理效果，关闭自动清除

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const textGeometry = new Three.IcosahedronGeometry(1, 64)
    const textMaterial = new Three.ShaderMaterial({
      vertexShader: textVertexShader,
      fragmentShader: textFragmentShader,
      side: Three.DoubleSide,
    })

    mesh = new Three.Mesh(textGeometry, textMaterial)
    scene.add(mesh)

    // 后处理效果 辉光效果
    const renderScene = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(
      new Three.Vector2(sizes.width, sizes.height),
      2.2,
      0.2,
      0
    )
    bloomComposer = new EffectComposer(renderer)
    bloomComposer.renderToScreen = true
    bloomComposer.addPass(renderScene)
    bloomComposer.addPass(bloomPass)

  }

  const tick = () => {
    controls && controls.update()
    mesh && (mesh.rotation.y += 0.002)
    mesh && (mesh.rotation.x += 0.002)
    bloomComposer && bloomComposer.render()

    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }

  useEffect(() => {
    initThree()
    tick()
  }, [])

  return (
    <div className='w-screen h-screen'>
      <canvas ref={ref} />
    </div>
  )
}

export default ShaderPattern