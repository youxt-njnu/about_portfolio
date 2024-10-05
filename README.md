# 附带

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# 资源

[视频教程](https://www.youtube.com/watch?v=FkowOdMjvYo)

[react入门](https://juejin.cn/post/6960262593265025031)

[react three fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene#adding-lights)

其他相关教程：

[react+three](https://www.bilibili.com/video/BV1hX4y1y7nn/?spm_id_from=333.788&vd_source=5270415d668b21206238403450bb29b5)

# 笔记

[link](): 外层的README.md

### 配置scss

在使用 Vite 和 React 的项目中集成 SCSS，你可以通过几个简单的步骤来配置。Vite 提供了内置支持，所以集成过程相对简单。以下是设置步骤：

首先，你需要安装 SCSS 的编译器，通常是 `sass` 包。在你的项目目录中打开终端，然后运行以下命令：

```bash
npm install sass --save-dev
```

或者使用 `yarn`：

```bash
yarn add sass --dev
```

由于 Vite 已经预配置了对预处理器（如 SCSS）的支持，你不需要在 Vite 配置文件中做额外设置。安装 `sass` 包后，Vite 会自动处理 `.scss` 或 `.sass` 文件。

现在你可以开始在你的 React 项目中使用 SCSS 了。创建一个 SCSS 文件，例如 `App.scss`，并在你的 React 组件中引入它。

**App.scss**

```scss
$primary-color: blue;

.container {
  color: $primary-color;
  padding: 20px;
  font-size: 18px;
}
```

**App.jsx**

```jsx
import './App.scss';

function App() {
  return (
    <div className="container">
      Hello, World!
    </div>
  );
}
```

如果你的 Vite 配置和依赖都设置好了，你应该可以正常运行你的项目并看到 SCSS 被正确应用。

```bash
npm run dev
```

# 报错

```
[plugin:vite:css] Preprocessor dependency "stylus" not found. Did you install it? Try `npm install -D stylus`.
```

```
E:/PersonalCV/about_portfolio/src/components/modelThreeExp/Earth/index.styl
```

解决：

```
npm install -D stylus
```

---

我npm run dev之后，报错为 src/components/modelThreeExp/Earth/index.js:131:6:
      131 │       `<div className="earth_page">`
          ╵       ^

  The esbuild loader for this file is currently set to "js" but it must be set to "jsx" to be able to parse JSX syntax. You can use "loader: { '.js': 'jsx' }" to do that.

解决：

这个错误提示说明你的项目在使用 esbuild 来构建时，遇到了 JSX 语法的文件，但是文件的扩展名为 `.js` 而不是 `.jsx`，而且 esbuild 的配置没有正确设置来处理这种情况。esbuild 默认将 `.js` 文件作为普通的 JavaScript 文件处理，不会解析 JSX 语法。

为了解决这个问题，你可以按照错误提示中的建议，修改你的构建配置，使其能够正确处理 `.js` 文件中的 JSX 语法。这里有几种方法来解决这个问题：

方法1：修改文件扩展名

将所有包含 JSX 的 `.js` 文件改为 `.jsx` 扩展名。这样 esbuild 默认会正确处理 JSX 语法。如果你选择这个方法，确保也更新了所有相关的导入路径。

方法2：配置 esbuild

在你的构建脚本或配置文件中，指定 esbuild 应该如何处理 `.js` 文件。具体操作取决于你是如何使用 esbuild 的（命令行、API 或通过其他工具如 Vite）。

如果你直接使用 esbuild:

在命令行中或在 esbuild 的配置文件中，你可以添加如下配置：

```javascript
require('esbuild').build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'out.js',
  loader: { '.js': 'jsx' }  // 这里告诉 esbuild 如何处理 .js 文件
}).catch(() => process.exit(1))
```

如果你是通过 Vite 使用 esbuild:

Vite 通常会自动处理 JSX，但如果需要手动配置，可以在 `vite.config.js` 文件中修改 esbuild 的选项：

```javascript
export default {
  esbuild: {
    loader: 'jsx',  // 设置默认加载器为 'jsx'，适用于所有 .js 文件
  }
}
```

根据你的项目设置选择适合的方法来调整。如果你使用的是其他集成 esbuild 的框架（如 Next.js 或 Gatsby），那么也可能需要查看特定框架的文档来了解如何覆盖默认的加载器设置。

使用的CSS

index.css里

### NPM包安装有问题

[npm报错：request to https://registry.npm.taobao.org failed, reason certificate has expired-CSDN博客](https://blog.csdn.net/maoge_666/article/details/136038003)

# TEMP

## 前言

参考案例：https://dragonir.github.io/3d/#/earthDigital

将类组件转为函数式组件，将stylus预处理器形式css改为scss形式；

对代码结构进行梳理，对模型构建和渲染等复杂逻辑进行手绘展示。

## 基础环境

react+vite+three.js+scss

目录：

EarthDigital

--images

----earth.jpg

--index.jsx

--index.scss

## 代码框架

先导入些基本的：

```jsx
import { useEffect, useRef } from 'react';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import './index.scss';

import earthImg from '/src/assets/3d/EarthDigital/images/earth.jpg';
```

把项目架子搭起来：

```jsx
const index = () => {
 
  useEffect(() => { }, []);

  return (
    <div className="earth-digital">
      <canvas ref={canvasRef} className="webgl"></canvas>
      <header className="hud-header">header</header>
      <header>header</header>
      <aside className="hud-aside-left">left</aside>
      <aside className="hud-aside-right">right</aside>
      <footer className="hud-footer">footer</footer>
      <section className="background">section</section>
    </div>
  )
}

export default index
```

一些前置变量和常规函数：—— initThree(), animate(), handleResize()

```jsx
  let scene = null;
  let camera = null;
  let renderer = null;
  let orbitControls = null;
  let earth = null;
  let canvasRef = useRef(null);

  useEffect(() => {
    initThree();
    animate();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
```

场景初始化：—— scene, camera, renderer, orbitControls

```jsx
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.enablePan = false;

  }
```

加上动画：

```jsx
  const animate = () => {
    // 更新tween
    // TWEEN.update();
    // 模型动画
    // earth.rotation.y += 0.001;
    renderer && scene && camera && renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
```

加上窗体适应：

```jsx
  const handleResize = ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
```

## 大地球模型

加入个函数：

```jsx
  useEffect(() => {
    initThree();
    createPoints();
    animate();
   ......
  }, []);
```

### 球体上的点

添加前置变量：

```jsx
  const createPoints = () => {
    let rad = 5; // 球体半径
    let counter = 75000; // 球体上的点数量
    let dlong = Math.PI * (3 - Math.sqrt(5)); // 经度的增量
    let dz = 2 / counter; // 纬度的增量，也就是z轴的增量
    let z = 1- dz / 2; // 初始z值
    let long = 0; // 初始经度
    let r = 0; // xy平面上的径向半径，类似于x^2+y^2=r^2(勾股三角),r^2+z^2=1(球半径，先1，后缩放至rad)
    let p = new Three.Vector3(); // 用于存xyz的坐标
    let sph = new Three.Spherical(); // 构建把上面的转换成球体坐标
    let dummyObj = new Three.Object3D(); // 用于调整后续球面上plane的位置和朝向
    let geoms = []; // 存储所有的plane

    let earthTexture = new Three.TextureLoader().load(earthImg);
......
```

为啥设置经度增量为上式子？

> 经度增量设置为 `Math.PI * (3 - Math.sqrt(5))` 实际上是基于黄金角，这种方法常用于在球面上分布点以达到尽可能均匀的覆盖。这个值与黄金分割有关，具体如下：
>
> - **黄金分割数** (φ) 约为 1.618033988749895。
> - 但在这里使用的是 `3 - Math.sqrt(5)`，计算结果大约为 0.7639320225002102，它是黄金分割数的一种数学转换，更具体地说，这个值实际上等于 \( 2 - \phi \)。
> - 当你将这个值乘以 \(\pi\) （圆周率），得到的角度是通过黄金分割原理计算得来的。这个角度有助于在球面上均匀地分布点，因为它避免了经纬线的对齐，从而在视觉上看起来更为均匀。
>
> 黄金角是黄金分割数在圆上的应用。在自然界中，例如向日葵的种子排列、松果的鳞片布局等，都可以见到黄金角的应用。它能够优化空间利用率并减少重叠，因此在算法生成均匀分布的点时也经常使用这一角度。
>
> 在球面分布点时使用黄金角可以避免聚类并尽可能覆盖整个球面。这样的排列减少了任何给定区域内点过多聚集的情况，从而使点的分布更加均匀，这对于很多涉及到空间分布优化的领域，如计算机图形学、地理信息系统等是非常有用的。

为什么z的初始值设置为这个let z = 1 - dz / 2;，而不是从0开始

> 在构建球面分布时，将 `z` 的初始值设置为 `1 - dz / 2` 而不是从 0 开始的原因是为了确保点均匀覆盖整个球体，包括顶部和底部。具体原因包括：
>
> 避免极点的聚集
>
> * 球体的顶部和底部（即极点）是特殊的位置，如果从 z = 0 或 z = 1 开始，可能会在这些极点处导致点过度聚集或分布不均。
> * 通过将 `z` 的初始值设置为 `1 - dz / 2`，相当于在 z 轴上对点的位置进行了微小的偏移，使得第一个点和最后一个点都不会精确地位于球体的极点上，而是稍微偏离中心。这有助于改善球面上点的分布均匀性。
>
> 确保覆盖全球
>
> * 由于 `dz = 2 / counter`，这意味着 z 值将从 1 开始，逐渐递减至 -1，覆盖整个球体。
> * 初始值 `1 - dz / 2` 实际上将第一个点的 z 值设置为接近 1，但略低于 1，确保点从球体的顶部开始，同时不会与球顶重合。
>
> 均匀分布
>
> * 此方法确保了点在垂直方向上也是均匀分布的。通过从 `1 - dz / 2` 开始，每个点的 z 值都是均匀地在 z 轴上偏移的，从而避免了在接近极点区域的不均匀密度。

➡️ 后话1 ☕️

```jsx
    let maxImpactAmount = 10;
    let impacts = [];
    // let trails = [];
    for (let i = 0; i < maxImpactAmount; i++) {
      impacts.push({
        impactPosition: new Three.Vector3().random().subScalar(0.5).setLength(5),
        impactMaxRadius: 5 * Three.MathUtils.randFloat(0.5, 0.75), // Three.Math.randFloat会报错
        impactRatio: 0,
        prevPosition: new Three.Vector3().random().subScalar(0.5).setLength(5),
        trailRatio: { value: 0 },
        trailLength: { value: 0 }
      });
      // makeTrail(i);
    }
```

➡️ 后话2 ☕️

```jsx
    let params = {
      colors: {base: '#f9f002', gradInner: '#8ae66e', gradOuter: '#03c03c'},
      reset: ()=> { orbitControls.reset() },
    }
    let uniforms = {
      impacts: {value: impacts},
      maxSize: {value: .04}, // 陆地色块大小
      minSize: { value: .025}, // 海洋色块大小
      waveHeight: {value: .1}, // 冲击波高度
      scaling: {value: 1}, // 冲击波范围
      gradInner: { value: new Three.Color(params.colors.gradInner)}, // 冲击波径向渐变内侧颜色
      gradOuter: { value: new Three.Color(params.colors.gradOuter)}, // 冲击波径向渐变外侧颜色
    }
```

构造点：

1. 根据z的不同，得到r，再求得three坐标系下（）的三维坐标p，转成球体phi和theta的坐标sph;
2. 修改long和z，保存p的朝向和模型矩阵；
3. 利用plane构造球面上的点，通过新建、变换、设置中心点和uv坐标实现
4. plane里传入了两个属性：center(每个点对应的位置), uv(这个点的球面坐标，缩放到0-1范围内)

```jsx
    for(let i =0;i<counter;i++) {
      r = Math.sqrt(1 - z * z);
      p.set(r * Math.cos(long), z, -r * Math.sin(long)).multiplyScalar(rad);
      sph.setFromVector3(p);
      long = long + dlong;
      z = z - dz;
      dummyObj.lookAt(p);
      dummyObj.updateMatrix();
      // 构建球面上的plane，同时设置uv坐标
      let plane = new Three.PlaneGeometry(1,1);
      plane.applyMatrix4(dummyObj.matrix);
      plane.translate(p.x,p.y,p.z);
      let centers = [p.x,p.y,p.z,p.x,p.y,p.z,p.x,p.y,p.z,p.x,p.y,p.z];
      plane.setAttribute('center', new Three.BufferAttribute(new Float32Array(centers), 3));
      let uv = [(sph+Math.PI)/(2*Math.PI),1-(sph.theta/Math.PI)];
      let uvs = [uv.x,uv.y,uv.x,uv.y,uv.x,uv.y,uv.x,uv.y];
      plane.setAttribute('baseUv', new Three.BufferAttribute(new Float32Array(uvs), 2));
      geoms.push(plane);
    }
```

### 球材质和构造

构造Mesh

```jsx
    let g = mergeGeometries(geoms);
    let m = new Three.MeshBasicMaterial({
      color: new Three.Color(params.colors.base),
      onBeforeCompile: shader => {
        ......
      }
    });
    m.defines = {'USE_UV': ''};
    earth = new Three.Mesh(g, m);
    earth.rotation.y = Math.PI;
    // trails.forEach( t => earth.add(t));
    earth.position.set(0, -0.4, 0);
    scene.add(earth);
  }
```

球体材质

基本量

- **`struct impact`**: 定义了一个包含冲击点数据的结构，包括冲击的位置(`impactPosition`)、冲击的最大半径(`impactMaxRadius`)和冲击比例(`impactRatio`)。
- **`uniform impact impacts[]`**: 一个包含多个冲击点的数组。
- **`uniform sampler2D tex`**: 一个二维纹理，通常用于存储和检索数据（比如图像或者根据纹理生成的数据）。
- **`uniform float maxSize, minSize`**: 最大和最小尺寸。
- **`uniform float waveHeight`**: 波高。
- **`uniform float scaling`**: 缩放系数。
- **`attribute vec3 center`**: 顶点的中心位置。
- **`attribute vec2 baseUv`**: 顶点的基本UV坐标。
- **`varying float vFinalStep`** 和 **`varying float vMap`**: 这些是从顶点着色器传递到片段着色器的变量，用于进一步的渲染计算。

```jsx
	shader.uniforms.impacts = uniforms.impacts;
        shader.uniforms.maxSize = uniforms.maxSize;
        shader.uniforms.minSize = uniforms.minSize;
        shader.uniforms.waveHeight = uniforms.waveHeight;
        shader.uniforms.scaling = uniforms.scaling;
        shader.uniforms.gradInner = uniforms.gradInner;
        shader.uniforms.gradOuter = uniforms.gradOuter;
        shader.uniforms.tex = { value: earthTexture };
```

顶点着色器逻辑

- **循环遍历每个冲击点**：计算每个顶点与每个冲击点的距离，根据距离和冲击点的影响范围计算一个平滑的步进(`sstep`)。这个步进是基于 `smoothstep` 函数，用于创建冲击波的边界更加平滑的过渡效果。
- **`finalStep`的计算**：累加所有冲击点对当前顶点的影响，使用 `clamp` 函数确保值在0到1之间。
- **`map`变量的计算**：从纹理中获取当前顶点的green值，用于决定顶点的尺寸是 `maxSize` 还是 `minSize`，区分了陆地和海洋。
- **顶点位置(`transformed`)的更新**：根据 `map` 的结果和计算出的 `finalStep` 调整顶点位置，以实现位置的缩放和波纹效果。使用 `mix` 函数根据冲击波影响程度在原始尺寸和放大后的尺寸之间进行插值。波高(`waveHeight`)和 `finalStep` 的乘积决定了顶点沿法线方向的位移量。
- 这段代码通过计算每个顶点与一组冲击波的相对位置和影响，动态调整顶点位置和大小，从而在渲染过程中创建出动态的波纹效果。这种类型的着色器编程允许开发者创建复杂和动态的视觉效果，用于游戏开发、视觉艺术和模拟等领域。
- 补充：`baseUv` 在 Three.js 中是作为每个顶点的二维纹理坐标（`vec2`）被处理的。这些坐标是作为顶点属性上传到 GPU 的，后续在 GLSL 着色器中可以直接访问。

```jsx
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
```

片元着色器逻辑

* 传入对逐个点起作用的冲击强度和顶点纹理的g值；
* **形状处理** :
* 计算以屏幕中心为原点的 UV 坐标 `hUv`。（vUv是一个从0到1的二维向量，表示纹理坐标或顶点着色器传递给片段着色器的顶点位置）
* N=8常用于表示某种图形或模式中重复元素的数量
* `a` 是计算得到的向量 `hUv`的角度（相对于原点），使用的是反正切函数 `atan`，它返回从x轴到向量的角度。
* `r` 是每个扇区的角度范围，计算为 `2π` 除以扇区数量 `N`。
* `d` 是当前点到最近扇区边界的距离。
* `f` 是扇区中心到边界的距离。
* 如果 `d` 大于 `f`，则丢弃该片元（`discard`），只有距离扇区中心非常近的像素才能通过测试，这样可以创建更加锐利和明显的边界；
* 这有助于创建具有 N 边形形状的效果。
* **颜色和渐变处理**:
* `grad` 是内外渐变颜色的混合，基于 `d / f` 的值进行插值。
* `diffuseMap` 是根据 `vMap` 调整的漫反射颜色。 区分了陆地和海洋
* `col` 是漫反射颜色和渐变颜色的最终混合，其中使用了 `vFinalStep` 进行插值。
* 使用最终计算出的颜色 `col` 和原始的不透明度 `opacity` 创建新的 `vec4 diffuseColor`。

```jsx
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
            //if (!gl_FrontFacing) col *= 0.25; // moderate the color on backside
            vec4 diffuseColor = vec4( col , opacity );
            `);
```

#### 补充 | replace方法

上述vertex shader代码replace前：

```
shader.vertexShader:  #include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}
```

上述fragment shader代码replace前：

```glsl
shader.fragmentShader:  uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}
```

在 WebGL 或 OpenGL 的着色器编程中，使用 `.replace` 方法来修改着色器代码是一种常见的技术，尤其是在处理复杂的、可配置的着色器系统时。这种方法提供了灵活性和动态生成或调整着色器代码的能力。这里的 `.replace` 方法的使用具体有以下几个目的和优点：

1. **动态内容注入**

通过 `.replace`，可以根据程序的需求或配置动态地插入特定的代码片段。在着色器中，这种能力特别有用，因为它允许在不改变原始着色器代码文件的基础上，根据不同的渲染需求修改着色器行为。

2. **条件编译**

在多个不同的渲染场景下，可能需要着色器表现出不同的行为。使用 `.replace` 可以根据运行时条件选择性地添加或修改着色器代码，从而实现条件编译的效果。比如，根据对象是否受到特定影响，决定是否启用某些计算。

3. **避免硬编码**

硬编码在着色器中是不灵活的，特别是在涉及到循环次数或数组大小等参数时。通过 `.replace` 方法，开发者可以在着色器代码运行前插入这些值，使着色器代码更加通用和可配置。例如，通过插入 `${maxImpactAmount}` 来确定循环的次数，这使得同一份着色器代码可以适应不同数量的冲击点。

4. **模块化和代码复用**

在大型项目中，可能需要在多个着色器之间共享或重用代码片段。通过使用 `.replace` 方法，可以从外部插入共享的代码片段或在多个着色器之间复用代码，提高维护性和一致性。

在你的示例中，`.replace` 方法被用来注入计算顶点最终位置的逻辑到一个基本的顶点着色器模板中。这种方式可以使主着色器代码保持相对不变，而特定的计算和行为可以根据需要动态地注入，如处理不同数量的冲击点或应用不同的动态效果。

#### 补充 | define的作用

在 Three.js 中，`defines` 属性用于自定义着色器的预处理宏。这些宏是着色器代码中的条件编译指令，可以在编译着色器之前进行设置。通过设置这些宏，你可以启用或修改着色器的某些部分，从而调整其行为或性能，而无需改动着色器的主体代码。这为灵活性和重用提供了很好的支持。

使用场景

1. **条件编译**：`defines` 允许你根据需求启用或禁用着色器代码中的特定部分。例如，如果某个特性（如纹理映射）只在特定条件下使用，你可以通过 `defines` 来控制这一部分代码的编译。
2. **性能优化**：通过禁用不需要的特性，可以减少着色器的复杂性，从而提高执行效率。例如，如果你知道你的材质不需要处理UV坐标，可以通过设置相应的宏来阻止编译这部分代码。

在代码中，`m.defines = {'USE_UV': ''};`  这行代码设置了一个名为 `USE_UV` 的宏，虽然后面紧跟着的是一个空字符串，但它的存在足以让着色器编译器在预处理时认为 `USE_UV` 被定义了。在着色器代码中，可以使用预处理指令来检查这个宏：

```glsl
#ifdef USE_UV
  // 执行使用 UV 坐标的代码
#else
  // 执行不使用 UV 坐标的代码
#endif
```

通过这种方式，如果 `m.defines` 包含 `USE_UV`，则着色器中依赖 UV 坐标的部分会被编译和执行；如果没有定义 `USE_UV`，则相关代码块不会被执行，从而可能减少计算负担。这种技术非常适合在运行时根据不同的材质属性或图形设置调整着色器行为，是图形编程中一种常见且强大的优化手段。

#### 补充 | 内部代码定义的变量

在上述提供的 Three.js 的默认着色器代码中，`vUv` 变量的定义和使用确实存在，但它是通过 Three.js 的标准着色器系统内部的代码片段进行的。这里是具体的分析：

在顶点着色器代码中，有如下几行代码是关键：

```glsl
#include <uv_pars_vertex>
...
#include <uv_vertex>
```

- **`<uv_pars_vertex>`**: 这个代码片段通常包含了与 UV 相关的参数定义，包括对 `vUv` 的声明。这个片段的作用是准备所有必要的 UV 相关数据，以便在顶点着色器中使用。
- **`<uv_vertex>`**: 这个代码片段负责将 UV 数据从顶点属性传递到 `vUv` 变量中。这通常包括从顶点数据中读取 UV 坐标，并将其赋值给 `vUv`。

在片元着色器中，相关的代码片段包括：

```glsl
#include <uv_pars_fragment>
...
```

- **`<uv_pars_fragment>`**: 这个代码片段包括对 `vUv` 的使用，它从顶点着色器传递的数据中接收 UV 坐标。这在处理纹理映射和其他基于 UV 的操作时非常关键。

在你的代码中，`vUv` 的处理是通过标准的 Three.js 着色器代码片段间接实现的。这种方法的优点是你无需直接在你的着色器代码中声明和定义 `vUv`，Three.js 已经在其着色器库中处理了所有这些操作。

## 调试工具

🔁 后话2-callback 🍵

* unforms统一存shader里uniform的初始值

🔁 后话1-callback 🍵

* 构造位于半径为5的球面上的冲击点、冲击最大半径、冲击比例、之前的点位置、飞线的比例和长度

安装dat.gui的库：`npm i dat.gui @types/dat.gui`

添加进入gui；

gui设置隐藏，通过键盘H键唤起；

## 飞线

🔁 后话1-callback 🍵

* 取消注释

![image-20240913170816909](C:\Users\Xiangting\AppData\Roaming\Typora\typora-user-images\image-20240913170816909.png)

#### 制作飞线

初始化100个点，得到一条路径；添加index属性，形成起止正确的路径，加入trails

```jsx
  function makeTrail (idx) {
    let pts = new Array(100*3).fill(0); 
    let g = new Three.BufferGeometry();
    g.setAttribute("position", new Three.Float32BufferAttribute(pts,3));
    let m = new Three.LineDashedMaterial({
      color: params.colors.gradOuter,
      transparent: true,
      onBeforeCompile: shader => {
        shader.uniforms.actionRatio = impacts[idx].trailRatio;
        shader.uniforms.lineLength = impacts[idx].trailLength;
        shader.fragmentShader = lineFragmentShader;
      }
    })
    let l = new Three.Line(g,m);
    l.userData.idx = idx;
    setPath(l,impacts[idx].prevPosition,impacts[idx].impactPosition);
    trails.push(l);
  }
```

设置路径上点的位置和长度：传入当前路径、起点、终点、峰高、出现后经过几次弧度再进入后消失

```jsx
  const setPath = (l, startPoint, endPoint, peakHeight,cycles) => {
    let pos = l.geometry.attributes.position; //预存点的最新位置
    let division = pos - 1; //l上的分段数目
    let cycle = cycles || 1; // cycle=4:↷↷↷↷
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

    for(let i = 0;i<=division;i++) {
      let divisionRatio = i / division; // 分段比例
      let angleValue = divisionRatio * angle; // 分段角度
      v3Major.copy(basisMajor).applyAxisAngle(nrm, angleValue); // 在basisMajor的基础上绕着法线旋转
      v3Minor.copy(basisMinor).applyAxisAngle(nrm, angleValue+Math.PI*2*divisionRatio*cycle); // 在basisMinor的基础上绕着法线旋转
      v3Inter.addVectors(v3Major, v3Minor); // 两个向量相加
      let newLength = (v3Inter.length() - radius) * peakRatio + radius; // 新的长度
      vFinal.copy(v3Inter).setLength(newLength); // 设置新的长度
      pos.setXYZ(i,vFinal.x,vFinal.y,vFinal.z); // 设置新的位置
    }

    //更新完了点数据后需要加上这句
    pos.needsUpdate = true;

    l.computeLineDistances();  // 计算每个顶点到起点的累加距离
    l.geometry.attributes.lineDistance.needsUpdate = true;
    impacts[l.userData.idx].trailLength.value = l.geometry.attributes.lineDistance.array[99];
    l.material.dashSize = 3;
  }
```

![202408281104602.png](https://s2.loli.net/2024/08/28/GWszxuwCZIaV1EB.png)

##### 飞线shader

下面是如何在你的 Vite 配置中添加对 `.glsl` 文件的支持的步骤：

1. 安装 `vite-plugin-glsl`：
   ```
   npm install vite-plugin-glsl
   ```
2. 在你的 Vite 配置文件中（通常是 `vite.config.js` 或 `vite.config.ts`）添加插件：
   ```
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import glsl from 'vite-plugin-glsl'
   
   export default defineConfig({
     plugins: [
       vue(),
       glsl()
     ]
   })
   ```

这样配置后，当你导入 `.glsl` 文件时，`vite-plugin-glsl` 将自动处理它们，确保 GLSL 代码被作为字符串正确导入，避免 JavaScript 解析错误。

确保在你的 Vue 组件或 JavaScript 文件中按照下面的方式导入 `.glsl` 文件：

```
import textFragmentShader from './Shader/text.frag.glsl'
import textVertexShader from './Shader/text.vert.glsl'
```

这些文件现在应该会被正确地作为字符串导入，可以直接使用在 Three.js 的 `ShaderMaterial` 中。这应该解决你遇到的关于 GLSL 代码导入的问题。


页面中导入：

```
import lineFragmentShader from './line.frag.glsl';
```

shader内容：

actionRatio 代码中是0 _ 动画中修改 

vLineDistance // 在使用 Three.js 的 LineDashedMaterial 时，确保顶点着色器正确地计算并传递 vLineDistance 变量到片元着色器是非常关键的，因为这个变量决定了线段的虚线效果。

totalSize 一整个没用到

lineLength 到起点的累积距离


这段代码是一个在 Three.js 中使用的 GLSL shader，具体是用来处理具有虚线效果的线条材料（`LineDashedMaterial`）。这个 shader 控制着如何根据距离和虚线模式显示线条的片段。

- **uniforms** 是从 Three.js 的 JavaScript 代码传递到 shader 的变量。
  - `mediump float`: 精度指示符，表明浮点运算使用中等精度。
  - `actionRatio`: 控制线条的动画或进度的参数。
  - `lineLength`: 线条的总长度。
  - `diffuse`: 线条的颜色。
  - `opacity`: 线条的不透明度。
  - `dashSize`: 单个虚线的长度。
  - `totalSize`: 虚线和间隔的总和长度。
- **varying**
  - `vLineDistance`: 表示当前片段在整个线条中的位置。

**虚线计算**:
  - 首先计算出当前应显示的虚线位置。
  - 根据 `vLineDistance` 和虚线参数计算出当前片段是否在虚线中还是在空白间隔中。如果在间隔中，使用 `discard` 抛弃这个片段，不进行渲染。
  - 使用渐变 (`grad`) 来处理虚线的边缘，使得虚线边缘平滑过渡。

1. 顶点着色器中的计算:

在顶点着色器中，每个顶点的位置被用来计算它在整条线中的相对位置或距离，这个距离累计到 vLineDistance。例如，如果线条由多个段组成，每个段的长度会被累加到起点距离，直到当前顶点的位置。

2. 传递到片段着色器:

这个计算出的距离 (vLineDistance) 作为一个 varying 变量，被传递到片段着色器。在图形管线中，顶点着色器处理后的结果（如位置、颜色、距离等）会通过插值传递到片段着色器。

3. 在片段着色器中，vLineDistance 用来确定每个片段是否应该被渲染为虚线的一部分：

> float currPos = (lineLength + dashSize) * actionRatio;
这里 currPos 表示虚线开始的位置，是通过线条总长度、虚线大小和动画比例 (actionRatio) 计算的。actionRatio 可能用于动态调整虚线的显示，比如滚动效果。
确定片段位置:

> float d = (vLineDistance + halfDash) - currPos;
这个计算检查当前片段的位置（vLineDistance + halfDash）相对于当前虚线开始位置的偏移量。halfDash 用于调整计算到虚线中心的距离。
判断是否在虚线内部:

> if (abs(d) > halfDash ) discard;如果偏移量大于 halfDash，则表示当前片段不在虚线内部，应该被丢弃（不渲染）。这样，只有在虚线范围内的片段会被渲染，形成断续的线条效果。

4. 渐变边缘的处理:

float grad = ((vLineDistance + halfDash) - (currPos - halfDash)) / halfDash; 这里 grad 用于计算当前片段在虚线边缘的位置，用于实现边缘的渐变效果。这可以让虚线的开始和结束更加平滑，不会突然截断。

![ac03418e3341f086f3b780056121b39.jpg](https://s2.loli.net/2024/09/11/yfOMo2NWJZVekbq.jpg)

##### 补充 | `negate`

`negate()` 是一个 Three.js 中的向量方法，它用来将向量中的每个分量取反，也就是每个分量乘以 -1。这样做的目的是将向量的方向反转。具体到这段代码：

```javascript
let basisMinor = new THREE.Vector3().copy(startPoint).negate().setLength(radiusMinor);
```

- `new THREE.Vector3()` 创建一个新的三维向量，默认为 (0, 0, 0)。
- `.copy(startPoint)` 将 `startPoint` 的值复制到这个新的向量中。
- `.negate()` 将复制后的向量中的每个分量乘以 -1，实现向量方向的反转。
- `.setLength(radiusMinor)` 将反转后的向量的长度设置为 `radiusMinor`。

这样，`basisMinor` 就变成了一个方向与 `startPoint` 相反、长度为 `radiusMinor` 的向量。

##### 补充 | `applyAxisAngle`

在 Three.js 中，`applyAxisAngle` 方法用于将一个旋转应用到一个向量上。这个方法接受两个参数：一个轴向量和一个角度。它的作用是围绕给定的轴向量旋转原向量指定的角度。

1. **轴向量** (`axis`): 这是一个标准化的三维向量，指定了旋转的轴。例如，若轴向量为 `(0, 1, 0)`，则表示围绕 y 轴进行旋转。
2. **角度** (`angle`): 这是旋转的角度，单位是弧度。正值表示逆时针旋转，负值表示顺时针旋转（根据右手规则）。

当你调用 `applyAxisAngle` 方法时，它会改变调用它的向量的方向，但保持向量的长度不变。这种旋转是通过右手规则来定义的，即如果你的右手拇指指向轴向量的方向，那么四指的卷曲方向定义了正旋转方向。

在 Three.js 中使用 `applyAxisAngle` 方法进行旋转时，向量是绕通过原点 (0, 0, 0) 的轴进行旋转的。轴向量只定义了旋转的方向和轴线，而不是旋转的位置。因此，这种旋转总是认为轴向量通过三维空间的原点。

旋转的中心点是坐标系统的原点 (0, 0, 0)。向量从它当前的位置开始，绕通过原点的轴旋转。这意味着：

* 如果向量的一个端点位于原点，旋转将直接改变向量的方向，而长度保持不变。
* 如果向量的一个端点不在原点，向量会在想象中被拉直至原点，然后绕轴旋转，再放回原位置。

如果你需要绕一个不在原点的点旋转向量，你需要先将系统平移到那个点变成新的原点，执行旋转，然后再平移回去。这可以通过以下步骤完成：

1. **平移** ：将向量和旋转中心点一同平移到原点附近。
2. **旋转** ：在新的位置应用旋转。
3. **逆平移** ：将旋转后的向量移回原始位置。

##### 补充 | needsUpdate

在 Three.js 中，`needsUpdate` 属性用于告诉引擎某个对象的数据已经改变，需要重新计算或重新上传到 GPU。这个属性常见于与几何体（`Geometry` 或 `BufferGeometry`）、材料（`Material`）、纹理（`Texture`）等相关的对象。

当你修改了几何体的顶点数据、纹理的内容、或者材料的参数等，这些改变不会自动反映在渲染的对象上，除非你明确地告诉 Three.js 这些数据已经更新。`needsUpdate` 属性就是用于这种通知。

示例 - 几何体顶点数据更新

假设你更改了一个几何体的顶点位置数据，你需要设置对应属性的 `needsUpdate` 为 `true`，以确保这些改变被应用到下一次渲染：

```javascript
// 修改几何体顶点位置
geometry.attributes.position.setXYZ(index, newX, newY, newZ);

// 标记顶点位置数据为需要更新
geometry.attributes.position.needsUpdate = true;
```

示例 - 纹理内容更新

如果你修改了纹理的图像数据，你同样需要设置 `needsUpdate`：

```javascript
// 加载一个新的图像到纹理
texture.image = newImage;

// 告诉Three.js纹理已更新
texture.needsUpdate = true;
```

示例 - 材料属性更新

当改变材料的一些属性（如颜色、透明度等）后，如果要立即反映这些变化，同样需要更新 `needsUpdate`：

```javascript
// 修改材料的颜色
material.color.setHex(0xff0000);

// 标记材料需要更新
material.needsUpdate = true;
```

##### 补充 | `computeLineDistances`

在 Three.js 中，`Mesh` 对象本身并没有 `computeLineDistances()` 方法；这个方法是属于 `Line` 类的。`Line` 类用于创建和处理线段对象，在 3D 场景中表示由多个点连接而成的直线或折线。

该方法用于计算线段对象中每个顶点到线起点的累计距离，并将这些距离存储在线段的 `lineDistances` 属性中。这个功能通常与线性材料（`LineDashedMaterial`）一起使用，用来创建虚线效果。`LineDashedMaterial` 需要这些距离来正确地渲染每段虚线。

在 Three.js 中，当你使用 `computeLineDistances()` 方法计算线段（由 `THREE.Line` 或 `THREE.LineSegments` 类创建的对象）的每个顶点到起点的距离时，这些距离会存储在 `geometry.attributes.lineDistance` 的 `array` 属性中。这个数组中的每个元素代表从起点到对应顶点的累积距离。

数组索引是从 0 开始的。因此，数组中的第一个元素（索引 0）对应第一个顶点（通常是线段的起点），第二个元素（索引 1）对应第二个顶点，依此类推。索引 99 的元素就是数组中的第 100 个元素，对应于你的线段的第 100 个顶点。在 `array[99]` 中获取的值表示从线段的起点到第 100 个顶点的累积距离。

注意事项：

- 如果你更改了线段的顶点位置，需要重新调用 `computeLineDistances()` 方法来更新距离数据。
- 这个方法仅对 `THREE.Line` 或 `THREE.LineSegments` 对象有效，对 `Mesh` 对象不适用。

##### 补充 | 预制shader

在Three.js的shader编程中，`#include` 语句用于插入共用的代码块，这些代码块通常封装了一些常用的函数和变量定义，使得shader的编写更加模块化和可复用。下面是你提到的几个常见的include文件的用途：

1. **`<common>`**:
   - 这个文件包括了一些常用的数学函数和宏定义，比如计算线性插值、饱和度计算等，还有一些常用的常量定义，例如PI的值等。

2. **`<color_pars_fragment>`**:
   - 这个文件定义了与颜色处理相关的参数和函数，比如处理顶点颜色、漫反射等。

3. **`<fog_pars_fragment>`**:
   - 用于定义和计算雾效果(fog)的参数，使得物体在雾中逐渐消失的效果可以在shader中实现。

4. **`<logdepthbuf_pars_fragment>`**:
   - 如果启用了logarithmic depth buffer，这个文件包含了相关的实现，用来改善远距离渲染时的深度精度问题。

5. **`<clipping_planes_pars_fragment>`**:
   - 这个文件提供了剪裁平面的支持，使得可以在shader中处理剪裁逻辑，仅渲染剪裁平面允许的部分。

要查找Three.js中可用的所有shader chunks，最好的方法是直接查看Three.js的源代码。在GitHub上的Three.js库中，这些shader chunk文件位于`src/renderers/shaders/ShaderChunk/`目录下。


#### 飞线动画

内容结构：

``` jsx
const setTrailAnimation = () => {
    let tweens = [];
    for(let i =0;i<maxImpactAmount;i++) {
      tweens.push({
        runTween: ()=>{}
      })
    }
    tweens.forEach(t=>t.runTween());
    createPoints(); // 因为runTween会影响到points的效果
  }
```

for循环里的设置

更新了impacts，同时也影响到了球体的效果；

``` jsx
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
              impacts[i].trailRatio.value = val.value; // 通过Tween来控制trailRatio/actionRatio
            });
          var tweenImpact = new TWEEN.Tween({ value: 0 })
            .to({ value: 1 }, Three.MathUtils.randInt(2500, 5000))
            .onUpdate(val => {
              uniformsSettings.impacts.value[i].impactRatio = val.value; // 通过Tween来控制impactRatio
            })
            .onComplete(val => {
              impacts[i].prevPosition.copy(impacts[i].impactPosition);
              impacts[i].impactPosition.random().subScalar(0.5).setLength(5);
              setPath(path, impacts[i].prevPosition, impacts[i].impactPosition, 1);
              uniformsSettings.impacts.value[i].impactMaxRadius = 5 * Three.MathUtils.randFloat(0.5, 0.75);
              tweens[i].runTween();
            });
          tweenTrail.chain(tweenImpact);
          tweenTrail.start();
        }
      })
    }
```

## 机甲风head和card

新建constant.js，存放一些固定的内容文本数组；
``` js
export const weekMap ={...};
export const tips = [...];
```

设置state存放显示的内容；
在 React 中，组件可以是类组件或函数式组件。在函数式组件中，传统的类组件中的 state 和生命周期方法被 React Hooks 提供的功能所替代。最常用的 Hook 是 useState，它用于在函数式组件中添加状态管理功能。

``` jsx
const [week, setWeek] = useState(weekMap[new Date().getDay()]);
const [time, setTime] = useState(new Date().toLocaleTimeString());
const [showModal, setShowModal] = useState(false);
const [modelText, setModelText] = useState(tips[0]);
const [renderGlithPass, setRenderGlithPass] = useState(false);
```

header结构

``` html
<header className="hud-header">
  <div className="left"></div>
  <div className="middle"></div>
   <div className="right">
     <p className="date">
       <span className="text">{`${week}曜日`}</span>
       <span className="text">{time}</span>
       <span className="text">Kepler-90 +49°18′18.58″</span>
     </p>
   </div>
</header>
```

scss里写clip-path

``` scss
  $yellow-color: #f9f002;
  $border-color: #8ae66e;
  $blue-color: #00e6f6;
  $header-height: 90px;
  $aside-width: 400px;
  $glitched-duration: 0.9s;
  $clip-height: 18px;

.earth-digital {
  // overflow: hidden; // 这样子就没有了右侧拖动条，多出来的直接消失了
  // user-select: none; // 禁止选中文字
  filter: saturate(0.85); // 饱和度 体现在哪儿？？

}

.hud {
  position: fixed;
  z-index: 2;
  &.header {
    height: $header-height;
    color: black; // 里面的文字颜色
    background: $yellow-color; // header 的背景颜色
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - #{$clip-height}),75% calc(100% - #{$clip-height}), 72.5% 100%, 27.5% 100%, 25% calc(100% - #{$clip-height}),0 calc(100% - #{$clip-height}),0 0); // 使用calc的时候，里面操作符前后要有空格
  }
}

```

![27e2baa8c3a79d08953b367291a0195.jpg](https://s2.loli.net/2024/09/11/ZL9FgtrxEBW2ame.jpg)

logo和aside部分的结构

``` 
<div className="logo-pic" title='Cyberpunk 2077'></div>
<aside className="hud aside left">
  <div className="box inverse">
    <div className="cover"></div>
    <div className="info">
      <p><b>Cyberpunk</b> is a subgenre of science fiction in a dystopian futuristic setting that tends to focus on a "combination of lowlife and high tech", featuring futuristic technological and scientific achievements, such as artificial intelligence and cybernetics, juxtaposed with societal collapse or decay. </p>
      <button></button>
    </div>
  </div>
  <div className="box"></div>
  <div className="box inverse dotted"></div>
</aside>
<aside className="hud aside right">
  <div className="box"></div>
  <div className="box"></div>
  <div className="box inverse dotted"></div>
</aside>
```

## button点击后出现故障风

点击触发函数：

```
const handleStartButtonClick = () => {
    setRenderGlithPass(!renderGlithPass);
  }
```

动画中更新：
```
  const animate = () => {
   ......
    renderGlithPass && composer.render();
  }
```

### 后处理效果

导入composer和pass

``` jsx
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
```

initThree里初始化

``` jsx
composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new GlitchPass());
```
### btn的样式

利用linear-gradient，实现了45度方向上，从透明到红色的按钮的突变（5%，5%），这个和《CSS揭秘》里的内容呼应了。

``` css
.startBtn,
.startBtn::after {
  cursor: pointer;
  width: 120px;
  height: 40px;
  font-size: 1.2rem;
  background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
  border: 0;
  color: #fff;
  letter-spacing: 0.2em;
  box-shadow: 6px 0 0 $blue-color;
  outline: transparent;
  position: relative;
}
```

## echarts

https://echarts.apache.org/handbook/zh/basics/import/

按需引入：

``` jsx
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
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
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
```

构建数据 constant.js

导入：
`import { chart_1_option, chart_2_option, chart_3_option, chart_4_option, chart_5_option, weekMap, tips } from '@/containers/EarthDigital/scripts/config';`

初始化chart

```
 const chart_1 = echarts.init(document.getElementsByClassName('chart_1')[0], 'dark');
    chart_1 && chart_1.setOption(chart_1_option);
```

使用useRef进行简化

```
  let chartsRef = Array.from({ length: 5 }).map(() => useRef(null));
  const initChart = () => {
    const chartsOption = [chart_1_option, chart_2_option, chart_3_option, chart_4_option, chart_5_option];
    const charts = chartsRef.map(ref => ref.current && echarts.init(ref.current, 'dark'));
    charts.forEach((chart, idx) => {
      chart && chart.setOption(chartsOption[idx]);
    });
  }
```

最后的aside

```
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
```

echarts里的option配置

![7d30adb4f9c8155b133b9b7b6a939fa.jpg](https://s2.loli.net/2024/09/26/29DpPhmGLj16kyb.jpg)

注意：每一种图表形式的使用，都要按需导入；

针对areaStyle里的颜色，可以不导入echarts，直接colorStops来实现；

``` js
// 原来：
areaStyle: {
  opacity: 0.8,
  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: 'rgb(128, 255, 165)'
    },
    {
      offset: 1,
      color: 'rgb(1, 191, 236)'
    }
  ])
},

// 修改后：
areaStyle: {
  opacity: 0.8,
  color: {
    type: 'linear', // 线性渐变
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgb(255, 191, 0)' },
      { offset: 1, color: 'rgb(224, 62, 76)' },
    ],
  },
},
```



## css动画



### 补充 | clip-path属性

CSS 中的 `clip-path` 属性允许你定义一个元素的可见区域。通过这个属性，你可以指定一个路径，在这个路径内的内容会被显示，而路径外的内容则会被隐藏。这是一个非常强大的工具，因为它可以用来创建各种复杂的形状和动态效果。

1. **创建复杂形状**：使用 `clip-path`，你可以轻松创建圆形、椭圆、多边形或者自定义路径（使用 SVG 路径语法）等形状。这对于设计先进的用户界面和特殊的图形效果非常有用。
   
2. **交互效果**：你可以结合动画和过渡效果使用 `clip-path`，以实现视觉上吸引人的交互动画。例如，当用户悬停或点击元素时改变 `clip-path` 的形状。

3. **掩盖和显示内容**：它可以被用来掩盖元素的某部分或只显示某部分，这在创建仪表板、卡片或其他包含隐藏详细信息的界面元素时尤其有用。

**基本语法**：
  ```css
  clip-path: shape | none;
  ```
  其中 `shape` 可以是以下几种类型：

- **圆形**（`circle()`）：
  ```css
  clip-path: circle(50%);
  ```
  这会创建一个圆形剪裁区域，其中 `50%` 是圆的半径。

- **椭圆**（`ellipse()`）：
  ```css
  clip-path: ellipse(50% 25%);
  ```
  这将创建一个椭圆剪裁区域，其中第一个值是水平半径，第二个值是垂直半径。

- **多边形**（`polygon()`）：
  ```css
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  ```
  这将创建一个菱形剪裁区域，每个百分比对是多边形一个顶点的坐标。

- **使用 URL**（SVG 剪裁路径）：
  ```css
  clip-path: url(#clip-shape);
  ```
  这里 `#clip-shape` 是 SVG 内的 `<clipPath>` 元素的 ID，允许你使用 SVG 的复杂路径定义剪裁形状。

通过使用 `clip-path`，开发者可以在不需要额外图像或 SVG 文件的情况下，直接在 CSS 中创建视觉上吸引人的形状和效果。这使得页面加载更快，也使得动态效果的实现更为简便。

## echarts图表

## 底部仪表盘

## 后期交互

### 故障风

### 点击事件




# 问题

## 球体的陆地和海洋并没有区分出来

尝试1：看看texture是否正确加载

``` jsx
let earthTexture = new Three.TextureLoader().load(earthImg, function (texture) {
      console.log('texture loaded successfully');
    }, undefined, function (err) { console.log('texture load failed', err); });
```
问题是对UV的计算错了：
错处1：` let uv = [(sph + Math.PI) / (2 * Math.PI), 1 - (sph.theta / Math.PI)];`

需要使用new Three.Vector2(),而不是直接构建数组；如果是直接构建数组，那下面就访问不到.x和.y，需要使用[0]和[1]来访问对应的内容。

错处2：`let uv = new Three.Vector2(sph + Math.PI) / (2 * Math.PI), 1 - (sph.theta / Math.PI));`

这里对UV的映射计算错了

> 在 Three.js 中，`Spherical` 类表示的球坐标系统是基于三维右手笛卡尔坐标系，其中 `phi`（仰角）和 `theta`（方位角）的定义具体如下：
> 1. **`phi`（仰角）** - 这是从正Y轴向下至点P的线段与Y轴之间的角度。在 Three.js 中，`phi` 的范围通常是从0到π（即从0到180度），其中0对应于正Y轴（向上）的方向，而π对应于负Y轴（向下）的方向。
> 2. **`theta`（方位角）** - 这是在XZ平面上，从正Z轴向正X轴的角度。`theta` 的范围是从0到2π（即从0到360度），其中0开始于正Z轴，增加方向是逆时针（从屏幕向里到屏幕向外看为正Z方向）。
因此，`Spherical` 的 `phi` 和 `theta` 的直观理解如下：
> - `phi = 0`：点位于Y轴的正方向（向上）。
> - `phi = π/2`：点位于XZ平面。
> - `phi = π`：点位于Y轴的负方向（向下）。
> - `theta = 0`：点位于Z轴的正方向（向屏幕外）。
> - `theta = π/2`：点位于X轴的正方向（向右）。
> - `theta = π`：点位于Z轴的负方向（向屏幕里）。
> - `theta = 3π/2`：点位于X轴的负方向（向左）。
> 这种球坐标系统非常有用于处理与球面或者环绕运动相关的场景，如天体模拟、相机环绕目标物体的动作等。


正确写法：`let uv = new Three.Vector2((sph.theta + Math.PI) / (2 * Math.PI), 1 - (sph.phi / Math.PI));` 

为了正确理解这段代码 `let uv = [(sph.theta + Math.PI) / (2 * Math.PI), 1 - (sph.phi / Math.PI)];` 并将二维贴图UV映射到球面上，让我们逐一分析每个部分：

1. **`(sph.theta + Math.PI) / (2 * Math.PI)`**:
   - `sph.theta` 表示球坐标中的方位角，通常的取值范围是从 0 到 2π，表示从正Z轴顺时针到X轴再回到Z轴的全周角度。
   - `+ Math.PI` 的作用是将θ的起始点从正Z轴（前面）调整到负Z轴（后面）。通常，这种调整是为了使UV映射的起点对应于模型的后方，从而使得当模型前向朝向观察者时，贴图的“前面”能够正对观察者。
   - 除以 `(2 * Math.PI)` 将调整后的θ值归一化到 [0, 1] 的范围内，这样可以映射到贴图的水平坐标U。

2. **`1 - (sph.phi / Math.PI)`**:
   - `sph.phi` 是从正Y轴向球面的点的仰角，取值范围是从 0 到 π。
   - `(sph.phi / Math.PI)` 将φ值归一化到 [0, 1] 范围内，其中0代表北极，1代表南极。
   - `1 -` 的作用是反转V坐标，使得在UV贴图中，V = 0 对应于球体的北极，V = 1 对应于球体的南极。这样的反转是必要的，因为在大多数图形处理系统中，贴图的V坐标从下到上增加，而球坐标系统中的φ是从上到下增加的。


(Three.js地理坐标和三维空间坐标的转换)[https://blog.csdn.net/qihoo_tech/article/details/101443066]

![image-20240908162225403.png](https://s2.loli.net/2024/09/09/pbtr2HfNW7xTSkC.png)

## trail没显示出来

vLineDistance // 在使用 Three.js 的 LineDashedMaterial 时，确保顶点着色器正确地计算并传递 vLineDistance 变量到片元着色器是非常关键的，因为这个变量决定了线段的虚线效果。

原先是再setPath里修改点的位置，然后计算lineDistance，由于lineDistance计算有问题，所以在fragment shader里，vLineDistance就都是0

在setPath的代码里，求division需要用pos.count来-1，之前是pos直接-1，导致了错误，使得trail的pos都没有正确更新；

## 按钮切换效果不出来

如果在 `useEffect` 中的依赖数组（第二个参数）设置为空数组 `[]`，这意味着 `useEffect` 只会在组件首次挂载时运行一次，而不会在组件的状态或属性更新时再次运行。这常用于执行那些只需一次的初始化操作，如 API 调用或设置初始配置。


在您的情况中，如果 `animate` 函数在 `useEffect` 内定义，并且依赖数组为空，这会导致 `animate` 函数捕获到初始渲染时的状态值，例如 `renderGlithPass` 的初始值（`false`）。即使后续 `renderGlithPass` 状态更新，`animate` 函数中的值也不会更新，因为 `useEffect` 不会重新执行来更新闭包中的状态值。

解决方法

要让 `animate` 函数能够访问最新的 `renderGlithPass` 状态，您有两个选择：

1. **更新 `useEffect` 的依赖数组**：在依赖数组中包含 `renderGlithPass`，这样每次 `renderGlithPass` 改变时，`useEffect` 都会重新执行，`animate` 函数也将重新定义，从而捕获到最新的状态值。

```javascript
useEffect(() => {
  const animate = () => {
    console.log(renderGlithPass);
  };

  const animationId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(animationId);
}, [renderGlithPass]); // 现在包含 renderGlithPass 作为依赖
```

2. **使用 `useRef` 追踪最新的状态**：如之前所述，您可以使用 `useRef` 来追踪 `renderGlithPass` 的最新值，这样 `animate` 函数可以通过 ref 访问当前的状态，而无需重新定义 `animate` 函数。

```javascript
const renderGlithPassRef = useRef(renderGlithPass);
renderGlithPassRef.current = renderGlithPass;

useEffect(() => {
  const animate = () => {
    console.log(renderGlithPassRef.current); // 使用 ref 访问最新状态
  };

  const animationId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(animationId);
}, []); // 依赖数组仍然为空
```

这两种方法各有优势，选择哪一种取决于您的具体需求和组件的其他逻辑。如果 `animate` 函数对性能要求较高并且状态更新频繁，使用 `useRef` 可能是一个更好的选择。如果状态更新对 `animate` 的影响比较大，并且确保每次都是最新的状态很重要，那么更新 `useEffect` 的依赖数组可能更适合。

## animate里的renderGlithPass总是false，未更新

在你的React代码中，你遇到的问题是由于闭包（closure）引起的。在JavaScript和React中，闭包会捕获它们创建时的环境状态。当你在 `useEffect` 钩子里调用 `animate()` 函数时，这个函数被“固定”在了那一刻的状态，包括 `renderGlithPass` 的值。

因为 `useEffect` 仅在组件挂载时执行一次（因为它的依赖列表是空的 `[]`），所以 `animate` 函数只会捕获 `renderGlithPass` 最初的值，即 `false`。之后即使状态更新了，`animate` 函数中捕获的 `renderGlithPass` 的值仍然是最初的 `false`。

解决这个问题的一个方法是使用 `useRef` 钩子来持久化 `renderGlithPass` 的值，这样 `animate` 函数总是能获取到最新的状态。这里是如何修改你的代码：

```javascript

  const [renderGlitchPass, setRenderGlitchPass] = useState(false);
  const renderGlitchPassRef = useRef(renderGlitchPass);  // 使用 useRef 来持久化状态

  useEffect(() => {
    renderGlitchPassRef.current = renderGlitchPass;  // 更新 ref 的值
  }, [renderGlitchPass]);  // 每当 renderGlitchPass 更新时，更新 ref

  useEffect(() => {
    const animate = () => {
      TWEEN.update();
      earth.rotation.y += 0.001;
      renderer && scene && camera && renderer.render(scene, camera);
      requestAnimationFrame(animate);

      // 使用 ref 的 current 值来获取最新状态
      renderGlitchPassRef.current && composer.render();
    };

    animate();  // 启动动画循环
  }, []);  // 空依赖列表，仅在组件挂载时执行

  const handleStartButtonClick = () => {
    setRenderGlitchPass(!renderGlitchPass);  // 切换状态
  };
```

TODO

调整canvas的大小位置

ddd