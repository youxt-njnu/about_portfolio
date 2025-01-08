import {
  car,
  contact,
  css,
  estate,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  motion,
  mui,
  nextjs,
  nodejs,
  pricewise,
  react,
  redux,
  sass,
  snapgram,
  summiz,
  tailwindcss,
  threads,
  typescript,
} from '../assets/icons'
import { shopify, starbucks, tesla } from '../assets/images'

import {
  BoxRotate,
  Descent3D,
  Earth,
  EarthDigital,
  EarthStar,
  FoxDemo,
  MultiMedia,
  MultiMedia2,
  Particles,
  ParticlesAstronaut,
  PostprocessExp,
  PostProcessingExp,
  RickMorty,
  ShaderPattern,
  ShadowModel,
} from '../models'

import { MapboxSimple, MilkStory } from '../MapboxDemos'

import {
  BarGraph,
  CanvasDemo,
  ParametricEquation,
  randomTree,
  roughUsage,
  WebglUseage,
} from '../visualizedDemos'

import {
  CssDrawPoly,
  FloatLayout,
  HangingLayout,
  HolyGrailLayout,
  ImgLazyLoad,
  Line05,
  MultiLine,
  px10,
  SearchBtn,
  SplitLine,
  TwoBand,
  VerticalCenter,
} from '../CssScene'
// Languages: Javascript, HTML+CSS, C#, Python, SQL
// Libraries : React, Vue, ThreeJS, Cesium, Vuforia, Mapbox, Matplotlib
// Software: QGIS, Unity, Adobe Illustrator, PostgreSQL&PostGIS, drawio
// 软件类：ArcGIS、QGIS、SuperMap、ENVI、SPSS、Adobe Illustrator、Visio/Drawio
// 编程类：R、C++、C#、PostgreSQL&PostGIS、Mapbox、Bootstrap、Python
// 专业技能：ArcGIS, QGIS, Unity, PS&AI; JavaScript, Mapbox , C#, C++, Python, PostgreSQL&PostGIS PostGIS, Apifox

export const skills = [
  {
    imageUrl: css,
    name: 'CSS',
    type: 'Frontend',
  },
  {
    imageUrl: express,
    name: 'Express',
    type: 'Backend',
  },
  {
    imageUrl: git,
    name: 'Git',
    type: 'Version Control',
  },
  {
    imageUrl: github,
    name: 'GitHub',
    type: 'Version Control',
  },
  {
    imageUrl: html,
    name: 'HTML',
    type: 'Frontend',
  },
  {
    imageUrl: javascript,
    name: 'JavaScript',
    type: 'Frontend',
  },
  {
    imageUrl: mongodb,
    name: 'MongoDB',
    type: 'Database',
  },
  {
    imageUrl: motion,
    name: 'Motion',
    type: 'Animation',
  },
  {
    imageUrl: mui,
    name: 'Material-UI',
    type: 'Frontend',
  },
  {
    imageUrl: nextjs,
    name: 'Next.js',
    type: 'Frontend',
  },
  {
    imageUrl: nodejs,
    name: 'Node.js',
    type: 'Backend',
  },
  {
    imageUrl: react,
    name: 'React',
    type: 'Frontend',
  },
  {
    imageUrl: redux,
    name: 'Redux',
    type: 'State Management',
  },
  {
    imageUrl: sass,
    name: 'Sass',
    type: 'Frontend',
  },
  {
    imageUrl: tailwindcss,
    name: 'Tailwind CSS',
    type: 'Frontend',
  },
  {
    imageUrl: typescript,
    name: 'TypeScript',
    type: 'Frontend',
  },
]

