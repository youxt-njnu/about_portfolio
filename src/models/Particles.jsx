import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useEffect, useRef } from 'react';
import * as Three from 'three';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import heartImg from '@/assets/images/heart.png';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; //通过相机控件OrbitControls实现旋转缩放预览效果,就是常见的鼠标控制操作

const Particles = () => {
  let ref = useRef(null)
  let scene, camera, controls, renderer = null;

  const createParticlesBySprite = () => {
    for (let i = -15; i < 16; i++) {
      for (let j = -10; j < 11; j++) {
        let material = new Three.SpriteMaterial({
          color: Math.random() * 0xffffff,
        })
        let sprite = new Three.Sprite(material)
        sprite.position.set(i * 2, j * 2, 0)
        scene.add(sprite)
      }
    }
  }

  const createParticlesByPoints = () => {
    const geometry = new Three.BufferGeometry()
    const material = new Three.PointsMaterial({
      size: 3,
      vertexColors: true, // 需要设置为true，这样如果几何体的颜色数组有值,就会覆盖material的颜色
      color: 0xffffff,
    })
    let vertices = []
    let colors = []
    for (let i = -15; i < 16; i++) {
      for (let j = -15; j < 16; j++) {
        vertices.push(i * 4, j * 4, 0)
        let color = new Three.Color(Math.random() * 0xffffff) // 需要随机生成颜色,也可以直接写Math.random() * 0xffffff?
        colors.push(color.r, color.g, color.b)
      }
    }
    // let geomVertices = new Float32Array(vertices)
    // let geomColors = new Float32Array(colors), 不需要,因为上面传入的时候已经是array了

    geometry.attributes.position = new Three.Float32BufferAttribute(
      vertices,
      3
    ) // 使用的Float32BufferAttribute，而不是BufferAttribute ?
    geometry.attributes.color = new Three.Float32BufferAttribute(colors, 3)
    const points = new Three.Points(geometry, material) // vertices设置了的颜色覆盖了原先的material的白色
    scene.add(points)
  }

  const createStyledParticlesByPoints = (ctrls) => {
    const geometry = new Three.BufferGeometry()
    const material = new Three.PointsMaterial({
      size: ctrls.size,
      vertexColors: ctrls.vertexColors, // 通常 THREE.Points 中所有的粒子都拥有相同的颜色（下面的color)，如果该属性设置为true，并且几何体的颜色数组也有值(此处，colors不仅存在，且里面的还是随机的vertexColor)，那就会使用颜色数组中的值，默认值为 THREE.NoColors。
      vertexColor: ctrls.vertexColor,
      transparent: ctrls.transparency,
      opacity: ctrls.opacity,
      color: ctrls.color, // 粒子系统中所有粒子的颜色。将 vertexColors 属性设置为 true，并且通过颜色属性指定了几何体的颜色来覆盖该属性。默认值为 0xFFFFFF
      sizeAttenuation: ctrls.sizeAttenuation, // false：所有的粒子都将拥有相同的尺寸，无论它们距离相机有多远。true：粒子的大小取决于其距离摄像机的距离的远近，默认值为true
    })
    let vertices = []
    let colors = []
    for (let i = -15; i < 16; i++) {
      for (let j = -15; j < 16; j++) {
        vertices.push(i * 4, j * 4, 0)
        let color = new Three.Color(Math.random() * ctrls.vertexColor)
        colors.push(color.r, color.g, color.b)
      }
    }
    geometry.attributes.position = new Three.Float32BufferAttribute(
      vertices,
      3
    )
    geometry.attributes.color = new Three.Float32BufferAttribute(colors, 3)
    const points = new Three.Points(geometry, material)
    points.name = 'StyledPoints'
    scene.add(points)
  }
  const ctrls = {
    size: 3,
    vertexColors: true,
    color: 0xffffff,
    vertexColor: 0xff0000,
    transparency: true,
    opacity: 0.6,
    sizeAttenuation: true,
    rotate: true,
    redraw: () => {
      if (scene.getObjectByName('StyledPoints'))
        scene.remove(scene.getObjectByName('StyledPoints')) // 先判读是否存在，存在就删除
      createStyledParticlesByPoints({
        size: ctrls.size,
        vertexColors: ctrls.vertexColors,
        color: ctrls.color,
        vertexColor: ctrls.vertexColor,
        transparency: ctrls.transparency,
        opacity: ctrls.opacity,
        sizeAttenuation: ctrls.sizeAttenuation,
      }) // 以对象的形式传入参数
    },
  }

  // 画布宽300，高300，中心150，在这个画布上绘制；颜色渐变就是在这个画布上体现，从左到右；moveTo是绘制的起点位置；arc是需要绘制的形状
  const createCanvas = () => {
    const canvas = document.createElement('canvas') // webapi这边的属性都是小驼峰，three.js的属性也是小驼峰，但类是大驼峰
    canvas.width = 300
    canvas.height = 300
    const ctx = canvas.getContext('2d') // context getContext('2d')方法获取了canvas的2D渲染上下文，这是一个CanvasRenderingContext2D对象，用于在画布上绘制图形。
    ctx.lineWidth = 10 // 这里的10加粗作用
    ctx.beginPath() // beginPath方法开始一个新的路径
    ctx.moveTo(200, 150) // moveTo方法将绘制的起点移至(200, 150)坐标

    var grd = ctx.createLinearGradient(100, 0, 200, 0) // 定义了一个水平方向的线性渐变，从画布的x=100，y=0开始；向右延伸到x=200的位置。这种设置会使渐变的变化沿x轴发生，而y轴位置保持不变，因此颜色变化只在水平方向上。这种渐变的设置可能是为了在绘制（如圆或其他形状）时提供一个水平的色彩过渡效果
    grd.addColorStop('0', 'black')
    grd.addColorStop('0.3', 'magenta') // // 30%处为品红色
    grd.addColorStop('0.5', 'blue')
    grd.addColorStop('0.6', 'green')
    grd.addColorStop('0.8', 'yellow')
    grd.addColorStop('1', 'red')

    ctx.strokeStyle = grd
    ctx.arc(150, 150, 50, 0, 2 * Math.PI) // 使用arc方法在(150,150)位置绘制一个半径为50的圆，从0弧度开始到2 * Math.PI弧度结束（即一个完整的圆）
    ctx.stroke() // stroke方法绘制定义的路径

    const texture = new Three.CanvasTexture(canvas) // 使用canvas创建一个Three.js的CanvasTexture纹理;
    texture.needsUpdate = true // 告诉Three.js这个纹理需要被上传到GPU
    return texture
  }

  const createParticlesByCanvas = (
    size,
    transparent,
    opacity,
    sizeAttenuation,
    color
  ) => {
    // 参数里面如果不加{}，那么下面调用的时候直接传入数值
    const geometry = new Three.BufferGeometry() // .后面的首字母就大写了
    const material = new Three.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      sizeAttenuation: sizeAttenuation,
      map: createCanvas(),
      color: color,
      depthTest: true, // 处理前后叠加层级问题
      depthWrite: false, // 粒子显示正常的透明效果
    })
    let vertices = []
    let range = 200
    for (let i = 0; i < 400; i++) {
      let vertex = new Three.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      )
      vertices.push(vertex.x, vertex.y, vertex.z)
    }
    let geomVertices = new Three.Float32BufferAttribute(vertices, 3)
    geometry.attributes.position = geomVertices
    const points = new Three.Points(geometry, material)
    scene.add(points)
  }

  const createParticlesByTexture = (size, opacity, transparency) => {
    const geometry = new Three.BufferGeometry()
    const material = new Three.PointsMaterial({
      size: size,
      transparent: transparency,
      opacity: opacity,
      map: new Three.TextureLoader().load(heartImg),
      sizeAttenuation: true,
      depthTest: true,
      depthWrite: false,
    })
    let vertices = []
    let range = 200
    for (let i = 0; i < 400; i++) {
      let vertex = new Three.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      )
      vertices.push(vertex.x, vertex.y, vertex.z)
    }
    geometry.attributes.position = new Three.Float32BufferAttribute(
      vertices,
      3
    )
    let points = new Three.Points(geometry, material)
    scene.add(points)
  }

  // THREE.Points 是基于几何体的顶点来渲染每个粒子的，利用这一特性我们就可以从高级几何体来创建几何体形状的粒子。下面示例中我们利用 THREE.SphereGeometry 来创建一个球形的粒子系统
  const createCanvasTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    let ctx = canvas.getContext('2d')
    let grd = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    )
    grd.addColorStop(0, 'rgba(255,255,255,1)')
    grd.addColorStop(0.2, 'rgba(0,255,255,1)')
    grd.addColorStop(0.4, 'rgba(0,0,255,1)')
    grd.addColorStop(1, 'rgba(0,255,0,1)')

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const texture = new Three.CanvasTexture(canvas) // 直接用CanvasTexture
    texture.needsUpdate = true
    return texture
  }

  const createParticlesByGeometry = () => {
    const geometry = new Three.SphereGeometry(50, 32, 32)
    const material = new Three.PointsMaterial({
      size: 1,
      map: createCanvasTexture(),
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      color: 0xed1c24,
      blending: Three.AdditiveBlending, // 通过设置blending属性为THREE.AdditiveBlending，我们可以让粒子系统的颜色叠加起来，从而产生更加明亮的效果
      depthTest: true,
      depthWrite: false,
    })
    const points = new Three.Points(geometry, material)
    scene.add(points)
  }

  const init = () => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    scene = new Three.Scene()
    camera = new Three.PerspectiveCamera(75, 1, 0.1, 1000)
    scene.add(camera) // don't forget to add camera to scene
    // const light = new Three.AmbientLight(0xffffff, 1)
    // scene.add(light)
    controls = new OrbitControls(camera, ref.current)
    controls.enableDamping = true

    renderer = new Three.WebGLRenderer({ canvas: ref.current })

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.aspect = sizes.width / sizes.height
    camera.position.z = 120
    camera.lookAt(new Three.Vector3(0, 0, 0))

  }
  const animate = () => {
    renderer.render(scene, camera)
    controls && controls.update() // 存在？，更新
    requestAnimationFrame(animate)
  }

  const updateScene = (plan) => {
    scene.clear() // 折腾了半天，原来直接scene.clear()就行了，不用scene里remove特定的，也不用renderer.clear()后render(scene, camera)。其中.clear()清除了scene里所有的对象，是继承自Object3D的方法
    switch (plan) {
      case 0:
        createParticlesBySprite()
        break
      case 1:
        {
          createParticlesByPoints()
          // const gui = new dat.GUI()
          // gui.add(ctrls, 'size', 1, 10).onChange(ctrls.redraw)
          // gui.add(ctrls, 'vertexColors').onChange(ctrls.redraw)
          // gui.addColor(ctrls, 'color').onChange(ctrls.redraw)
          // gui.addColor(ctrls, 'vertexColor').onChange(ctrls.redraw) // 颜色的不用其他参数
          // gui.add(ctrls, 'transparency').onChange(ctrls.redraw)
          // gui.add(ctrls, 'opacity', 0, 1).onChange(ctrls.redraw)
          // gui.add(ctrls, 'sizeAttenuation').onChange(ctrls.redraw) // true, false的不用其他参数
          break
        }
      case 2:
        // createParticlesByCanvas({ size: 10, opacity: 0.6 })
        createParticlesByCanvas(10, true, 0.6, true, 0xffffff) // 这里的是10放大作用
        break
      case 3:
        createParticlesByTexture(10, 0.6, true) // 传入的内容不需要是一个对象，直接传入数值即可，因为这个函数里面也不是对象
        break
      case 4:
        createParticlesByGeometry()
        break
      default:
        createParticlesBySprite()

    }

  }

  useEffect(() => {
    init()
    updateScene(0)
    animate()
  }, [])

  return (
    <div className='absolute flex w-screen top-20 flex-col items-center'>
      <header className='flex w-full items-center justify-between border-b-2 border-b-black shadow-xl'>
        <div className="mr-8 text-right">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
              different ways to create particles
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl border border-gray-800 bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none"
            >
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => updateScene(0)}>
                  createParticlesBySprite

                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => updateScene(1)}>
                  createParticlesByPoints
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => updateScene(2)}>
                  createParticlesByCanvas

                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => updateScene(3)}>
                  createParticlesByTexture

                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => updateScene(4)}>
                  createParticlesByGeometry
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </header>
      <canvas ref={ref}></canvas>
    </div>
  )
}

export default Particles