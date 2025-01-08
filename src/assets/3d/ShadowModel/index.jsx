import { useEffect, useRef } from 'react'
import * as Three from 'three'
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'; // not tween.module.min.js
import './index.scss'
import glbModel from './statue.glb'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// 都需要加{}

const index = () => {

  let canvasRef = useRef(null);
  let canvasRef2 = useRef(null);
  let renderer1, renderer2, scene, cameraGroup, camera1, camera2, fillLight = null;

  const clock = new Three.Clock()
  let previousTime = 0
  // judge pages and render
  let secondContainer = false

  const cursor = { x: 0, y: 0 }

  let initThree = () => {

    renderer1 = new Three.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer2 = new Three.WebGLRenderer({
      canvas: canvasRef2.current,
      antialias: false,
    })

    const sizes = {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
    }

    renderer1.autoClear = true
    renderer1.outputColorSpace = Three.SRGBColorSpace // API已经改成了ColorSpace
    renderer1.setSize(sizes.width, sizes.height)
    renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    // renderer2.autoClear = true
    renderer2.outputColorSpace = Three.SRGBColorSpace
    renderer2.setSize(sizes.width, sizes.height)
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    scene = new Three.Scene() // 类比unity，一个scene即可
    cameraGroup = new Three.Group() //TODO: why use cameraGroup
    camera1 = new Three.PerspectiveCamera(35, 1, 1, 100)
    camera2 = new Three.PerspectiveCamera(35, 1, 1, 100)
    scene.add(cameraGroup)

    camera1.aspect = sizes.width / sizes.height

    camera1.position.set(19, 1.54, -0.1)
    cameraGroup.add(camera1)

    camera2.aspect = sizes.width / sizes.height
    camera2.position.set(3, 3, 3)
    camera2.rotation.set(0, 1, 0)

    scene.add(camera2)

    // add light
    const light = new Three.DirectionalLight(0xffffff, 0.8)
    light.position.set(-100, 0, -100) // 从后面放置光，更渲染了物体的轮廓线
    scene.add(light)

    fillLight = new Three.PointLight(0x88ffee, 2.7, 4, 3)
    fillLight.position.set(30, 3, 1.8)
    scene.add(fillLight)


    const loadingManager = new Three.LoadingManager()
    loadingManager.onLoad = () => {
      // 加载完成
      document.querySelector('.content').style.visibility = 'visible'
      let yPosition = { y: 0 }
      const ftsLoader = document.querySelector('.lds-roller')
      const loadingCover = document.getElementById('loading-text-intro')

      // 加载页面下移、消失、移除
      const tween1 = new TWEEN.Tween(yPosition)
        .to({ y: 100 }, 900)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
        .onUpdate(() => {
          loadingCover.style.setProperty(
            'transform',
            `translate(0,${yPosition.y}%)`
          ) // 沿着y轴方向下移{yPosition.y}%
        })
        .onComplete(() => {
          loadingCover.parentNode.removeChild(
            document.getElementById('loading-text-intro')
          ) // 写loadingCover会报空
          TWEEN.remove(tween1) // 不能直接写this，会出现指向错误
        })

      const tween2 = new TWEEN.Tween(camera1.position.set(0, 4, 2))
        .to({ x: 0, y: 2.4, z: 5.8 }, 3500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
        .onComplete(() => {
          TWEEN.remove(tween2)
          document.querySelector('.nav-head').classList.add('ended')
          document.querySelector('.description').classList.add('ended') // 加ended，调整透明度、位置这些
        })

      ftsLoader.parentNode.removeChild(ftsLoader)
      window.scroll(0, 0)
    }
    loadingManager.onError = (url) => {
      console.log('There was an error loading ' + url)
    }


    // loading model
    const base = import.meta.env.BASE_URL; // 自动获取 Vite 的 base 配置
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(`${base}/draco/`)
    dracoLoader.setDecoderConfig({ type: 'js' })
    const gltfLoader = new GLTFLoader(loadingManager)
    // gltfLoader.dracoLoader = dracoLoader
    gltfLoader.setDRACOLoader(dracoLoader)

    let oldMaterial
    gltfLoader.load(glbModel, (obj) => {
      obj.scene.traverse((child) => {
        if (child.isMesh) {
          oldMaterial = child.material
          child.material = new Three.MeshPhongMaterial({
            shininess: 100,
          })
        }
      })
      scene.add(obj.scene)
      oldMaterial.dispose()
      renderer1.renderLists.dispose() // 这一句不知道作用的具体体现
    })


    // 用于异步观察一个元素与其祖先元素或顶级文档视窗（viewport）的交叉状态
    const ob = new IntersectionObserver(
      (payload) => {
        secondContainer = payload[0].intersectionRatio > 0.05
      },
      { threshold: 0.05 }
    )
    ob.observe(document.querySelector('.second'))

  }


  const update = function (e) {
    const span = document.querySelector('span')
    if (e.type === 'mouseleave') {
      span.style.cssText = ''
    } else {
      const { offsetX: x, offsetY: y } = e // 鼠标的位置
      const { offsetWidth: width, offsetHeight: height } = this // 用this的时候，最好用function(){},此处是.nav-head>.a
      const walk = 20
      const xWalk = (x / width) * (walk * 2) - walk
      const yWalk = (y / height) * (walk * 2) - walk
      span.style.cssText = `transform: translate(${xWalk}px, ${yWalk}px);`
    }
  }

  const animate = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const parallaxY = cursor.y //-0.5~0.5
    const parallaxX = cursor.x

    // 更新点光源的位置
    fillLight.position.y -=
      (parallaxY * 9 + fillLight.position.y - 2) * deltaTime
    fillLight.position.x +=
      (parallaxX * 8 - fillLight.position.x) * 2 * deltaTime
    // 更新第一个相机所在相机组的位置
    cameraGroup.position.z -=
      (parallaxY / 3 + cameraGroup.position.z) * 2 * deltaTime
    cameraGroup.position.x +=
      (parallaxX / 3 - cameraGroup.position.x) * 2 * deltaTime

    TWEEN.update()

    secondContainer
      ? renderer2.render(scene, camera2)
      : renderer1.render(scene, camera1)
    requestAnimationFrame(animate)
  }

  const animateCamera = (position, rotation) => {
    const tween1 = new TWEEN.Tween(camera2.position)
      .to(position, 3500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete(() => {
        TWEEN.remove(tween1)
      })

    const tween2 = new TWEEN.Tween(camera2.rotation)
      .to(rotation, 3500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete(() => {
        TWEEN.remove(tween2)
      })
  }
  const handleResize = () => {
    let sizes = {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
    }
    renderer1.setSize(sizes.width, sizes.height)
    renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer2.setSize(sizes.width, sizes.height)
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera1.aspect = sizes.width / sizes.height
    camera1.updateProjectionMatrix()
    camera2.aspect = sizes.width / sizes.height
    camera2.updateProjectionMatrix()
  }

  useEffect(() => {
    initThree();
    animate();

    document.addEventListener(
      'mousemove',
      (e) => {
        e.preventDefault()
        cursor.x = e.clientX / window.innerWidth - 0.5 // 缩放到-0.5~0.5
        cursor.y = e.clientY / window.innerHeight - 0.5
        // 鼠标移动时添加虚拟光标
        document.querySelector(
          '.cursor'
        ).style.cssText = `left: ${e.clientX}px; top: ${e.clientY}px;`
      },
      false
    )

    const btn = document.querySelectorAll('.nav-head > .a')
    btn.forEach((b) => b.addEventListener('mousemove', update))
    btn.forEach((b) => b.addEventListener('mouseleave', update))

    document.getElementById('one').addEventListener('click', () => {
      document.getElementById('one').classList.add('active')
      document.getElementById('two').classList.remove('active')
      document.getElementById('three').classList.remove('active')
      animateCamera({ x: 3, y: 3, z: 3 }, { x: 0, y: 1, z: 0 })
      document.getElementById('content').innerText = '入门阶段'
    })

    document.getElementById('two').addEventListener('click', () => {
      document.getElementById('one').classList.remove('active')
      document.getElementById('two').classList.add('active')
      document.getElementById('three').classList.remove('active')
      animateCamera({ x: -1.4, y: 2.8, z: 4.4 }, { x: 0, y: -0.1, z: 0 })
      document.getElementById('content').innerText = '运行阶段'
    })

    document.getElementById('three').addEventListener('click', () => {
      document.getElementById('one').classList.remove('active')
      document.getElementById('two').classList.remove('active')
      document.getElementById('three').classList.add('active')
      animateCamera({ x: -4.8, y: 2.9, z: 3.2 }, { x: 0, y: -0.75, z: 0 })
      document.getElementById('content').innerText = '结束阶段'
    })

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="shadow_page">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="loading-text-intro">
        <p>Loading</p>
      </div>
      <div className="content"
        style={{ visibility: 'hidden' }}>
        <div className="nav-head">
          <a href="#"
            className="a active"><span>Main</span></a>
          <a href="#"
            className="a"><span>About</span></a>
          <a href="#"
            className="a"><span>Gallery</span></a>
          <a href="#"
            className="a"><span>Contact</span></a>
          <a href="#"
            className="a"><span>More</span></a>
          <div className="cursor"></div>
        </div>
        <section className="section first">
          <canvas ref={canvasRef} id="container"
            className="webgl"></canvas>
          <div className="info">
            <h2 className="name">DEAGONIR</h2>
            <h1 className="title">THREEJS</h1>
            <p className="description">&nbsp;</p>
          </div>
        </section>
        <section className="section second">
          <div className="second-container">
            <ul>
              <li id="one"
                className="active">start</li>
              <li id="two">running</li>
              <li id="three">finished</li>
            </ul>
            <p className="text"
              id="content">入门阶段</p>
          </div>
          <canvas ref={canvasRef2} id="containerDetails"
            className="webgl"></canvas>
        </section>
      </div>
    </div >
  )
}

export default index