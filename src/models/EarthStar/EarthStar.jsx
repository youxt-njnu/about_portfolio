import { useEffect, useRef } from 'react'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import mtlFile from '/gltfModels/earth_star/earth.mtl'
import objFile from '/gltfModels/earth_star/earth.obj'

const EarthStar = () => {
  let scene = null,
    camera = null,
    light = null,
    renderer = null
  let stars, satellite, ring = null
  let rot = 0
  let container = useRef(null)

  // let earthGeometry = new Three.SphereGeometry(60, 20, 20)
  // let earthMaterial = new Three.MeshLambertMaterial({
  //   color: 0x03c03c,
  //   wireframe: true,
  // })
  // let earth = new Three.Mesh(earthGeometry, earthMaterial)

  let initThree = () => {
    let sizes = {
      width: container.current.clientWidth,
      height: container.current.clientHeight,
    }
    camera = new Three.PerspectiveCamera(
      70,
      sizes.width / sizes.height,
      0.01,
      1000
    )
    camera.position.set(50, 20, 200)
    camera.lookAt(0, 0, 0);

    scene = new Three.Scene()
    scene.fog = new Three.Fog(0x1a1a1a, 1, 1000)
    scene.background = new Three.Color(0x1a1a1a)

    light = new Three.AmbientLight(0xdeedff, 3)


    renderer = new Three.WebGLRenderer({ canvas: container.current, alpha: true, antialias: true })
    renderer.setSize(sizes.width, sizes.height)

    let orbitControls = new OrbitControls(camera, renderer.domElement) // 使用的时候直接new
    orbitControls.enableDamping = true


    let ringGeometry = new Three.TorusGeometry(100, 4, 2, 120)
    let ringMaterial = new Three.MeshBasicMaterial({
      color: 0x40a9ff,
      wireframe: true,
    })
    ring = new Three.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2
    ring.rotation.y = -0.1 * (Math.PI / 2) // 旋转发生后，圆环的局部坐标系也随之旋转。也就是说，圆环的Y轴和Z轴现在指向了新的方向(也就是从原来的上方，变成了现在的前方)

    let icoGeometry = new Three.IcosahedronGeometry(12, 0)
    let icoMaetrial = new Three.MeshLambertMaterial({ color: 0xfffc00 })
    satellite = new Three.Mesh(icoGeometry, icoMaetrial)

    stars = new Three.Group()
    for (let i = 0; i < 500; i++) {
      let starGeometry = new Three.IcosahedronGeometry(Math.random() * 3, 0)
      let starMaterial = new Three.MeshBasicMaterial({ color: 0xffffff })
      let star = new Three.Mesh(starGeometry, starMaterial)
      star.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800 // 800的半径范围
      )
      star.rotation.set(
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI // 360度内随机
      )
      stars.add(star)
    }

    let mtlLoader = new MTLLoader()
    let objLoader = new OBJLoader()

    // 加载贴图和模型（mtl+obj）'/objModels/earth.mtl'
    mtlLoader.load(mtlFile, (materials) => {
      materials.preload()
      materials.side = Three.DoubleSide
      objLoader.setMaterials(materials)

      objLoader.load(objFile, (object) => {
        object.scale.set(80, 80, 80)
        object.children.map((item, i) => {
          const materialName = item.material.name
          item.material = materials.materials[materialName]
          if (item.name === 'Earth_Sphere') {
            item.visible = true
            object.add(new Three.Mesh(item.geometry, item.material))
          } else {
            item.material.opacity = 0.1
          }
        })
        scene.add(object)
      })
    })
    scene.add(light)
    // scene.add(earth)
    scene.add(ring)
    scene.add(satellite)
    scene.add(stars)


    renderer.render(scene, camera);
  }

  let animate = () => {
    let axis = new Three.Vector3(0, 0, 1)
    rot += Math.random() * 0.8
    let radian = (Math.PI * rot) / 180

    // earth && (earth.rotation.y += 0.001)
    ring && ring.rotateOnAxis(axis, Math.PI / 400) //400次转完半圈

    satellite.position.set(
      140 * Math.cos(radian),
      100 * Math.sin(radian),
      80 * Math.sin(radian)
    )

    satellite.rotation.x += 0.01
    satellite.rotation.y += 0.01
    satellite.rotation.z -= 0.01

    stars.rotation.y += 0.0009
    stars.rotation.z -= 0.0009

    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  useEffect(() => {
    initThree();

    animate();
  }, []);

  return (
    <div className='w-screen h-screen'>
      <canvas ref={container} className='w-full h-full'></canvas>
    </div>
  )
}

export default EarthStar