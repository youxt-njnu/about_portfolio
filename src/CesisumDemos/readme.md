# 实战项目

[Resium](https://resium.reearth.io/)

**VScode项目文件夹；**

**Google网页：**[Resium官方文档](https://resium.reearth.io/components/Scene)，[Resium官方案例](https://resium.reearth.io/examples/?path=/story/scene--basic)，[cesiumAPI文档](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html?classFilter=clock)，[cesium官方案例](https://sandcastle.cesium.com/?src=3D%20Tiles%201.1%20CDB%20Yemen.html&label=3D%20Tiles)

```
npm create vite@latest ./
.....
npm install
npm run dev
---------
npm install react-router-dom react-query
npm install --save cesium resium
npm install --save-dev vite-plugin-cesium

```

Then edit `vite.config.js`:

```
......
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cesium()]
})
```

## 报错处理

**hook-exec.js:1 Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.**

> [https://community.cesium.com/t/cant-run-scripts-in-infobox/11956/2](https://community.cesium.com/t/cant-run-scripts-in-infobox/11956/2)
>
> [https://community.cesium.com/t/how-to-set-allow-scripts-permissions/23098](https://community.cesium.com/t/how-to-set-allow-scripts-permissions/23098)
>
> [https://blog.csdn.net/qq_40323256/article/details/128070129](https://blog.csdn.net/qq_40323256/article/details/128070129)
>
> **infoBox={false}**

**无法使用InfoBox来显示EntityDescription**

> [https://community.cesium.com/t/entity-description-not-displaying/16547/8](https://community.cesium.com/t/entity-description-not-displaying/16547/8)
>
> **把InfoBox改为true😭**

**模型引入问题**

RuntimeError {name: 'RuntimeError', message: `Failed to load model: ../assets/models/Parrot.glb\n…cted token '<', "<!doctype "... is not valid JSON`, stack: 'Original stack:\nOriginal stack:\nOriginal stack:\nSy…vite/deps/chunk-WUQKVDYH.js?v=8747cfcb:148104:19)'}

```jsx
  const options = [
    { text: 'Horse', url: "models/Horse.glb", height: 0 }
  ];
```

处理方式：

When files are located inside your src directory alongside your components, you need to import them so the bundler can process them and provide the correct public URL.

I will modify your code to import the models directly and use the resulting URLs.

```jsx
// Import the models from their relative paths
import horseModel from './models/Horse.glb';

  // Use the imported model variables in the options array
  const options = [
    { text: 'Horse', url: horseModel, height: 0 }
  ];
```

无效，无奈把模型放入public目录下，并且要注意加上baseUrl：

```jsx
  const baseUrl = import.meta.env.BASE_URL;

  const options = [
    { text: 'Bird', url: `${baseUrl}glb-models/bird.glb`, height: 0 },
    { text: 'Fox', url: `${baseUrl}glb-models/fox.glb`, height: 500 },
    { text: 'Horse', url: `${baseUrl}glb-models/horse.glb`, height: 200 }
  ];
```

部分模型放入后，报错为：

> installHook.js:1 [Cesium WebGL] Translated vertex shaderSource:
> // INITIAL HLSL BEGIN
> 
> #pragma warning( disable: 3556 3571 )
> struct _ProcessedAttributes
> {
>     float3 _positionMC;
>     float4 _color_0;
>     float2 _texCoord_0;
> };
> #pragma pack_matrix(row_major)
> struct rm__ProcessedAttributes
> {
>     float3 _positionMC;
>     float4 _color_0;
>     float2 _texCoord_0;
> };
> #pragma pack_matrix(column_major)
> struct std__ProcessedAttributes
> {
>     float3 _positionMC;
>     float4 _color_0;
>     float2 _texCoord_0;
> };

此外，弹出弹窗：
> An error occurred while rendering. Rendering has stopped.
> RuntimeError: Program failed to link.  Link log: Too many attributes (a_targetPosition_13)

现在是模型已经可以网络请求到并加载，在渲染过程中出现了问题；

可以通过[modelviewer](https://modelviewer.dev/editor/) 查看模型的问题；

所以现在是模型层面，而不是代码层面的问题了


**版本不兼容问题**
uncaught TypeError: Cannot read properties of undefined (reading 'recentlyCreatedOwnerStacks')
at ie.jsx (resium.js?v=22af1710:300:21)
at s (resium.js?v=22af1710:596:67)
at renderWithHooks (chunk-A6I3RWFE.js?v=ed9c51e4:12151:26)
at updateForwardRef (chunk-A6I3RWFE.js?v=ed9c51e4:14307:28)
at beginWork (chunk-A6I3RWFE.js?v=ed9c51e4:15914:22)
at HTMLUnknownElement.callCallback2 (chunk-A6I3RWFE.js?v=ed9c51e4:3674:22)
at Object.invokeGuardedCallbackDev (chunk-A6I3RWFE.js?v=ed9c51e4:3699:24)
at invokeGuardedCallback (chunk-A6I3RWFE.js?v=ed9c51e4:3733:39)
at beginWork$1 (chunk-A6I3RWFE.js?v=ed9c51e4:19733:15) 
at performUnitOfWork (chunk-A6I3RWFE.js?v=ed9c51e4:19166:20)ie.jsx @ resium.js?v=22af1710:300s @ resium.js?v=22af1710:596

* 原因：react版本是18的，但安装的resium是基于19的，需要进行降级

```bash
# 处理方式
npm uninstall resium
npm cache clean --force
npm install resium@18.2.0
```
**沙盒问题**

resium运行起来之后提示了Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.

这个错误通常不是由 Resium 本身直接引起的，而是 Cesium 在渲染某些 UI 元素（特别是 InfoBox，即点击实体弹出的气泡窗口）时，为了安全起见使用了受沙盒保护的 `<iframe>`，但由于浏览器策略或 Cesium 配置导致脚本执行被拦截。
在 2025 年，由于浏览器对安全策略（Sandbox/CORS）的持续收紧，请通过以下几种方式解决：
1. 禁用或配置 InfoBox（最常见原因）
Cesium 默认会在点击实体时弹出一个 about:blank 的内联框架（iframe）。如果你的环境对安全要求较高（如 Vite 的 HMR 环境），就会报错。
方案 A：直接禁用 InfoBox（如果不需要气泡框）
在 Resium 的 Viewer 组件上将 infoBox 设为 false：

`<Viewer infoBox={false} ... />`

方案 B：放宽沙盒限制（如果需要气泡框）
如果必须使用气泡框，可以通过 Viewer 的 infoBox 属性配置沙盒权限。Cesium 默认通常会处理，但在某些环境下失效，你需要手动确保 allow-scripts 存在：

```jsx
// Resium 中可以通过 cesiumElement 直接操作（在 useEffect 中）
useEffect(() => {
  if (viewerRef.current?.cesiumElement) {
    const infoBox = viewerRef.current.cesiumElement.infoBox;
    if (infoBox) {
      const iframe = infoBox.frame;
      // 确保沙盒包含 allow-scripts
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');
    }
  }
}, []);
```

2. 检查是否在 iframe 内部运行
如果你的整个 React 应用本身是被嵌套在另一个 `<iframe>` 里的（例如在 Storybook、微前端架构或某些低代码平台中）：
父级 iframe 必须给子级（你的应用）赋予权限：

```html
<iframe src="..." sandbox="allow-scripts allow-same-origin ..."></iframe>
```

## 代码转写

Cesium:

```jsx
const viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
  selectionIndicator: false,
  shadows: true,
  shouldAnimate: true,
});

function createModel(url, height) {
  viewer.entities.removeAll();

  const position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    height
  );
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );

  const entity = viewer.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });
  viewer.trackedEntity = entity;
}

const options = [
  {
    text: "Aircraft",
    onselect: function () {
      createModel(
        "../SampleData/models/CesiumAir/Cesium_Air.glb",
        5000.0
      );
    },
  },
  {
    text: "Drone",
    onselect: function () {
      createModel(
        "../SampleData/models/CesiumDrone/CesiumDrone.glb",
        150.0
      );
    },
  }
];

Sandcastle.addToolbarMenu(options);

```

Resium:

```js
import { Cartesian3, HeadingPitchRoll, Math, Transforms } from 'cesium';
import React, { useState } from 'react';
import { Entity, Viewer } from 'resium';

const TdtilesExt1 = () => {
  // const viewerRef = useRef(null); // 创建一个ref对象，用于获取Cesium的viewer对象，这样就可以对等获取到const viewer = new Cesium.Viewer('cesiumContainer')了
  const options = [
    { text: 'Horse', url: '../assets/models/Horse.glb', height: 0 },
    { text: 'Kira', url: '../assets/models/Kira.glb', height: 150 },
    { text: 'Parrot', url: '../assets/models/Parrot.glb', height: 500 }
  ];

  const [selectedModel, setSelectedModel] = useState(options[0]); // 创建一个状态，用于存储当前选中的模型，直接存Options里的各个项，这样传入createModel会方便

  const createModel = (option) => {
    console.log(option);
    if (!option) return null;

    const position = Cartesian3.fromDegrees(116.46, 39.92, option.height);
    const heading = Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orientation = Transforms.headingPitchRollQuaternion(position, hpr);
    // const entity = viewerRef.current.entities.add({
    //   name: url,
    //   position: position,
    //   orientation: orientation,
    //   model: {
    //     url: url,
    //     minimumPixelSize: 128,
    //     maximumScale: 20000,
    //   },
    // });
    // viewerRef.current.trackedEntity = entity;
    return (
      <Entity
        name={option.url}
        position={position}
        orientation={orientation}
        model={{
          uri: option.url, // 注意是uri，不是url
          minimumPixelSize: 128,
          maximumScale: 20000,
        }}
      />
    )
  };

  const handleSelectChange = (e) => {
    const value = e.target.value; // 获取到当前选中的值,注意要.target.value 
    const option = options.find((option) => option.text === value);
    if (option) {
      setSelectedModel(option);
    }
  };

  return (
    <>
      <select className="custom-select-position position-relative" onChange={handleSelectChange} value={selectedModel ? selectedModel.text : ''}>
        {options.map((option) => (
          <option key={option.text} value={option.text}>
            {option.text}
          </option>
        ))}
      </select>
      <Viewer full infoBox='false' selectionIndicator='false' shadows='true' shouldAnimate='true' >
        {createModel(selectedModel)}
      </Viewer>
    </>
  )

}

export default TdtilesExt1
```

问题处理：

1. .add()，在Resium里用组件化的方式
2. 传入createModel函数的时候，option不需要加{}

> 在您在调用 `createModel`函数时传递参数的方式上。在您的代码中，您尝试以解构的方式传递 `selectedModel`给 `createModel`函数，但是您实际上并没有正确地解构对象。您的函数定义 `createModel = ({ option }) => { ... }`期望接收一个包含 `option`属性的对象，但是您传递 `selectedModel`时，并没有用对象的形式包裹它，而是直接传递了 `selectedModel`。这就是为什么 `option`是 `undefined`的原因。
>
> 为了修复这个问题，您可以直接将 `selectedModel`作为参数传递给 `createModel`函数，而不是试图解构它。这样，您就不需要在函数参数中使用花括号了。
>
> JavaScript 中的解构赋值是一种便捷的语法，允许您直接从数组或对象中提取值，并将它们赋值给变量。使用解构赋值时，`{}` 和 `[]` 用于指示您想要从对象或数组中解构提取值。然而，是否使用解构赋值取决于您的具体需求，以及您处理的数据结构类型。
>
> **对象解构：** 当您想从一个对象中提取属性并直接作为变量使用时，您会使用 `{}`。这种情况下，您在 `{}`中放置属性名，JavaScript 会自动从对象中提取同名属性的值。
>
> **直接参数传递：** 当您直接传递一个对象作为函数的参数时，并不需要使用 `{}`，除非您想在函数内部进行解构。如果函数期待一个对象作为参数，直接传递这个对象即可。
>
> ```js
> const person = { name: 'Alice', age: 25 };
> const { name, age } = person; // 解构赋值
> console.log(name); // 输出: Alice
> console.log(age); // 输出: 25
> ```
