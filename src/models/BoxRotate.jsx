import { useRef, useEffect } from 'react'
import * as Three from 'three'



const BoxRotate = () => {
  let scene = null,
    camera = null,
    renderer = null

  let ref = useRef(null)

  let box, material, mesh

  const init = () => {
    box = new Three.BoxGeometry(5, 5, 5)
    material = new Three.MeshBasicMaterial({ color: 0xff0000 }) // 与光源无关，所以可以看见物体，即使没有添加光源
    mesh = new Three.Mesh(box, material)

    let sizes = {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    }

    scene = new Three.Scene()
    scene.add(mesh)

    camera = new Three.PerspectiveCamera(
      70,
      sizes.width / sizes.height,
      0.01,
      1000
    )
    camera.position.z = 10

    renderer = new Three.WebGLRenderer({ canvas: ref.current, antialias: true })
    renderer.setSize(sizes.width, sizes.height)
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  const animate = () => {
    mesh && (mesh.rotation.y += 0.02)
    mesh && (mesh.rotation.x += 0.02)
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  useEffect(() => {
    init();
    animate();
  }, []);

  return (
    <div className="w-screen h-screen">
      <canvas className="w-full h-full" ref={ref}></canvas>
    </div>
  )
}

export default BoxRotate