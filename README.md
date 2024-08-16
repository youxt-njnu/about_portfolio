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
- **`map`变量的计算**：从纹理中获取当前顶点的green值，用于决定顶点的尺寸是 `maxSize` 还是 `minSize`。
- **顶点位置(`transformed`)的更新**：根据 `map` 的结果和计算出的 `finalStep` 调整顶点位置，以实现位置的缩放和波纹效果。使用 `mix` 函数根据冲击波影响程度在原始尺寸和放大后的尺寸之间进行插值。波高(`waveHeight`)和 `finalStep` 的乘积决定了顶点沿法线方向的位移量。
- 这段代码通过计算每个顶点与一组冲击波的相对位置和影响，动态调整顶点位置和大小，从而在渲染过程中创建出动态的波纹效果。这种类型的着色器编程允许开发者创建复杂和动态的视觉效果，用于游戏开发、视觉艺术和模拟等领域。

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
* 计算以屏幕中心为原点的 UV 坐标 `hUv`。
* `a` 是 `hUv` 点的角度。
* `r` 是每个扇区的角度范围，计算为 `2π` 除以扇区数量 `N`。
* `d` 是当前点到最近扇区边界的距离。
* `f` 是扇区中心到边界的距离。
* 如果 `d` 大于 `f`，则丢弃该片元（`discard`），这有助于创建具有 N 边形形状的效果。
* **颜色和渐变处理** :
* `grad` 是内外渐变颜色的混合，基于 `d / f` 的值进行插值。
* `diffuseMap` 是根据 `vMap` 调整的漫反射颜色。
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


🔁 后话2-callback 🍵

* unforms统一存shader里uniform的初始值

冲击点

🔁 后话1-callback 🍵

* 构造位于半径为5的球面上的冲击点、冲击最大半径、冲击比例、之前的点位置、尾迹的比例和长度

TODO

调整canvas的大小位置

ddd
