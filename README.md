# 资源

[视频教程](https://www.youtube.com/watch?v=FkowOdMjvYo)

[react入门](https://juejin.cn/post/6960262593265025031)

[react three fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene#adding-lights)

其他相关教程：

[react+three](https://www.bilibili.com/video/BV1hX4y1y7nn/?spm_id_from=333.788&vd_source=5270415d668b21206238403450bb29b5)

# 流程

## 安装

[threejs教程](https://juejin.cn/post/7145064095178293285)

[helloworld的代码](https://blog.csdn.net/fackyoufack/article/details/127249096)

npm create vite ./

vue, javascript

npm i

npm i three

npm i @types/three -D

npm i dat.gui @types/dat.gui

(教程： [https://juejin.cn/post/7201521440611532857](https://juejin.cn/post/7201521440611532857))

1. **dat.gui**：这是要安装的主要npm包之一， dat.gui 是一个轻量级的图形用户界面库，通常用于控制和调整JavaScript代码的参数，常见于图形和视觉项目中。
2. **@types/dat.gui**：这是TypeScript的类型定义包。由于TypeScript是JavaScript的一个超集，它添加了类型系统和其他功能。 @types/dat.gui 包含了 dat.gui 库的类型声明，使得TypeScript能够理解和检查使用 dat.gui 时的类型信息。
3. **--save**：这个选项指示npm将这些包作为项目依赖保存在 package.json 文件中。不过，在npm的较新版本中， --save 已成为默认行为，因此通常不再需要显式指定。
4. **--registry=https://registry.npm.taobao.org**：这个选项指定了npm包的下载源。默认情况下，npm从其官方注册表下载包，但这里指定使用淘宝的npm镜像，这通常是在中国大陆使用的，因为它提供了更快的访问速度和更稳定的服务。

## 配置scss

在使用 Vite 和 React 的项目中集成 SCSS，你可以通过几个简单的步骤来配置。Vite 提供了内置支持，所以集成过程相对简单。以下是设置步骤：

首先，你需要安装 SCSS 的编译器，通常是 `sass` 包。在你的项目目录中打开终端，然后运行以下命令：

```bash
npm install sass --save-dev
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

## 报错

### 包安装和解析

````
[plugin:vite:css] Preprocessor dependency "stylus" not found. Did you install it? Try `npm install -D stylus`.
````

````
E:/PersonalCV/about_portfolio/src/components/modelThreeExp/Earth/index.styl
````

解决：

````
npm install -D stylus
````

***

我npm run dev之后，报错为 src/components/modelThreeExp/Earth/index.js:131:6:  
131 │       `<div className="earth_page">`  
╵       ^

The esbuild loader for this file is currently set to "js" but it must be set to "jsx" to be able to parse JSX syntax. You can use "loader: { '.js': 'jsx' }" to do that.

这个错误提示说明你的项目在使用 esbuild 来构建时，遇到了 JSX 语法的文件，但是文件的扩展名为 `.js` 而不是 `.jsx`，而且 esbuild 的配置没有正确设置来处理这种情况。esbuild 默认将 `.js` 文件作为普通的 JavaScript 文件处理，不会解析 JSX 语法。为了解决这个问题，你可以按照错误提示中的建议，修改你的构建配置，使其能够正确处理 `.js` 文件中的 JSX 语法。这里有几种方法来解决这个问题：

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

***

NPM包安装有问题

[npm报错：request to https://registry.npm.taobao.org failed, reason certificate has expired-CSDN博客](https://blog.csdn.net/maoge_666/article/details/136038003)



# 知识点补充

## data/gui

> 传入给gui的是一个数组，里面是对象，对象的值可以是函数

```javascript
// gui.add(控件对象变量名，对象属性名，其它参数)，控制字符类型或数字
gui.add(ctrls, 'name');

// 缩放区间[0,100],变化步长10
gui.add(ctrls, 'speed', 0, 100, 10);

// 创建一个下拉选择
gui.add(ctrls, 'test', { 低速: 0.005, 中速: 0.01, 高速: 0.1 }).name('转速');
gui.add(ctrls, 'test2', ['低速', '中速', '高速']).name('转速2');

// 创建按钮
gui.add(ctrls, 'cb').name('按钮');
gui.add(ctrls, 'gender').name('性别');

// 控制颜色属性
gui.addColor(ctrls, 'color1');

// 通过name可设置别名
gui.addColor(ctrls, 'color2').name('颜色2');

// 创建一个Folder
const folder = gui.addFolder('颜色组');
folder.addColor(ctrls, 'color3');
folder.addColor(ctrls, 'color4');

// 可以通过onChange方法来监听改变的值，从而修改样式
gui.addColor(ctrls, 'color2').onChange(callback);
```

❓我无法理解的一个问题： 就是跟联代码里的很多相机、模型、光照的例如位置、强度、大小、旋转这些参数的设置，真的是自己一点点试出来的不？ —— three js editor, blender里面可以尝试，或者是dat.gui

包括一些简单的鼠标动作和动画，是否也是试出来，或者是参考已有代码的参数？

## ref

```js
import { ref, onMounted } from 'vue';

const elementOne = ref(null);

onMounted(() => {
  if (elementOne.value) {
    console.log('Element One:', elementOne.value); // 访问元素
  }
});
```

-  **名称匹配：**   ref  在模板中的值和  `<script setup> `中声明的变量名必须完全匹配。这是 Vue 内部如何将 DOM 元素和相应的响应式引用关联起来的机制
-  **生命周期：**  只有在组件完全挂载后（即在  onMounted  钩子内），这些  ref  引用的值才会指向实际的 DOM 元素。在此之前，它们的值都是  null 。
-  **动态处理：**  如果你需要处理多个通过类似  v-for  动态生成的元素，你可能需要使用动态的  ref  名称。这通常通过在  ref  中绑定到循环的项上的唯一属性（如  ref="element-${index}" ）来实现

## IntersectionObserver

 IntersectionObserver  是一个强大的 Web API，用于异步观察一个元素与其祖先元素或顶级文档视窗（viewport）的交叉状态。简单来说，它允许你配置一个回调函数，当被观察的元素以某种方式进入或离开另一个元素的视域时，这个回调函数会被执行。这个功能特别适合于实现像懒加载图片、无限滚动、动画触发等功能，而无需依赖繁重的滚动事件监听，从而提高页面性能和用户体验。

在你的代码示例中， IntersectionObserver  被用于监测一个名为  .second  的元素何时成为可见的，以及它的可见程度（即交叉比率）：

```javascript
let secondContainer = false;
const ob = new IntersectionObserver(payload => {
  secondContainer = payload[0].intersectionRatio > 0.05;
}, { threshold: 0.05 });
ob.observe(document.querySelector('.second'));
```

##  window.scroll 

 window.scroll(0, 0)  是 JavaScript 中的一个方法调用，用于将浏览器窗口或标签页的滚动位置设置到页面的最顶部。这里的两个参数  (0, 0)  分别表示水平和垂直方向的滚动位置。

- 第一个参数  0  表示在水平方向上的滚动距离。在这个例子中， 0  意味着页面将滚动到最左边。
- 第二个参数  0  表示在垂直方向上的滚动距离。在这个例子中， 0  意味着页面将滚动到最顶部。

因此，调用  window.scroll(0, 0)  会使得页面滚动到左上角，即页面的起始位置。这个方法经常在需要将用户的视图重置到页面顶部的情况下使用，比如在用户点击“返回顶部”按钮时。

## 动画位移

```javascript
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
```

这段代码通过结合用户输入（例如鼠标移动产生的视差效果，即  parallaxX  和  parallaxY ）和时间变化量（ deltaTime ）来动态更新点光源和相机组的位置。这种方法可以创建平滑和响应式的动画效果，使得场景元素（如光源和相机）能够根据用户的交互或时间的推移进行移动。

这里使用的是一种常见的动画和模拟技术，即在每一帧根据时间差（ deltaTime ）调整位置，以实现平滑的运动效果。 deltaTime  通常表示自上一帧以来经过的时间，用于确保动画的速度不受帧率变化的影响。

```javascript
fillLight.position.y -= (parallaxY * 9 + fillLight.position.y - 2) * deltaTime;
fillLight.position.x += (parallaxX * 8 - fillLight.position.x) * 2 * deltaTime;
```

- 对于  y  轴位置，代码计算了一个目标值，这个目标值由  parallaxY  的9倍与光源当前  y  值与2的差值共同决定，然后通过  deltaTime  调整速度和平滑度。这样做的效果是让光源在垂直方向上根据视差值平滑移动，并且试图维持在一个 **相对于原点偏移2** 的位置。
- 对于  x  轴位置，类似地，目标位置由  parallaxX  的8倍减去当前  x  值决定，然后乘以2和  deltaTime  来调整。这让光源在水平方向上也根据视差值平滑地移动。

```javascript
let secondContainer = false;
const ob = new IntersectionObserver(payload => {
  secondContainer = payload[0].intersectionRatio > 0.05;
}, { threshold: 0.05 });
ob.observe(document.querySelector('.second'));
```

- 这里对相机组的  z  和  x  轴位置进行更新，逻辑类似于光源位置的更新， **但视差值被除以3，意味着相对移动幅度更小** ，创建了一种不同的视差效果。这种效果通常用来给用户一种深度感，即背景元素相对于前景元素移动得更慢。

？如何恰当的设置，在鼠标移动下，页面元素的流畅偏移效果

### deltaTime

在你的  tick()  函数中， deltaTime  代表从上一帧到当前帧经过的时间差，以毫秒为单位。这个参数通常用于动画和物理计算中，以确保不同性能的设备上动画的流畅度和同步性。然而，在你的示例中，看起来  deltaTime  没有从  requestAnimationFrame()  中自动获取，因为  requestAnimationFrame()  的回调函数通常只接受一个参数，表示当前时间戳。如果你需要使用  deltaTime ，你必须自己计算它，通常是通过在外部定义一个变量来记录上一帧的时间，并在每帧更新这个时间。

```js
const tick = (deltaTime) => {
  const clock = new Three.Clock()

  // 更新shader材质
  planeMaterial.uniforms.time.value = deltaTime / 5000
  planeMaterial.uniforms.color5.value = new Three.Vector3(...options.color5)
  planeMaterial.uniforms.color4.value = new Three.Vector3(...options.color4)
  planeMaterial.uniforms.color3.value = new Three.Vector3(...options.color3)
  planeMaterial.uniforms.color2.value = new Three.Vector3(...options.color2)
  planeMaterial.uniforms.color1.value = new Three.Vector3(...options.color1)
  planeMaterial.uniforms.color0.value = new Three.Vector3(...options.color0)

  renderer.clear()
  camera.layers.set(1)
  composer.render()
  renderer.clearDepth()
  camera.layers.set(0)
  renderer.render(scene, camera)

  const elapsedTime = clock.getElapsedTime()
  const ghost1Angle = elapsedTime * 0.5
  if (model) {
    model.rotation.x = Math.cos(ghost1Angle) * 0.2
    model.rotation.z = Math.sin(ghost1Angle) * 0.1
    model.position.z += Math.cos(ghost1Angle) * 0.005
  }

  const scale = Math.cos(ghost1Angle) * 2 + 3
  plane && plane.scale.set(scale, scale, scale)

  controls.update()
  window.requestAnimationFrame(tick)
}

onMounted(() => {
  initThree()
  loadModel()
  interact()
  tick()

  window.addEventListener('resize', onResize)
})
```

### requestAnimationFrame()

 [详细了解链接](https://juejin.cn/post/7177260392958132285) 

如果你发现在浏览器端调试时，除了第一次  deltaTime  是  undefined ，其他时候都有数值，而你的代码没有明显的地方在计算  deltaTime ，这很可能是因为  requestAnimationFrame()  本身的行为。

 requestAnimationFrame()  通常接收一个回调函数，并自动向该回调函数传递一个参数：当前的时间戳（ timestamp ）。这个时间戳是表示调用回调时的当前时间（通常以毫秒为单位，相对于某个固定时间点）。这意味着，如果你的  tick()  函数接收这个参数并命名为  deltaTime ，实际上它接收的是一个时间戳，而非真正的时间差值。

让我们看看可能的代码行为：

```javascript
const tick = (deltaTime) => {  // 这里 deltaTime 实际上是 timestamp
  // 此处 deltaTime 是 timestamp，你的逻辑可能误以为是时间差
  console.log(deltaTime); // 这将输出时间戳，除了第一次可能是 undefined

  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
```

在这个例子中，除了第一次调用可能因为初始状态未设定而是  undefined ，其他所有调用的  deltaTime  都会有值（实际是时间戳）。如果你没有设置初始调用的方式（例如，直接调用  tick()  而非  requestAnimationFrame(tick) ），那么第一次调用中的  deltaTime  可能是  undefined 。这种情况通常发生在直接调用函数而不是由  requestAnimationFrame()  触发时。

如果你确实需要在每帧计算两帧之间的时间差（ deltaTime ），你需要手动计算它，如下所示：

```javascript
let lastTime = 0;

const tick = (timestamp) => {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime; // 真正的 deltaTime 计算
  lastTime = timestamp;

  // 使用 deltaTime
  console.log(deltaTime); // 输出两帧之间的时间差

  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
```

在这个修改后的例子中， deltaTime  现在是正确的两帧之间的时间差，而不是一个单独的时间戳。

###  clock.getElapsedTime() 

 clock.getElapsedTime()  获取的是从创建  clock  对象到调用该方法时的总经过时间，以秒为单位。这个值通常用于根据时间来更新动画状态，使动画不受帧率的影响，从而保持平滑运动

## canvas

在HTML5中，当你通过  canvas.getContext('2d') 创建一个二维渲染上下文（2D rendering context）时，会得到一个用于绘制形状、文本、图像等的二维画布。这个画布遵循以下坐标系规则：

1.  **原点（0,0）** ：二维坐标系的原点位于画布的左上角。
2.  **X轴方向** ：从左到右，值逐渐增加。即，当你向右移动时，X坐标增大。
3.  **Y轴方向** ：从上到下，值逐渐增加。这与传统的数学坐标系（其中Y轴向上增加）有所不同。在Canvas 2D中，向下移动时，Y坐标增大。

这种坐标系统使得绘图操作与大多数计算机图形和Web布局的处理方式一致，方便开发者进行视觉元素的布局和绘制。

```js
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
  const texture = new Three.CanvasTexture(canvas) // 使用canvas创建一个Three.js的CanvasTexture纹理
  texture.needsUpdate = true // 告诉Three.js这个纹理需要被上传到GPU
  return texture
}
```

上面的创建了canvas，然后绘制了一个纹理，来作为材质的texture，给几何体贴图；

![](https://s2.loli.net/2024/05/07/IcRhyJxfmveBkSE.png)

在HTML5 Canvas API中，createRadialGradient()方法用于创建一个径向渐变。这个方法接受六个参数，分别定义了两个圆，渐变效果会从一个圆的边界向另一个圆的边界过渡。具体参数的含义如下： x0：第一个圆的圆心的x坐标。 y0：第一个圆的圆心的y坐标。 r0：第一个圆的半径。如果为0，则渐变从一个点开始。 x1：第二个圆的圆心的x坐标。 y1：第二个圆的圆心的y坐标。 r1：第二个圆的半径。

在HTML5 Canvas API中，fillRect()方法用于绘制一个填充的矩形。这个方法接受四个参数，用来定义矩形的位置和大小： x：矩形左上角的x坐标。 y：矩形左上角的y坐标。 width：矩形的宽度。 height：矩形的高度

## 变换

 [markdown+latex公式](https://blog.csdn.net/weixin_42782150/article/details/104878759) 

### 旋转

要计算一个点 ( p(x, y) ) 绕另一个点 ( mid(a, b) ) 旋转 ( q ) 度后的新坐标，可以使用以下步骤和公式：

将角度从度转换为弧度

$\text{radians} = q \times \frac{\pi}{180}$

将原点移动到旋转中心

- $x' = x - a$
- $y' = y - b$

应用旋转矩阵: 旋转矩阵 $( R )$ 用于旋转点，并定义为：

$$
\left[
\begin{matrix}
\cos(radians) & -\sin(radians) \\
\sin(radians) & \cos(radians)
\end{matrix}
\right]
$$

应用这个旋转矩阵到 $(x', y')$ 上：

[ x'' ]        [ cos(radians)  -sin(radians) ]        [ x' ]
[-----]   =   [-----------------------------]   ×   [-----]
[ y'' ]        [ sin(radians)   cos(radians) ]        [ y' ]

这意味着：

$$
\begin{cases}
x'' = x' \cos(\text{radians}) - y' \sin(\text{radians}) \\
y'' = x' \sin(\text{radians}) + y' \cos(\text{radians})
\end{cases}
$$

4. 将旋转后的点平移回原始位置

$$
\begin{cases}
x'' = x'' + a \\
y'' = y'' + b
\end{cases}
$$

综合上述步骤，旋转后点 $p(x, y)$ 绕点 $\text{mid}(a, b)$ 旋转 $q$ 度后的新坐标 $(x'', y'')$ 是：

$$
\begin{cases}
x'' = (x - a) \cos\left(q \times \frac{\pi}{180}\right) - (y - b) \sin\left(q \times \frac{\pi}{180}\right) + a \\
y'' = (x - a) \sin\left(q \times \frac{\pi}{180}\right) + (y - b) \cos\left(q \times \frac{\pi}{180}\right) + b
\end{cases}
$$

这个结果给出了绕任意点旋转的完整表达式。

# CSS

```undefined
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
} 
```

这段 CSS 代码定义了一个动画效果，通常用于创建加载指示器（如旋转的圆环或球）。让我们逐步解析这段代码的含义：

```css
.lds-roller div {
  ...
}
```

这里的选择器  .lds-roller div  指的是所有类名为  lds-roller  的元素内部的  div  元素。对这些  div  元素应用以下样式和动画。

```css
animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
```

-  **动画名称 (**  **lds-roller**  **lds-roller**  **)** ：这是动画的关键帧名称，它引用了在某处定义的  @keyframes lds-roller ，该关键帧定义了动画的开始、结束状态以及可能的中间状态。
-  **持续时间 (**  **1.2s**  **1.2s**  **)** ：动画从开始到结束的时长为 1.2 秒。
-  **缓动函数 (**  **cubic-bezier(0.5, 0, 0.5, 1)**  **cubic-bezier(0.5, 0, 0.5, 1)**  **)** ：这是一个贝塞尔曲线，定义了动画的加速度曲线。这个特定的曲线意味着动画开始时加速度较快，结束时减速。这样可以让动画看起来更自然、流畅。
-  **重复次数 (**  **infinite**  **infinite**  **)** ：动画会无限次重复。

```css
transform-origin: 40px 40px;
```

-  **变换原点 (**  **transform-origin**  **transform-origin**  **)** ：这个属性定义了元素变形的原点。在这个例子中，原点被设置在了元素的  40px 40px  的位置，通常意味着元素的变换（如旋转）将围绕这个点进行。这个设置有助于创建环绕中心点旋转的效果，特别是当动画效果是旋转时。

综上所述，这段 CSS 为  .lds-roller  内部的每个  div  应用了一个持续 1.2 秒、无限重复的平滑动画，该动画的具体行为由  @keyframes lds-roller  定义。动画的变换原点设置在每个  div  的  40px 40px  处，使得旋转动画能围绕该点进行，创建出一个加载动画的视觉效果。

为了完整地实现这个动画效果，你还需要定义相应的  @keyframes lds-roller  关键帧动画，指明动画开始、结束时，以及可能的中间步骤的具体样式变化。

```undefined
loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
```

在这段代码中， loadingCover.style.setProperty  方法被用于动态修改  loadingCover  元素的 CSS  transform  属性。这个方法允许你直接通过 JavaScript 更改元素的样式，其中  setProperty  接受两个参数：第一个参数是要修改的 CSS 属性名称，第二个参数是该属性的新值。

-  **第一个参数 (**  **transform**  **transform**  **)** : 指定了要修改的 CSS 属性，这里是  transform 。 transform  属性允许你对元素进行变形，比如旋转、缩放、移动（平移）或倾斜。
-  **第二个参数 (**  **translate(0,{yPosition.y}%)**  **translate(0,{yPosition.y}%)**  **)** : 是  transform  属性的新值，这里使用了  translate  函数来移动元素。 translate  函数接受两个参数，分别对应 X 轴和 Y 轴的移动距离。在这个例子中， translate(0,${yPosition.y}%)  表示在 X 轴方向上不移动（ 0 ），在 Y 轴方向上移动  ${yPosition.y}%  的距离，其中  ${yPosition.y}  是一个动态计算的值，表示移动距离的百分比。使用百分比单位可以根据元素大小的不同而相对地移动不同的距离。

这段代码的目的是根据  yPosition.y  的值（可能是通过某些计算得到的），在 Y 轴方向上动态移动  loadingCover  元素。这种技术常用于创建动态的交互效果，比如根据用户的滚动或鼠标移动来移动页面上的元素，从而增加页面的动态性和互动性。

假设  yPosition.y  的值为  50 ，则  translate(0,${yPosition.y}%)  将解析为  translate(0,50%) ，意味着  loadingCover  元素将沿 Y 轴方向下移其高度的 50%。这样的移动效果可以用于各种动画和过渡效果，使得页面元素的移动看起来更平滑和自然。

## innerHeight, clientHeight

当想获取一个DOM元素的宽度和高度时，通常会使用  clientHeight 和  clientWidth 。这两个属性提供了元素的内部高度和宽度（包括填充，但不包括边框、滚动条或外边距）。

对于你的具体例子，如果你需要在组件挂载后获取这个  div 元素的宽度和高度，

```html

import { ref, onMounted } from 'vue';

const container = ref(null);

onMounted(() => {
  if (container.value) {
    console.log('Width:', container.value.clientWidth);
    console.log('Height:', container.value.clientHeight);
  }
});

```

-  **clientHeight** ：元素的内部高度（包括padding，但不包括水平滚动条、border和margin）。
-  **clientWidth** ：元素的内部宽度（同样，包括padding但不包括垂直滚动条、border和margin）。
-  **offsetHeight** ：元素的外部高度（包括padding、border和水平滚动条，但不包括margin）。
-  **offsetWidth** ：元素的外部宽度（包括padding、border和垂直滚动条，但不包括margin）。
-  **scrollHeight** 和 **scrollWidth** ：包括了因为滚动而不可见内容的整体尺寸。

通常来说， clientHeight 和  clientWidth 是获取元素可见部分尺寸的最常用属性。如果你的  div 具有滚动条，或者你关心内容溢出的情况， scrollHeight 和  scrollWidth 也可能是有用的。如果需要考虑元素的边框，在某些情况下可能会选择使用  offsetHeight 和  offsetWidth 。

在Web开发中， innerHeight  并不是一个用来获取DOM元素尺寸的属性；而是一个属于  window 对象的属性，它表示浏览器窗口的视图区域（视口）的高度，包括水平滚动条（如果存在的话）。

 window.innerHeight  通常用于处理与视口大小相关的逻辑，如下几种典型用途：

1.  **响应式设计** ：JavaScript中可以使用  window.innerHeight 来帮助确定浏览器窗口的当前高度，进而调整网页布局或功能以适应不同的显示设备。
2.  **触发特定的行为** ：当用户缩放浏览器窗口至某个特定的尺寸时，你可能希望根据窗口的大小改变来触发某些行为或动画。
3.  **无限滚动** ：在实现无限滚动的网页中， window.innerHeight  可以用来计算用户何时接近底部，从而在用户滚动到页面底部之前加载更多内容。
4.  **全屏元素显示** ：如果你想要某个元素（如视频、图片展示等）全屏显示， window.innerHeight  可以帮助你设置元素的高度，使之完全填充用户的视口。

下面是一个示例代码，展示如何使用  window.innerHeight 来调整一个元素的高度使其总是占满整个视口：

```html

  .full-height {
    width: 100%;
    background-color: lightblue; /* 易于视觉识别的颜色 */
  }



  这个div高度将填满视口



  function adjustHeight() {
    const div = document.getElementById('fullHeightDiv');
    div.style.height = window.innerHeight + 'px';
  }

  window.onload = adjustHeight;
  window.onresize = adjustHeight; // 确保在窗口尺寸变化时更新高度

```

## svg图标绘制

这段代码是一个SVG图形的XML表示，用于定义一个简单的图标，其中包含两个几何形状：

1.  **外部矩形框** ：

   -  width="26"  和  height="26"  设置图标的宽度和高度为26单位。
   -  viewBox="0 0 48 48"  定义了一个48x48单位的视图框架，这意味着图形的绘制将在这个框架内进行。
   - 第一个  <path>  元素绘制了一个边长为48单位，边框粗细为4单位的大矩形。 fill="none"  指明矩形内部不填充颜色， stroke="#FFF"  设置边框颜色为白色。
   -  xmlns ：“XML 命名空间”（XML Namespace），这个属性确保 SVG 代码在 XML 格式中正确解析和使用。具体来说， xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"  这个属性告诉浏览器或任何处理这段代码的解析器，该文件应该按照由 W3C（万维网联盟）定义的 SVG 1.1 规范来解析

2.  **内部矩形** ：

   - 第二个  <path>  元素绘制了一个位于(12, 19)开始，到(24, 29)结束的矩形，边框也是白色，粗细为4单位，使用斜角连接(stroke-linejoin="bevel")使得角部位更加平滑。

3.  **倾斜的箭头形状** ：

   - 第三个  <path>  元素绘制了一个简化的箭头形状，从(30, 22)开始，到(35, 26)结束，然后再回到(30, 30)，形成一个指向右侧的箭头。这同样使用了白色边框，粗细为4单位。


整体上，这个SVG图形设计为一个含有一个大矩形框架、一个内部矩形和一个箭头形状的图标，通常用于用户界面的视觉元素，如按钮或指示图标。

 d  属性在 SVG 的  <path>  元素中用来定义路径的形状和位置，它是一个非常关键的属性，包含一系列的命令和参数来指定路径的绘制方式。下面是对这个属性中使用的各种命令的解释：

1.  **M**  **M**   **(moveto)** ：此命令用于将画笔移动到新的起始位置。不绘制任何内容，只改变起点位置。例如， M24 19  表示将起点移动到 (24, 19)。
2.  **H**  **H**   **(horizontal lineto)** ：此命令用于从当前点绘制一条水平线到指定的 x 坐标。例如，如果当前点为 (12, 19)，则  H24  表示从 (12, 19) 绘制一条水平线到 (24, 19)。
3.  **V**  **V**   **(vertical lineto)** ：此命令用于从当前点绘制一条垂直线到指定的 y 坐标。例如， V29  表示从当前点绘制一条垂直线到 y 坐标为 29 的位置。
4.  **L**  **L**   **(lineto)** ：此命令用于从当前点绘制一条直线到新的指定位置。例如， L30 22  表示从当前点画一条直线到点 (30, 22)。
5.  **Z**  **Z**   **(closepath)** ：此命令用于关闭当前的路径，即从当前点绘制一条直线回到路径的起始点。

<path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" ，路径定义包括了多个命令，用以绘制一个矩形，并在四个角落进行圆角处理。下面是对这个路径命令的详细解释：

1.  **M39 6**  **M39 6** : 这是一个 "moveto" 命令，用于将起始点移动到 (39, 6)。这设置了接下来路径绘制的起点。
2.  **H9**  **H9** : 这是一个 "horizontal lineto" 命令，从当前位置画一条水平线到 x 坐标为 9 的位置。
3.  **C7.34315 6 6 7.34315 6 9**  **C7.34315 6 6 7.34315 6 9** : 这是一个 "cubic Bézier curve" 命令。在 SVG 中， C  命令需要三组坐标点：

   - 第一组 (7.34315, 6) 是第一个控制点，用于控制曲线开始的方向和弧度。
   - 第二组 (6, 7.34315) 是第二个控制点，控制曲线结束的方向和弧度。
   - 第三组 (6, 9) 是曲线的结束点。

   这段曲线用于创建左上角的圆角。

4.  **V39**  **V39** : "vertical lineto" 命令，从当前位置画一条垂直线到 y 坐标为 39 的位置。
5.  **C6 40.6569 7.34315 42 9 42**  **C6 40.6569 7.34315 42 9 42** : 又一个 "cubic Bézier curve" 命令，用于创建左下角的圆角。与之前的 Bézier 曲线类似，这里也定义了两个控制点和一个结束点。
6.  **H39**  **H39** : "horizontal lineto" 命令，从当前位置画一条水平线到 x 坐标为 39 的位置。
7.  **C40.6569 42 42 40.6569 42 39**  **C40.6569 42 42 40.6569 42 39** : 又一个 "cubic Bézier curve" 命令，这次用于创建右下角的圆角。
8.  **V9**  **V9** : "vertical lineto" 命令，从当前位置画一条垂直线上升到 y 坐标为 9 的位置。
9.  **C42 7.34315 40.6569 6 39 6**  **C42 7.34315 40.6569 6 39 6** : 最后一个 "cubic Bézier curve" 命令，用于创建右上角的圆角。
10.  **Z**  **Z** : 这个命令用于关闭路径，即绘制一条直线从当前位置回到起始点 (39, 6)，并结束路径绘制。

总结来说，这段路径描述了一个带有圆角的矩形框架，每个角落都通过贝塞尔曲线(C)命令进行了圆滑处理，使矩形的角看起来更加圆润。这种绘制技术在创建用户界面组件如按钮或卡片背景时非常常见。

(下面的不一定画的对，但可以基本理解理解)

![](https://s2.loli.net/2024/06/09/NYPfhKitzloOLI3.png)

# 报错

##  **页面中不显示canvas的内容** 

1. 检查对应的template里的div元素的大小，如果设置不当，就看不到物体；
2. 如果没有把下面的代码放到init里，这个时候container的div还没有创建，获取不到对应的宽高

```js
let container = document.getElementById('container')

let sizes = {
  width: container.clientWidth,
  height: container.clientHeight,
}
```

##  **页面中看不到物体** 

1. 确认设置了div的大小: 如果  container 的大小为0或非常小，那么  Three.js 渲染的内容可能就无法被看到。确保  .fullSize 样式被正确应用，并且容器元素确实覆盖了可见区域
2. 确定场景的材质颜色不和背景一样
3. 确认材质是否需要加光照
4. 调整相机.lookAt() : 如果场景中没有添加任何可见物体或者物体和摄像机的位置设置不当，可能导致看不到任何内容。试着添加一个简单的几何体，确保它在摄像机视野内
5. 调整物体.position.set()
6. 调整相机的位置.position.set()
7. 调整物体的大小 size
8.  **渲染调用时机**  ：你在  initThree 函数中只调用了一次  renderer.render(scene, camera) ，这意味着场景只渲染了一次，且在没有添加环境纹理之前。通常，我们会在添加完所有初次所需的场景内容后再进行渲染，或者使用动画循环（如  requestAnimationFrame ）不断渲染场景。

##  **Uncaught TypeError: Cannot read properties of null (reading 'width')** 

```js
let sizes = {
  width: container.width,
  height: container.height,
}
```

当你看到错误消息 "Uncaught TypeError: Cannot read properties of null (reading 'width')"，这表明你试图访问的对象（在这个例子中是  container ）为  null 。这通常发生在尝试访问一个DOM元素的属性，但该元素在代码执行时还未被成功选中或者根本不存在于DOM中。

改用  .clientWidth 和  .clientHeight 是正确的修正方式，但前提是你首先需要确保  container 不是  null 。这两个属性是DOM元素的标准属性，分别表示元素的内部宽度（不包括边框）和高度，适用于获取元素的可视尺寸。

你可以通过以下步骤确保  container 已正确选中并非  null ：

1. 确保你的代码在DOM元素实际被加载到页面上之后执行。如果你的代码在元素被加载之前执行，那么即使选择器正确，也会返回  null 。通常，将JavaScript代码放在文档的底部，或者使用  document.addEventListener('DOMContentLoaded', function() { /* 代码 */ }) 来确保在DOM完全加载后再运行代码。
2. 检查选择器是否正确。确保你用来选中  container 的选择器（比如ID或类名）是正确的，并且与HTML中的元素匹配。

使用  container.width  不适用于  div  元素，因为  div  没有  width  属性。 width  属性通常用于  canvas 、 img  等元素，这些元素具有直接可读写的宽度和高度属性。对于  div  和其他没有宽高属性的块级元素，你需要使用  clientWidth  和  clientHeight  来获取它们的视觉呈现尺寸，这些尺寸包括了元素的内边距（padding）但不包括边框（border）和滚动条。

这就是为什么在Three.js中，当你设置相机参数的时候需要使用  container.clientWidth  和  container.clientHeight  而不是  container.width  和  container.height ：

-  clientWidth  和  clientHeight  给你提供了元素的实际内容区域的尺寸，这对于Three.js中确保相机的长宽比与渲染容器匹配是非常重要的。
- 这些属性反映了  <div> 容器当前的大小，包括任何由于页面布局或样式动态变化导致的尺寸更改。
- 如果使用  width  和  height ，你可能会得到  undefined ，因为这不是标准的  div  属性，这会导致你的相机设置不正确。

## 动画中位置的设置

在threejs中设置动画里面，satellite模型的位置如下

```js
satellite.position.set(
        140 * Math.cos(radian),
        50 * Math.sin(radian),
        20 * Math.sin(radian)
      )
```

其中

```js
rot += Math.random() * 0.8
let radian = (Math.PI * rot) / 180
```

为什么satellite动画的位置要这么设置

在这段代码中， satellite.position.set(x, y, z)  正在设置卫星模型在三维空间中的位置，其中  x ， y ，和  z  是根据一定规则计算出来的坐标值。这些值是通过正弦（ sin ）和余弦（ cos ）函数的变化来动态计算的，这些函数是从圆和波的几何关系中派生出来的，因此它们非常适合用于创建循环和振荡的动画效果，如卫星绕地球运行的轨迹。

-  140 * Math.cos(radian)  是在计算卫星在x轴上的位置。使用余弦函数意味着卫星在x轴上的运动会形成一个正弦波，其值在-140到+140之间变化，创建了水平方向上的循环运动。
-  50 * Math.sin(radian)  是在计算卫星在y轴上的位置。正弦函数决定了卫星在垂直方向上的运动，创建了一个范围在-50到+50之间的波动。
-  20 * Math.sin(radian)  是在计算卫星在z轴上的位置。这同样使用了正弦函数，但是影响卫星在“深度”方向上的运动。这个值的变化范围在-20到+20之间，这个变化范围小于y轴，意味着在这个方向上的振动幅度较小。
-  rot += Math.random() * 0.8  这部分代码是为了在每次动画循环时增加  rot 的值，而且每次增加的值是随机的，最大不超过0.8度。这将为卫星运动添加一个随机性，使其轨迹更加自然，而不是完美的圆形或者规则循环。
-  let radian = (Math.PI * rot) / 180  这行将角度  rot 转换为弧度。

为什么x轴使用  Math.cos  而y轴和z轴使用  Math.sin  呢？这是因为在2D参数化曲线中，常常使用  cos(t)  表示x坐标， sin(t)  表示y坐标，这样可以创建一个圆。在三维空间中，我们可以使用相同的正弦函数来控制另外两个维度（在这种情况下是y和z），这样我们可以将2D圆形运动扩展到3D空间。

通过这样设置，你可以让卫星在x和y轴上做圆周运动，而z轴的运动则创建了高度的变化，这可以模拟例如倾斜的轨道或者其它不同于标准圆形轨道的路径。通过改变各轴上正弦和余弦函数前的系数，可以创建出不同的椭圆轨道，这就是为什么在不同轴上的运动使用不同的正弦余弦值，以及它们前面的系数不同。

![](https://s2.loli.net/2024/03/25/Ioq7PRSjt3cJ8mG.png)

## 相机

通过设置相机，可以改变物体呈现的角度，也就是在调整物体位置的方案之外，也可以调整相机的位置。

## 外部资源加载

需要将模型放到public目录里面，同时vite.config.js的配置里加入： assetsInclude: ['**/*.glb', '**/*.mtl', '**/*.gltf'], 

如果你在使用 Vite 和 Vue，并且看到网络请求的状态码为  304 Not Modified ，这意味着浏览器已经缓存了  earth.obj  文件，并且服务器告诉浏览器自从上次请求以来文件没有被修改，所以浏览器可以使用本地缓存的版本。

但是，如果你遇到  THREE.OBJLoader: Unexpected line: "<!doctype html>"  的警告，那说明 OBJLoader 实际上解析到的是一个 HTML 文件，而不是 OBJ 文件。这通常说明在请求OBJ文件时发生了错误，服务器返回了一个HTML错误页面而不是文件内容。

由于你看到的是304状态码，而不是200或404，这表明可能存在以下情况：

1.  **Vite的静态文件处理**  ：Vite在开发模式下可能对静态资源的处理有所不同，确保  earth.obj 文件放在了  public 目录下，而不是  src 目录下。在Vite中， public 目录下的文件不会被处理，可以直接访问。
2.  **缓存问题**  ：可能浏览器缓存了错误的内容。尝试清除浏览器缓存，或者在开发者工具中禁用缓存（在Network标签页，勾选Disable cache），然后再次加载页面。
3.  **错误页面**  ：尽管状态码为304，但是如果服务器在之前的请求中返回了错误，浏览器可能缓存了错误页面。检查Vite服务器的配置或控制台输出以确定是否有错误。
4.  **正确的MIME类型**  ：Vite应该自动为  .obj 文件提供正确的MIME类型，但是如果有什么配置不当，可能需要手动检查。

## tween的销毁

```undefined
new TWEEN.Tween(yPosition)
          .to({ y: 100 }, 900)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onUpdate(() => {
            loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
          })
          .onComplete(() => {
            loadingCover.parentNode.removeChild(
              document.getElementById('loading-text-intro')
            ) // 写loadingCover会报空
            TWEEN.remove(this)
          })
```

 **tween.getId is not a function  错误** 

这个错误提示表明，尝试调用的  getId  方法不存在于  tween  对象上。在你的代码中，错误来源于  TWEEN.remove(this)  这行代码。这里的问题是  this  在  onComplete  回调函数中不指向你期望的 tween 对象。在 ES6 的箭头函数中， this  关键字并不会绑定到外围的上下文，而是继承自它所在的上一层作用域。这意味着这里的  this  不是指向 Tween 实例，而可能是指向了全局对象或者  undefined （严格模式下）。

 **解决方案** 

为了正确地移除 tween，你可以直接引用 tween 实例本身而不是使用  this 。不过，从你的代码来看，并没有直接的引用。通常，如果你需要在回调中引用 tween，可以事先将其存储在一个变量中。但  TWEEN.js  库通常自我管理所有 tween 的生命周期，包括它们的添加和移除，所以手动调用  remove  方法可能并不是必须的。如果你确实需要移除 tween，考虑调整你的代码逻辑，避免在这种上下文中使用  this 。

```undefined
const tween1 = new TWEEN.Tween(yPosition)
          .to({ y: 100 }, 900)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onUpdate(() => {
            loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
          })
          .onComplete(() => {
            loadingCover.parentNode.removeChild(
              document.getElementById('loading-text-intro')
            ) // 写loadingCover会报空
            TWEEN.remove(tween1)
          })

        const tween2 = new TWEEN.Tween(camera1.position.set(0, 4, 2))
          .to({ x: 0, y: 2.4, z: 5.8 }, 3500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onComplete(() => {
            TWEEN.remove(tween2)
            document.querySelector('.header').classList.add('ended')
            document.querySelector('.description').classList.add('ended')
          })
```

## 查询元素

```undefined
const loadingCover = document.getElementById('loading-text-intro')

        const tween1 = new TWEEN.Tween(yPosition)
          .to({ y: 100 }, 900)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onUpdate(() => {
            loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
          })
          .onComplete(() => {
            loadingCover.parentNode.removeChild(
              document.getElementById('loading-text-intro')
            ) // 写loadingCover会报空
            TWEEN.remove(tween1)
          })
```

 Cannot read properties of null (reading 'removeChild')  错误

> 这个错误表明你尝试从一个  null  对象中调用  removeChild  方法。这通常发生在尝试访问或修改已经被移除或未被正确初始化的 DOM 元素时。在你的代码中，这个问题出现在尝试移除  loadingCover  元素的代码块中。

解决方案

在尝试移除  loadingCover  之前，确保它存在。这个问题可能出现是因为  loadingCover  为  null ，意味着  document.querySelector('#loading-text-intro')  没有找到匹配的元素。这可能是因为元素的 ID 错误，或者这段代码执行的时候，对应的 DOM 元素还没有加载到页面上。

你可以通过在尝试访问或修改元素之前检查它是否存在来解决这个问题：

```undefined
if (loadingCover && loadingCover.parentNode) {
    loadingCover.parentNode.removeChild(loadingCover);
}
```

综合以上，你的问题可能是由于对  this  的误用和对 DOM 元素存在性的假设未经验证造成的。正确地引用变量和确保 DOM 元素存在，可以解决这些问题。

 document.querySelector  和  document.getElementById  都是用来从 DOM 中获取元素的方法，但它们之间有一些关键的区别：

 document.querySelector 

-  querySelector  方法可以接受任何 CSS 选择器作为参数，这意味着它非常灵活。你可以用它来获取类、ID、属性选择器等指定的元素。
- 如果有多个元素匹配给定的选择器， querySelector  只会返回第一个匹配的元素。
- 由于它接受任何 CSS 选择器，所以相对来说，执行速度会比  getElementById  慢一些。

```javascript
const element = document.querySelector('#a'); // 使用 # 来指定它是一个 ID
```

 document.getElementById 

-  getElementById  方法仅接受一个 ID 作为参数，并返回具有该 ID 的元素。
- 它是直接根据 ID 来获取元素，不需要指定任何前缀，因为 ID 在 HTML 文档中应该是唯一的。
-  getElementById  通常比  querySelector  更快，因为它专门用于通过 ID 查找元素，而 ID 在 DOM 中是唯一的。

```javascript
const element = document.getElementById('a');
```

如果你需要通过 ID 获取元素，并且对性能有一定要求， getElementById  是一个更好的选择。如果你需要更多的选择器灵活性（例如，通过类名、属性等获取元素），则应使用  querySelector 。

-  **性能** ：对于通过 ID 获取单个元素的情况， getElementById  的性能通常更优。
-  **灵活性** ： querySelector  提供了更高的灵活性，可以使用任何有效的 CSS 选择器语法。

在大多数现代浏览器中，对于简单的 DOM 操作，这两种方法的性能差异几乎可以忽略不计。因此，你可以根据具体需求和个人偏好来选择使用哪种方法。

## 加载压缩过的glb

THREE .DRACOLoader: Unexpected geometrytype 错误解决

>  [https://blog.csdn.net/iefreer/article/details/131113390](https://blog.csdn.net/iefreer/article/details/131113390) 
> 
> npm i draco3d
> 
> npm i draco3dgltf
> 
>  [https://segmentfault.com/q/1010000043706931](https://segmentfault.com/q/1010000043706931) 
> 
> 原因： 是draco版本与项目安装的three版本不对  解决方法：以vite脚手架为例  node_modules\three\examples\jsm\libs\  下的darco文件夹拷贝到  public\  下，之后报错就解决了。

### DRACO验证

检查一个模型是否包含了 Draco 压缩的几何数据，

-  **使用 glTF Validator** ：你可以使用  [glTF Validator](https://github.khronos.org/glTF-Validator/)  来检查你的  .glb  文件。这是一个由 Khronos Group 提供的工具，专门用于验证 glTF 文件的正确性。如果你的文件使用了 Draco 压缩，验证结果会显示相关信息。
-  **查看文件内容** ：高级用户可以直接查看 GLB 文件的内容（例如，使用十六进制编辑器），寻找 Draco 压缩的标记或结构。这种方法需要对 GLB 文件格式和 Draco 压缩有较深的了解。

```undefined
{
    "uri": "statue.glb",
    "mimeType": "model/gltf-binary",
    "validatorVersion": "2.0.0-dev.3.8",
    "validatedAt": "2024-04-05T13:03:15.754Z",
    "issues": {
        "numErrors": 0,
        "numWarnings": 0,
        "numInfos": 3,
        "numHints": 0,
        "messages": [
            {
                "code": "UNSUPPORTED_EXTENSION",
                "message": "Cannot validate an extension as it is not supported by the validator: 'KHR_draco_mesh_compression'.",
                "severity": 2,
                "pointer": "/extensionsUsed/0"
            },
            {
                "code": "UNUSED_OBJECT",
                "message": "This object may be unused.",
                "severity": 2,
                "pointer": "/meshes/0/primitives/0/attributes/TEXCOORD_0"
            },
            {
                "code": "UNUSED_OBJECT",
                "message": "This object may be unused.",
                "severity": 2,
                "pointer": "/bufferViews/0"
            }
        ],
        "truncated": false
    },
    "info": {
        "version": "2.0",
        "generator": "Khronos glTF Blender I/O v1.8.19",
        "extensionsUsed": [
            "KHR_draco_mesh_compression"
        ],
        "extensionsRequired": [
            "KHR_draco_mesh_compression"
        ],
        "resources": [
            {
                "pointer": "/buffers/0",
                "mimeType": "application/gltf-buffer",
                "storage": "glb",
                "byteLength": 697820
            }
        ],
        "animationCount": 0,
        "materialCount": 1,
        "hasMorphTargets": false,
        "hasSkins": false,
        "hasTextures": false,
        "hasDefaultScene": true,
        "drawCallCount": 1,
        "totalVertexCount": 141741,
        "totalTriangleCount": 264708,
        "maxUVs": 1,
        "maxInfluences": 0,
        "maxAttributes": 3
    }
}
```

从你通过 glTF Validator 获取的信息中，我们可以了解到以下几点关于你的模型  statue.glb ：

1. 基本信息

-  **文件类型** ：模型是一个二进制的 glTF 文件（GLB）。
-  **验证器版本** ：使用的 glTF Validator 版本为 2.0.0-dev.3.8。
-  **验证时间** ：文件在 2024-04-05T13:03:15.754Z 被验证。

2. 问题报告

-  **错误数量** ：0，表示文件没有违反 glTF 2.0 规范的错误。
-  **警告数量** ：0，没有发现可能影响性能或兼容性的问题。
-  **信息数量** ：3，提供了一些关于模型的额外信息但不影响模型的使用。
-  **提示数量** ：0，没有给出优化建议。

3. 具体消息

-  **UNSUPPORTED_EXTENSION** ：模型使用了  KHR_draco_mesh_compression  扩展进行 Draco 压缩，但 glTF Validator 不支持验证这个扩展的具体内容。这说明你的模型确实使用了 Draco 压缩。
-  **UNUSED_OBJECT** ：有两个未使用的对象，一个是纹理坐标  TEXCOORD_0 ，另一个是  bufferViews[0] 。这可能意味着模型中包含了一些未被引用的数据，这通常不影响模型的使用，但可能稍微增加了文件的大小。

4. 模型信息

-  **glTF 版本** ：2.0。
-  **创建工具** ：使用了 Khronos glTF Blender I/O v1.8.19 创建。
-  **扩展使用和要求** ：模型使用并要求  KHR_draco_mesh_compression  扩展，证实了模型经过了 Draco 压缩。
-  **资源信息** ：包含一个 buffer，大小为 697820 字节。
-  **动画、材质、顶点和三角形数量** ：模型没有动画，有 1 个材质，共有 141741 个顶点和 264708 个三角形。

你的模型  statue.glb  成功使用了 Draco 压缩（通过  KHR_draco_mesh_compression  扩展），且没有发现任何违反 glTF 规范的错误。未使用的对象（如某些纹理坐标和 bufferViews）可能是导出过程中产生的，通常不会影响模型的渲染或使用。如果你关心文件大小，可以考虑优化这些未使用的数据。

这个报告也确认了你遇到的问题不是由文件损坏或不符合 glTF 规范造成的，可能需要在加载或渲染过程中进一步调查问题的原因。

## 报错cannot read properties of undefined(reading 'replace')

```undefined
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'replace')
at resolveIncludes (chunk-3F2VCGLV.js?v=944ad926:12026:17)
at new WebGLProgram (chunk-3F2VCGLV.js?v=944ad926:12422:18)
at Object.acquireProgram (chunk-3F2VCGLV.js?v=944ad926:13052:17)
at getProgram (chunk-3F2VCGLV.js?v=944ad926:18181:32)
at setProgram (chunk-3F2VCGLV.js?v=944ad926:18324:19)
at WebGLRenderer.renderBufferDirect (chunk-3F2VCGLV.js?v=944ad926:17727:23)
at renderObject (chunk-3F2VCGLV.js?v=944ad926:18148:15)
at renderObjects (chunk-3F2VCGLV.js?v=944ad926:18130:11)
at renderScene (chunk-3F2VCGLV.js?v=944ad926:18054:9)
at WebGLRenderer.render (chunk-3F2VCGLV.js?v=944ad926:17956:9)
```

一种可能是材质用错了： 原来： const material = new Three.Material({})  改之后： const material = new Three.PointsMaterial({}) 

## modelViewMatrix is a read-only....

Uncaught TypeError: 'get' on proxy: property 'modelViewMatrix' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '#<_Matrix4>' but got '#<_Matrix4>')

这通常与Three.js的某些内部状态或对象属性的处理有关。这种错误类型——关于代理对象和其内部属性——通常在Vue 3中出现，因为Vue 3使用代理来实现其响应式系统。当Three.js的对象被Vue的响应式系统代理时，可能会遇到与原生属性不同步的问题。

> 针对threejs的一些实例化对象，不放在reactive里面进行响应式管理

 [VUE3 + Three.js 坑](https://www.cnblogs.com/never404/p/17927788.html) 

 [【Threejs进阶教程-优化篇】1.Vue/React与threejs如何解决冲突和卡顿](https://blog.csdn.net/qq_42760477/article/details/136429365) 

 [一个很相似的人的博客](https://www.wellyyss.cn/ys-home/#/home) 

## glsl validator不能用

shader的命名必须是：xxx.frag.glsl, xxx.vert.glsl

## Uncaught SyntaxError: Unexpected identifier 'vec3'

我有一个vue3+threejs的项目， import textFragmentShader from './Shader/text.frag.glsl' import textVertexShader from './Shader/text.vert.glsl' const textGeometry = new Three.PlaneGeometry(1, 1, 32, 32) const textMaterial = new Three.ShaderMaterial({ vertexShader: textVertexShader, fragmentShader: textFragmentShader, side: Three.DoubleSide, })，我的text.vert.glsl里是这些内容attribute vec3 aPosition; varying vec2 vUv;

uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform vec2 uv;

void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(aPosition, 1.0); vUv = uv; }，报错为Uncaught SyntaxError: Unexpected identifier 'vec3'，为什么

在基于 Vite 的 Vue 3 项目中，你需要使用适当的插件来处理  .glsl  文件，因为 Vite 本身不自带处理这种文件类型的能力。你可以使用  vite-plugin-glsl  插件来帮助你导入  .glsl  文件作为字符串。

下面是如何在你的 Vite 配置中添加对  .glsl  文件的支持的步骤：

1. 安装  vite-plugin-glsl ：

   ```bash
   npm install vite-plugin-glsl
   ```

2. 在你的 Vite 配置文件中（通常是  vite.config.js  或  vite.config.ts ）添加插件：

   ```javascript
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


这样配置后，当你导入  .glsl  文件时， vite-plugin-glsl  将自动处理它们，确保 GLSL 代码被作为字符串正确导入，避免 JavaScript 解析错误。

确保在你的 Vue 组件或 JavaScript 文件中按照下面的方式导入  .glsl  文件：

```javascript
import textFragmentShader from './Shader/text.frag.glsl'
import textVertexShader from './Shader/text.vert.glsl'
```

这些文件现在应该会被正确地作为字符串导入，可以直接使用在 Three.js 的  ShaderMaterial  中。这应该解决你遇到的关于 GLSL 代码导入的问题。

## 如果物体shader写完不出现

仔细核对shader代码，特别是一些默认的，例如position

## 报错texture not found, .r 不存在

```undefined
// 设置纹理
  vec2 newUv = vec2(cor.x + time, cor.x + cor.y);
  vec3 noiseText1 = texture2D(perlinNoise, mod(newUv, 1.0))
                        .rgb; // 这里改一个名字，为了避免和上面的NoiseText混淆
  vec3 noiseText2 = texture2D(sparkNoise, mod(newUv, 1.)).rgb;
  vec3 noiseText3 = texture2D(waterTurbulence, mod(newUv, 1.))
                        .rgb; // 用newUv从不同的噪声纹理中读取值


......
// 设置边缘静态闪光
  vec2 uv2 = uv;
  float iTime = time * 0.004;
  uv.y += iTime / 10.0;
  uv.x -= (sin(iTime / 10.0) / 2.0);
  uv2.x += iTime / 14.0;
  uv2.x += (sin(iTime / 10.0) / 9.0);
  float result = 0.0;
  result +=
      texture2D(noiseText, mod(uv * 0.5, 1.) * 0.6 + vec2(iTime * (-0.003)))
          .r; // 报错是因为：vec4 texture2D(sampler2D sampler, vec2 coord);
              // 第一个参数需要是sampler2D类型,我根据代码猜测这里应该是一开始传入进来的那个noiseText，然后和上面对其他三个噪声图像的处理混淆了，所以上面改成了noiseText1
  result *=
      texture2D(noiseText, mod(uv2 * 0.5, 1.) * 0.9 + vec2(iTime * 0.002)).b;
  result = pow(result, 4.0);

```

 [https://thebookofshaders.com/glossary/?search=texture2D](https://thebookofshaders.com/glossary/?search=texture2D) 

## 资源加载找不到

保证路径没问题，之后：

1. 如果你的开发服务器运行在  [http://localhost:3000](http://localhost:3000) ，则访问  [http://localhost:3000/fonts/Abduction2002\_Regular.json](http://localhost:3000/fonts/Abduction2002%5C_Regular.json)  看是否能看到文件内容。
2. 打开浏览器的开发者工具，查看“网络(Network)”标签页。刷新页面并检查字体文件的请求。观察请求是否成功，返回的状态码是什么，以及返回的响应内容。

状态码  304 Not Modified  是一个正常的响应，表示客户端请求的资源自上次请求后没有修改，因此不需要重新传输数据，可以直接使用缓存中的数据。这通常是浏览器和服务器之间的有效缓存机制。然而，如果你期望看到一个新的文件或者修改后的文件，这可能表明你需要清理缓存或确保服务器正确地发送新文件。

## 报错Cannot read properties of undefined (reading 'addEventListener') at new FirstPersonControls

我是这段代码let firstPersonControl = new FirstPersonControls(camera) firstPersonControl.movementSpeed = 70 firstPersonControl.lookSpeed = 0.15 firstPersonControl.noFly = true firstPersonControl.lookVertical = false，

报错为Uncaught TypeError: Cannot read properties of undefined (reading 'addEventListener') at new FirstPersonControls (three_examples_jsm_controls_FirstPersonControls__js.js?v=8c474695:209:21) at loadModel (MultiMedia.vue:103:28)

1.  **确保**   **camera**  **camera**   **已经被正确初始化**  ：在你调用  FirstPersonControls  构造函数之前，确保  camera  对象已经被创建并正确配置。
2.  **确保传入正确的参数**  ： FirstPersonControls  的构造函数通常需要两个参数： camera  和  domElement 。 domElement  通常是渲染器的  domElement ，这是必须的，因为控件需要监听这个 DOM 元素上的鼠标和键盘事件。
3.  **修改代码**  ：你可能需要将  FirstPersonControls  的调用方式修改为传入  renderer.domElement ，例如：

```undefined
let firstPersonControl = new FirstPersonControls(camera, renderer.domElement);
firstPersonControl.movementSpeed = 70;
firstPersonControl.lookSpeed = 0.15;
firstPersonControl.noFly = true;
firstPersonControl.lookVertical = false;
```

1.  **检查代码的执行顺序**  ：

- 确保在调用  FirstPersonControls  之前  renderer  和  camera  都已经被创建。如果  renderer  或  camera  在你尝试创建控制器时还没初始化，就会出现这个错误。
- 确保  renderer.domElement  在你尝试创建  FirstPersonControls  时已经存在于 DOM 中。

## 报错Uncaught TypeError: Failed to execute 'linearRampToValueAtTime' on 'AudioParam'

Uncaught TypeError: Failed to execute 'linearRampToValueAtTime' on 'AudioParam': The provided float value is non-finite. at AudioListener.updateMatrixWorld (chunk-3F2VCGLV.js?v=8c474695:28128:26) at PerspectiveCamera.updateMatrixWorld (chunk-3F2VCGLV.js?v=8c474695:4725:15) at PerspectiveCamera.updateMatrixWorld (chunk-3F2VCGLV.js?v=8c474695:7635:11) at Scene.updateMatrixWorld (chunk-3F2VCGLV.js?v=8c474695:4725:15) at WebGLRenderer.render (chunk-3F2VCGLV.js?v=8c474695:17911:15) at tick (MultiMedia.vue?t=1716520442438:145:12)

 [https://discourse.threejs.org/t/solved-audioparam-error-with-audiolistener/12758](https://discourse.threejs.org/t/solved-audioparam-error-with-audiolistener/12758) 

在某些情况下，firstPersonControl是未定义的，要注意threejs里的执行顺序，可以把对control的定义放到initThree()里

此外，重要的是：

在tick()里面需要设置firstPersonControl的更新频率

```undefined
const clock = new Three.Clock()
const tick = () => {
  renderer.render(scene, camera)
  // controls.update()
  // checkCamera(camera)
  firstPersonControl.update(clock.getDelta())
  window.requestAnimationFrame(tick)
}
```

引入  clock.getDelta()  并将其用于  firstPersonControl.update()  能够解决问题，这可能与如何管理时间和帧率相关。让我解释一下这里面的机制。

在 Three.js 中， THREE.Clock  实例的  getDelta()  方法返回自上次调用以来经过的秒数。这个函数通常用于动画和物理计算中，以确保无论帧率如何变化，动画和移动的速度都保持一致。

 FirstPersonControls  可能在其  update()  方法内部需要一个时间增量（delta time），来计算自上一帧以来相机的位移和旋转。这个时间增量帮助控制相机的平滑移动，防止在不同的帧率下移动速度不一致。

如果没有提供合适的时间增量， FirstPersonControls  在计算时可能使用了默认或错误的时间值，导致计算结果出现非法值（如 NaN）。这可能是因为某些内部状态或计算依赖于每帧的变化量，而这个变化量如果没有正确计算，就会导致错误。

通常，在动画循环中使用  clock.getDelta()  如下：

```javascript
const clock = new THREE.Clock();

const tick = () => {
    const delta = clock.getDelta();

    firstPersonControl.update(delta);

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();
```

这种方式确保了无论用户的设备性能如何，或者当前页面的负载如何变化，相机的移动都能保持平滑和一致。

通过提供一个正确的时间增量给  FirstPersonControls.update() ，你帮助它更准确地处理内部的时间和移动计算，避免了它在计算过程中产生非有限数值。这是一个常见的实践，特别是在涉及实时交互和动画的复杂三维场景中。

# 赛博大屏实现教程

## 前言

参考案例：[https://dragonir.github.io/3d/#/earthDigital](https://dragonir.github.io/3d/#/earthDigital)

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
> - 但在这里使用的是 `3 - Math.sqrt(5)`，计算结果大约为 0.7639320225002102，它是黄金分割数的一种数学转换，更具体地说，这个值实际上等于 ( 2 - \phi )。
> - 当你将这个值乘以 (\pi) （圆周率），得到的角度是通过黄金分割原理计算得来的。这个角度有助于在球面上均匀地分布点，因为它避免了经纬线的对齐，从而在视觉上看起来更为均匀。
> 
> 黄金角是黄金分割数在圆上的应用。在自然界中，例如向日葵的种子排列、松果的鳞片布局等，都可以见到黄金角的应用。它能够优化空间利用率并减少重叠，因此在算法生成均匀分布的点时也经常使用这一角度。
> 
> 在球面分布点时使用黄金角可以避免聚类并尽可能覆盖整个球面。这样的排列减少了任何给定区域内点过多聚集的情况，从而使点的分布更加均匀，这对于很多涉及到空间分布优化的领域，如计算机图形学、地理信息系统等是非常有用的。

为什么z的初始值设置为这个let z = 1 - dz / 2;，而不是从0开始

> 在构建球面分布时，将 `z` 的初始值设置为 `1 - dz / 2` 而不是从 0 开始的原因是为了确保点均匀覆盖整个球体，包括顶部和底部。具体原因包括：
> 
> 避免极点的聚集
> 
> - 球体的顶部和底部（即极点）是特殊的位置，如果从 z = 0 或 z = 1 开始，可能会在这些极点处导致点过度聚集或分布不均。
> - 通过将 `z` 的初始值设置为 `1 - dz / 2`，相当于在 z 轴上对点的位置进行了微小的偏移，使得第一个点和最后一个点都不会精确地位于球体的极点上，而是稍微偏离中心。这有助于改善球面上点的分布均匀性。
> 
> 确保覆盖全球
> 
> - 由于 `dz = 2 / counter`，这意味着 z 值将从 1 开始，逐渐递减至 -1，覆盖整个球体。
> - 初始值 `1 - dz / 2` 实际上将第一个点的 z 值设置为接近 1，但略低于 1，确保点从球体的顶部开始，同时不会与球顶重合。
> 
> 均匀分布
> 
> - 此方法确保了点在垂直方向上也是均匀分布的。通过从 `1 - dz / 2` 开始，每个点的 z 值都是均匀地在 z 轴上偏移的，从而避免了在接近极点区域的不均匀密度。

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
- **`finalStep`****的计算**：累加所有冲击点对当前顶点的影响，使用 `clamp` 函数确保值在0到1之间。
- **`map`****变量的计算**：从纹理中获取当前顶点的green值，用于决定顶点的尺寸是 `maxSize` 还是 `minSize`，区分了陆地和海洋。
- **顶点位置(********`transformed`****)的更新**：根据 `map` 的结果和计算出的 `finalStep` 调整顶点位置，以实现位置的缩放和波纹效果。使用 `mix` 函数根据冲击波影响程度在原始尺寸和放大后的尺寸之间进行插值。波高(`waveHeight`)和 `finalStep` 的乘积决定了顶点沿法线方向的位移量。
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

- 传入对逐个点起作用的冲击强度和顶点纹理的g值；
- **形状处理** :
- 计算以屏幕中心为原点的 UV 坐标 `hUv`。（vUv是一个从0到1的二维向量，表示纹理坐标或顶点着色器传递给片段着色器的顶点位置）
- N=8常用于表示某种图形或模式中重复元素的数量
- `a` 是计算得到的向量 `hUv`的角度（相对于原点），使用的是反正切函数 `atan`，它返回从x轴到向量的角度。
- `r` 是每个扇区的角度范围，计算为 `2π` 除以扇区数量 `N`。
- `d` 是当前点到最近扇区边界的距离。
- `f` 是扇区中心到边界的距离。
- 如果 `d` 大于 `f`，则丢弃该片元（`discard`），只有距离扇区中心非常近的像素才能通过测试，这样可以创建更加锐利和明显的边界；
- 这有助于创建具有 N 边形形状的效果。
- **颜色和渐变处理**:
- `grad` 是内外渐变颜色的混合，基于 `d / f` 的值进行插值。
- `diffuseMap` 是根据 `vMap` 调整的漫反射颜色。 区分了陆地和海洋
- `col` 是漫反射颜色和渐变颜色的最终混合，其中使用了 `vFinalStep` 进行插值。
- 使用最终计算出的颜色 `col` 和原始的不透明度 `opacity` 创建新的 `vec4 diffuseColor`。

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

````
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
````

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

- unforms统一存shader里uniform的初始值

🔁 后话1-callback 🍵

- 构造位于半径为5的球面上的冲击点、冲击最大半径、冲击比例、之前的点位置、飞线的比例和长度

安装dat.gui的库：`npm i dat.gui @types/dat.gui`

添加进入gui；

gui设置隐藏，通过键盘H键唤起；

## 飞线

🔁 后话1-callback 🍵

- 取消注释

![](https://s2.loli.net/2024/10/12/tsKlSnbCucMwm2O.png)

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

![](https://s2.loli.net/2024/08/28/GWszxuwCZIaV1EB.png)

##### 飞线shader

下面是如何在你的 Vite 配置中添加对 `.glsl` 文件的支持的步骤：

1. 安装 `vite-plugin-glsl`：

   ````
   npm install vite-plugin-glsl
   ````

2. 在你的 Vite 配置文件中（通常是 `vite.config.js` 或 `vite.config.ts`）添加插件：

   ````
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import glsl from 'vite-plugin-glsl'
   
   export default defineConfig({
     plugins: [
       vue(),
       glsl()
     ]
   })
   ````


这样配置后，当你导入 `.glsl` 文件时，`vite-plugin-glsl` 将自动处理它们，确保 GLSL 代码被作为字符串正确导入，避免 JavaScript 解析错误。

确保在你的 Vue 组件或 JavaScript 文件中按照下面的方式导入 `.glsl` 文件：

````
import textFragmentShader from './Shader/text.frag.glsl'
import textVertexShader from './Shader/text.vert.glsl'
````

这些文件现在应该会被正确地作为字符串导入，可以直接使用在 Three.js 的 `ShaderMaterial` 中。这应该解决你遇到的关于 GLSL 代码导入的问题。

页面中导入：

````
import lineFragmentShader from './line.frag.glsl';
````

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

![](https://s2.loli.net/2024/09/11/yfOMo2NWJZVekbq.jpg)

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

- 如果向量的一个端点位于原点，旋转将直接改变向量的方向，而长度保持不变。
- 如果向量的一个端点不在原点，向量会在想象中被拉直至原点，然后绕轴旋转，再放回原位置。

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

```jsx
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

```jsx
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

```js
export const weekMap ={...};
export const tips = [...];
```

设置state存放显示的内容；  
在 React 中，组件可以是类组件或函数式组件。在函数式组件中，传统的类组件中的 state 和生命周期方法被 React Hooks 提供的功能所替代。最常用的 Hook 是 useState，它用于在函数式组件中添加状态管理功能。

```jsx
const [week, setWeek] = useState(weekMap[new Date().getDay()]);
const [time, setTime] = useState(new Date().toLocaleTimeString());
const [showModal, setShowModal] = useState(false);
const [modelText, setModelText] = useState(tips[0]);
const [renderGlithPass, setRenderGlithPass] = useState(false);
```

header结构

```html
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

```scss
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

![](https://s2.loli.net/2024/09/11/ZL9FgtrxEBW2ame.jpg)

logo和aside部分的结构

````
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
````

## button点击后出现故障风

点击触发函数：

````
const handleStartButtonClick = () => {
    setRenderGlithPass(!renderGlithPass);
  }
````

动画中更新：

````
  const animate = () => {
   ......
    renderGlithPass && composer.render();
  }
````

### 后处理效果

导入composer和pass

```jsx
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
```

initThree里初始化

```jsx
composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new GlitchPass());
```

### btn的样式

利用linear-gradient，实现了45度方向上，从透明到红色的按钮的突变（5%，5%），这个和《CSS揭秘》里的内容呼应了。

```css
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

[https://echarts.apache.org/handbook/zh/basics/import/](https://echarts.apache.org/handbook/zh/basics/import/)

按需引入：

```jsx
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

````
 const chart_1 = echarts.init(document.getElementsByClassName('chart_1')[0], 'dark');
    chart_1 && chart_1.setOption(chart_1_option);
````

使用useRef进行简化

````
  let chartsRef = Array.from({ length: 5 }).map(() => useRef(null));
  const initChart = () => {
    const chartsOption = [chart_1_option, chart_2_option, chart_3_option, chart_4_option, chart_5_option];
    const charts = chartsRef.map(ref => ref.current && echarts.init(ref.current, 'dark'));
    charts.forEach((chart, idx) => {
      chart && chart.setOption(chartsOption[idx]);
    });
  }
````

最后的aside

````
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
````

echarts里的option配置

![](https://s2.loli.net/2024/09/26/29DpPhmGLj16kyb.jpg)

注意：每一种图表形式的使用，都要按需导入；

针对areaStyle里的颜色，可以不导入echarts，直接colorStops来实现；

```js
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

## 底部仪表盘

1. 三个square构成，每个包括了radar和文字部分；
2. 写css
3. radial-gradient
4. animation相关

### 点击事件

1. 新建rayCaster, mouse记录鼠标点位
2. 给系统添加左键双击的事件，记录鼠标位置（坐标轴变换到中心点，右正上正），
3. 利用rayCaster判断是否与earth相交
4. 相交，则显示模态框和文本
5. 构建界面，写css

`<i className='close' onClick={() => setShowModal(false)}>CLOSE</i>`, 而不是写成 `<i className='close' onClick={setShowModal(false)>CLOSE</i>`;  
因为第一种是函数引用，点击i的时候才会触发；第二种在渲染的时候直接触发了。

## 问题

### 球体的陆地和海洋并没有区分出来

尝试1：看看texture是否正确加载

```jsx
let earthTexture = new Three.TextureLoader().load(earthImg, function (texture) {
      console.log('texture loaded successfully');
    }, undefined, function (err) { console.log('texture load failed', err); });
```

问题是对UV的计算错了：  
错处1：`let uv = [(sph + Math.PI) / (2 * Math.PI), 1 - (sph.theta / Math.PI)];`

需要使用new Three.Vector2(),而不是直接构建数组；如果是直接构建数组，那下面就访问不到.x和.y，需要使用[0]和[1]来访问对应的内容。

错处2：`let uv = new Three.Vector2(sph + Math.PI) / (2 * Math.PI), 1 - (sph.theta / Math.PI));`

这里对UV的映射计算错了

> 在 Three.js 中，`Spherical` 类表示的球坐标系统是基于三维右手笛卡尔坐标系，其中 `phi`（仰角）和 `theta`（方位角）的定义具体如下：
> 
> 1. **`phi`（仰角）** - 这是从正Y轴向下至点P的线段与Y轴之间的角度。在 Three.js 中，`phi` 的范围通常是从0到π（即从0到180度），其中0对应于正Y轴（向上）的方向，而π对应于负Y轴（向下）的方向。
> 2. **`theta`（方位角）** - 这是在XZ平面上，从正Z轴向正X轴的角度。`theta` 的范围是从0到2π（即从0到360度），其中0开始于正Z轴，增加方向是逆时针（从屏幕向里到屏幕向外看为正Z方向）。  
>    因此，`Spherical` 的 `phi` 和 `theta` 的直观理解如下：
> 
> - `phi = 0`：点位于Y轴的正方向（向上）。
> - `phi = π/2`：点位于XZ平面。
> - `phi = π`：点位于Y轴的负方向（向下）。
> - `theta = 0`：点位于Z轴的正方向（向屏幕外）。
> - `theta = π/2`：点位于X轴的正方向（向右）。
> - `theta = π`：点位于Z轴的负方向（向屏幕里）。
> - `theta = 3π/2`：点位于X轴的负方向（向左）。  
>   这种球坐标系统非常有用于处理与球面或者环绕运动相关的场景，如天体模拟、相机环绕目标物体的动作等。

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


[Three.js地理坐标和三维空间坐标的转换](https://blog.csdn.net/qihoo_tech/article/details/101443066)

![](https://s2.loli.net/2024/09/09/pbtr2HfNW7xTSkC.png)

### trail没显示出来

vLineDistance // 在使用 Three.js 的 LineDashedMaterial 时，确保顶点着色器正确地计算并传递 vLineDistance 变量到片元着色器是非常关键的，因为这个变量决定了线段的虚线效果。

原先是再setPath里修改点的位置，然后计算lineDistance，由于lineDistance计算有问题，所以在fragment shader里，vLineDistance就都是0

在setPath的代码里，求division需要用pos.count来-1，之前是pos直接-1，导致了错误，使得trail的pos都没有正确更新；

### 按钮切换效果不出来

如果在 `useEffect` 中的依赖数组（第二个参数）设置为空数组 `[]`，这意味着 `useEffect` 只会在组件首次挂载时运行一次，而不会在组件的状态或属性更新时再次运行。这常用于执行那些只需一次的初始化操作，如 API 调用或设置初始配置。

在您的情况中，如果 `animate` 函数在 `useEffect` 内定义，并且依赖数组为空，这会导致 `animate` 函数捕获到初始渲染时的状态值，例如 `renderGlithPass` 的初始值（`false`）。即使后续 `renderGlithPass` 状态更新，`animate` 函数中的值也不会更新，因为 `useEffect` 不会重新执行来更新闭包中的状态值。

解决方法

要让 `animate` 函数能够访问最新的 `renderGlithPass` 状态，您有两个选择：

1. **更新** **`useEffect`** **的依赖数组**：在依赖数组中包含 `renderGlithPass`，这样每次 `renderGlithPass` 改变时，`useEffect` 都会重新执行，`animate` 函数也将重新定义，从而捕获到最新的状态值。

```javascript
useEffect(() => {
  const animate = () => {
    console.log(renderGlithPass);
  };

  const animationId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(animationId);
}, [renderGlithPass]); // 现在包含 renderGlithPass 作为依赖
```

2. **使用** **`useRef`** **追踪最新的状态**：如之前所述，您可以使用 `useRef` 来追踪 `renderGlithPass` 的最新值，这样 `animate` 函数可以通过 ref 访问当前的状态，而无需重新定义 `animate` 函数。

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

### animate里的renderGlithPass总是false，未更新

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

# 把以前的threejs的demo加入到项目里

````
chunk-DPRAAIJY.js?v=d07e5b2e:17488 Uncaught Error: R3F: Hooks can only be used within the Canvas component!
    at useStore (chunk-DPRAAIJY.js?v=d07e5b2e:17488:21)
    at useThree (chunk-DPRAAIJY.js?v=d07e5b2e:17492:10)
    at @react-three_drei.js?v=d07e5b2e:649:7
    at renderWithHooks (chunk-A6I3RWFE.js?v=d07e5b2e:12151:26)
    at updateForwardRef (chunk-A6I3RWFE.js?v=d07e5b2e:14307:28)
    at beginWork (chunk-A6I3RWFE.js?v=d07e5b2e:15914:22)
    at HTMLUnknownElement.callCallback2 (chunk-A6I3RWFE.js?v=d07e5b2e:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-A6I3RWFE.js?v=d07e5b2e:3699:24)
    at invokeGuardedCallback (chunk-A6I3RWFE.js?v=d07e5b2e:3733:39)
    at beginWork$1 (chunk-A6I3RWFE.js?v=d07e5b2e:19733:15)
````

针对上面这个报错，后来发现导入fox的时候需要加上fox.jsx，以前直接是fox，但以前应该也是可以成功的？

参考教程：[https://juejin.cn/post/7145064095178293285](https://juejin.cn/post/7145064095178293285)

# 数字地球星空

1. 构建（线框风的地球earth、）环ring、卫星satellite
2. 构建500个随机分布的星星stars
3. 初始化场景，设置光照，关联dom
4. 加载地球的模型和贴图
5. 添加动画

## **页面中不显示canvas的内容**

1. 检查对应的template里的div元素的大小，如果设置不当，就看不到物体；
2. 如果没有把下面的代码放到init里，这个时候container的div还没有创建，获取不到对应的宽高

```js
let container = document.getElementById('container')

let sizes = {
  width: container.clientWidth,
  height: container.clientHeight,
}
```

## **页面中看不到物体**

1. 确认设置了div的大小: 如果 `container`的大小为0或非常小，那么 `Three.js`渲染的内容可能就无法被看到。确保 `.fullSize`样式被正确应用，并且容器元素确实覆盖了可见区域
2. 确定场景的材质颜色不和背景一样
3. 确认材质是否需要加光照
4. 调整相机.lookAt() : 如果场景中没有添加任何可见物体或者物体和摄像机的位置设置不当，可能导致看不到任何内容。试着添加一个简单的几何体，确保它在摄像机视野内
5. 调整物体.position.set()
6. 调整相机的位置.position.set()
7. 调整物体的大小 size
8. **渲染调用时机** ：你在 `initThree`函数中只调用了一次 `renderer.render(scene, camera)`，这意味着场景只渲染了一次，且在没有添加环境纹理之前。通常，我们会在添加完所有初次所需的场景内容后再进行渲染，或者使用动画循环（如 `requestAnimationFrame`）不断渲染场景。

此外，从vue迁移到react里的时候，原先是通过下面来实现的

````
    renderer = new Three.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(sizes.width, sizes.height)
    container.current.appendChild(renderer.domElement);
````

但搬过来就实现不了了，需要使用这样子实现；

````
    renderer = new Three.WebGLRenderer({ canvas: container.current, alpha: true, antialias: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera);
````

但又会报这种错误：

````
chunk-A6I3RWFE.js?v=776dc4a7:16638 Uncaught TypeError: Cannot read properties of null (reading 'matrixWorldAutoUpdate')
    at WebGLRenderer.render (chunk-KKQC3OGW.js?v=776dc4a7:17854:17)
    at initThree (EarthStar.jsx:47:14)
    at EarthStar.jsx:120:5
    at commitHookEffectListMount (chunk-A6I3RWFE.js?v=776dc4a7:16883:34)
    at commitPassiveMountOnFiber (chunk-A6I3RWFE.js?v=776dc4a7:18124:19)
    at commitPassiveMountEffects_complete (chunk-A6I3RWFE.js?v=776dc4a7:18097:17)
    at commitPassiveMountEffects_begin (chunk-A6I3RWFE.js?v=776dc4a7:18087:15)
    at commitPassiveMountEffects (chunk-A6I3RWFE.js?v=776dc4a7:18077:11)
    at flushPassiveEffectsImpl (chunk-A6I3RWFE.js?v=776dc4a7:19458:11)
    at flushPassiveEffects (chunk-A6I3RWFE.js?v=776dc4a7:19415:22)
````

需要把`renderer.render(scene, camera);`放到scene初始化的后面；

此外，需要放在scene添加模型之后，这样子模型才会被渲染到场景里；

## **Uncaught TypeError: Cannot read properties of null (reading 'width')**

```js
let sizes = {
  width: container.width,
  height: container.height,
}
```

当你看到错误消息 "Uncaught TypeError: Cannot read properties of null (reading 'width')"，这表明你试图访问的对象（在这个例子中是 `container`）为 `null`。这通常发生在尝试访问一个DOM元素的属性，但该元素在代码执行时还未被成功选中或者根本不存在于DOM中。

改用 `.clientWidth`和 `.clientHeight`是正确的修正方式，但前提是你首先需要确保 `container`不是 `null`。这两个属性是DOM元素的标准属性，分别表示元素的内部宽度（不包括边框）和高度，适用于获取元素的可视尺寸。

你可以通过以下步骤确保 `container`已正确选中并非 `null`：

1. 确保你的代码在DOM元素实际被加载到页面上之后执行。如果你的代码在元素被加载之前执行，那么即使选择器正确，也会返回 `null`。通常，将JavaScript代码放在文档的底部，或者使用 `document.addEventListener('DOMContentLoaded', function() { /* 代码 */ })`来确保在DOM完全加载后再运行代码。
2. 检查选择器是否正确。确保你用来选中 `container`的选择器（比如ID或类名）是正确的，并且与HTML中的元素匹配。

使用 `container.width` 不适用于 `div` 元素，因为 `div` 没有 `width` 属性。`width` 属性通常用于 `canvas`、`img` 等元素，这些元素具有直接可读写的宽度和高度属性。对于 `div` 和其他没有宽高属性的块级元素，你需要使用 `clientWidth` 和 `clientHeight` 来获取它们的视觉呈现尺寸，这些尺寸包括了元素的内边距（padding）但不包括边框（border）和滚动条。

这就是为什么在Three.js中，当你设置相机参数的时候需要使用 `container.clientWidth` 和 `container.clientHeight` 而不是 `container.width` 和 `container.height`：

- `clientWidth` 和 `clientHeight` 给你提供了元素的实际内容区域的尺寸，这对于Three.js中确保相机的长宽比与渲染容器匹配是非常重要的。
- 这些属性反映了 `<div>`容器当前的大小，包括任何由于页面布局或样式动态变化导致的尺寸更改。
- 如果使用 `width` 和 `height`，你可能会得到 `undefined`，因为这不是标准的 `div` 属性，这会导致你的相机设置不正确。

## 动画中位置的设置

在threejs中设置动画里面，satellite模型的位置如下

```js
satellite.position.set(
        140 * Math.cos(radian),
        50 * Math.sin(radian),
        20 * Math.sin(radian)
      )
```

其中

```js
rot += Math.random() * 0.8
let radian = (Math.PI * rot) / 180
```

为什么satellite动画的位置要这么设置

在这段代码中，`satellite.position.set(x, y, z)` 正在设置卫星模型在三维空间中的位置，其中 `x`，`y`，和 `z` 是根据一定规则计算出来的坐标值。这些值是通过正弦（`sin`）和余弦（`cos`）函数的变化来动态计算的，这些函数是从圆和波的几何关系中派生出来的，因此它们非常适合用于创建循环和振荡的动画效果，如卫星绕地球运行的轨迹。

- `140 * Math.cos(radian)` 是在计算卫星在x轴上的位置。使用余弦函数意味着卫星在x轴上的运动会形成一个正弦波，其值在-140到+140之间变化，创建了水平方向上的循环运动。
- `50 * Math.sin(radian)` 是在计算卫星在y轴上的位置。正弦函数决定了卫星在垂直方向上的运动，创建了一个范围在-50到+50之间的波动。
- `20 * Math.sin(radian)` 是在计算卫星在z轴上的位置。这同样使用了正弦函数，但是影响卫星在“深度”方向上的运动。这个值的变化范围在-20到+20之间，这个变化范围小于y轴，意味着在这个方向上的振动幅度较小。
- `rot += Math.random() * 0.8` 这部分代码是为了在每次动画循环时增加 `rot`的值，而且每次增加的值是随机的，最大不超过0.8度。这将为卫星运动添加一个随机性，使其轨迹更加自然，而不是完美的圆形或者规则循环。
- `let radian = (Math.PI * rot) / 180` 这行将角度 `rot`转换为弧度。

为什么x轴使用 `Math.cos` 而y轴和z轴使用 `Math.sin` 呢？这是因为在2D参数化曲线中，常常使用 `cos(t)` 表示x坐标，`sin(t)` 表示y坐标，这样可以创建一个圆。在三维空间中，我们可以使用相同的正弦函数来控制另外两个维度（在这种情况下是y和z），这样我们可以将2D圆形运动扩展到3D空间。

通过这样设置，你可以让卫星在x和y轴上做圆周运动，而z轴的运动则创建了高度的变化，这可以模拟例如倾斜的轨道或者其它不同于标准圆形轨道的路径。通过改变各轴上正弦和余弦函数前的系数，可以创建出不同的椭圆轨道，这就是为什么在不同轴上的运动使用不同的正弦余弦值，以及它们前面的系数不同。

![](https://s2.loli.net/2024/03/25/Ioq7PRSjt3cJ8mG.png)

## 相机

通过设置相机，可以改变物体呈现的角度，也就是在调整物体位置的方案之外，也可以调整相机的位置。

## 外部资源加载

````
EarthStar.jsx:69 THREE.OBJLoader: Unexpected line: "<!DOCTYPE html>"
Promise.then  
(anonymous) @ EarthStar.jsx:69
Promise.then  
EarthStar @ EarthStar.jsx:64
Show 20 more frames
````

需要将模型放到public目录里面，同时vite.config.js的配置里加入：`assetsInclude: ['**/*.glb', '**/*.mtl', '**/*.gltf'],`

***

如果你在使用 Vite 和 Vue，并且看到网络请求的状态码为 `304 Not Modified`，这意味着浏览器已经缓存了 `earth.obj` 文件，并且服务器告诉浏览器自从上次请求以来文件没有被修改，所以浏览器可以使用本地缓存的版本。

但是，如果你遇到 `THREE.OBJLoader: Unexpected line: "<!doctype html>"` 的警告，那说明 OBJLoader 实际上解析到的是一个 HTML 文件，而不是 OBJ 文件。这通常说明在请求OBJ文件时发生了错误，服务器返回了一个HTML错误页面而不是文件内容。

由于你看到的是304状态码，而不是200或404，这表明可能存在以下情况：

1. **Vite的静态文件处理** ：Vite在开发模式下可能对静态资源的处理有所不同，确保 `earth.obj`文件放在了 `public`目录下，而不是 `src`目录下。在Vite中，`public`目录下的文件不会被处理，可以直接访问。
2. **缓存问题** ：可能浏览器缓存了错误的内容。尝试清除浏览器缓存，或者在开发者工具中禁用缓存（在Network标签页，勾选Disable cache），然后再次加载页面。
3. **错误页面** ：尽管状态码为304，但是如果服务器在之前的请求中返回了错误，浏览器可能缓存了错误页面。检查Vite服务器的配置或控制台输出以确定是否有错误。
4. **正确的MIME类型** ：Vite应该自动为 `.obj`文件提供正确的MIME类型，但是如果有什么配置不当，可能需要手动检查。

在你的 Vite 项目中，assetsInclude 的配置项用于指定哪些额外的文件类型应被视为静态资源进行处理。默认情况下，Vite 已经内置了对常见的静态资源文件类型的处理，如图片和媒体文件。对于 3D 模型文件如 .glb、.gltf、.obj 和 .mtl，需要特别指定，以便 Vite 能够正确地处理它们。

你提到 .glb 类型的模型可以正常加载，而其他类型的模型需要放到 public 目录下才可以正常加载，这可能与几个因素有关：

- Vite 配置：确保 assetsInclude 的路径匹配是正确的。你的配置已经包括了对这些文件类型的全局匹配。检查是否有任何拼写错误或路径错误。通配符 **/* 表示匹配任意深度的文件夹中的指定文件类型。
- 模块解析：Vite 在开发环境下使用 JavaScript 模块解析来处理资源。如果你的 .obj 或 .mtl 文件没有被正确地识别为模块，它们可能不会通过 Vite 的处理流程。确保这些文件在导入时的路径是正确的，并且相对于项目的根目录。
- 资源引用：检查在项目中引用这些资源的方式。如果你是使用 ES 模块语法（如 import model from './path/to/model.obj'），Vite 将尝试将其视为模块来处理。如果资源没有按预期处理，可能需要调整引用方式或确认文件路径是否正确。
- 缓存问题：有时候，开发服务器的缓存可能导致资源加载行为不一致。尝试清除缓存或重启 Vite 服务器看是否有改进。
- Vite 插件：对于一些特殊类型的文件，可能需要使用特定的 Vite 插件来支持。例如，对于 3D 模型文件，你可能需要使用适合处理这些文件的插件。

最后通过import方式引入，就可以了，不需要放到public目录里了；

但打包的时候，也可能会被忽略（参考你不得以放进去的gltf-models文件夹???

## 球体贴图没贴上

mtl文件里关联了贴图，所以贴图也要一起拷贝过来；

# 案例2-光影人物

1. 两个渲染器、相机，一个场景，添加光照；
2. 处理窗口缩放
3. 构建页面结构
4. css写在外部文件里
5. 构建加载管理器，实现加载页面的下移、消失、移除
6. 加载glb模型，并使用draco进行处理
7. 使用intersection observer进行异步观察
8. 处理鼠标移动下的span效果
9. 调整相机
10. 添加事件监听

注意点：

- renderer1.outputColorSpace = Three.SRGBColorSpace // API已经改成了ColorSpace
- why lds-roller has 8 divs? ,用于形成loading旋转的时候的八个点

## IntersectionObserver

`IntersectionObserver` 是一个强大的 Web API，用于异步观察一个元素与其祖先元素或顶级文档视窗（viewport）的交叉状态。简单来说，它允许你配置一个回调函数，当被观察的元素以某种方式进入或离开另一个元素的视域时，这个回调函数会被执行。这个功能特别适合于实现像懒加载图片、无限滚动、动画触发等功能，而无需依赖繁重的滚动事件监听，从而提高页面性能和用户体验。

在你的代码示例中，`IntersectionObserver` 被用于监测一个名为 `.second` 的元素何时成为可见的，以及它的可见程度（即交叉比率）：

```javascript
let secondContainer = false;
const ob = new IntersectionObserver(payload => {
  secondContainer = payload[0].intersectionRatio > 0.05;
}, { threshold: 0.05 });
ob.observe(document.querySelector('.second'));
```

- **回调函数**：当观察的元素进入或退出交叉区域时，回调函数会被调用。`payload` 参数（通常命名为 `entries`）是一个数组，包含了被观察元素的交叉状态信息。这个示例中只观察了一个元素，因此通过 `payload[0]` 访问了这个元素的信息。
- **`intersectionRatio`**：这是一个 0 到 1 之间的值，表示观察的元素当前可见部分的比例。在这个例子中，如果这个比例大于 0.05，`secondContainer` 将被设置为 `true`，表示元素至少有 5% 是可见的。
- **选项对象**：在这个例子中，选项对象 `{ threshold: 0.05 }` 指定了触发回调的交叉比率阈值。当元素的可见部分超过 5% 时，回调函数将被执行。`threshold` 可以是一个单一的值或一个值的数组，允许你在元素可见性达到多个不同级别时触发回调。
- **`.observe()`** **方法**：这个方法用于开始观察一个元素。在这里，它观察一个类名为 `.second` 的元素。当这个元素的可视状态发生变化，且满足设定的阈值时，将触发上面定义的回调函数。

使用 `IntersectionObserver` 相比传统的滚动事件监听，可以大大减少对性能的影响，因为浏览器可以优化对交叉状态的检测，无需在每次滚动事件发生时执行复杂的计算。

## `window.scroll`

`window.scroll(0, 0)` 是 JavaScript 中的一个方法调用，用于将浏览器窗口或标签页的滚动位置设置到页面的最顶部。这里的两个参数 `(0, 0)` 分别表示水平和垂直方向的滚动位置。

- 第一个参数 `0` 表示在水平方向上的滚动距离。在这个例子中，`0` 意味着页面将滚动到最左边。
- 第二个参数 `0` 表示在垂直方向上的滚动距离。在这个例子中，`0` 意味着页面将滚动到最顶部。

因此，调用 `window.scroll(0, 0)` 会使得页面滚动到左上角，即页面的起始位置。这个方法经常在需要将用户的视图重置到页面顶部的情况下使用，比如在用户点击“返回顶部”按钮时。

## 动画位移

````
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
````

这段代码通过结合用户输入（例如鼠标移动产生的视差效果，即 `parallaxX` 和 `parallaxY`）和时间变化量（`deltaTime`）来动态更新点光源和相机组的位置。这种方法可以创建平滑和响应式的动画效果，使得场景元素（如光源和相机）能够根据用户的交互或时间的推移进行移动。

这里使用的是一种常见的动画和模拟技术，即在每一帧根据时间差（`deltaTime`）调整位置，以实现平滑的运动效果。`deltaTime` 通常表示自上一帧以来经过的时间，用于确保动画的速度不受帧率变化的影响。

```javascript
fillLight.position.y -= (parallaxY * 9 + fillLight.position.y - 2) * deltaTime;
fillLight.position.x += (parallaxX * 8 - fillLight.position.x) * 2 * deltaTime;
```

- 对于 `y` 轴位置，代码计算了一个目标值，这个目标值由 `parallaxY` 的9倍与光源当前 `y` 值与2的差值共同决定，然后通过 `deltaTime` 调整速度和平滑度。这样做的效果是让光源在垂直方向上根据视差值平滑移动，并且试图维持在一个**相对于原点偏移2**的位置。
- 对于 `x` 轴位置，类似地，目标位置由 `parallaxX` 的8倍减去当前 `x` 值决定，然后乘以2和 `deltaTime` 来调整。这让光源在水平方向上也根据视差值平滑地移动。

```javascript
cameraGroup.position.z -= (parallaxY / 3 + cameraGroup.position.z) * 2 * deltaTime;
cameraGroup.position.x += (parallaxX / 3 - cameraGroup.position.x) * 2 * deltaTime;
```

- 这里对相机组的 `z` 和 `x` 轴位置进行更新，逻辑类似于光源位置的更新，**但视差值被除以3，意味着相对移动幅度更小**，创建了一种不同的视差效果。这种效果通常用来给用户一种深度感，即背景元素相对于前景元素移动得更慢。

？如何恰当的设置，在鼠标移动下，页面元素的流畅偏移效果

## CSS

````
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
} 
````

这段 CSS 代码定义了一个动画效果，通常用于创建加载指示器（如旋转的圆环或球）。让我们逐步解析这段代码的含义：

```css
.lds-roller div {
  ...
}
```

这里的选择器 `.lds-roller div` 指的是所有类名为 `lds-roller` 的元素内部的 `div` 元素。对这些 `div` 元素应用以下样式和动画。

```css
animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
```

- **动画名称 (********`lds-roller`****)**：这是动画的关键帧名称，它引用了在某处定义的 `@keyframes lds-roller`，该关键帧定义了动画的开始、结束状态以及可能的中间状态。
- **持续时间 (********`1.2s`****)**：动画从开始到结束的时长为 1.2 秒。
- **缓动函数 (********`cubic-bezier(0.5, 0, 0.5, 1)`****)**：这是一个贝塞尔曲线，定义了动画的加速度曲线。这个特定的曲线意味着动画开始时加速度较快，结束时减速。这样可以让动画看起来更自然、流畅。
- **重复次数 (********`infinite`****)**：动画会无限次重复。

```css
transform-origin: 40px 40px;
```

- **变换原点 (********`transform-origin`****)**：这个属性定义了元素变形的原点。在这个例子中，原点被设置在了元素的 `40px 40px` 的位置，通常意味着元素的变换（如旋转）将围绕这个点进行。这个设置有助于创建环绕中心点旋转的效果，特别是当动画效果是旋转时。

综上所述，这段 CSS 为 `.lds-roller` 内部的每个 `div` 应用了一个持续 1.2 秒、无限重复的平滑动画，该动画的具体行为由 `@keyframes lds-roller` 定义。动画的变换原点设置在每个 `div` 的 `40px 40px` 处，使得旋转动画能围绕该点进行，创建出一个加载动画的视觉效果。

为了完整地实现这个动画效果，你还需要定义相应的 `@keyframes lds-roller` 关键帧动画，指明动画开始、结束时，以及可能的中间步骤的具体样式变化。

````
loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
````

在这段代码中，`loadingCover.style.setProperty` 方法被用于动态修改 `loadingCover` 元素的 CSS `transform` 属性。这个方法允许你直接通过 JavaScript 更改元素的样式，其中 `setProperty` 接受两个参数：第一个参数是要修改的 CSS 属性名称，第二个参数是该属性的新值。

- **第一个参数 (********`transform`****)**: 指定了要修改的 CSS 属性，这里是 `transform`。`transform` 属性允许你对元素进行变形，比如旋转、缩放、移动（平移）或倾斜。
- **第二个参数 (********`translate(0,${yPosition.y}%)`****)**: 是 `transform` 属性的新值，这里使用了 `translate` 函数来移动元素。`translate` 函数接受两个参数，分别对应 X 轴和 Y 轴的移动距离。在这个例子中，`translate(0,${yPosition.y}%) `表示在 X 轴方向上不移动（`0`），在 Y 轴方向上移动` ${yPosition.y}%` 的距离，其中 `${yPosition.y}` 是一个动态计算的值，表示移动距离的百分比。使用百分比单位可以根据元素大小的不同而相对地移动不同的距离。

这段代码的目的是根据 `yPosition.y` 的值（可能是通过某些计算得到的），在 Y 轴方向上动态移动 `loadingCover` 元素。这种技术常用于创建动态的交互效果，比如根据用户的滚动或鼠标移动来移动页面上的元素，从而增加页面的动态性和互动性。

假设 `yPosition.y` 的值为 `50`，则 `translate(0,${yPosition.y}%)` 将解析为 `translate(0,50%)`，意味着 `loadingCover` 元素将沿 Y 轴方向下移其高度的 50%。这样的移动效果可以用于各种动画和过渡效果，使得页面元素的移动看起来更平滑和自然。

## innerHeight, clientHeight

当想获取一个DOM元素的宽度和高度时，通常会使用 `clientHeight`和 `clientWidth`。这两个属性提供了元素的内部高度和宽度（包括填充，但不包括边框、滚动条或外边距）。

对于你的具体例子，如果你需要在组件挂载后获取这个 `div`元素的宽度和高度，

```html
<script setup>
import { ref, onMounted } from 'vue';

const container = ref(null);

onMounted(() => {
  if (container.value) {
    console.log('Width:', container.value.clientWidth);
    console.log('Height:', container.value.clientHeight);
  }
});
</script>

<template>
  <div ref="container" class="fullSize"></div>
</template>
```

- **clientHeight**：元素的内部高度（包括padding，但不包括水平滚动条、border和margin）。
- **clientWidth**：元素的内部宽度（同样，包括padding但不包括垂直滚动条、border和margin）。
- **offsetHeight**：元素的外部高度（包括padding、border和水平滚动条，但不包括margin）。
- **offsetWidth**：元素的外部宽度（包括padding、border和垂直滚动条，但不包括margin）。
- **scrollHeight**和**scrollWidth**：包括了因为滚动而不可见内容的整体尺寸。

通常来说，`clientHeight`和 `clientWidth`是获取元素可见部分尺寸的最常用属性。如果你的 `div`具有滚动条，或者你关心内容溢出的情况，`scrollHeight`和 `scrollWidth`也可能是有用的。如果需要考虑元素的边框，在某些情况下可能会选择使用 `offsetHeight`和 `offsetWidth`。

在Web开发中，`innerHeight` 并不是一个用来获取DOM元素尺寸的属性；而是一个属于 `window`对象的属性，它表示浏览器窗口的视图区域（视口）的高度，包括水平滚动条（如果存在的话）。

`window.innerHeight` 通常用于处理与视口大小相关的逻辑，如下几种典型用途：

1. **响应式设计**：JavaScript中可以使用 `window.innerHeight`来帮助确定浏览器窗口的当前高度，进而调整网页布局或功能以适应不同的显示设备。
2. **触发特定的行为**：当用户缩放浏览器窗口至某个特定的尺寸时，你可能希望根据窗口的大小改变来触发某些行为或动画。
3. **无限滚动**：在实现无限滚动的网页中，`window.innerHeight` 可以用来计算用户何时接近底部，从而在用户滚动到页面底部之前加载更多内容。
4. **全屏元素显示**：如果你想要某个元素（如视频、图片展示等）全屏显示，`window.innerHeight` 可以帮助你设置元素的高度，使之完全填充用户的视口。

下面是一个示例代码，展示如何使用 `window.innerHeight`来调整一个元素的高度使其总是占满整个视口：

```html
<style>
  .full-height {
    width: 100%;
    background-color: lightblue; /* 易于视觉识别的颜色 */
  }
</style>

<div class="full-height" id="fullHeightDiv">
  这个div高度将填满视口
</div>

<script>
  function adjustHeight() {
    const div = document.getElementById('fullHeightDiv');
    div.style.height = window.innerHeight + 'px';
  }

  window.onload = adjustHeight;
  window.onresize = adjustHeight; // 确保在窗口尺寸变化时更新高度
</script>
```

## tween的销毁

````
new TWEEN.Tween(yPosition)
          .to({ y: 100 }, 900)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onUpdate(() => {
            loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
          })
          .onComplete(() => {
            loadingCover.parentNode.removeChild(
              document.getElementById('loading-text-intro')
            ) // 写loadingCover会报空
            TWEEN.remove(this)
          })
````

### `tween.getId is not a function` 错误

这个错误提示表明，尝试调用的 `getId` 方法不存在于 `tween` 对象上。在你的代码中，错误来源于 `TWEEN.remove(this)` 这行代码。这里的问题是 `this` 在 `onComplete` 回调函数中不指向你期望的 tween 对象。在 ES6 的箭头函数中，`this` 关键字并不会绑定到外围的上下文，而是继承自它所在的上一层作用域。这意味着这里的 `this` 不是指向 Tween 实例，而可能是指向了全局对象或者 `undefined`（严格模式下）。

#### 解决方案

为了正确地移除 tween，你可以直接引用 tween 实例本身而不是使用 `this`。不过，从你的代码来看，并没有直接的引用。通常，如果你需要在回调中引用 tween，可以事先将其存储在一个变量中。但 `TWEEN.js` 库通常自我管理所有 tween 的生命周期，包括它们的添加和移除，所以手动调用 `remove` 方法可能并不是必须的。如果你确实需要移除 tween，考虑调整你的代码逻辑，避免在这种上下文中使用 `this`。

````
const tween1 = new TWEEN.Tween(yPosition)
          .to({ y: 100 }, 900)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onUpdate(() => {
            loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
          })
          .onComplete(() => {
            loadingCover.parentNode.removeChild(
              document.getElementById('loading-text-intro')
            ) // 写loadingCover会报空
            TWEEN.remove(tween1)
          })

        const tween2 = new TWEEN.Tween(camera1.position.set(0, 4, 2))
          .to({ x: 0, y: 2.4, z: 5.8 }, 3500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onComplete(() => {
            TWEEN.remove(tween2)
            document.querySelector('.header').classList.add('ended')
            document.querySelector('.description').classList.add('ended')
          })
````

## 查询元素

````
const loadingCover = document.getElementById('loading-text-intro')

        const tween1 = new TWEEN.Tween(yPosition)
          .to({ y: 100 }, 900)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onUpdate(() => {
            loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
          })
          .onComplete(() => {
            loadingCover.parentNode.removeChild(
              document.getElementById('loading-text-intro')
            ) // 写loadingCover会报空
            TWEEN.remove(tween1)
          })
````

`Cannot read properties of null (reading 'removeChild')` 错误

> 这个错误表明你尝试从一个 `null` 对象中调用 `removeChild` 方法。这通常发生在尝试访问或修改已经被移除或未被正确初始化的 DOM 元素时。在你的代码中，这个问题出现在尝试移除 `loadingCover` 元素的代码块中。

#### 解决方案

在尝试移除 `loadingCover` 之前，确保它存在。这个问题可能出现是因为 `loadingCover` 为 `null`，意味着 `document.querySelector('#loading-text-intro')` 没有找到匹配的元素。这可能是因为元素的 ID 错误，或者这段代码执行的时候，对应的 DOM 元素还没有加载到页面上。

你可以通过在尝试访问或修改元素之前检查它是否存在来解决这个问题：

````
if (loadingCover && loadingCover.parentNode) {
    loadingCover.parentNode.removeChild(loadingCover);
}
````

综合以上，你的问题可能是由于对 `this` 的误用和对 DOM 元素存在性的假设未经验证造成的。正确地引用变量和确保 DOM 元素存在，可以解决这些问题。

`document.querySelector` 和 `document.getElementById` 都是用来从 DOM 中获取元素的方法，但它们之间有一些关键的区别：

`document.querySelector`

- `querySelector` 方法可以接受任何 CSS 选择器作为参数，这意味着它非常灵活。你可以用它来获取类、ID、属性选择器等指定的元素。
- 如果有多个元素匹配给定的选择器，`querySelector` 只会返回第一个匹配的元素。
- 由于它接受任何 CSS 选择器，所以相对来说，执行速度会比 `getElementById` 慢一些。

```javascript
const element = document.querySelector('#a'); // 使用 # 来指定它是一个 ID
```

`document.getElementById`

- `getElementById` 方法仅接受一个 ID 作为参数，并返回具有该 ID 的元素。
- 它是直接根据 ID 来获取元素，不需要指定任何前缀，因为 ID 在 HTML 文档中应该是唯一的。
- `getElementById` 通常比 `querySelector` 更快，因为它专门用于通过 ID 查找元素，而 ID 在 DOM 中是唯一的。

```javascript
const element = document.getElementById('a');
```

如果你需要通过 ID 获取元素，并且对性能有一定要求，`getElementById` 是一个更好的选择。如果你需要更多的选择器灵活性（例如，通过类名、属性等获取元素），则应使用 `querySelector`。

- **性能**：对于通过 ID 获取单个元素的情况，`getElementById` 的性能通常更优。
- **灵活性**：`querySelector` 提供了更高的灵活性，可以使用任何有效的 CSS 选择器语法。

在大多数现代浏览器中，对于简单的 DOM 操作，这两种方法的性能差异几乎可以忽略不计。因此，你可以根据具体需求和个人偏好来选择使用哪种方法。

## 加载压缩过的glb

THREE .DRACOLoader: Unexpected geometrytype 错误解决

> [https://blog.csdn.net/iefreer/article/details/131113390](https://blog.csdn.net/iefreer/article/details/131113390)
> 
> npm i draco3d
> 
> npm i draco3dgltf
> 
> [https://segmentfault.com/q/1010000043706931](https://segmentfault.com/q/1010000043706931)
> 
> 原因：`是draco版本与项目安装的three版本不对`  
解决方法：以vite脚手架为例 `node_modules\three\examples\jsm\libs\` 下的darco文件夹拷贝到 `public\<span> </span>`下，之后报错就解决了。

### DRACO验证

检查一个模型是否包含了 Draco 压缩的几何数据，

- **使用 glTF Validator**：你可以使用 [glTF Validator](https://github.khronos.org/glTF-Validator/) 来检查你的 `.glb` 文件。这是一个由 Khronos Group 提供的工具，专门用于验证 glTF 文件的正确性。如果你的文件使用了 Draco 压缩，验证结果会显示相关信息。
- **查看文件内容**：高级用户可以直接查看 GLB 文件的内容（例如，使用十六进制编辑器），寻找 Draco 压缩的标记或结构。这种方法需要对 GLB 文件格式和 Draco 压缩有较深的了解。

````
{
    "uri": "statue.glb",
    "mimeType": "model/gltf-binary",
    "validatorVersion": "2.0.0-dev.3.8",
    "validatedAt": "2024-04-05T13:03:15.754Z",
    "issues": {
        "numErrors": 0,
        "numWarnings": 0,
        "numInfos": 3,
        "numHints": 0,
        "messages": [
            {
                "code": "UNSUPPORTED_EXTENSION",
                "message": "Cannot validate an extension as it is not supported by the validator: 'KHR_draco_mesh_compression'.",
                "severity": 2,
                "pointer": "/extensionsUsed/0"
            },
            {
                "code": "UNUSED_OBJECT",
                "message": "This object may be unused.",
                "severity": 2,
                "pointer": "/meshes/0/primitives/0/attributes/TEXCOORD_0"
            },
            {
                "code": "UNUSED_OBJECT",
                "message": "This object may be unused.",
                "severity": 2,
                "pointer": "/bufferViews/0"
            }
        ],
        "truncated": false
    },
    "info": {
        "version": "2.0",
        "generator": "Khronos glTF Blender I/O v1.8.19",
        "extensionsUsed": [
            "KHR_draco_mesh_compression"
        ],
        "extensionsRequired": [
            "KHR_draco_mesh_compression"
        ],
        "resources": [
            {
                "pointer": "/buffers/0",
                "mimeType": "application/gltf-buffer",
                "storage": "glb",
                "byteLength": 697820
            }
        ],
        "animationCount": 0,
        "materialCount": 1,
        "hasMorphTargets": false,
        "hasSkins": false,
        "hasTextures": false,
        "hasDefaultScene": true,
        "drawCallCount": 1,
        "totalVertexCount": 141741,
        "totalTriangleCount": 264708,
        "maxUVs": 1,
        "maxInfluences": 0,
        "maxAttributes": 3
    }
}
````

从你通过 glTF Validator 获取的信息中，我们可以了解到以下几点关于你的模型 `statue.glb`：

1. 基本信息

- **文件类型**：模型是一个二进制的 glTF 文件（GLB）。
- **验证器版本**：使用的 glTF Validator 版本为 2.0.0-dev.3.8。
- **验证时间**：文件在 2024-04-05T13:03:15.754Z 被验证。

2. 问题报告

- **错误数量**：0，表示文件没有违反 glTF 2.0 规范的错误。
- **警告数量**：0，没有发现可能影响性能或兼容性的问题。
- **信息数量**：3，提供了一些关于模型的额外信息但不影响模型的使用。
- **提示数量**：0，没有给出优化建议。

3. 具体消息

- **UNSUPPORTED_EXTENSION**：模型使用了 `KHR_draco_mesh_compression` 扩展进行 Draco 压缩，但 glTF Validator 不支持验证这个扩展的具体内容。这说明你的模型确实使用了 Draco 压缩。
- **UNUSED_OBJECT**：有两个未使用的对象，一个是纹理坐标 `TEXCOORD_0`，另一个是 `bufferViews[0]`。这可能意味着模型中包含了一些未被引用的数据，这通常不影响模型的使用，但可能稍微增加了文件的大小。

4. 模型信息

- **glTF 版本**：2.0。
- **创建工具**：使用了 Khronos glTF Blender I/O v1.8.19 创建。
- **扩展使用和要求**：模型使用并要求 `KHR_draco_mesh_compression` 扩展，证实了模型经过了 Draco 压缩。
- **资源信息**：包含一个 buffer，大小为 697820 字节。
- **动画、材质、顶点和三角形数量**：模型没有动画，有 1 个材质，共有 141741 个顶点和 264708 个三角形。

你的模型 `statue.glb` 成功使用了 Draco 压缩（通过 `KHR_draco_mesh_compression` 扩展），且没有发现任何违反 glTF 规范的错误。未使用的对象（如某些纹理坐标和 bufferViews）可能是导出过程中产生的，通常不会影响模型的渲染或使用。如果你关心文件大小，可以考虑优化这些未使用的数据。

这个报告也确认了你遇到的问题不是由文件损坏或不符合 glTF 规范造成的，可能需要在加载或渲染过程中进一步调查问题的原因。

为什么部署之后，dracoloader失效了？也就是模型加载不成功

# canvas绘图

参考教程：[跟着月影学可视化](https://time.geekbang.org/column/intro/100053801)

相关教程：[csdn](https://blog.csdn.net/kaimo313/category_9555093.html)



# mapbox仓库学习

## 资源

仓库地址：[https://github.com/mapbox/mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js)

- [Getting started with Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/overview/)
- [Tutorials](https://docs.mapbox.com/help/tutorials/#web-apps)
- [API documentation](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Examples](https://docs.mapbox.com/mapbox-gl-js/examples/)
- [Style documentation](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
- [Mapbox Vector Tile Specification](https://github.com/mapbox/vector-tile-spec)

一些工具

- [location helper](https://labs.mapbox.com/location-helper/#3/56.56/-85.76): 自动选择合适的位置，获取到对应的mapbox参数
- [cartogram](https://apps.mapbox.com/cartogram/): 根据图片符号化地图

## React中用mapbox-简单入门

实现教程：[https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/)

tailwindcss官网：[https://www.tailwindcss.cn/docs/border-radius#basic-usage](https://www.tailwindcss.cn/docs/border-radius#basic-usage)

`npm install mapbox-gl`

## slide story

官网模板：[git@github.com](mailto:git@github.com):mapbox/storytelling.git

把本科做的乳业叙事迁移成一个demo；

1. 基本结构
2. config和points的常量配置
3. 添加滚动逻辑
4. `npm install scrollama intersection-observer --save`
5. 添加地图上的点交互
6. 添加echarts图表





官网看到了“get started”；  
与style有关的：  
[https://docs.mapbox.com/mapbox-gl-js/style-spec/](https://docs.mapbox.com/mapbox-gl-js/style-spec/)  
[https://docs.mapbox.com/help/glossary/style-url/](https://docs.mapbox.com/help/glossary/style-url/)  
[https://docs.mapbox.com/help/glossary/tileset/](https://docs.mapbox.com/help/glossary/tileset/)  
[https://www.mapbox.com/blog/standard-core-style](https://www.mapbox.com/blog/standard-core-style)  
[https://www.mapbox.com/maps/streets](https://www.mapbox.com/maps/streets)



部署发布

需要打开remote的github仓库，确保自己登陆进去了，然后再push新的进去；

````
npm run build
npm run deploy
// 右键open with live browser，打开验证下效果
git add .
git commit -m "0500"
git push origin master
git push origin --delete gh-pages
// git branch -D gh-pages
git subtree push --prefix=dist origin gh-pages
````