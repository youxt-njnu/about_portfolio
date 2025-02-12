# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

# 流程

[threejs教程](https://juejin.cn/post/7145064095178293285)

[helloworld的代码](https://blog.csdn.net/fackyoufack/article/details/127249096)

npm create vite ./

vue, javascript

npm i

npm i three

npm i @types/three -D

npm i dat.gui @types/dat.gui

(教程：https://juejin.cn/post/7201521440611532857)

1. **`npm i`**：这是 `npm install`的简写，用于安装指定的npm包。
2. **`dat.gui`**：这是要安装的主要npm包之一，`dat.gui`是一个轻量级的图形用户界面库，通常用于控制和调整JavaScript代码的参数，常见于图形和视觉项目中。
3. **`@types/dat.gui`**：这是TypeScript的类型定义包。由于TypeScript是JavaScript的一个超集，它添加了类型系统和其他功能。`@types/dat.gui`包含了 `dat.gui`库的类型声明，使得TypeScript能够理解和检查使用 `dat.gui`时的类型信息。
4. **`--save`**：这个选项指示npm将这些包作为项目依赖保存在 `package.json`文件中。不过，在npm的较新版本中，`--save`已成为默认行为，因此通常不再需要显式指定。
5. **`--registry=https://registry.npm.taobao.org`**：这个选项指定了npm包的下载源。默认情况下，npm从其官方注册表下载包，但这里指定使用淘宝的npm镜像，这通常是在中国大陆使用的，因为它提供了更快的访问速度和更稳定的服务。

> 传入给gui的是一个数组，里面是对象，对象的值可以是函数
>
> **// gui.add(控件对象变量名，对象属性名，其它参数)，控制字符类型或数字**
> **gui.**add**(ctrls, **'name'**);**
> **// 缩放区间[0,100],变化步长10**
> **gui.**add**(ctrls, **'speed'**, **0**, **100**, **10**);**
> **// 创建一个下拉选择**
> **gui.**add**(ctrls, **'test'**, { 低速: **0.005**, 中速: **0.01**, 高速: **0.1** }).**name**(**'转速'**);**
> **gui.**add**(ctrls, **'test2'**, [**'低速'**, **'中速'**, **'高速'**]).**name**(**'转速2'**);**
> **//  创建按钮**
> **gui.**add**(ctrls, **'cb'**).**name**(**'按钮'**);**
> **gui.**add**(ctrls, **'gender'**).**name**(**'性别'**);**
> **// 控制颜色属性**
> **gui.**addColor**(ctrls, **'color1'**);**
> **// 通过name可设置别名**
> **gui.**addColor**(ctrls, **'color2'**).**name**(**'颜色2'**);**
> **// 创建一个Folder**
> **const** folder = gui.**addFolder**(**'颜色组'**);
> **folder.**addColor**(ctrls, **'color3'**);**
> **folder.**addColor**(ctrls, **'color4'**);**
> **//可以通过onChange方法来监听改变的值，从而修改样式**
> **gui.**addColor**(ctrls, **'color2'**).**onChange**(callback);**

❓我无法理解的一个问题：
就是跟联代码里的很多相机、模型、光照的例如位置、强度、大小、旋转这些参数的设置，真的是自己一点点试出来的不？ —— three js editor, blender里面可以尝试，或者是dat.gui

包括一些简单的鼠标动作和动画，是否也是试出来，或者是参考已有代码的参数？

# vue及js知识点补充

## ref

```vue
<template>
  <div ref="elementOne" class="first-class">
    This is the first element.
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const elementOne = ref(null);

onMounted(() => {
  if (elementOne.value) {
    console.log('Element One:', elementOne.value); // 访问元素
  }
});
</script>

```

* **名称匹配：** `ref` 在模板中的值和 `<script setup>` 中声明的变量名必须完全匹配。这是 Vue 内部如何将 DOM 元素和相应的响应式引用关联起来的机制。
* **生命周期：** 只有在组件完全挂载后（即在 `onMounted` 钩子内），这些 `ref` 引用的值才会指向实际的 DOM 元素。在此之前，它们的值都是 `null`。
* **动态处理：** 如果你需要处理多个通过类似 `v-for` 动态生成的元素，你可能需要使用动态的 `ref` 名称。这通常通过在 `ref` 中绑定到循环的项上的唯一属性（如 `ref="element-${index}"`）来实现

## let和const

在使用 ES6 语法编写 Vue 或其他 JavaScript 代码时，`const`、`let` 和 `var` 的使用取决于变量值是否会被重新赋值以及变量的作用域需求。以下是这三种声明方式的一些最佳实践指南：

### 使用 `const`

- **不变的常量**：对于不打算更改的值，使用 `const`。这包括组件的props默认值、配置项、引入的库等。
- **组件实例**：在 Vue 中，通常会使用 `const` 来声明新的 Vue 实例或其他库的实例，因为这些实例不应被重新赋值。
- **引入模块**：当使用 ES6 的模块系统（如 `import`/`export`）时，引入的模块应该被声明为 `const`，因为它们不会被重新赋值。

### 使用 `let`

- **块级作用域变量**：当你需要一个在块级作用域内（如循环、条件语句内）生存的变量，并且该变量的值会改变时，使用 `let`。
- **循环计数器**：在 `for` 循环中，计数器应该使用 `let` 声明，因为它的值会在每次迭代时更改。
- **Vue 中的响应式数据**：在 Vue 组件的 `data` 函数中，可以使用 `let` 来声明那些会改变的响应式数据，尽管这通常是通过返回一个对象来实现，而不是直接使用 `let`。

### 使用 `var`（不推荐）

- **函数作用域变量**：尽管 `var` 在 ES6 出现之前广泛使用，用于声明一个函数作用域或全局作用域的变量，但现在建议尽可能避免使用 `var`，因为 `let` 和 `const` 提供了更精确的作用域控制和更好的代码可读性。
- **全局变量**：如果确实需要声明一个全局变量，可以使用 `var`，但这种情况应当尽量避免，因为全局变量会增加代码间的耦合度和潜在的命名冲突。

### 总结

- 尽量使用 `const` 来声明变量，除非知道变量的值需要改变。
- 当变量值需要改变时，使用 `let` 来代替 `var`，因为 `let` 有更好的作用域限制，可以减少变量污染和意外修改的风险。
- 尽可能避免使用 `var`，以提高代码的可维护性和避免潜在的作用域问题。

在 Vue 项目中遵循这些最佳实践可以帮助你写出更清晰、更易维护的代码。

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
- **`.observe()` 方法**：这个方法用于开始观察一个元素。在这里，它观察一个类名为 `.second` 的元素。当这个元素的可视状态发生变化，且满足设定的阈值时，将触发上面定义的回调函数。

使用 `IntersectionObserver` 相比传统的滚动事件监听，可以大大减少对性能的影响，因为浏览器可以优化对交叉状态的检测，无需在每次滚动事件发生时执行复杂的计算。

## `window.scroll`

`window.scroll(0, 0)` 是 JavaScript 中的一个方法调用，用于将浏览器窗口或标签页的滚动位置设置到页面的最顶部。这里的两个参数 `(0, 0)` 分别表示水平和垂直方向的滚动位置。

- 第一个参数 `0` 表示在水平方向上的滚动距离。在这个例子中，`0` 意味着页面将滚动到最左边。
- 第二个参数 `0` 表示在垂直方向上的滚动距离。在这个例子中，`0` 意味着页面将滚动到最顶部。

因此，调用 `window.scroll(0, 0)` 会使得页面滚动到左上角，即页面的起始位置。这个方法经常在需要将用户的视图重置到页面顶部的情况下使用，比如在用户点击“返回顶部”按钮时。

## 动画位移

```
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

### deltaTime

在你的 `tick()` 函数中，`deltaTime` 代表从上一帧到当前帧经过的时间差，以毫秒为单位。这个参数通常用于动画和物理计算中，以确保不同性能的设备上动画的流畅度和同步性。然而，在你的示例中，看起来 `deltaTime` 没有从 `requestAnimationFrame()` 中自动获取，因为 `requestAnimationFrame()` 的回调函数通常只接受一个参数，表示当前时间戳。如果你需要使用 `deltaTime`，你必须自己计算它，通常是通过在外部定义一个变量来记录上一帧的时间，并在每帧更新这个时间。

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

如果你发现在浏览器端调试时，除了第一次 `deltaTime` 是 `undefined`，其他时候都有数值，而你的代码没有明显的地方在计算 `deltaTime`，这很可能是因为 `requestAnimationFrame()` 本身的行为。

`requestAnimationFrame()` 通常接收一个回调函数，并自动向该回调函数传递一个参数：当前的时间戳（`timestamp`）。这个时间戳是表示调用回调时的当前时间（通常以毫秒为单位，相对于某个固定时间点）。这意味着，如果你的 `tick()` 函数接收这个参数并命名为 `deltaTime`，实际上它接收的是一个时间戳，而非真正的时间差值。

让我们看看可能的代码行为：

```javascript
const tick = (deltaTime) => {  // 这里 deltaTime 实际上是 timestamp
  // 此处 deltaTime 是 timestamp，你的逻辑可能误以为是时间差
  console.log(deltaTime); // 这将输出时间戳，除了第一次可能是 undefined

  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
```

在这个例子中，除了第一次调用可能因为初始状态未设定而是 `undefined`，其他所有调用的 `deltaTime` 都会有值（实际是时间戳）。如果你没有设置初始调用的方式（例如，直接调用 `tick()` 而非 `requestAnimationFrame(tick)`），那么第一次调用中的 `deltaTime` 可能是 `undefined`。这种情况通常发生在直接调用函数而不是由 `requestAnimationFrame()` 触发时。

如果你确实需要在每帧计算两帧之间的时间差（`deltaTime`），你需要手动计算它，如下所示：

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

在这个修改后的例子中，`deltaTime` 现在是正确的两帧之间的时间差，而不是一个单独的时间戳。

### `clock.getElapsedTime()`

`clock.getElapsedTime()` 获取的是从创建 `clock` 对象到调用该方法时的总经过时间，以秒为单位。这个值通常用于根据时间来更新动画状态，使动画不受帧率的影响，从而保持平滑运动

## canvas

在HTML5中，当你通过 `canvas.getContext('2d')`创建一个二维渲染上下文（2D rendering context）时，会得到一个用于绘制形状、文本、图像等的二维画布。这个画布遵循以下坐标系规则：

1. **原点（0,0）**：二维坐标系的原点位于画布的左上角。
2. **X轴方向**：从左到右，值逐渐增加。即，当你向右移动时，X坐标增大。
3. **Y轴方向**：从上到下，值逐渐增加。这与传统的数学坐标系（其中Y轴向上增加）有所不同。在Canvas 2D中，向下移动时，Y坐标增大。

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

在HTML5 Canvas API中，createRadialGradient()方法用于创建一个径向渐变。这个方法接受六个参数，分别定义了两个圆，渐变效果会从一个圆的边界向另一个圆的边界过渡。具体参数的含义如下：
x0：第一个圆的圆心的x坐标。
y0：第一个圆的圆心的y坐标。
r0：第一个圆的半径。如果为0，则渐变从一个点开始。
x1：第二个圆的圆心的x坐标。
y1：第二个圆的圆心的y坐标。
r1：第二个圆的半径。

在HTML5 Canvas API中，fillRect()方法用于绘制一个填充的矩形。这个方法接受四个参数，用来定义矩形的位置和大小：
x：矩形左上角的x坐标。
y：矩形左上角的y坐标。
width：矩形的宽度。
height：矩形的高度

## 变换

[markdown+latex公式](https://blog.csdn.net/weixin_42782150/article/details/104878759)

### 旋转

要计算一个点 \( p(x, y) \) 绕另一个点 \( mid(a, b) \) 旋转 \( q \) 度后的新坐标，可以使用以下步骤和公式：

**将角度从度转换为弧度**：

$\text{radians} = q \times \frac{\pi}{180}$

**将原点移动到旋转中心**：

$x' = x - a$

$y' = y - b$

**应用旋转矩阵**：
旋转矩阵 \( R \) 用于旋转点，并定义为：

$$
\left[
\begin{matrix}
\cos(radians) & -\sin(radians) \\
\sin(radians) & \cos(radians)
\end{matrix}
\right]
$$

应用这个旋转矩阵到 ( (x', y') ) 上：

$$
\begin{bmatrix}
x'' \\
y'' 
\end{bmatrix}
=
\begin{bmatrix}
\cos(\text{radians}) & -\sin(\text{radians}) \\
\sin(\text{radians}) & \cos(\text{radians})
\end{bmatrix}
*
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
$$

这意味着：

$$
x'' = x' \cos(\text{radians}) - y' \sin(\text{radians}) \\
y'' = x' \sin(\text{radians}) + y' \cos(\text{radians})
$$

**将旋转后的点平移回原始位置**：

$$
x'' = x'' + a \\
y'' = y'' + b
$$

综合上述步骤，旋转后点 \( p(x, y) \) 绕点 \( \text{mid}(a, b) \) 旋转 \( q \) 度后的新坐标 \( (x'', y'') \) 是：

$$
x'' = (x - a) \cos(\text{radians}) - (y - b) \sin(\text{radians}) + a \\
y'' = (x - a) \sin(\text{radians}) + (y - b) \cos(\text{radians}) + b
$$

这个结果给出了绕任意点旋转的完整表达式。

# CSS

```
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

这里的选择器 `.lds-roller div` 指的是所有类名为 `lds-roller` 的元素内部的 `div` 元素。对这些 `div` 元素应用以下样式和动画。

```css
animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
```

- **动画名称 (`lds-roller`)**：这是动画的关键帧名称，它引用了在某处定义的 `@keyframes lds-roller`，该关键帧定义了动画的开始、结束状态以及可能的中间状态。
- **持续时间 (`1.2s`)**：动画从开始到结束的时长为 1.2 秒。
- **缓动函数 (`cubic-bezier(0.5, 0, 0.5, 1)`)**：这是一个贝塞尔曲线，定义了动画的加速度曲线。这个特定的曲线意味着动画开始时加速度较快，结束时减速。这样可以让动画看起来更自然、流畅。
- **重复次数 (`infinite`)**：动画会无限次重复。

```css
transform-origin: 40px 40px;
```

- **变换原点 (`transform-origin`)**：这个属性定义了元素变形的原点。在这个例子中，原点被设置在了元素的 `40px 40px` 的位置，通常意味着元素的变换（如旋转）将围绕这个点进行。这个设置有助于创建环绕中心点旋转的效果，特别是当动画效果是旋转时。

综上所述，这段 CSS 为 `.lds-roller` 内部的每个 `div` 应用了一个持续 1.2 秒、无限重复的平滑动画，该动画的具体行为由 `@keyframes lds-roller` 定义。动画的变换原点设置在每个 `div` 的 `40px 40px` 处，使得旋转动画能围绕该点进行，创建出一个加载动画的视觉效果。

为了完整地实现这个动画效果，你还需要定义相应的 `@keyframes lds-roller` 关键帧动画，指明动画开始、结束时，以及可能的中间步骤的具体样式变化。

```
loadingCover.style.setProperty(
              'transform',
              `translate(0,${yPosition.y}%)`
            )
```

在这段代码中，`loadingCover.style.setProperty` 方法被用于动态修改 `loadingCover` 元素的 CSS `transform` 属性。这个方法允许你直接通过 JavaScript 更改元素的样式，其中 `setProperty` 接受两个参数：第一个参数是要修改的 CSS 属性名称，第二个参数是该属性的新值。

- **第一个参数 (`transform`)**: 指定了要修改的 CSS 属性，这里是 `transform`。`transform` 属性允许你对元素进行变形，比如旋转、缩放、移动（平移）或倾斜。
- **第二个参数 (`translate(0,${yPosition.y}%)`)**: 是 `transform` 属性的新值，这里使用了 `translate` 函数来移动元素。`translate` 函数接受两个参数，分别对应 X 轴和 Y 轴的移动距离。在这个例子中，`translate(0,${yPosition.y}%)` 表示在 X 轴方向上不移动（`0`），在 Y 轴方向上移动 `${yPosition.y}%` 的距离，其中 `${yPosition.y}` 是一个动态计算的值，表示移动距离的百分比。使用百分比单位可以根据元素大小的不同而相对地移动不同的距离。

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

## svg图标绘制

```html
<svg width="26"
         height="26"
         viewBox="0 0 48 48"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z"
            fill="none"
            stroke="#FFF"
            stroke-width="4" />
      <path d="M24 19H12V29H24V19Z"
            fill="none"
            stroke="#FFF"
            stroke-width="4"
            stroke-linejoin="bevel" />
      <path d="M35 18L30 22V26L35 30V18Z"
            fill="none"
            stroke="#FFF"
            stroke-width="4"
            stroke-linejoin="bevel" />
    </svg>
```

这段代码是一个SVG图形的XML表示，用于定义一个简单的图标，其中包含两个几何形状：

1. **外部矩形框**：

   - `width="26"` 和 `height="26"` 设置图标的宽度和高度为26单位。
   - `viewBox="0 0 48 48"` 定义了一个48x48单位的视图框架，这意味着图形的绘制将在这个框架内进行。
   - 第一个 `<path>` 元素绘制了一个边长为48单位，边框粗细为4单位的大矩形。`fill="none"` 指明矩形内部不填充颜色，`stroke="#FFF"` 设置边框颜色为白色。
   - `xmlns`：“XML 命名空间”（XML Namespace），这个属性确保 SVG 代码在 XML 格式中正确解析和使用。具体来说，`xmlns="http://www.w3.org/2000/svg"` 这个属性告诉浏览器或任何处理这段代码的解析器，该文件应该按照由 W3C（万维网联盟）定义的 SVG 1.1 规范来解析
2. **内部矩形**：

   - 第二个 `<path>` 元素绘制了一个位于(12, 19)开始，到(24, 29)结束的矩形，边框也是白色，粗细为4单位，使用斜角连接(stroke-linejoin="bevel")使得角部位更加平滑。
3. **倾斜的箭头形状**：

   - 第三个 `<path>` 元素绘制了一个简化的箭头形状，从(30, 22)开始，到(35, 26)结束，然后再回到(30, 30)，形成一个指向右侧的箭头。这同样使用了白色边框，粗细为4单位。

整体上，这个SVG图形设计为一个含有一个大矩形框架、一个内部矩形和一个箭头形状的图标，通常用于用户界面的视觉元素，如按钮或指示图标。

---

`d` 属性在 SVG 的 `<path>` 元素中用来定义路径的形状和位置，它是一个非常关键的属性，包含一系列的命令和参数来指定路径的绘制方式。下面是对这个属性中使用的各种命令的解释：

1. **`M` (moveto)**：此命令用于将画笔移动到新的起始位置。不绘制任何内容，只改变起点位置。例如，`M24 19` 表示将起点移动到 (24, 19)。
2. **`H` (horizontal lineto)**：此命令用于从当前点绘制一条水平线到指定的 x 坐标。例如，如果当前点为 (12, 19)，则 `H24` 表示从 (12, 19) 绘制一条水平线到 (24, 19)。
3. **`V` (vertical lineto)**：此命令用于从当前点绘制一条垂直线到指定的 y 坐标。例如，`V29` 表示从当前点绘制一条垂直线到 y 坐标为 29 的位置。
4. **`L` (lineto)**：此命令用于从当前点绘制一条直线到新的指定位置。例如，`L30 22` 表示从当前点画一条直线到点 (30, 22)。
5. **`Z` (closepath)**：此命令用于关闭当前的路径，即从当前点绘制一条直线回到路径的起始点。


`<path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z"`，路径定义包括了多个命令，用以绘制一个矩形，并在四个角落进行圆角处理。下面是对这个路径命令的详细解释：

1. **`M39 6`**: 这是一个 "moveto" 命令，用于将起始点移动到 (39, 6)。这设置了接下来路径绘制的起点。
2. **`H9`**: 这是一个 "horizontal lineto" 命令，从当前位置画一条水平线到 x 坐标为 9 的位置。
3. **`C7.34315 6 6 7.34315 6 9`**: 这是一个 "cubic Bézier curve" 命令。在 SVG 中，`C` 命令需要三组坐标点：

   - 第一组 (7.34315, 6) 是第一个控制点，用于控制曲线开始的方向和弧度。
   - 第二组 (6, 7.34315) 是第二个控制点，控制曲线结束的方向和弧度。
   - 第三组 (6, 9) 是曲线的结束点。

   这段曲线用于创建左上角的圆角。
4. **`V39`**: "vertical lineto" 命令，从当前位置画一条垂直线到 y 坐标为 39 的位置。
5. **`C6 40.6569 7.34315 42 9 42`**: 又一个 "cubic Bézier curve" 命令，用于创建左下角的圆角。与之前的 Bézier 曲线类似，这里也定义了两个控制点和一个结束点。
6. **`H39`**: "horizontal lineto" 命令，从当前位置画一条水平线到 x 坐标为 39 的位置。
7. **`C40.6569 42 42 40.6569 42 39`**: 又一个 "cubic Bézier curve" 命令，这次用于创建右下角的圆角。
8. **`V9`**: "vertical lineto" 命令，从当前位置画一条垂直线上升到 y 坐标为 9 的位置。
9. **`C42 7.34315 40.6569 6 39 6`**: 最后一个 "cubic Bézier curve" 命令，用于创建右上角的圆角。
10. **`Z`**: 这个命令用于关闭路径，即绘制一条直线从当前位置回到起始点 (39, 6)，并结束路径绘制。

总结来说，这段路径描述了一个带有圆角的矩形框架，每个角落都通过贝塞尔曲线(C)命令进行了圆滑处理，使矩形的角看起来更加圆润。这种绘制技术在创建用户界面组件如按钮或卡片背景时非常常见。

(下面的不一定画的对，但可以基本理解理解)

![](https://s2.loli.net/2024/06/09/NYPfhKitzloOLI3.png)


# 报错

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

* `clientWidth` 和 `clientHeight` 给你提供了元素的实际内容区域的尺寸，这对于Three.js中确保相机的长宽比与渲染容器匹配是非常重要的。
* 这些属性反映了 `<div>`容器当前的大小，包括任何由于页面布局或样式动态变化导致的尺寸更改。
* 如果使用 `width` 和 `height`，你可能会得到 `undefined`，因为这不是标准的 `div` 属性，这会导致你的相机设置不正确。

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

需要将模型放到public目录里面，同时vite.config.js的配置里加入：`assetsInclude: ['**/*.glb', '**/*.mtl', '**/*.gltf'],`

---

如果你在使用 Vite 和 Vue，并且看到网络请求的状态码为 `304 Not Modified`，这意味着浏览器已经缓存了 `earth.obj` 文件，并且服务器告诉浏览器自从上次请求以来文件没有被修改，所以浏览器可以使用本地缓存的版本。

但是，如果你遇到 `THREE.OBJLoader: Unexpected line: "<!doctype html>"` 的警告，那说明 OBJLoader 实际上解析到的是一个 HTML 文件，而不是 OBJ 文件。这通常说明在请求OBJ文件时发生了错误，服务器返回了一个HTML错误页面而不是文件内容。

由于你看到的是304状态码，而不是200或404，这表明可能存在以下情况：

1. **Vite的静态文件处理** ：Vite在开发模式下可能对静态资源的处理有所不同，确保 `earth.obj`文件放在了 `public`目录下，而不是 `src`目录下。在Vite中，`public`目录下的文件不会被处理，可以直接访问。
2. **缓存问题** ：可能浏览器缓存了错误的内容。尝试清除浏览器缓存，或者在开发者工具中禁用缓存（在Network标签页，勾选Disable cache），然后再次加载页面。
3. **错误页面** ：尽管状态码为304，但是如果服务器在之前的请求中返回了错误，浏览器可能缓存了错误页面。检查Vite服务器的配置或控制台输出以确定是否有错误。
4. **正确的MIME类型** ：Vite应该自动为 `.obj`文件提供正确的MIME类型，但是如果有什么配置不当，可能需要手动检查。

## tween的销毁

```
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

### `tween.getId is not a function` 错误

这个错误提示表明，尝试调用的 `getId` 方法不存在于 `tween` 对象上。在你的代码中，错误来源于 `TWEEN.remove(this)` 这行代码。这里的问题是 `this` 在 `onComplete` 回调函数中不指向你期望的 tween 对象。在 ES6 的箭头函数中，`this` 关键字并不会绑定到外围的上下文，而是继承自它所在的上一层作用域。这意味着这里的 `this` 不是指向 Tween 实例，而可能是指向了全局对象或者 `undefined`（严格模式下）。

#### 解决方案

为了正确地移除 tween，你可以直接引用 tween 实例本身而不是使用 `this`。不过，从你的代码来看，并没有直接的引用。通常，如果你需要在回调中引用 tween，可以事先将其存储在一个变量中。但 `TWEEN.js` 库通常自我管理所有 tween 的生命周期，包括它们的添加和移除，所以手动调用 `remove` 方法可能并不是必须的。如果你确实需要移除 tween，考虑调整你的代码逻辑，避免在这种上下文中使用 `this`。

```
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

```
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

`Cannot read properties of null (reading 'removeChild')` 错误

> 这个错误表明你尝试从一个 `null` 对象中调用 `removeChild` 方法。这通常发生在尝试访问或修改已经被移除或未被正确初始化的 DOM 元素时。在你的代码中，这个问题出现在尝试移除 `loadingCover` 元素的代码块中。

#### 解决方案

在尝试移除 `loadingCover` 之前，确保它存在。这个问题可能出现是因为 `loadingCover` 为 `null`，意味着 `document.querySelector('#loading-text-intro')` 没有找到匹配的元素。这可能是因为元素的 ID 错误，或者这段代码执行的时候，对应的 DOM 元素还没有加载到页面上。

你可以通过在尝试访问或修改元素之前检查它是否存在来解决这个问题：

```
if (loadingCover && loadingCover.parentNode) {
    loadingCover.parentNode.removeChild(loadingCover);
}
```

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

> https://blog.csdn.net/iefreer/article/details/131113390
>
> npm i draco3d
>
> npm i draco3dgltf
>
> https://segmentfault.com/q/1010000043706931
>
> 原因：`是draco版本与项目安装的three版本不对`
> 解决方法：以vite脚手架为例 `node_modules\three\examples\jsm\libs\` 下的darco文件夹拷贝到 `public\<span> </span>`下，之后报错就解决了。

### DRACO验证

检查一个模型是否包含了 Draco 压缩的几何数据，

- **使用 glTF Validator**：你可以使用 [glTF Validator](https://github.khronos.org/glTF-Validator/) 来检查你的 `.glb` 文件。这是一个由 Khronos Group 提供的工具，专门用于验证 glTF 文件的正确性。如果你的文件使用了 Draco 压缩，验证结果会显示相关信息。
- **查看文件内容**：高级用户可以直接查看 GLB 文件的内容（例如，使用十六进制编辑器），寻找 Draco 压缩的标记或结构。这种方法需要对 GLB 文件格式和 Draco 压缩有较深的了解。

```
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

## 报错cannot read properties of undefined(reading 'replace')

```
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

一种可能是材质用错了：
原来：`const material = new Three.Material({})`
改之后：`const material = new Three.PointsMaterial({})`

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

我有一个vue3+threejs的项目， import textFragmentShader from './Shader/text.frag.glsl'
import textVertexShader from './Shader/text.vert.glsl' const textGeometry = new Three.PlaneGeometry(1, 1, 32, 32)
  const textMaterial = new Three.ShaderMaterial({
    vertexShader: textVertexShader,
    fragmentShader: textFragmentShader,
    side: Three.DoubleSide,
  })，我的text.vert.glsl里是这些内容attribute vec3 aPosition;
varying vec2 vUv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec2 uv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
  vUv = uv;
}，报错为Uncaught SyntaxError: Unexpected identifier 'vec3'，为什么

---

在基于 Vite 的 Vue 3 项目中，你需要使用适当的插件来处理 `.glsl` 文件，因为 Vite 本身不自带处理这种文件类型的能力。你可以使用 `vite-plugin-glsl` 插件来帮助你导入 `.glsl` 文件作为字符串。

下面是如何在你的 Vite 配置中添加对 `.glsl` 文件的支持的步骤：

1. 安装 `vite-plugin-glsl`：

   ```bash
   npm install vite-plugin-glsl
   ```
2. 在你的 Vite 配置文件中（通常是 `vite.config.js` 或 `vite.config.ts`）添加插件：

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

这样配置后，当你导入 `.glsl` 文件时，`vite-plugin-glsl` 将自动处理它们，确保 GLSL 代码被作为字符串正确导入，避免 JavaScript 解析错误。

确保在你的 Vue 组件或 JavaScript 文件中按照下面的方式导入 `.glsl` 文件：

```javascript
import textFragmentShader from './Shader/text.frag.glsl'
import textVertexShader from './Shader/text.vert.glsl'
```

这些文件现在应该会被正确地作为字符串导入，可以直接使用在 Three.js 的 `ShaderMaterial` 中。这应该解决你遇到的关于 GLSL 代码导入的问题。

## 如果物体shader写完不出现

仔细核对shader代码，特别是一些默认的，例如position

## 报错texture not found, .r 不存在

```
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

https://thebookofshaders.com/glossary/?search=texture2D

## 报错

保证路径没问题，之后：

1. 如果你的开发服务器运行在 `http://localhost:3000`，则访问 `http://localhost:3000/fonts/Abduction2002_Regular.json` 看是否能看到文件内容。
2. 打开浏览器的开发者工具，查看“网络(Network)”标签页。刷新页面并检查字体文件的请求。观察请求是否成功，返回的状态码是什么，以及返回的响应内容。

状态码 `304 Not Modified` 是一个正常的响应，表示客户端请求的资源自上次请求后没有修改，因此不需要重新传输数据，可以直接使用缓存中的数据。这通常是浏览器和服务器之间的有效缓存机制。然而，如果你期望看到一个新的文件或者修改后的文件，这可能表明你需要清理缓存或确保服务器正确地发送新文件。

## 报错Cannot read properties of undefined (reading 'addEventListener') at new FirstPersonControls

我是这段代码let firstPersonControl = new FirstPersonControls(camera)
  firstPersonControl.movementSpeed = 70
  firstPersonControl.lookSpeed = 0.15
  firstPersonControl.noFly = true
  firstPersonControl.lookVertical = false，

报错为Uncaught TypeError: Cannot read properties of undefined (reading 'addEventListener')
    at new FirstPersonControls (three_examples_jsm_controls_FirstPersonControls__js.js?v=8c474695:209:21)
    at loadModel (MultiMedia.vue:103:28)

1. **确保 `camera` 已经被正确初始化** ：在你调用 `FirstPersonControls` 构造函数之前，确保 `camera` 对象已经被创建并正确配置。
2. **确保传入正确的参数** ：`FirstPersonControls` 的构造函数通常需要两个参数：`camera` 和 `domElement`。`domElement` 通常是渲染器的 `domElement`，这是必须的，因为控件需要监听这个 DOM 元素上的鼠标和键盘事件。
3. **修改代码** ：你可能需要将 `FirstPersonControls` 的调用方式修改为传入 `renderer.domElement`，例如：

```
let firstPersonControl = new FirstPersonControls(camera, renderer.domElement);
firstPersonControl.movementSpeed = 70;
firstPersonControl.lookSpeed = 0.15;
firstPersonControl.noFly = true;
firstPersonControl.lookVertical = false;
```

1. **检查代码的执行顺序** ：

* 确保在调用 `FirstPersonControls` 之前 `renderer` 和 `camera` 都已经被创建。如果 `renderer` 或 `camera` 在你尝试创建控制器时还没初始化，就会出现这个错误。
* 确保 `renderer.domElement` 在你尝试创建 `FirstPersonControls` 时已经存在于 DOM 中。

## 报错Uncaught TypeError: Failed to execute 'linearRampToValueAtTime' on 'AudioParam'

Uncaught TypeError: Failed to execute 'linearRampToValueAtTime' on 'AudioParam': The provided float value is non-finite.
    at AudioListener.updateMatrixWorld (chunk-3F2VCGLV.js?v=8c474695:28128:26)
    at PerspectiveCamera.updateMatrixWorld (chunk-3F2VCGLV.js?v=8c474695:4725:15)
    at PerspectiveCamera.updateMatrixWorld (chunk-3F2VCGLV.js?v=8c474695:7635:11)
    at Scene.updateMatrixWorld (chunk-3F2VCGLV.js?v=8c474695:4725:15)
    at WebGLRenderer.render (chunk-3F2VCGLV.js?v=8c474695:17911:15)
    at tick (MultiMedia.vue?t=1716520442438:145:12)

https://discourse.threejs.org/t/solved-audioparam-error-with-audiolistener/12758

在某些情况下，firstPersonControl是未定义的，要注意threejs里的执行顺序，可以把对control的定义放到initThree()里

此外，重要的是：

在tick()里面需要设置firstPersonControl的更新频率

```
const clock = new Three.Clock()
const tick = () => {
  renderer.render(scene, camera)
  // controls.update()
  // checkCamera(camera)
  firstPersonControl.update(clock.getDelta())
  window.requestAnimationFrame(tick)
}
```

引入 `clock.getDelta()` 并将其用于 `firstPersonControl.update()` 能够解决问题，这可能与如何管理时间和帧率相关。让我解释一下这里面的机制。

在 Three.js 中，`THREE.Clock` 实例的 `getDelta()` 方法返回自上次调用以来经过的秒数。这个函数通常用于动画和物理计算中，以确保无论帧率如何变化，动画和移动的速度都保持一致。

`FirstPersonControls` 可能在其 `update()` 方法内部需要一个时间增量（delta time），来计算自上一帧以来相机的位移和旋转。这个时间增量帮助控制相机的平滑移动，防止在不同的帧率下移动速度不一致。

如果没有提供合适的时间增量，`FirstPersonControls` 在计算时可能使用了默认或错误的时间值，导致计算结果出现非法值（如 NaN）。这可能是因为某些内部状态或计算依赖于每帧的变化量，而这个变化量如果没有正确计算，就会导致错误。

通常，在动画循环中使用 `clock.getDelta()` 如下：

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

通过提供一个正确的时间增量给 `FirstPersonControls.update()`，你帮助它更准确地处理内部的时间和移动计算，避免了它在计算过程中产生非有限数值。这是一个常见的实践，特别是在涉及实时交互和动画的复杂三维场景中。
