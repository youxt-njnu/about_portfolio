# 来源npm

[视频教程](https://www.youtube.com/watch?v=FkowOdMjvYo)

[react入门](https://juejin.cn/post/6960262593265025031)

[react three fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene#adding-lights)

其他相关教程：

[react+three](https://www.bilibili.com/video/BV1hX4y1y7nn/?spm_id_from=333.788&vd_source=5270415d668b21206238403450bb29b5)

# 教程

`npm create vite@latest ./` 在当前目录安装react

`npm install` 安装需要的包

`npm run dev` 运行开发环境

delete src folder, and create a new one called 'src'.

new file 'main.jsx' and code, change 'tsx' to 'jsx' in 'main.html'

new file 'App.jsx' and code ➡️ rafce shortcut(ES7+React... plugin embeded)

open a new TERMINAL then `npm install -D tailwindcss postcss autoprefixer`, `npx tailwindcss init -p`, configure path,

> [documentation](https://tailwindcss.com/docs/installation)
> 
> install 'npx' in advance: `npm i -g npx`

new file 'index.css', and import it in 'main.jsx'

copy the downloaded file 'index.css' for your 'index.css'

copy the downloaded file 'tailwind.cofig.js' for your 'tailwind.config.js'

install the plugin 'Tailwind CSS IntelliSense' , then vscode can recognize the css code in html

then restart the server, the result is shown!

install: `npm i react-router-dom`

create folder 'components', and create file 'Navbar.jsx', and code

create folder 'pages' and file 'About.jsx', 'Contact.jsx', 'Home.jsx', 'Projects.jsx'

create index.js to import all the following, then export for use

`npm i @react-three/fiber`

`npm i @react-three/drei`

download foxs_islands.glb from sketchfab, use [this website](https://gltf.pmnd.rs/) to simplize and transfer it.

> use model offered by author directly
> 
> 可以找一些教程，来使用这个网站对模型进行简化。

create folder 'models' and file 'Island.jsx', then copy and paste the model info

> `npm i @react-spring/three`
> 
> 修改成能导出的模型：
> 
> ````
> import { useRef, useEffect } from "react";
> import { useGLTF } from "@react-three/drei";
> import { useFrame, useThree } from "@react-three/fiber";
> import isLandScene from '../assets/3d/island.glb'
> import { a } from '@react-spring/three'
> 
> const { nodes, materials } = useGLTF(isLandScene);
> const Island = (props) => { ..return(<a.group{}..)..}
> 
> 
> export default Island;
> ````

删除：

> dispose={null}
> 
> castShadow
> 
> receiveShadow
> 
> useGLTF.preload("/island.glb");

修改：

> <a.group ref={islandRef} {...props}>

in vite.config.js, modify:

````
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb']
})
````

给light添加属性的时候，会提示“unknown property 'position' found“，这个时候需要在.eslintrc.cjs里添加：

`ignorePatterns: ['dist', '.eslintrc.cjs', 'src'],`

加载上各类模型，然后尝试实现拖动旋转和飞行 ➡️ 这个效果就是这个的[初级版](https://www.joshuas.world/)

GitHub Copilot的使用，免费1个月的订阅，也认证了[学生身份](https://education.github.com/discount_requests/application)（可以免费使用）

报错提示Island.jsx:109  Uncaught ReferenceError: setCurrentStage is not defined

在jsx文件内部定义的节点，需要注意返回return，外面的才能使用节点定义的结构；

````
npm i @emailjs/browser
````

在[emailjs官网](https://dashboard.emailjs.com/admin/templates/0hhd7hu/settings)上，creat free account

add new service → Service ID → connect account → create service

Email Template → Save → Settings, Template ID

把这些参数放到新的文件.env.local里面

错误：message栏总是输入无响应，

```js
<textarea
              name="message" 
              rows='4'
              className='textarea'
              placeholder='Let me know how I can help you!'
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
// 是name="message",而不是type="message"
// row='4' 而不是row={4}
```

对于fox的模型，可以去gltf.pmnd.rs网站，拖入后，把代码复制到Fox.jsx里进行调整（这个网站实现了GLTF -> React Three Fiber）

之后记得修改，不然会报错 `Contact.jsx:5 Uncaught SyntaxError: The requested module '/src/models/Fox.jsx' does not provide an export named 'default' (at Contact.jsx:5:8)`

导入images文件夹，以及构建constants->index.js，复制粘贴进去内容；可以针对自己情况进行修改；

为了实现时间线的功能，需要 `npm i react-vertical-timeline-component`

参考案例进行模仿使用；

最后作者完成了部署deployment，通过hostinger网站



## 国际化配置

[国际化解决方案：使用 React 实现多语言支持_react-i18next-CSDN博客](https://blog.csdn.net/mmc123125/article/details/144606981)

# 相关库

> - [@react-three/drei](https://github.com/pmndrs/drei)[@react-three/drei](https://github.com/pmndrs/drei) – useful helpers, this is an eco system in itself
> - [@react-three/gltfjsx](https://github.com/pmndrs/gltfjsx)[@react-three/gltfjsx](https://github.com/pmndrs/gltfjsx) – turns GLTFs into JSX components
> - [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)[@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) – post-processing effects
> - [@react-three/test-renderer](https://github.com/pmndrs/react-three-fiber/tree/master/packages/test-renderer)[@react-three/test-renderer](https://github.com/pmndrs/react-three-fiber/tree/master/packages/test-renderer) – for unit tests in node
> - [@react-three/flex](https://github.com/pmndrs/react-three-flex)[@react-three/flex](https://github.com/pmndrs/react-three-flex) – flexbox for react-three-fiber
> - [@react-three/xr](https://github.com/pmndrs/react-xr)[@react-three/xr](https://github.com/pmndrs/react-xr) – VR/AR controllers and events
> - [@react-three/csg](https://github.com/pmndrs/react-three-csg)[@react-three/csg](https://github.com/pmndrs/react-three-csg) – constructive solid geometry
> - [@react-three/rapier](https://github.com/pmndrs/react-three-rapier)[@react-three/rapier](https://github.com/pmndrs/react-three-rapier) – 3D physics using Rapier
> - [@react-three/cannon](https://github.com/pmndrs/use-cannon)[@react-three/cannon](https://github.com/pmndrs/use-cannon) – 3D physics using Cannon
> - [@react-three/p2](https://github.com/pmndrs/use-p2)[@react-three/p2](https://github.com/pmndrs/use-p2) – 2D physics using P2
> - [@react-three/a11y](https://github.com/pmndrs/react-three-a11y)[@react-three/a11y](https://github.com/pmndrs/react-three-a11y) – real a11y for your scene
> - [@react-three/gpu-pathtracer](https://github.com/pmndrs/react-three-gpu-pathtracer)[@react-three/gpu-pathtracer](https://github.com/pmndrs/react-three-gpu-pathtracer) – realistic path tracing
> - [create-r3f-app next](https://github.com/pmndrs/react-three-next)[create-r3f-app next](https://github.com/pmndrs/react-three-next) – nextjs starter
> - [lamina](https://github.com/pmndrs/lamina)[lamina](https://github.com/pmndrs/lamina) – layer based shader materials
> - [zustand](https://github.com/pmndrs/zustand)[zustand](https://github.com/pmndrs/zustand) – flux based state management
> - [jotai](https://github.com/pmndrs/jotai)[jotai](https://github.com/pmndrs/jotai) – atoms based state management
> - [valtio](https://github.com/pmndrs/valtio)[valtio](https://github.com/pmndrs/valtio) – proxy based state management
> - [react-spring](https://github.com/pmndrs/react-spring)[react-spring](https://github.com/pmndrs/react-spring) – a spring-physics-based animation library
> - [framer-motion-3d](https://www.framer.com/docs/three-introduction/)[framer-motion-3d](https://www.framer.com/docs/three-introduction/) – framer motion, a popular animation library
> - [use-gesture](https://github.com/pmndrs/react-use-gesture)[use-gesture](https://github.com/pmndrs/react-use-gesture) – mouse/touch gestures
> - [leva](https://github.com/pmndrs/leva)[leva](https://github.com/pmndrs/leva) – create GUI controls in seconds
> - [maath](https://github.com/pmndrs/maath)[maath](https://github.com/pmndrs/maath) – a kitchen sink for math helpers
> - [miniplex](https://github.com/hmans/miniplex)[miniplex](https://github.com/hmans/miniplex) – ECS (entity management system)
> - [composer-suite](https://github.com/hmans/composer-suite)[composer-suite](https://github.com/hmans/composer-suite) – composing shaders, particles, effects and game mechanics

## React Three

`@react-three/fiber`表明这个包是React Three（一个专注于在React中使用three.js的项目）下的一个模块或子项目。这有助于开发者快速识别包的来源，同时也方便了对项目包的管理。

作用域包的结构让开发者更容易地发现和维护相关的包。例如，React Three项目可能包含多个相关包（如 `@react-three/fiber`、`@react-three/drei`等），这些都被归类在 `@react-three`这个作用域下。这种组织方式使得维护者和使用者能够轻松地识别和更新这些相互关联的包。

### 1. `@react-three/fiber`

- **作用**：这是React Three Fiber项目的核心库，提供了将three.js集成到React的基础架构。它是一个React渲染器，允许你以声明式的方式在React应用中创建和控制3D场景。
- **区别**：作为基础库，它不提供额外的three.js对象或抽象，而是专注于提供与React兼容的three.js渲染环境。

### 2. `@react-three/drei`

- **作用**：`drei`是一个工具包，提供了许多有用的辅助组件和钩子（hooks），以简化在React Three Fiber中开发3D场景的过程。这些组件包括环境灯光、效果、加载器、抽象的3D对象等。
- **区别**：与 `@react-three/fiber`相比，`drei`更多地提供了构建3D场景时的"快捷方式"，帮助开发者减少样板代码和加快开发流程。

### 3. `@react-three/cannon`

- **作用**：这个包提供了物理引擎的集成，基于 `cannon.js`物理引擎。它允许开发者在React Three Fiber创建的3D场景中添加物理效果，如碰撞检测、重力和弹性。
- **区别**：专注于为3D对象添加物理特性，而不是3D渲染或组件的直接创建。

### 4. `@react-three/postprocessing`

- **作用**：该包提供了对后处理效果的支持，允许开发者在React Three Fiber场景中添加和配置后处理效果，如模糊、光晕、色彩校正等。
- **区别**：专注于渲染流程中的后期处理效果，改善或增加场景的视觉效果。

### 5. `@react-three/gui`

- **作用**：提供了一个简易的图形用户界面（GUI），用于在开发过程中调试和修改three.js场景的参数。
- **区别**：主要用于开发和调试阶段，通过图形界面快速调整场景参数，而不直接影响3D内容的渲染或逻辑。

### 6. `@react-three/xr`

- **作用**：支持构建虚拟现实（VR）和增强现实（AR）体验。它提供了创建和管理XR会话的工具，允许开发者在兼容的设备上提供沉浸式的3D体验。
- **区别**：专门针对XR应用的开发，提供了与VR和AR技术集成的工具和组件

## @react-spring

`@react-spring`是一个基于Spring物理原理的现代React动画库，它允许开发者以声明式的方式在React应用中创建流畅、自然的动画效果。`@react-spring`的设计旨在简化动画的创建和管理，提供了一种简单而强大的方法来实现复杂的动画效果，无论是简单的值变化、列表的动态排序，还是复杂的交互动画。

### 核心特性

- **简洁的API**：通过简单的API，开发者可以轻松创建和控制动画。
- **物理原理驱动**：动画效果基于真实的物理原理，使得动画看起来更自然。
- **高性能**：优化的性能确保即使在复杂动画中也能保持流畅。
- **适用范围广**：支持Web（React）、React Native和其他平台，通过相同的API在不同平台上创建动画。

### 主要子项目

`@react-spring`项目包含了几个子项目，分别针对不同的平台或提供特定的功能：

1. **`@react-spring/web`** **@react-spring/web** **@react-spring/web** **@react-spring/web**：专为Web平台设计，用于在Web应用中创建动画。它提供了与DOM元素交互的能力，是构建Web界面动画的理想选择。
2. **`@react-spring/native`** **@react-spring/native** **@react-spring/native** **@react-spring/native**：专为React Native设计，允许在React Native应用中创建流畅的原生动画效果。它利用React Native的动画库来实现高性能的动画。
3. **`@react-spring/core`** **@react-spring/core** **@react-spring/core** **@react-spring/core**：是 `@react-spring`库的核心，提供了动画功能的基本实现。其他子项目如 `@react-spring/web`和 `@react-spring/native`都是在这个核心基础上扩展而来，以支持特定平台的动画效果。
4. **`@react-spring/three`** **@react-spring/three** **@react-spring/three** **@react-spring/three**：为three.js提供动画支持，允许在使用React Three Fiber开发的3D场景中创建和管理动画。这使得开发者可以在3D应用中实现复杂的动画效果。
5. **`@react-spring/konva`** **@react-spring/konva** **@react-spring/konva** **@react-spring/konva**：用于在React Konva（一个用于在React中绘制2D canvas图形的库）项目中创建动画。这使得开发者可以为2D图形和图像添加动画效果。

### 区别

- **平台支持**：主要区别在于各个子项目针对的平台或库不同。`@react-spring/web`专注于Web平台，`@react-spring/native`专注于React Native，而 `@react-spring/three`和 `@react-spring/konva`则分别针对three.js和Konva。
- **使用场景**：虽然这些子项目在API设计上保持一致性，但它们提供的动画能力和使用场景各有侧重，例如 `@react-spring/three`专门处理3D动画，而 `@react-spring/konva`处理2D canvas动画。

### 总结

`@react-spring`提供了一个跨平台的动画解决方案，通过不同的子项目满足了在Web、React Native、3D场景和2D canvas图形中创建动画的需求。

## React router dom

在React应用中使用 `react-router-dom`库时，`Route`、`BrowserRouter`（在这里使用别名 `Router`），和 `Routes`组件是构建单页面应用（SPA）路由系统的核心。下面是每个组件的作用以及为什么它们通常会一起被导入和使用：

BrowserRouter (别名 Router)

- **作用**：`BrowserRouter`是一个使用HTML5历史API（`pushState`、`replaceState`和 `popstate`事件）来保持UI与URL同步的路由器。它为React应用提供了一个路由的上下文环境。使用 `BrowserRouter`时，你的网址看起来很“干净”，不会有 `#`符号。

Routes

- **作用**：`Routes`组件在 `react-router-dom` v6中引入，用于替代v5中的 `Switch`组件。它负责根据当前的URL决定哪一个子 `Route`组件应该被渲染。`Routes`组件会选择与当前URL匹配的最佳 `Route`来渲染，并提供了嵌套路由的支持。

Route

- **作用**：`Route`组件用于在路由系统中定义单个路由规则。它接受一个 `path`属性，用于指定路由的匹配路径，以及一个 `element`属性，用于指定当该路由匹配时应该渲染的组件。

这三个组件通常一起使用来构建React应用的路由系统。`BrowserRouter`提供了一个高阶的路由容器，`Routes`用于管理路由的选择逻辑，而 `Route`用于定义具体的路由规则和对应渲染的组件。没有 `BrowserRouter`，路由系统将无法工作，因为它提供了路由的上下文；没有 `Routes`和 `Route`，你就无法定义和管理你的路由规则。这种模式允许React开发者以一种声明式的方式来组织和管理用户在应用中的导航路径，同时确保应用的UI与URL保持同步，从而提高用户体验和应用的可维护性。

```jsx
<Router>
  <Routes>
    {/* 路由配置 */}
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>
</Router>
```

```typescript
<Route

    path='/SatelliteDashboard/:type/:id'

    element={`<SatelliteDashboard/>`}

    >`</Route>`
```

在React Router中，`:type`和 `:id`是动态段（dynamic segments）的例子，也称为路由参数（route parameters）。这种语法允许你定义可变的路径部分，使得同一个路由组件可以根据不同的参数值渲染不同的内容。

当你在路由的 `path`属性中使用 `:`前缀定义一个段时，这个段会被视为一个动态参数。例如，在路径 `'/SatelliteDashboard/:type/:id'`中：

- `:type`和 `:id`是动态参数，它们可以匹配任何放在它们位置上的字符串。
- 当用户访问 `/SatelliteDashboard/satellite/123`时，`type`参数的值为 `"satellite"`，`id`参数的值为 `"123"`。

在组件内部，你可以使用React Router提供的 `useParams`钩子（hook）来访问这些参数值。这对于根据不同的参数渲染不同的内容非常有用。例如，在 `SatelliteDashboard`组件中，你可以这样使用 `useParams`来获取 `type`和 `id`参数：

```jsx
import { useParams } from 'react-router-dom';

function SatelliteDashboard() {
  let { type, id } = useParams();

  // 使用type和id参数来渲染不同的内容
  return (
    <div>
      <p>Type: {type}</p>
      <p>ID: {id}</p>
    </div>
  );
}
```

## react-vertical-timeline-component

`react-vertical-timeline-component` 是一个React库，用于创建和显示垂直时间线。这个库提供了一种简单而有效的方式来展示按时间顺序排列的事件或步骤，非常适合用于展示项目里程碑、历史事件、工作经历等。它基于React开发，因此可以轻松地集成到现有的React应用中。

### 核心特性

- **易于使用**：通过提供的组件和属性，开发者可以快速构建出美观、响应式的时间线。
- **高度可定制**：支持自定义颜色、图标和内容，使时间线能够匹配应用的风格和主题。
- **响应式设计**：时间线会自动适应不同屏幕尺寸，保证在移动设备和桌面设备上都能良好展示。
- **动画效果**：内置动画效果，为时间线的展示增添视觉吸引力。

### 基本使用

要开始使用 `react-vertical-timeline-component`，首先需要将它添加到你的React项目中：

```bash
npm install react-vertical-timeline-component
```

接下来，你可以在你的组件中引入并使用时间线组件及其相关的子组件。以下是一个简单的示例：

```jsx
import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css'; // 引入样式文件

const MyTimeline = () => (
  <VerticalTimeline>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date="2011 - present"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<WorkIcon />}
    >
      <h3 className="vertical-timeline-element-title">Creative Director</h3>
      <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
      <p>
        Creative Direction, User Experience, Visual Design, Project Management, Team Leading
      </p>
    </VerticalTimelineElement>
    {/* 可以添加更多的 VerticalTimelineElement 组件来展示其他事件 */}
  </VerticalTimeline>
);

export default MyTimeline;
```

在这个例子中，`VerticalTimeline`是容纳所有时间线元素的容器，而 `VerticalTimelineElement`代表时间线上的单个事件或里程碑。你可以通过传递不同的props来定制每个时间线元素的外观和内容。

### 自定义和样式

`react-vertical-timeline-component`提供了多种方式来定制时间线的样式和行为：

- **颜色和图标**：通过 `iconStyle`属性自定义图标样式，以及通过 `icon`属性添加自定义图标。
- **内容布局**：每个 `VerticalTimelineElement`可以包含标题、副标题和任意的HTML内容，允许灵活地展示信息。
- **自定义类名**：可以为时间线元素添加自定义CSS类名，进一步通过CSS来定制样式。

### 总结

`react-vertical-timeline-component`是一个功能丰富且易于使用的React库，它能够帮助开发者在应用中快速创建出美观、响应式的垂直时间线。通过广泛的定制选项，它能够满足多种展示需求，使得时间线既能传达必要的信息，又具有吸引人的视觉效果。

## @emailjs/browser

`@emailjs/browser` 是一个JavaScript库，用于在客户端直接从前端应用中发送电子邮件，无需后端服务器。通过使用 EmailJS 服务，开发者可以在Web页面中集成电子邮件发送功能，而不需要编写服务器端代码或存储用户的电子邮件凭据。这使得在联系表单、通知系统或任何需要发送电子邮件的场景中，实现邮件发送变得异常简单和安全。

### 核心特性

- **无服务器**：不需要自己的服务器来发送电子邮件，减少了开发和维护成本。
- **简单易用**：提供了简洁的API，可以快速在前端代码中集成和使用。
- **安全**：不需要在客户端暴露敏感信息，如SMTP服务器登录凭据等。
- **灵活性**：支持自定义电子邮件模板，可以根据需要发送不同内容的邮件。

### 安装

通过npm或yarn安装 `@emailjs/browser`：

```bash
npm install @emailjs/browser
# 或者
yarn add @emailjs/browser
```

### 基本使用

要使用 `@emailjs/browser`发送电子邮件，首先需要在 EmailJS 网站上注册账户，创建邮件模板，并获取必要的服务ID、模板ID和用户ID。

在React项目中使用 `emailjs`或任何其他依赖于环境变量的服务时，创建一个 `.env.local`文件的主要目的是为了安全和配置的灵活性。这个文件被用来存储敏感信息和项目配置，如API密钥、服务ID、用户ID等，这些信息对于应用的运行至关重要，但你不希望它们被直接硬编码到源代码中或被提交到版本控制系统（如Git）中。这样做主要有以下几个原因：

1. **安全性**：保护你的敏感信息不被公开，如API密钥和密码。如果这些信息被硬编码在应用程序的源代码中，并且源代码被上传到了公开的代码仓库，那么这些敏感信息就有泄露的风险。
2. **配置的灵活性**：允许你在不同的环境（开发、测试、生产等）中使用不同的配置，而不需要改变代码。比如，在开发环境和生产环境中使用不同的API密钥。
3. **便于维护**：将配置从代码中分离，使得配置的更改更加容易，而不需要每次都触摸代码本身。

`.env.local`是一种特殊的 `.env`文件，它被设计用来在你的本地开发环境中覆盖 `.env`文件中的默认设置。React和许多其他现代前端框架都支持使用 `.env`文件来定义环境变量。这些变量在构建过程中会被嵌入到最终的JavaScript包中，因此在运行时可以访问它们。

要在React项目中使用 `.env.local`中定义的环境变量，你需要遵循以下步骤：

1. 在项目根目录下创建一个 `.env.local`文件。
2. 在 `.env.local`文件中添加环境变量，遵循 `REACT_APP_`前缀的规则。例如：

   ````
   REACT_APP_EMAILJS_USER_ID=你的用户ID
   REACT_APP_EMAILJS_SERVICE_ID=你的服务ID
   REACT_APP_EMAILJS_TEMPLATE_ID=你的模板ID
   ````

3. 在你的React应用中，你可以通过 `process.env.REACT_APP_EMAILJS_USER_ID`这样的方式访问这些变量。

使用 `.env.local`文件是一种实践，旨在提高项目的安全性和配置的灵活性，特别是当涉及到处理敏感信息时。这种方法有助于避免将敏感数据暴露给公众，同时还提供了在不同环境下轻松切换配置的能力。

````
VITE_APP_EMAILJS_SERVICE_ID=service_5bezaam
VITE_APP_EMAILJS_TEMPLATE_ID=template_dafnzfi
VITE_APP_EMAILJS_PUBLIC_KEY=JpbkxBEdlS8faxCrq
````

在使用Vite作为构建工具的项目中，环境变量的命名遵循特定的前缀规则，这是为了确保这些变量在构建时被正确地加载和注入到项目中。

1. **`VITE_`** **VITE_** **VITE_** **VITE_****前缀**：Vite要求所有应该暴露给项目前端代码的环境变量都必须以 `VITE_`为前缀。这是一个约定，用于保护你的环境变量，确保只有带有这个前缀的变量才会被包含在最终的前端构建中。这样可以防止无意间将敏感的服务器端环境变量暴露给客户端。
2. **`APP`** **APP** **APP** **APP**：这个部分不是必需的，但它是一个常见的做法，用于指示这些环境变量是应用级别的。加上 `APP`（或者其他类似的标识符）有助于在环境变量中创建一个逻辑上的分组，使得它们更易于管理和识别。
3. **`EMAILJS_SERVICE_ID`** **EMAILJS_SERVICE_ID** **EMAILJS_SERVICE_ID** **EMAILJS_SERVICE_ID****、**`EMAILJS_TEMPLATE_ID`** **EMAILJS_TEMPLATE_ID** **EMAILJS_TEMPLATE_ID******** **EMAILJS_TEMPLATE_ID******、**`EMAILJS_PUBLIC_KEY`** **EMAILJS_PUBLIC_KEY** **EMAILJS_PUBLIC_KEY**：这些部分具体指明了变量的用途。在这个例子中，它们分别用于标识EmailJS服务的ID、模板的ID和公共密钥。这样的命名方法有助于清晰地表达每个环境变量的作用和关联的服务。

你可以修改环境变量的名称，但需要保持 `VITE_`前缀不变，以确保Vite能够正确地处理这些变量。如果你决定更改变量名称（比如，将 `VITE_APP_EMAILJS_PUBLIC_KEY`更改为 `VITE_APP_EMAILJS_KEY`），你需要在项目中引用这些环境变量的地方也做相应的更改，以确保一致性和正确的变量访问。

然后，可以在前端代码中使用这些ID来发送邮件：

```javascript
import emailjs from '@emailjs/browser';

// 在组件加载时初始化 EmailJS 服务（例如，在React组件的useEffect中）
emailjs.init("your-user-id"); // 使用你的User ID替换"your-user-id"

// 创建发送邮件的函数
const sendEmail = () => {
  const templateParams = {
    to_name: '收件人名字',
    from_name: '发件人名字',
    message: '邮件内容',
    // ...其他模板参数
  };

  emailjs.send('your-service-id', 'your-template-id', templateParams)
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
       console.log('FAILED...', error);
    });
};
```

### 使用场景

`@emailjs/browser`适用于多种场景，如：

- **联系表单**：在静态网站或SPA中收集用户反馈或查询，直接从前端发送邮件。
- **注册确认**：在用户注册流程中发送欢迎邮件或确认邮件。
- **通知系统**：向用户发送通知邮件，如订单状态更新、活动提醒等。

### 总结

`@emailjs/browser`提供了一种简单而强大的方式，使得在没有后端的情况下直接从浏览器发送电子邮件成为可能。通过减少服务器端的需求和复杂性，开发者可以更专注于用户体验和前端功能的实现，同时保持应用的安全性和可维护性。

## tailwindcss

[官方文档](https://tailwindcss.com/docs/installation)

[15分钟入门](https://segmentfault.com/a/1190000022622923)

[入门教程](http://www.xcj.com/front-end-life/CSS/TailwindCSS.html)

延申插件：

> Typography
> 
> Forms
> 
> Aspect Ratio
> 
> Container Queries

### 安装

安装和配置Tailwind CSS主要涉及两个步骤，这两个步骤通过上述命令完成。下面是对这两条命令的解释：

1. `npm install -D tailwindcss postcss autoprefixer`

这条命令使用npm（Node.js包管理器）来安装三个开发依赖：

- **`tailwindcss`** **tailwindcss** **tailwindcss** **tailwindcss**：Tailwind CSS库本身，它是一个功能类优先的CSS框架，允许你通过在HTML中添加类来直接应用样式，从而加快开发速度。
- **`postcss`** **postcss** **postcss** **postcss**：PostCSS是一个用JavaScript工具和插件转换CSS代码的工具。Tailwind CSS依赖于PostCSS，因为它实际上是一组PostCSS插件，用于生成和处理Tailwind的工具类。
- **`autoprefixer`** **autoprefixer** **autoprefixer** **autoprefixer**：Autoprefixer是一个PostCSS插件，用于自动添加浏览器厂商前缀到CSS规则中，确保CSS属性在不同的浏览器中能够正常工作。这对于兼容性是非常有用的。

`-D`标志表示这些包被安装为开发依赖项，这意味着它们只在开发过程中需要，在生产环境的构建过程中不会被使用。

2. `npx tailwindcss init -p`

这条命令用于初始化Tailwind CSS的配置文件，并自动生成PostCSS配置文件。

- `npx`是一个npm包运行器，它允许你执行安装在本地node_modules目录中的包而不需要全局安装这些包。
- `tailwindcss init`是Tailwind CLI的一部分，用于生成 `tailwind.config.js`文件。这个文件是Tailwind CSS的配置文件，你可以在其中自定义你的设计系统，如颜色、字体大小、间距等。
- `-p`标志表示同时生成 `postcss.config.js`文件，这是PostCSS的配置文件，Tailwind CSS作为PostCSS插件运行时需要这个文件。这个标志确保了 `autoprefixer`也被包含在PostCSS配置中，因为它通常与Tailwind CSS一起使用以确保最佳的浏览器兼容性。

总的来说，这两个命令共同完成了Tailwind CSS和其依赖的安装，以及为项目生成必要的配置文件，让你可以开始使用Tailwind CSS来构建项目。

### 配置

在 `tailwind.config.js`文件中，`content`、`theme`、和 `plugins`是Tailwind CSS配置的主要部分，它们各自承担着不同的角色，以便定制和控制Tailwind CSS的行为。下面是它们各自的作用：

1. `content`

`content`属性用于指定Tailwind CSS应该扫描哪些文件来寻找类名。这是Tailwind CSS的一个重要特性，称为PurgeCSS（在Tailwind CSS v3.x中，这一特性已经内置且默认启用），它用于移除最终CSS文件中未使用的样式，以减小文件大小和提高加载速度。

在 `tailwind.config.js`文件中，你可以这样配置 `content`属性：

```javascript
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  // 其他配置...
};
```

这告诉Tailwind CSS扫描你项目中的 `src`目录下所有的HTML和JavaScript文件，包括React（`.jsx`）、TypeScript（`.ts`、`.tsx`）等文件，来确定哪些样式是实际被使用的。

2. `theme`

`theme`属性用于定制Tailwind CSS提供的默认设计系统。你可以在这里调整颜色、字体、间距等默认设置，或者添加自己的设计令牌（tokens）。这使得Tailwind CSS极其灵活，能够适应几乎任何设计需求。

例如，你可以定制主题颜色和字体大小：

```javascript
module.exports = {
  // 其他配置...
  theme: {
    extend: {
      colors: {
        'custom-blue': '#5b6d5b',
      },
      fontSize: {
        'big': '2rem',
      },
    },
  },
  // 其他配置...
};
```

`extend`属性用于扩展而不是覆盖默认的主题设置。

在 `tailwind.config.js`文件的 `extend`对象中对 `colors`的设置允许你自定义或扩展默认的颜色系统。这种方式让你可以添加新的颜色或覆盖现有颜色的某些阶级（如100-900这样的权重级别通常用于表示颜色的浅到深）。这里是对给出的设置的详细解释：

```javascript
colors: {
  black: {
    DEFAULT: '#000',
    500: '#1D2235',
  }
},
```

**`black`** **black** **black** **black**：

- `DEFAULT`：这里指定了 `black`颜色的默认值为 `#000`。在Tailwind CSS中，如果你直接使用 `text-black`或 `bg-black`这样的类，将会应用这个默认颜色值。
- `500`：除了默认值之外，还定义了一个 `500`阶级的黑色 `black-500` 为 `#1D2235` 。这意味着你可以通过 `text-black-500` 或 `bg-black-500`来使用这个特定的深度值。

3. `plugins`

`plugins`属性允许你添加第三方插件或自定义的插件到Tailwind CSS中，以扩展其功能。这些插件可以添加新的工具类、组件，或是在构建过程中使用的功能性钩子。

你可以这样添加插件：

```javascript
module.exports = {
  // 其他配置...
  plugins: [
    require('@tailwindcss/forms'),
    // 其他插件...
  ],
};
```

这个例子中，我们添加了 `@tailwindcss/forms`插件，它是一个官方插件，用于重置和定制表单元素的样式。

总的来说，`tailwind.config.js`中的 `content`、`theme`、和 `plugins`配置项提供了一个强大的机制来定制和优化你的Tailwind CSS集成，使其更适合你的项目需求。

### 导入

在Tailwind CSS中，使用 `@tailwind`指令在 `index.css`（或任何主CSS文件）中导入Tailwind的层是初始化和使用Tailwind CSS框架的关键步骤。这些指令告诉Tailwind CSS在构建过程中将其功能类和样式注入到CSS文件中。下面是这三个指令的作用：

1. `@tailwind base;`

这个指令导入Tailwind的基础样式，这些样式包括浏览器样式的重置和归一化以及一些基本的HTML元素样式。这为你的项目提供了一个一致的基线样式，确保在不同浏览器中具有一致的外观和感觉。基础样式还包括对标准元素（如 `<h1>`到 `<h6>`、`<p>`等）的默认样式设置，这样你可以在不需要额外类的情况下立即开始工作。

2. `@tailwind components;`

这个指令导入由你或其他人创建的组件类。在Tailwind中，组件不是指UI组件库中的组件，而是一组可以重用的工具类组合，用于构建界面元素。通过在 `tailwind.config.js`文件中自定义或扩展，你可以创建自定义的组件样式，这些自定义样式将通过这个指令被引入。这允许你定义一些常用的样式模式，如按钮、卡片等，以便在整个项目中重用。

3. `@tailwind utilities;`

这个指令导入Tailwind的工具类，这是Tailwind CSS最强大的特性之一。工具类包括了边距、填充、文字大小、颜色等几乎所有CSS属性的类。这些类设计为原子类，意味着每个类都具有单一的责任，你可以组合它们来创建复杂的设计。这种方法提供了极高的灵活性和定制性，使得你能够快速构建和调整界面。

通过在CSS文件中包含这些 `@tailwind`指令，你实际上是在激活Tailwind CSS的强大功能，使其成为构建和设计你的Web项目的基础。这种方法允许你利用Tailwind的所有预定义样式和工具，同时保持了扩展和自定义的能力。

### Tailwind CSS IntelliSense

Tailwind CSS IntelliSense 是一个 Visual Studio Code (VSCode) 插件，它极大地增强了在使用VSCode开发时使用Tailwind CSS的体验。这个插件提供了一系列功能，旨在提高开发效率和减少编码错误。主要功能包括：

- **类名提示**：在编写HTML或JSX等文件时，**插件会提供Tailwind CSS类名的自动完成建议**。这意味着你开始键入时，它会显示可用的Tailwind 类名列表，让你快速选择而不需要记住每个具体的类名。
- **悬停后可以样式预览**：当你将鼠标悬停在某个Tailwind CSS类名上时，IntelliSense会显示一个小弹窗，其中展示了这个类名对应的CSS样式。这使得理解和检查类名的作用变得直接且方便。
- **错误检查**：插件能够识别并高亮显示不存在的Tailwind CSS类名，帮助你快速定位并修正错误或拼写问题。
- **颜色预览**：对于颜色相关的类名（如背景、文字颜色等），IntelliSense会在类名旁边显示一个小色块，直观地展示这个类名对应的颜色，增强了颜色选择的直观性。
- **@apply指令支持**：当使用 `@apply`指令在CSS或SCSS文件中应用Tailwind CSS实用程序类时，IntelliSense也会提供自动完成和验证功能。
- **自定义配置支持**：IntelliSense插件能够读取并根据你的 `tailwind.config.js`文件提供自定义配置的自动完成建议，这包括你添加或修改的颜色、间距等自定义主题设置。

总之，Tailwind CSS IntelliSense 插件通过提供强大的代码完成、验证和预览功能，极大地提高了使用Tailwind CSS进行开发的效率和舒适度。它帮助开发者更快地编写代码，减少错误，并在编码时获得即时的样式反馈。

# React Three Fiber

[官网教程](https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene#adding-lights)

## [Canvas](https://docs.pmnd.rs/react-three-fiber/api/canvas)

Scene+Camera+raycaster+(shadow)

Canvas里面的内容，可以用驼峰法写，不需要导入，直接是原生的JSX组件。如 `<mesh></mesh>`, `<boxGeometry />`, `<meshStandardMaterial />`。但从v8以后，不会自动化导入这些，可以导入react-three-fiber，然后可以直接写这些；或者是通过import 'three'

ThreeJS里的类的构造器的参数传入，`<boxGeometry args={[w,h,d]}/>`

## 与threejs的转换

[对象，属性和构造器参数设置](https://docs.pmnd.rs/react-three-fiber/api/objects)（说明了从ThreeJS过渡到react-three-fiber的一些注意点）

有set方法的对象

> 可以直接用=，如果有多个参数，可以放入array
> 
> `color="hotpink"` not `color={new THREE.Color('hotpink')}`
> 
> `position={[100,0,0]}` not set

有setScalar这种类似的方法，可以直接用属性scale

> `<mesh scale={1} />` or `<mesh scale={[1,1,1]} />`

有类似mesh.rotation.x这种串接的方法，使用-来连接

> `<mesh rotation-x ={1} />`

## attach

在 `react-three-fiber`（R3F）中，`attach`属性是一个非常重要的概念，用于将React组件的某些属性或对象“附加”到Three.js的父对象上。这样做的目的是为了在R3F的React元素树中保持Three.js场景图的结构和属性同步。

`attach`属性通常用于 `<primitive>`组件或任何自定义组件内部，来指定如何将当前组件的Three.js对象（如材质、几何体、相机等）附加到其父Three.js对象上。例如，你可以将一个材质附加到一个网格上，或者将一个相机附加到场景中。

```jsx
<mesh>
  <boxGeometry attach="geometry" args={[1, 1, 1]} />
  <meshStandardMaterial attach="material" color="orange" />
</mesh>
```

在这个例子中：

- `<boxGeometry>`的 `geometry`对象被附加到父 `<mesh>`的 `geometry`属性上。
- `<meshStandardMaterial>`的 `material`对象被附加到相同 `<mesh>`的 `material`属性上。

在传统的Three.js应用中，你需要手动管理场景图的所有方面，包括创建对象、设置属性、添加到场景中等。而在R3F中，`attach`属性简化了这一过程，允许你直接在JSX中以声明式的方式组织和连接Three.js的对象。

例如，传统Three.js中创建和添加一个带材质的立方体可能需要这样：

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({color: 'orange'});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

而在R3F中，相同的操作可以通过使用 `attach`属性在JSX中直接声明，如前面的例子所示，这使得代码更加简洁并且保持了React的声明式风格。

总之，`attach`属性是 `react-three-fiber`中连接React组件属性和Three.js对象的强大工具，它简化了在React中构建和管理复杂3D场景的过程。

## Hooks

只能使用在Canvas元素里，因为Hooks依赖于context.

### useThree

const state = useThree()

state.gl, .scene, .camera, .raycaster, .pointer(.mouse), .clock, .linear, .legacy, .frameloop, .performace, .size, .viewport, .set(), .get(), .invalidate(), .setSize(), .setDpr(), .setFrameloop(), .setEvents(), .onPointerMissed(), .events

### useFrame

useFrame((state, clock_delta, xrFrame) =>{})

### useLoader

### useGraph

[官方案例](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

# React-Three

## Island案例

### a in '@react-spring/three'

```jsx
import { a } from '@react-spring/three';
......
return (
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      ......
    </a.group>
```

在这个上下文中，`a`很可能是 `@react-spring/three`库的命名导入，用于访问 `react-spring`提供的用于Three.js对象的动画化包装器。`react-spring`是一个流行的React库，用于创建流畅和自然的动画效果。`@react-spring/three`是专门为Three.js集成提供的，使得在Three.js环境中使用 `react-spring`变得简单。

在这段代码中：

- **`a.group`** **a.group** **a.group** **a.group**：这是 `@react-spring/three`提供的一个组件，它是对Three.js中 `THREE.Group`的动画化包装。在Three.js中，`Group`对象用于创建对象的集合，这样你可以作为一个单元来平移、旋转和缩放它们。在 `react-spring/three`中，`a.group`允许你对这个组应用动画，比如平移、旋转或透明度变化等。
- **`<mesh />`** **<mesh />** **<mesh />** **<mesh />**：这是一个Three.js中用于表示具有几何形状和材质的物体的组件。在这个示例中，`mesh`组件使用了 `geometry`（几何体）和 `material`（材质）两个属性，分别指定了物体的形状和表面处理。这不是 `react-spring`特有的，而是Three.js中的基本概念，但在这里它被放置在 `a.group`内部，表明你可以对整个组和组内的单个物体进行动画处理。

`a`是一个特殊的前缀，用于访问 `react-spring/three`提供的动画化组件。使用 `react-spring/three`，你可以给Three.js的对象添加流畅的物理基础动画，比如弹簧动画。`react-spring`的动画不仅限于简单的过渡，它支持从初始状态到结束状态的自然动画，包括反弹、停止等自然运动的效果。

`<a.group>`组件继承自Three.js的 `Group`类，将Three.js对象（如 `Group`、`Mesh`等）用 `a.`前缀包装，并通过 `@react-spring/three`获得了动画能力。在Three.js中，`Group`是一个用于包含和管理多个其他对象（例如，几何体、网格等）的容器。它本身是 `Object3D`的一个子类，这意味着它继承了 `Object3D`的所有属性，包括 `position`、`scale`和 `rotation`。

### useThree "@react-three/fiber"

在 `@react-three/fiber` 中，`useThree` 是一个 React Hook，它提供了访问 Three.js 渲染上下文中的各种属性和方法的能力。

当你在组件中调用 `useThree()` 时，它返回一个对象，这个对象包含了当前 Three.js 渲染上下文的多个属性和实例。这样，你就可以在你的组件中直接访问和使用这些属性和实例，而无需手动管理它们。

```jsx
const { gl, viewport } = useThree();
```

这行代码的作用是从 `useThree()` 返回的上下文对象中解构出 `gl` 和 `viewport` 两个属性：

- **`gl`** **gl** **gl** **gl**：这是对 WebGLRenderer 的引用，即 Three.js 使用的 WebGL 渲染器实例。通过这个实例，你可以控制渲染过程，比如调整清除颜色、执行后处理等。
- **`viewport`** **viewport** **viewport** **viewport**：这包含了关于当前视口的信息，如视口的宽度和高度，以及一些用于将屏幕坐标转换为Three.js世界坐标的工具函数。这对于响应式设计和动态布局非常有用。

在Three.js中，`WebGLRenderer`是用来渲染场景（`THREE.Scene`）到一个Web页面上的canvas元素中。它使用WebGL API来绘制定义好的3D对象。

```javascript
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
```

`WebGLRenderer`生成的canvas元素需要被添加到HTML文档中，这样渲染的结果才能显示给用户。

```javascript
document.body.appendChild(renderer.domElement);
......
renderer.render(scene, camera);
```

### 交互事件pointerdown

在Three.js中，虽然库本身主要聚焦于3D场景的渲染，但它通常用于Web环境，因此经常与HTML元素（如 `canvas`）以及Web事件模型进行交互。`pointerdown`、`pointerup`和 `pointermove`是指针事件，是Web标准的一部分，用于处理各种指针设备（如鼠标、触摸屏和笔设备）的输入。这些事件可以被用来增强Three.js场景的交互性。下面是每个事件的基本说明：

pointerdown

- **操作**：当用户按下任何指针设备（例如，鼠标按键、触摸屏的触摸）时触发。
- **用途**：在Three.js应用中，`pointerdown`可以用来检测用户开始与场景中的对象进行交互的时刻，比如开始拖动物体、选中一个物体等。

pointerup

- **操作**：当用户释放之前按下的指针设备时触发。
- **用途**：在Three.js应用中，`pointerup`事件可以用来检测用户结束交互的时刻，例如放开拖动的物体、确认选中的物体等。

pointermove

- **操作**：当指针设备在屏幕上移动时触发，不论是否按下。
- **用途**：`pointermove`在Three.js中非常有用，可以用来实现对象的拖拽效果、在场景中导航（如旋转视角、缩放场景）或实时追踪鼠标/触摸的位置以创建动态效果。

为了在Three.js的 `canvas`元素上监听这些事件，你可以直接在 `canvas`元素上添加事件监听器：

```javascript
const canvas = renderer.domElement; // 假设你已经有一个Three.js渲染器

canvas.addEventListener('pointerdown', (event) => {
    console.log('Pointer down', event);
    // 在这里添加当指针按下时的处理逻辑
    console.log(`Pointer Type: ${event.pointerType}`);
    console.log(`Pointer Position: (${event.clientX}, ${event.clientY})`);
    // 阻止默认行为和事件冒泡
    event.preventDefault();
    event.stopPropagation();
});

```

`event`对象的作用

- **事件类型识别**：`event.type`属性可以告诉你事件的具体类型（如 `"pointerdown"`），有助于在使用同一个事件处理函数处理多种事件类型时进行区分。
- **获取指针位置**：`event.clientX`和 `event.clientY`属性提供了指针在视口中的坐标位置，而 `event.pageX`和 `event.pageY`则提供了指针在整个页面中的位置。这对于实现拖拽功能或在画布上绘图等功能非常有用。
- **区分指针设备**：`event.pointerType`属性可以告诉你触发事件的指针设备类型（如 `"mouse"`、`"pen"`或 `"touch"`），这有助于实现针对不同设备的特定交互响应。
- **阻止默认行为**：`event.preventDefault()`方法可以用来阻止事件的默认行为（如果有的话），例如阻止点击链接导航到新页面的默认行为。
- **停止事件冒泡**：`event.stopPropagation()`方法可以阻止事件进一步传播到其他事件监听器。

注意事项

- 使用指针事件可以让你的应用更好地适应不同的输入设备，而不仅仅是鼠标。
- 确保合理使用事件监听器，避免在高频事件（如 `pointermove`）中执行计算量大的操作，这可能会影响性能。
- 在处理这些事件时，考虑事件对象（`event`）提供的信息，如指针位置、按下的按钮等，这些信息对于实现精确的交互逻辑非常有用。

## Bird案例

### const = useGLTF(birdScene)

`<primitive />` is a component from React Three Fiber that allows you to directly include three.js objects into the React component tree. By setting the `object` prop to `scene`, you're telling React Three Fiber to render the entire GLTF scene, which `useGLTF` hook returns, without having to manually construct the scene with React components. This is a straightforward way to include complex 3D models and their associated hierarchies into your 3D scene.

```jsx
//这种形式
<mesh
   geometry={nodes.pCube11_rocks1_0.geometry}
   material={materials.PaletteMaterial001}
/>
//和这种形式
<mesh
   ref={birdRef}
   position={[-5, 2, 1]}
   scale={[0.003, 0.003, 0.003]}
>
   <primitive object={scene} />
</mesh>
```

第一种形式直接使用了GLTF模型中的具体节点（如 `pCube11_rocks1_0`）和材质（如 `PaletteMaterial001`）来创建一个 `<mesh>`。这种方式允许你精细控制模型的每个部分，例如指定使用模型中的哪个节点和哪种材质。

第二种形式使用了 `<primitive object={scene} />`来直接渲染整个场景（`scene`），这里的 `scene`是 `useGLTF`钩子返回的整个GLTF场景对象。通过这种方式，你可以简单快捷地在React Three Fiber中渲染整个3D模型，而不需要逐个指定模型的每个部分。这种方法适用于当你想要原封不动地渲染整个模型，而不需要对模型的单独部分进行精细控制。

### Unity中导入glb/gltf

在Unity中导入GLB模型，可以使用Unity的GLTFUtility插件，支持导入GLB和GLTF格式的3D模型。首先需要从[GitHub获取URL](https://github.com/Siccity/GLTFUtility)，然后在Unity中使用package manager来进行安装。导入插件后，你可以直接将GLB模型拖拽到Unity的Assets文件夹中，插件会自动处理模型的导入过程。这个过程简单快速，不需要复杂的配置。

### useFrame()

在 `useFrame`回调函数中，`{ clock, camera }`是从React Three Fiber的渲染循环中解构出来的对象。`clock`是一个 `THREE.Clock`实例，用于追踪时间；`camera`是当前场景中的相机对象。这种写法允许你直接访问这些对象而不需要从外部传入，因为 `useFrame`已经为你提供了对它们的引用，这是React Three Fiber框架的一部分，旨在简化动画和渲染逻辑的实现。

```jsx
useFrame(({ clock, camera }) => { // 这里需要给clock, camera外面加上{}，不然会报错
    // Update the Y position simulate the flight moving in a sin wave 
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // 控制鸟在island的范围内（相机位置的前后10个单位）
    if (birdRef.current.position.x > camera.position.x + 10) {
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      birdRef.current.rotation.y = 0;
    }


```

在 `useFrame`中，除了 `clock`和 `camera`，你还可以接收到一个 `state`对象作为参数，它包含了React Three Fiber渲染循环中的当前状态和一些实用的属性和方法。这些包括场景（`scene`）、渲染器（`gl`）、大小（`size`）、鼠标位置（`mouse`）等。`useFrame`函数提供了一个强大的接口，让你可以在每一帧中访问和修改这些对象，从而创建动画和交互。

```jsx
  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * delta;
    }
  });
```

In the `useFrame` hook, the first parameter (`_` in this case) is the state object provided by React Three Fiber, which contains information about the current render state, such as the scene, camera, etc. The underscore `_` is often used to indicate that the parameter is not being used in the function. The second parameter, `delta`, represents the time in seconds since the last frame was rendered. This is useful for creating time-dependent animations or simulations, ensuring smooth and consistent motion regardless of the frame rate.

## Home

### Audio的使用

```jsx
const audioRef = useRef(new Audio(sakura));
```

The `Audio` in refers to the HTML Audio element, which is a standard part of the Web APIs provided by browsers for playing sound. It does not need to be imported from a module because it's globally available in the browser environment, similar to `document` or `window`. This API allows you to programmatically control audio playback, such as play, pause, and volume control directly from your React components.

To use the `Audio` interface in JavaScript, you simply create a new `Audio` object, optionally passing the URL of the audio file you wish to play as a parameter. You can then use methods like `play()`, `pause()`, and properties such as `volume` to control playback.

Example:

```javascript
const audio = new Audio('path/to/your/audio/file.mp3');
audio.play(); // To start playing the audio
audio.pause(); // To pause the audio
audio.volume = 0.5; // To set the volume to 50%
```

In a React component, you might use it with `useRef` to keep a reference to the audio object.

```javascript
const [isPlayingMusic, setIsPlayingMusic] = useState(false);

useEffect(() => {
    if (isPlayingMusic) { audioRef.current.play(); }

    return () => {
      audioRef.current.pause();
    }
}, [isPlayingMusic]);

// return里面：
<div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className='w-10 h-10 cursor-pointer object-contain'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
</div>
```

This component plays the audio when it mounts and pauses when it unmounts, with the `src` prop specifying the audio file's path.

### currentStage的切换

```jsx
<div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />} </div>}
```

HomeInfo中

```jsx
const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};
```

Island中

```jsx
switch (true) {
        case normalizeRotation >= 5.45 && normalizeRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizeRotation >= 0.85 && normalizeRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizeRotation >= 2.4 && normalizeRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizeRotation >= 4.25 && normalizeRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null); // 当不在特定角度下，currentStage为null，所以Home.jsx里要对currentStage进行判断
      }
```

所以需要先判断currentStage，不是null之后再渲染HomeInfo

## Components

### Loader

```jsx
<div className='flex justify-center items-center'>
        <div className="w-20 h-20 border-4 border-opacity-20 border-purple-500 border-t-purple-800 rounded-full animate-spin"></div>
      </div>
```

这段代码是一个使用Tailwind CSS实现的简单旋转动画示例。它创建了一个居中的圆形div，该div具有旋转动画。下面是详细解析：

- `className='flex justify-center items-center'`：这三个类一起使用，创建了一个flex容器，其中的内容水平（`justify-center`）和垂直（`items-center`）居中。这确保了内部的div（旋转元素）在父容器中居中。
- **`w-20 h-20`** **w-20 h-20** **w-20 h-20** **w-20 h-20**：设置div的宽度和高度为5rem（根据Tailwind CSS的默认配置，`20`单位等于5rem，如果没有自定义配置的话）。
- **`border-4`** **border-4** **border-4** **border-4**：设置边框宽度为4像素。
- **`border-opacity-20`** **border-opacity-20** **border-opacity-20** **border-opacity-20**：设置边框透明度为20%，使边框颜色较浅。
- **`border-purple-500`** **border-purple-500** **border-purple-500** **border-purple-500**：设置边框的默认颜色为紫色，透明度由 `border-opacity-20`控制。
- **`border-t-purple-800`** **border-t-purple-800** **border-t-purple-800** **border-t-purple-800**：特别为上边框设置了较深的紫色（`purple-800`），这在旋转时会产生视觉效果，使得看起来像是在旋转。
- **`rounded-full`** **rounded-full** **rounded-full** **rounded-full**：使div变为圆形。
- **`animate-spin`** **animate-spin** **animate-spin** **animate-spin**：应用Tailwind CSS内置的旋转动画，使div无限期旋转。这个动画是通过CSS的 `@keyframes`实现的，定义了从0%到100%的转动，实现了连续旋转的效果。Tailwind CSS内部定义了这个动画关键帧，实现了元素的360度旋转。动画是循环播放的，因此旋转动画会一直持续，直到被另外的CSS规则覆盖或者从DOM中移除。

### 匿名函数的()和{}

- 使用 `()=>()`时，箭头函数会直接返回圆括号 `()`中的表达式结果。这适用于返回单个表达式或JSX元素的简短函数。
- 使用 `()=>{}`时，你可以在花括号 `{}`中执行多个语句，但如果想要返回值，需要显式使用 `return`语句。这适用于更复杂的函数，其中包含了多条语句。

## Contact

### useAnimations

```jsx
const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions);// 可以查看模型有哪些动画
    Object.values(actions).forEach((action) => { action.stop() });
    if (actions[currentAnimation]) actions[currentAnimation].play();

  }, [actions, currentAnimation]);
```

`Object.values()` 是一个JavaScript方法，它从一个对象中提取出所有可枚举的属性值，并以数组的形式返回这些值。这个方法让你能够更方便地遍历对象的值。

使用方法:

```javascript
const object = { a: 1, b: 'text', c: true };
const values = Object.values(object);
console.log(values); // 输出: [1, 'text', true]
```

案例:

假设你有一个对象，存储了不同动画的状态，你想要停止所有正在播放的动画，可以这样做:

```javascript
const animations = {
  walk: { /* 动画对象 */ },
  run: { /* 动画对象 */ }
};

// 停止所有动画
Object.values(animations).forEach(animation => {
  animation.stop(); // 假设每个动画对象都有一个stop方法
});
```

这样，`Object.values()`帮助你获取了 `animations`对象中所有动画的集合，然后你可以使用 `forEach`遍历这个集合，并对每个动画调用 `stop`方法。

### useAlert

新建的一个自定义Hook;

```jsx
import React from 'react'

const useAlert = () => {
  const [alert, setAlert] = React.useState({
    show: false,
    text: '',
    type: 'danger',
  })
  const showAlert = ({ text, type = 'danger' }) =>
    setAlert({ show: true, text, type })
  const hideAlert = () => setAlert({ show: false, text: '', type: 'danger' })
  return { alert, showAlert, hideAlert }
}

export default useAlert
```

在useState的基础上，新建了两个函数，这两个函数都是传入参数+setAlert进行组合；最后返回alert，升级的setAlert(也就是这两个函数)

# 案例加入

## 后处理

安装包：

```bash
npm install @react-three/postprocessing
```



## 添加自己的模型

先sketchfab上下载模型，在unity里调整位置、贴图、材质、动画，形成prefab；

利用[插件](https://github.com/Plattar/gltf-exporter?tab=readme-ov-file)，导出为gltf；"E:\PersonalCV\models\v1.142.0-unity.unitypackage"

在vite.config.ts里加入`assetsInclude: ['**/*.glb','**/*.gltf'],`

```jsx
import { useGLTF } from "@react-three/drei"
import word2D from '../assets/3d/world_2d/world_2d.gltf'

const Map2D = ({ ...props }) => {
  const gltf = useGLTF(word2D);
  const scene = gltf.scene;

  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Map2D
```

法线模型里的顶点，x的坐标都是正确数值的相反数，例如这个[模型](https://sketchfab.com/3d-models/cartoon-low-poly-world-map-e87fa1e143f84348a915b7fe1376d957)下下来就这样问题：

1. blender里，右上角切换object Mode为Edit Mode
2. A全选所有物体
3. Mesh ->Mirror->X Global
4. 按 `Ctrl + A` 并选择 `All Transforms`，应用变换

![](https://s2.loli.net/2024/09/02/mZD8AeFVyHXajiz.png)

补充，针对法线反了的，1.2.4不变，3 mesh->Normals->Flip

针对贴图反了的，PS里 图像->图像旋转->垂直旋转画布/水平翻转画布