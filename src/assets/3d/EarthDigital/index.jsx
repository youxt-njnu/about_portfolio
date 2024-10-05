import * as dat from 'dat.gui';
import { useEffect, useRef, useState } from 'react';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { chart_1_option, chart_2_option, chart_3_option, chart_4_option, chart_5_option, tips, weekMap } from './constant.js';
import earthImg from './images/earth.jpg';
import './index.scss';
import lineFragmentShader from './line.frag.glsl';


// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PolarComponent,
  LegendComponent,
  ToolboxComponent,
  LineChart,
  PieChart,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

// 得把下面的变量设置和函数写在const index = () => {}里面，否则会报错

const index = () => {
  let scene = null;
  let camera = null;
  let renderer = null;
  let orbitControls = null;
  let earth = null;
  let composer = null;
  let canvasRef = useRef(null);


  let impacts = [];
  let trails = [];

  let params = {
    colors: { base: '#f9f002', gradInner: '#8ae66e', gradOuter: '#03c03c' },
    reset: () => { orbitControls.reset() },
  }
  let uniformsSettings = {
    impacts: { value: impacts },
    maxSize: { value: .04 }, // 陆地色块大小
    minSize: { value: .025 }, // 海洋色块大小
    waveHeight: { value: .1 }, // 冲击波高度
    scaling: { value: 1 }, // 冲击波范围
    gradInner: { value: new Three.Color(params.colors.gradInner) }, // 冲击波径向渐变内侧颜色
    gradOuter: { value: new Three.Color(params.colors.gradOuter) }, // 冲击波径向渐变外侧颜色
  }


  let maxImpactAmount = 10;

  const [week, setWeek] = useState(weekMap[new Date().getDay()]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showModal, setShowModal] = useState(false);
  const [modelText, setModelText] = useState(tips[0]);
  const [renderGlithPass, setRenderGlithPass] = useState(false);
  const renderGlithPassRef = useRef(renderGlithPass); // 用于解决useEffect中的闭包问题

  useEffect(() => {
    initThree();
    initChart();
    for (let i = 0; i < maxImpactAmount; i++) {
      impacts.push({
        impactPosition: new Three.Vector3().random().subScalar(0.5).setLength(5), // 生成一个随机的三维向量，然后减去0.5，然后设置长度为5
        impactMaxRadius: 5 * Three.MathUtils.randFloat(0.5, 0.75), // Three.Math.randFloat会报错
        impactRatio: 0,
        prevPosition: new Three.Vector3().random().subScalar(0.5).setLength(5),
        trailRatio: { value: 0 },
        trailLength: { value: 0 }
      });
      makeTrail(i);
    }
    setTrailAnimation();
    animate();
    // guiControls();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    renderGlithPassRef.current = renderGlithPass;
  }, [renderGlithPass]);

  const initThree = () => {
    scene = new Three.Scene();
    camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(0, 0, 15.5);
    scene.add(camera);

    renderer = new Three.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true // transparent background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.enablePan = false;

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new GlitchPass());
  }

  const createPoints = () => {
    let rad = 5; // 球体半径
    let counter = 75000; // 球体上的点数量
    let dlong = Math.PI * (3 - Math.sqrt(5)); // 经度的增量
    let dz = 2 / counter; // 纬度的增量，也就是z轴的增量
    let z = 1 - dz / 2; // 初始z值
    let long = 0; // 初始经度
    let r = 0; // xy平面上的经向半径，类似于x^2+y^2=r^2(圆),r^2+z^2=1(球)
    let p = new Three.Vector3(); // 用于存xyz的坐标
    let sph = new Three.Spherical(); // 构建把上面的转换成球体坐标
    let dummyObj = new Three.Object3D(); // 用于调整后续球面上plane的位置和朝向
    let geoms = []; // 存储所有的plane

    // let earthTexture = new Three.TextureLoader().load(earthImg, function (texture) {
    //   console.log('texture loaded successfully');
    // }, undefined, function (err) { console.log('texture load failed', err); });
    let earthTexture = new Three.TextureLoader().load(earthImg);

    for (let i = 0; i < counter; i++) {
      r = Math.sqrt(1 - z * z);
      p.set(r * Math.cos(long), z, -r * Math.sin(long)).multiplyScalar(rad);
      sph.setFromVector3(p);
      long = long + dlong;
      z = z - dz;
      dummyObj.lookAt(p);
      dummyObj.updateMatrix();
      // 构建球面上的plane，同时设置uv坐标
      let plane = new Three.PlaneGeometry(1, 1);
      plane.applyMatrix4(dummyObj.matrix);
      plane.translate(p.x, p.y, p.z);
      let centers = [p.x, p.y, p.z, p.x, p.y, p.z, p.x, p.y, p.z, p.x, p.y, p.z];
      // plane.setAttribute('center', new Three.BufferAttribute(new Float32Array(centers), 3)); // 这种写法也可以的
      plane.setAttribute('center', new Three.Float32BufferAttribute(centers, 3));

      let uv = new Three.Vector2((sph.theta + Math.PI) / (2 * Math.PI), 1 - (sph.phi / Math.PI));
      let uvs = [uv.x, uv.y, uv.x, uv.y, uv.x, uv.y, uv.x, uv.y];
      // let uv = [(sph.theta + Math.PI) / (2 * Math.PI), 1 - (sph.phi / Math.PI)];
      // let uvs = [uv[0], uv[1], uv[0], uv[1], uv[0], uv[1], uv[0], uv[1]];
      // plane.setAttribute('baseUv', new Three.BufferAttribute(new Float32Array(uvs), 2));
      plane.setAttribute('baseUv', new Three.Float32BufferAttribute(uvs, 2));
      geoms.push(plane);
    }

    let g = mergeGeometries(geoms);
    let m = new Three.MeshBasicMaterial({
      color: new Three.Color(params.colors.base),
      onBeforeCompile: shader => {
        shader.uniforms.impacts = uniformsSettings.impacts;
        shader.uniforms.maxSize = uniformsSettings.maxSize;
        shader.uniforms.minSize = uniformsSettings.minSize;
        shader.uniforms.waveHeight = uniformsSettings.waveHeight;
        shader.uniforms.scaling = uniformsSettings.scaling;
        shader.uniforms.gradInner = uniformsSettings.gradInner;
        shader.uniforms.gradOuter = uniformsSettings.gradOuter;
        shader.uniforms.tex = { value: earthTexture };
        shader.vertexShader = `
            struct impact {
              vec3 impactPosition;
              float impactMaxRadius;
              float impactRatio;
            };
            uniform impact impacts[${maxImpactAmount}];
            uniform sampler2D tex;
            uniform float maxSize;
            uniform float minSize;
            uniform float waveHeight;
            uniform float scaling;

            attribute vec3 center;
            attribute vec2 baseUv;

            varying float vFinalStep;
            varying float vMap;

            ${shader.vertexShader}
          `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
            float finalStep = 0.0;
            for (int i = 0; i < ${maxImpactAmount};i++){
              float dist = distance(center, impacts[i].impactPosition);
              float curRadius = impacts[i].impactMaxRadius * impacts[i].impactRatio;
              float sstep = smoothstep(0., curRadius, dist) - smoothstep(curRadius - ( 0.25 * impacts[i].impactRatio ), curRadius, dist);
              sstep *= 1. - impacts[i].impactRatio;
              finalStep += sstep;
            }
            finalStep = clamp(finalStep, 0., 1.);
            vFinalStep = finalStep;

            float map = texture(tex, baseUv).g;
            vMap = map;
            float pSize = map < 0.5 ? maxSize : minSize;
            float scale = scaling;

            transformed = (position - center) * pSize * mix(1., scale * 1.25, finalStep) + center; // scale on wave
            transformed += normal * finalStep * waveHeight; // lift on wave
            `
        );
        shader.fragmentShader = `
            uniform vec3 gradInner;
            uniform vec3 gradOuter;
            varying float vFinalStep;
            varying float vMap;
            ${shader.fragmentShader}
            `.replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `
            // shaping the point, pretty much from The Book of Shaders
            vec2 hUv = (vUv - 0.5);
            int N = 8;
            float a = atan(hUv.x,hUv.y); 
            float r = PI2/float(N);
            float d = cos(floor(.5+a/r)*r-a)*length(hUv);
            float f = cos(PI / float(N)) * 0.5;
            if (d > f) discard;

            vec3 grad = mix(gradInner, gradOuter, clamp( d / f, 0., 1.)); // gradient
            vec3 diffuseMap = diffuse * ((vMap > 0.5) ? 0.5 : 1.);
            vec3 col = mix(diffuseMap, grad, vFinalStep); // color on wave
            if (!gl_FrontFacing) col *= 0.25; // moderate the color on backside
            vec4 diffuseColor = vec4( col , opacity );
            `);
      }
    });
    m.defines = { 'USE_UV': '' };
    earth = new Three.Mesh(g, m);
    earth.rotation.y = Math.PI;
    // earth.add(new Three.Mesh(new Three.SphereGeometry(4.995, 72, 36), new Three.MeshBasicMaterial({ map: earthTexture })));
    trails.forEach(t => earth.add(t));
    earth.position.set(0, -0.4, 0);
    scene.add(earth);
  }

  // 初始化100个点，得到一条路径；添加index属性，形成起止正确的路径，加入trails
  function makeTrail (idx) {
    let pts = new Array(100 * 3).fill(0);
    let g = new Three.BufferGeometry();
    g.setAttribute("position", new Three.Float32BufferAttribute(pts, 3));
    let m = new Three.LineDashedMaterial({
      color: params.colors.gradOuter,
      transparent: true, // 设置为false，trail的尾部有白色残影
      // opacity: 1,
      onBeforeCompile: shader => {
        shader.uniforms.actionRatio = impacts[idx].trailRatio;
        shader.uniforms.lineLength = impacts[idx].trailLength;
        shader.fragmentShader = lineFragmentShader;
      }
    })
    let l = new Three.Line(g, m);
    l.userData.idx = idx;
    setPath(l, impacts[idx].prevPosition, impacts[idx].impactPosition);
    trails.push(l);
  }

  const setPath = (l, startPoint, endPoint, peakHeight, cycles) => {
    let pos = l.geometry.attributes.position; //预存点的最新位置
    let division = pos.count - 1; //l上的分段数目
    let cycle = cycles || 1; //??
    let peak = peakHeight || 1; //峰高
    let radius = startPoint.length(); // 对应球的半径
    let angle = startPoint.angleTo(endPoint); //起始点和终点的夹角
    let arcLength = radius * angle; //弧长

    let diameterMinor = arcLength / Math.PI; // 新圆的直径
    let radiusMinor = diameterMinor / 2 / cycle; // 考虑cycle下新圆的半径
    let peakRatio = peak / diameterMinor; // 峰高比例
    let radiusMajor = radius + radiusMinor; // 大圆的半径

    let basisMajor = new Three.Vector3().copy(startPoint).setLength(radiusMajor); // trail的点基准1
    let basisMinor = new Three.Vector3().copy(startPoint).negate().setLength(radiusMinor); // trail的点基准2

    let tri = new Three.Triangle(startPoint, endPoint, new Three.Vector3()); // 三角形
    let nrm = new Three.Vector3();
    tri.getNormal(nrm); // 拿到法线

    let v3Major = new Three.Vector3(); //里面的v3表示vec3 
    let v3Minor = new Three.Vector3();
    let v3Inter = new Three.Vector3();
    let vFinal = new Three.Vector3(); // 里面v也可理解为varying

    for (let i = 0; i <= division; i++) {
      let divisionRatio = i / division; // 分段比例
      let angleValue = divisionRatio * angle; // 分段角度
      v3Major.copy(basisMajor).applyAxisAngle(nrm, angleValue); // 在basisMajor的基础上绕着法线旋转
      v3Minor.copy(basisMinor).applyAxisAngle(nrm, angleValue + Math.PI * 2 * divisionRatio * cycle); // 在basisMinor的基础上绕着法线旋转
      v3Inter.addVectors(v3Major, v3Minor); // 两个向量相加
      let newLength = (v3Inter.length() - radius) * peakRatio + radius; // 新的长度
      vFinal.copy(v3Inter).setLength(newLength); // 设置新的长度
      pos.setXYZ(i, vFinal.x, vFinal.y, vFinal.z); // 设置新的位置
    }

    //更新完了点数据后需要加上这句
    pos.needsUpdate = true;
    // console.log(l.geometry.attributes.position.array);
    l.computeLineDistances();  // 计算每个顶点到起点的累加距离
    l.geometry.attributes.lineDistance.needsUpdate = true;
    impacts[l.userData.idx].trailLength.value = l.geometry.attributes.lineDistance.array[99];
    l.material.dashSize = 3;
  }

  const setTrailAnimation = () => {
    let tweens = [];
    for (let i = 0; i < maxImpactAmount; i++) {
      tweens.push({
        runTween: () => {
          let path = trails[i]; // 当前路径
          let speed = 3;
          let len = path.geometry.attributes.lineDistance.array[99];
          let dur = len / speed; // 持续时间

          let tweenTrail = new TWEEN.Tween({ value: 0 })
            .to({ value: 1 }, dur * 1000)
            .onUpdate(val => {
              impacts[i].trailRatio.value = val.value;
            });
          var tweenImpact = new TWEEN.Tween({ value: 0 })
            .to({ value: 1 }, Three.MathUtils.randInt(2500, 5000))
            .onUpdate(val => {
              uniformsSettings.impacts.value[i].impactRatio = val.value;
            })
            .onComplete(val => {
              impacts[i].prevPosition.copy(impacts[i].impactPosition);
              impacts[i].impactPosition.random().subScalar(0.5).setLength(5);
              setPath(path, impacts[i].prevPosition, impacts[i].impactPosition);
              uniformsSettings.impacts.value[i].impactMaxRadius = 5 * Three.MathUtils.randFloat(0.5, 0.75);
              tweens[i].runTween();
            });
          tweenTrail.chain(tweenImpact);
          tweenTrail.start();
        }
      })
    }
    tweens.forEach(t => t.runTween());
    createPoints(); // 更新点的内容
  }

  let chartsRef = Array.from({ length: 5 }).map(() => useRef(null));
  const initChart = () => {
    const chartsOption = [chart_1_option, chart_2_option, chart_3_option, chart_4_option, chart_5_option];
    const charts = chartsRef.map(ref => ref.current && echarts.init(ref.current, 'dark'));
    charts.forEach((chart, idx) => {
      chart && chart.setOption(chartsOption[idx]);
    });
  }
  const guiControls = () => {
    const gui = new dat.GUI();
    gui.add(uniformsSettings.maxSize, 'value', 0.01, 0.06).step(0.001).name('陆地');
    gui.add(uniformsSettings.minSize, 'value', 0.01, 0.06).step(0.001).name('海洋');
    gui.add(uniformsSettings.waveHeight, 'value', 0.1, 1).step(0.001).name('浪高');
    gui.add(uniformsSettings.scaling, 'value', 1, 5).step(0.01).name('范围');
    // gui.add(uniformsSettings.gradInner,'value').name('内侧颜色').onChange( v => uniformsSettings.gradInner.value = new Three.Color(v)); // uniformsSettings的颜色其实是依赖于params里的，所以进行监听params.colors.gradInner
    // gui.add(uniformsSettings.gradOuter,'value').name('外侧颜色').onChange( v => uniformsSettings.gradOuter.value = new Three.Color(v));
    gui.addColor(params.colors, 'base').name('基础色').onChange(v => earth && (earth.material.color.set(v)));
    gui.addColor(params.colors, 'gradInner').name('内侧颜色').onChange(v => uniformsSettings.gradInner.value.set(v)); // 不用重新new Three.Color,选择到的直接就是十六进制颜色
    gui.addColor(params.colors, 'gradOuter').name('外侧颜色').onChange(v => uniformsSettings.gradOuter.value.set(v));
    gui.add(params, 'reset').name('重置');
  }
  const animate = () => {
    // 更新tween
    TWEEN.update();
    // 模型动画
    earth.rotation.y += 0.001;
    renderer && scene && camera && renderer.render(scene, camera);
    requestAnimationFrame(animate);
    renderGlithPassRef.current && composer.render();
  }

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // composer.setSize(window.innerWidth, window.innerHeight);
  }

  const handleStartButtonClick = () => {
    setRenderGlithPass(!renderGlithPass);
  }

  return (
    <div className="earth-digital bg-black h-screen w-full overflow-hidden select-none">
      <div className="p-0 m-0 box-border">
        <canvas ref={canvasRef} className="relative z-1 cursor-pointer"></canvas>
        <header className="hud header w-full left-0 top-0">
          <div className="left">
            <p className="date">
              <span className="text">{`${week}曜日 `}</span>
              <span className="text">{time}</span>
            </p>
          </div>
          <div className="middle"></div>
          <div className="right">
            <p className="date">
              <span className="text">Kepler-90 +49°18′18.58″</span>
            </p>
          </div>
        </header>
        <div className="logo-pic" title='Cyberpunk 2077'></div>
        <aside className="hud aside left">
          <div className="box box_0 inverse">
            <div className="cover"></div>
            <div className="info">
              <p className='text'><b>Cyberpunk</b> is a subgenre of science fiction in a dystopian futuristic setting that tends to focus on a "combination of lowlife and high tech", featuring futuristic technological and scientific achievements, such as artificial intelligence and cybernetics, juxtaposed with societal collapse or decay. </p>
              <button className="startBtn" onClick={handleStartButtonClick}>START</button>
            </div>
          </div>
          <div className="box"><div className="chart" ref={chartsRef[0]}></div></div>
          <div className="box inverse dotted"><div className="chart" ref={chartsRef[1]}></div></div>
        </aside>
        <aside className="hud aside right">
          <div className="box"><div className="chart" ref={chartsRef[2]}></div></div>
          <div className="box"><div className="chart" ref={chartsRef[3]}></div></div>
          <div className="box inverse dotted"><div className="chart" ref={chartsRef[4]}></div></div>
        </aside>
        <footer className="hud footer">footer</footer>
        <section className="background">section</section>
      </div>
    </div>
  )
}

export default index