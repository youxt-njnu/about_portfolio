import { useEffect, useRef } from 'react'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import descent3dFrag from './descent3d.frag.glsl'

const index = () => {
  let scene = null,
    camera = null,
    light = null,
    sizes = null,
    renderer = null
  let canvasRef = useRef(null)

  const init = () => {
    sizes = {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
    }

    scene = new Three.Scene()
    scene.fog = new Three.Fog(0x1a1a1a, 1, 1000)
    scene.background = new Three.Color(0x1a1a1a)


    camera = new Three.PerspectiveCamera(
      70,
      sizes.width / sizes.height,
      0.01,
      1000
    )
    camera.position.set(0, 0, 5)
    // camera.lookAt(0, 0, 0);
    scene.add(camera)

    light = new Three.AmbientLight(0xdeedff, 3)
    scene.add(light);

    renderer = new Three.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    scene.add(controls);
  }
  const createModels = () => {
    // 拿到canvas的宽高,而不是canvas的style里的css宽高       
    const { x, y } = renderer.getDrawingBufferSize(new Three.Vector2());
    // console.log(x, y); 用x,y解构，而不是重命名的w,h

    const shader = new Three.ShaderMaterial({

      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: descent3dFrag,
      uniforms: {
        iResolution: { value: new Three.Vector3(x, y) },
        iTime: { value: 0 },
      },

    })
    const plane = new Three.Mesh(
      new Three.PlaneGeometry(5, 5),
      shader
    );
    plane.onBeforeRender = () => {
      shader.uniforms.iTime.value += 0.01;
    }

    scene.add(plane);
  }

  const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    init();
    createModels(); // 要保证模型都到位了，然后进行渲染
    animate();
  }, []);

  return (
    <div className='w-screen h-screen'>
      <canvas className="w-full h-full" ref={canvasRef}></canvas>
    </div>
  )
}

export default index