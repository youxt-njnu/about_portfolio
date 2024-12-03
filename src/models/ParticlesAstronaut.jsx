import modelPath from '@/assets/3d/astronaut.glb'
import particleImg from '@/assets/images/particle.png'
import { useEffect, useRef } from 'react'
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const ParticlesAstronaut = () => {
  let ref = useRef(null)
  let scene = null,
    renderer = null,
    camera = null,
    astronaut = null,
    points = null,
    t = 0,
    vertices = []

  let sizes = { width: 0, height: 0 }

  const initThree = () => {
    renderer = new Three.WebGLRenderer({ canvas: ref.current, antialias: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    scene = new Three.Scene()
    camera = new Three.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    )
    camera.position.z = 150
    camera.lookAt(new Three.Vector3(0, 0, 0))
    scene.add(camera)
    renderer.render(scene, camera)

    loadModels()
    createParticles()
    addLights()
  }

  const loadModels = () => {
    const loader = new GLTFLoader()
    loader.load(modelPath, (gltf) => {
      astronaut = gltf.scene
      astronaut.material = new Three.MeshLambertMaterial()
      astronaut.scale.set(0.0004, 0.0004, 0.0004)
      astronaut.position.z = -10
      scene.add(astronaut)
    })
  }

  const createParticles = () => {
    // create particles
    const geometry = new Three.BufferGeometry()
    const material = new Three.PointsMaterial({
      size: 10,
      alphaTest: 0.8,
      color: 0xffffff,
      map: new Three.TextureLoader().load(particleImg),
    })

    let colors = []
    for (let i = 0; i < 1000; i++) {
      vertices.push(
        rand(20, 300) * Math.cos(i),
        rand(20, 300) * Math.sin(i),
        rand(-1500, 10)
      )
      let randomColor = new Three.Color(Math.random() * 0xffffff)
      colors.push(randomColor.r, randomColor.g, randomColor.b)
    }
    geometry.attributes.position = new Three.Float32BufferAttribute(
      vertices,
      3
    )
    geometry.attributes.color = new Three.Float32BufferAttribute(colors, 3) // 属性是.color，而不是.colors
    points = new Three.Points(geometry, material)
    scene.add(points)
  }
  const addLights = () => {
    // set fog and light
    scene.fog = new Three.FogExp2(0x000000, 0.005)
    let light = new Three.PointLight(0xffffff, 0.8)
    light.position.set(50, 50, 75)
    scene.add(light)
    light = new Three.PointLight(0xffffff, 0.8)
    light.position.set(-50, -50, 75)
    scene.add(light)
    light = new Three.PointLight(0xffffff, 0.5)
    light.position.set(25, 50, 200)
    scene.add(light)
    light = new Three.AmbientLight(0xffffff, 0.8)
    scene.add(light)
  }

  // update functions
  const updateParticles = () => {
    points.position.x = 0.2 * Math.cos(t)
    points.position.y = 0.2 * Math.cos(t)
    points.position.z += 0.015
    camera.lookAt(points.position)

    for (let i = 0; i < vertices.length; i++) {
      if ((i + 1) % 3 === 0) {
        let dist = vertices[i] - camera.position.z
        if (dist >= 0) vertices[i] = rand(-1000, -500)
        vertices[i] += 2.5
        let _vertices = new Three.Float32BufferAttribute(vertices, 3)
        points.geometry.attributes.position = _vertices
      }
    }
    points.geometry.verticesNeedUpdate = true
  }

  const updateMesh = () => {
    if (astronaut) {
      astronaut.position.z = 0.08 * Math.sin(t) + (camera.position.z - 0.2)
      astronaut.rotation.x += 0.015
      astronaut.rotation.y += 0.015
      astronaut.rotation.z += 0.01
    }
  }

  const updateRenderer = () => {
    let width = window.innerWidth
    let height = window.innerHeight
    let needResize =
      window.innerHeight !== height ||
      window.innerWidth !== width
    if (needResize) {
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
  }

  const animate = () => {
    updateParticles()
    updateMesh()
    updateRenderer()
    renderer.render(scene, camera)
    t += 0.01
    requestAnimationFrame(animate)

  }

  const setEventListeners = () => {
    const onResize = () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      // 更新渲染
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      // 更新相机
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
    }

    const onMouseMove = (e) => {
      let cx = window.innerWidth / 2
      let cy = window.innerHeight / 2
      let dx = -1 * ((cx - e.clientX) / cx)
      let dy = -1 * ((cy - e.clientY) / cy)
      camera && (camera.position.x = dx * 5)
      camera && (camera.position.y = dy * 5)
      astronaut && (astronaut.position.x = dx * 5)
      astronaut && (astronaut.position.y = dy * 5)
    }
    return { onResize, onMouseMove }
  }

  const { onResize, onMouseMove } = setEventListeners()
  const rand = (min, max) => min + Math.random() * (max - min)

  useEffect(() => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    initThree()
    animate()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, []);
  return (
    <div className="w-screen h-screen">
      <canvas ref={ref}></canvas>
    </div>
  )
}

export default ParticlesAstronaut