export const experiences = [
  {
    title: '测绘内业工程师-实习生',
    company_name: '江苏苏海信息科技有限公司',
    icon: tesla,
    iconBg: '#fbc3bc',
    date: '2021.07-2021.08',
    points: [
      '工作：参与了“江宁一张图”的本地数据库更新工作和部分省市三调工作底图整理，完成数据整理、汇编、入库、交付沟通等工作。此外，协助经理进行日常工作维护，如数据维护、报销管理、图纸整理。',
      '收获：接触了传统测绘方向的基础数据处理和加工工作，认识到数据和数据安全的重要性。',
    ],
  },
  {
    title: '研发工程师-实习生',
    company_name: '视网么AR',
    icon: starbucks,
    iconBg: '#accbe1',
    date: '2023.07 -2023.08',
    points: [
      '背景：该公司主要业务在元宇宙、AR 方面，涵盖科教、文旅、零售等方面，并自研了AR 内容编辑器。',
      '培训协助：协助完成对南京师范大学出版社人员的视网么平台使用培训，包括现场拍照、记录和答疑。',
      '项目参与：独立完成了大国重器项目、看镜南京项目中的两个重要场景，参与了Windows 端的盾构机项目。实现了AR 内容的制作和打包，基于手机APP 端、Windows 大屏端完成了AR 内容的呈现、用户和AR 内容的交互。',
      '收获：学习了unity 使用、模型调整和打包、c# 和Lua 脚本构建等内容，了解并对AR 及元宇宙赛道产生兴趣。',
    ],
  },
  {
    title: 'Web Developer',
    company_name: '邻里邻外',
    icon: shopify,
    iconBg: '#b7e4c7',
    date: '2024.06-2024.08',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
  {
    title: '实验室科研人员',
    company_name: '数字人文与超媒体GIS实验室',
    icon: tesla,
    iconBg: '#fbc3bc',
    date: '2023.09至今',
    points: ['地图学助教', '实验室财务管理', '会议参与', '科研项目'],
  },
]

export const socialLinks = [
  {
    name: 'Contact',
    iconUrl: contact,
    link: '/contact',
  },
  {
    name: 'GitHub',
    iconUrl: github,
    link: 'https://github.com/youxt-njnu',
  },
  {
    name: 'LinkedIn',
    iconUrl: linkedin,
    link: '#',
  },
]

export const projects = [
  {
    iconUrl: pricewise,
    theme: 'btn-back-red',
    name: '徐霞客的旅行世界',
    description:
      '徐霞客的旅行世界：已发表软件著作权(2021.10 -2021.12)\n项目背景：为了更清晰、直观地展现徐霞客游历各地的足迹，为人们分析研究徐霞客及其著作提供便利。\n动态地图探索：利用了KeplerKepler.gl 制作在线电子地图页面用于嵌入系统，采用热力图、三维柱状图、OD 流和时间轴实现时空动态可视化；\n网页制作和整合：基于HTML 、CSS 、BootStrap 搭建框架，使用supermap iclient for leaflet 构建地图和数据，借助SuperMapSuperMap.iserver 的数据服务、SQL 属性表查询和交通网络分析APIAPI，完成了POI 信息查询界面和出行路径规划界面',
    link: 'https://github.com/youxt-njnu/XuXiaKe',
  },
  {
    iconUrl: snapgram,
    theme: 'btn-back-pink',
    name: '土壤图斑识别与属性预测系统',
    description:
      '土壤图斑识别与属性预测系统：C#与GIS二次开发结课作业(2021.10 -2021.12) \n基于dotspatial 进行C# .net 开发，搭建了三层架构实现了项目整合，并完成几乎所有基础GIS 功能和相关性分析及可视化模块。此外，协助完成了需求分析 概要设计,详细设计,功能实现, 技术文档撰写，锻炼了系统思维和沟通协作能力。',
    link: 'https://github.com/youxt-njnu/ProjectSnapshot/blob/master/c%23%E4%B8%8EGIS%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91-%E5%9C%9F%E5%A3%A4%E5%9B%BE%E6%96%91%E8%AF%86%E5%88%AB%E4%B8%8E%E5%B1%9E%E6%80%A7%E9%A2%84%E6%B5%8B%E7%B3%BB%E7%BB%9F.pdf',
  },
  {
    iconUrl: threads,
    theme: 'btn-back-green',
    name: '图说中国乳业发展',
    description:
      '图说中国乳业发展：地图设计与电子地图学结课作业(2022.04-2022.06) \n项目背景：以乳业发展全况分析可视化为目标，实现对中国乳业发展全方位、多维度、多形式的表达和分析。数据查找及整理：通过多渠道获取乳业工厂点数据、品牌发展情况数据和地方奶业供需数据，进行预处理、时间轴梳理和坐标空间化；\n时空分析和可视化：使用交互流图、热点图、热力图、折线图、 3D柱状图等形式，结合空间冷热点分析，从时空角度，对乳业发展情况进行分析和可视化；\n网页制作与整合：使用Mapbox 为地图JS 库，基于JS, 结合Bootstrap 、Echarts 等进行网页开发，实现交互式效果。通过“故事地图”“工厂分布”“品牌发展”“供需分析”四个模块的设计和整合，得到最终实验成果，完成整个网页框架的开发。',
    link: 'https://github.com/youxt-njnu/Milk',
  },
  {
    iconUrl: car,
    theme: 'btn-back-blue',
    name: '清史GIS系统',
    description:
      '清史GIS 系统：WebGIS 服务结课作业(2022.10 -2022.12)\n采用Axure 进行原型设计，在QGIS 平台中完成数据处理，基于postgresql 数据库进行数据存储，利用geoserver进行数据发布，并学习Jquery 、Ajax 、httphttp-server 完成前后端交互和跨域数据访问，最后基于openlayer 、Mapbox 进行地图渲染，使用echarts 进行图表可视化。',
    link: 'https://github.com/youxt-njnu/hgisworkHD',
  },
  {
    iconUrl: summiz,
    theme: 'btn-back-yellow',
    name: 'Flappy Bird',
    description:
      'Xlua重写Flappy Bird的原始c#游戏逻辑(2023.08-2023.09)\nFlappy Bird is a mobile game developed by Vietnamese video game artist and programmer Dong Nguyen. The game is a side-scroller where the player controls a bird, attempting to fly between columns of green pipes without hitting them.',
    link: 'https://github.com/youxt-njnu/flappy_bird_xlua',
  },
  {
    iconUrl: estate,
    theme: 'btn-back-black',
    name: '南京安全区AR故事地图',
    description:
      '漫漫长夜中的人性之光：南京安全区AR故事地图(2023.12-2024.06)\n 通过文献数字化、GIS及AR、游戏引擎等技术，从“时空数据库构建及信息梳理—数字制图与地图设计——AR故事地图交互”三个层面进行南京安全区历史记忆的时空构建，研制AR故事地图，导引社会公众重启约翰·拉贝等国际友人的救助历程，重温这段黑暗历史中闪耀的人性之光',
    link: 'https://mp.weixin.qq.com/s?__biz=MzU4MTc2MDAyNg==&mid=2247484289&idx=1&sn=ca9ab0ac73791c6a453b5d0364130248&chksm=fc6d6a49da4532c55ff74676bd34092d37bd742f1ee040c1740ca72043ab6e9050428ac70ce1&scene=126&sessionid=1724225266#rd',
  },
]

const prefix = ''
export const arts = [
  {
    name: 'postprocessLut',
    img: 'https://s2.loli.net/2024/10/17/HrfLEsU4zydXaAt.png',
    path: prefix + 'bird',
    component: PostProcessingExp, // 自己写的react-three-fiber组件
    type: '测试1',
    info: '自己写的react-three-fiber组件',
  },
  {
    name: '地球',
    img: 'https://s2.loli.net/2024/10/17/yexj6A8cqVvMKDN.png',
    path: prefix + 'sky',
    component: Earth, // js很多文字的react组件
    type: '贴图',
    info: '地球自转和月球公转',
  },
  {
    name: '狐狸',
    img: 'https://s2.loli.net/2024/08/05/hBc1om3X5euCRkt.png',
    path: prefix + 'fox', //导入用react-three-fiber创建的模型组件,加工后的组件
    component: FoxDemo,
    type: '动画',
    info: '含动画的狐狸模型',
  },
  {
    name: '大屏',
    img: 'https://dragonir.github.io/3d/static/media/earthDigital.8c221282f247bb724b85.png',
    path: prefix + 'earth-digital', //导入用threejs写的组件
    component: EarthDigital,
    type: '综合',
    info: '3D地球，shader、飞线、动画...',
  },
  {
    name: '数字地球星空',
    img: 'https://s2.loli.net/2024/10/05/Ypj16zckvyd78Do.png',
    path: prefix + 'earth-moving',
    component: EarthStar,
    type: '几何模型',
    info: 'geometry，贴图，构建场景及动画',
  },
  {
    name: '光影人物',
    img: 'https://s2.loli.net/2024/10/05/WiUuGJ3CbnagLc6.png',
    path: prefix + 'light-model',
    component: ShadowModel,
    type: '模型和光影',
    info: '光影、人物、页面切换和鼠标特效',
  },
  {
    name: '降落城市',
    img: 'https://s2.loli.net/2024/11/18/16FgOsBTyM8NntV.png',
    path: prefix + 'descent-3d',
    component: Descent3D,
    type: 'ShaderToy',
    info: '基于ShaderToy实现的3D降落城市',
  },
  {
    name: '旋转盒子',
    img: 'https://s2.loli.net/2024/11/29/53zmKr7wkDXvEOV.png',
    path: prefix + 'box-rotate',
    component: BoxRotate,
    type: 'rotate',
    info: '几何体的旋转和动画',
  },
  {
    name: '多媒体探索',
    img: 'https://s2.loli.net/2024/11/29/xOVH39vBsNUohSE.png',
    path: prefix + 'multimedia',
    component: MultiMedia,
    type: 'multimedia',
    info: '第一人称视角，添加文字、图片、语音',
  },
  {
    name: '多媒体交互',
    img: 'https://s2.loli.net/2024/11/29/oHnINiSMd9mua7z.png',
    path: prefix + 'multimedia2',
    component: MultiMedia2,
    type: 'multimedia',
    info: 'gltf加载draco压缩模型，视频贴图和用户交互',
  },
  {
    name: '粒子球',
    img: 'https://s2.loli.net/2024/11/29/D48EJRLzi5kofpw.png',
    path: prefix + 'particle',
    component: Particles,
    type: 'particle',
    info: '不同粒子效果展示',
  },
  {
    name: '宇航员迷失',
    img: 'https://s2.loli.net/2024/11/29/36QACaqtnJ5FHyX.png',
    path: prefix + 'astronaut-particle',
    component: ParticlesAstronaut,
    type: 'particle',
    info: '模型、粒子、动画',
  },
  {
    name: '后处理方块',
    img: 'https://s2.loli.net/2024/11/29/MUL51g9qBvkbtiO.png',
    path: prefix + 'postprocess-box',
    component: PostprocessExp,
    type: '',
    info: '',
  },
  {
    name: 'RickMorty',
    img: 'https://s2.loli.net/2024/11/29/Sfsr5BiyhOXI7mc.png',
    path: prefix + 'rick-morty',
    component: RickMorty,
    type: '',
    info: '',
  },
  {
    name: 'ShaderPattern',
    img: 'https://s2.loli.net/2024/11/29/19j8O2X3ofJuT7F.png',
    path: prefix + 'shader-pattern',
    component: ShaderPattern,
    type: '',
    info: '',
  },
]

export const mapboxDemos = [
  {
    name: '简单入门',
    img: 'https://s2.loli.net/2024/10/17/OsrIyLWMmZ6Ezpk.png',
    path: prefix + 'mapbox-simple',
    component: MapboxSimple,
    type: '简单入门',
    info: '地图呈现、拖动等交互',
  },
  {
    name: '乳业发展叙事',
    img: 'https://s2.loli.net/2024/11/08/tDnLboVM1TEu47K.png',
    path: prefix + 'milk-story',
    component: MilkStory,
    type: '地图叙事',
    info: '对中国乳业发展进行时空叙事',
  },
]

export const visualizeDemos = [
  {
    name: 'html+css 柱状图饼图',
    img: 'https://s2.loli.net/2024/11/16/KmZYDPr6bvtiW5V.png',
    path: prefix + 'bar-pie',
    component: BarGraph,
    type: 'html+css',
    info: '柱状图和饼图',
  },
  {
    name: 'CanvasDemo',
    img: 'https://s2.loli.net/2024/11/26/A7GhwiavVftz2P3.png',
    path: prefix + 'canvas-demo',
    component: CanvasDemo,
    type: 'canvas',
    info: '使用canvas进行绘图',
  },
  {
    name: 'WebglUseage',
    img: '',
    path: prefix + 'webgl-useage',
    component: WebglUseage,
    type: 'webgl',
    info: '使用webgl进行绘图的代码流',
  },
  {
    name: 'roughUsage',
    img: 'https://s2.loli.net/2024/12/14/HNgQxS9EdbOqKnF.png',
    path: prefix + 'rough-usage',
    component: roughUsage,
    type: 'rough库',
    info: '手绘风格绘制，坐标系变换',
  },
  {
    name: 'randomTree',
    img: 'https://s2.loli.net/2024/12/14/EipXTY8VClbhZ2R.png',
    path: prefix + 'random-tree',
    component: randomTree,
    type: 'vector2d',
    info: '构造vector2d类进行绘制',
  },
  {
    name: 'ParametricEquation',
    img: '',
    path: prefix + 'parametric-equation',
    component: ParametricEquation,
    type: 'parametric',
    info: '参数方程绘制不同曲线',
  },
]

export const cssLayouts = [
  {
    name: '圣杯布局',
    img: 'https://s2.loli.net/2024/11/06/ozbCSmLM4FHTfXn.png',
    path: prefix + 'holy-grail',
    component: HolyGrailLayout,
    type: 'flex布局',
    info: '圣杯布局',
  },
  {
    name: '悬挂布局',
    img: 'https://s2.loli.net/2024/11/06/PnIGVfoybwmxq1e.png',
    path: prefix + 'hanging',
    component: HangingLayout,
    type: 'flex布局',
    info: '图片和文字的悬挂布局',
  },
  {
    name: '流式布局',
    img: 'https://s2.loli.net/2024/11/06/ZWJEAH8I9XdKyzl.png',
    path: prefix + 'float',
    component: FloatLayout,
    type: 'flex布局',
    info: 'flex wrap和flex content使用',
  },
  {
    name: '分割线',
    img: 'https://s2.loli.net/2024/11/08/KTBDMSPIRjyZtxr.png',
    path: prefix + 'split-line',
    component: SplitLine,
    type: '伪元素',
    info: '利用::before, ::after',
  },
  {
    name: '图片加载优化',
    img: 'https://s2.loli.net/2024/11/16/kpwcFnbIV64gJlo.png',
    path: prefix + 'img-load',
    component: ImgLazyLoad,
    type: '场景',
    info: '多图片加载性能优化方案',
  },
  {
    name: '水平垂直居中',
    img: 'https://s2.loli.net/2024/11/16/chJoFXtiAQOIZ24.png',
    path: prefix + 'vertical-center',
    component: VerticalCenter,
    type: 'css',
    info: '多种方式实现水平垂直居中',
  },
  {
    name: '10px字体',
    img: 'https://s2.loli.net/2024/11/16/6UAxNLktFWEp19D.png',
    path: prefix + 'px10',
    component: px10,
    type: 'css',
    info: '10px大小的字体',
  },
  {
    name: '多行文本溢出',
    img: 'https://s2.loli.net/2024/11/16/STwlbGxRraoVyvt.png',
    path: prefix + 'multi-line',
    component: MultiLine,
    type: 'css',
    info: '多行文本溢出',
  },
  {
    name: '自适应搜索框',
    img: 'https://s2.loli.net/2024/11/16/TGhwNUIS4juCtAP.png',
    path: prefix + 'search-btn',
    component: SearchBtn,
    type: 'css',
    info: '自适应搜索框',
  },
  {
    name: '两栏布局',
    img: 'https://s2.loli.net/2024/11/27/jt7IVgvzb5Scuk8.png',
    path: prefix + 'two-band',
    component: TwoBand,
    type: 'css',
    info: '两栏布局',
  },
  {
    name: '0.5px线',
    img: 'https://s2.loli.net/2024/11/27/m5CWc6qbVNaH9GJ.png',
    path: prefix + 'line05',
    component: Line05,
    type: 'css',
    info: '0.5px线+禁止右键菜单等',
  },
  {
    name: '多边形绘制',
    img: 'https://s2.loli.net/2024/11/16/m8LDxkrKYtHVG94.png',
    path: prefix + 'draw-poly',
    component: CssDrawPoly,
    type: 'css',
    info: 'CSS画三角形和平行四边形',
  },
]
