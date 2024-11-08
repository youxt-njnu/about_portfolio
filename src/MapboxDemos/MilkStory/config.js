import firstPeriod from './images/first period.jpeg' // .也可以写成@/MapboxDemos/MilkStory
import hui from './images/hui.jpeg'
import naiPiao from './images/naipiao.jpg'
import qinDao from './images/qindiao.png'
import quanqiu from './images/quanqiu.jpeg'
import qqh from './images/quanqiuhua.jpeg'
import sjqa from './images/sanjuqingan.png'
import sanYuan from './images/sanyuan.png'
import syss from './images/sanyuanshangshi.jpeg'
import shangshi from './images/shangshi.jpeg'
import stage2 from './images/stage2.png'
import thankYou from './images/Thankyou.jpeg'
import zhiliang from './images/zhiliang.jpeg'

const accessToken =
  'pk.eyJ1IjoibGlua2xpbmsiLCJhIjoiY2t5azNveG05MnRwdTJ4bzhxM2JmNGg3aCJ9.giuzL5T9qkSSl9EWMUK9dg'

const mapStyles = [
  'mapbox://styles/linklink/cm2v9ot6s00fu01pwfs3q147j',
  'mapbox://styles/linklink/cm2fmcw0200bb01ph6edf69ne',
  'mapbox://styles/linklink/cl097w45i001o15mueqt9chmp',
]

//是滚动文字栏的具体内容
const scrollInfos = {
  style: mapStyles[0],
  showMarkers: false,
  markerColor: '#3FB1CE',
  //projection: 'equirectangular',
  //Read more about available projections here
  //https://docs.mapbox.com/mapbox-gl-js/example/projections/
  inset: true,
  theme: 'dark',
  use3dTerrain: false, //set true for enabling 3D maps.
  title: '中 国 乳 业 百 年 路',
  byline:
    '自有文字以来，中国古籍中屡有关于乳的记载。至唐朝时，食用乳制品已比较普遍。虽然我国饲养奶畜、食用乳和乳制品的历史很悠久，但作为商品的奶业也不过一百多年的历史。\n\n在这短短一百年里，中国乳业实现了从无到有，从有到强的伟大跨越。看得见的是乳业的腾飞，看不见的是国家政府、一代代民族企业家和广大人民的努力与坚持。\n\n接下来，让我们将一起回到上世纪初的中国，跟随着时间的步伐，回顾这段中国乳业发展的奋斗史。',
  footer:
    'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
  chapters: [
    {
      id: 'first-period',
      alignment: 'fully',
      hidden: false,
      title: '上世纪初至七十年代',
      description: '"雄关漫道真如铁，而今迈步从头越。"',
      image: firstPeriod,
      location: {
        center: [122.418398, 34.759483],
        zoom: 4.5,
        pitch: 0,
        bearing: 0,
      },
      mapType: 0,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        // {
        //     layer: 'layer-name',
        //     opacity: 1,
        //     duration: 5000
        // }
      ],
      onChapterExit: [
        // {
        //     layer: 'layer-name',
        //     opacity: 0
        // }
      ],
    },
    {
      id: 'qindiao',
      alignment: 'right',
      hidden: false,
      title: '百好乳业：擒雕牌炼乳',
      image: qinDao,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;百好乳业创建于1926年的浙江瑞安，是中国乳品工业的旗帜。<br/>&nbsp;&nbsp;&nbsp;&nbsp;在二十年代的中国市场上，国产炼乳加工业还是个空白，而英帝国纳司尔英瑞公司生产的飞鹰牌炼乳却随处可见。在兴办国货、创立实业的“五四”爱国精神鼓舞下，实业家吴百亨先生独资创办了中国第一家炼乳厂——百好乳品厂，与之相抗衡。</br>&nbsp;&nbsp;&nbsp;&nbsp;他是中国公认的乳品工业之父，打破了外商垄断我国炼乳市场的局面。</br>&nbsp;&nbsp;&nbsp;&nbsp;英瑞公司大为光火，欲用卑劣的手法破坏“白日擒雕”炼乳的声誉，接着又提出用10万收买“白日擒雕”商标权。而吴百亨先生回应：“我办百好厂，是为兴办国货，‘白日擒雕’商标权我绝不出卖。”，捍卫了国货商标的尊严，大长了中国人民的志气。',
      location: {
        center: [120.922941, 27.893666],
        zoom: 10,
        pitch: 0,
        bearing: 0,
      },
      mapType: 1,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'sanyuan',
      alignment: 'left',
      hidden: false,
      title: '三元乳业',
      image: sanYuan,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;新中国成立之初，百废待兴，乳业起步维艰。北京市委、市政府把乳业列入经济发展计划，努力增加牛奶供应。<br/>&nbsp;&nbsp;&nbsp;&nbsp;1949年5月，老红军樊士成从革命老区西柏坡带着三头奶牛来到北京，这就是北京奶业的开端。<br/>&nbsp;&nbsp;&nbsp;&nbsp;1956年3月1日，国营北京市牛奶站正式成立。这就是北京三元食品股份有限公司的前身。',
      location: {
        center: [116.489303, 39.923409],
        zoom: 10,
        pitch: 8.01,
        bearing: 0.0,
      },
      mapType: 1,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'first_conclusion',
      alignment: 'fully',
      hidden: false,
      title: '',
      image: naiPiao,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;当时的牛奶是当之无愧的“奢侈品”。建国后，大城市里牛奶供给新生婴儿等特殊人群都不够，而对于广大农村地区来说，牛奶是非常遥远的存在。<br/>&nbsp;&nbsp;&nbsp;&nbsp;1958年毛主席和周总理嘱咐“要抓好牛奶生产，增加奶品供应，解决百姓特别是孩子的吃奶问题”。奶牛饲养纳入国家计划管理，我国奶业开始恢复生产。<br/>&nbsp;&nbsp;&nbsp;&nbsp;-------下拉后可以点击气泡查看详情------',
      location: {
        center: [116.418398, 34.759483],
        zoom: 4.5,
        pitch: 8.01,
        bearing: 0.0,
      },
      mapType: 0,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'first_map',
      alignment: 'right',
      hidden: true,
      location: {
        center: [114.418398, 34.759483],
        zoom: 4.5,
        pitch: 8.01,
        bearing: 0.0,
      },
      mapType: 0,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'second-stage',
      alignment: 'fully',
      hidden: false,
      image: stage2,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;1949年-1978年，中国奶业恢复发展，改造、扩建和新建加工企业。至1978年，年产奶量达到97万吨，处于中低速爬坡期。<br/>&nbsp;&nbsp;&nbsp;&nbsp;改革开放带来了国内奶类消费市场迅速扩大，同时也刺激了奶类生产，从按需分配、计划时代逐渐走上了市场经济的时代。那些凭票买奶、奶牛进城、无消毒的牛奶悄然退出了生活的舞台，随之而来的是种目繁多、琳琅满目的牛奶，以及日渐扩大的市场。<br/>&nbsp;&nbsp;&nbsp;&nbsp;1978年改革开放启动了“国营、集体、个体”一起发展的先河，我国奶业步入跨越式发展阶段。<br/>&nbsp;&nbsp;&nbsp;&nbsp;在此期间，以本地厂家为主的“小而散”的市场格局逐步难以适应发展，开始打造全国性地乳业品牌。',
      location: {
        center: [113.586506, 34.751115],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapType: 2,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'zhengce',
      alignment: 'right',
      title: '政策支持',
      hidden: false,
      image: zhiliang,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;1984年7月，由国家经济委员会公告发布，首次将乳制品工业作为主要行业发展方向和重点，列入《1991年至2000年全国食品工业发展纲要》。',
      location: {
        center: [116.70918, 40.142585],
        zoom: 7,
        pitch: 0,
        bearing: 0,
      },
      mapType: 2,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'yilishangshi',
      alignment: 'left',
      title: '伊利上市',
      hidden: false,
      image: shangshi,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;1996年3月12日,伊利股份在上交所挂牌上市，成为中国乳业行业首家A股上市公司，牛奶不再是“奢侈品”，走进了千家万户。',
      location: {
        center: [111.74918, 40.842585],
        zoom: 10,
        pitch: 0,
        bearing: 0,
      },
      mapType: 2,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'chengli',
      alignment: 'fully',
      title: '市场转型下的酝酿',
      hidden: false,
      image: hui,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;1990年至1995年，国内消费品市场开始从卖方市场逐步向买方市场转换的过程中，与当时感性和冲动的消费行为相对应，这一时期的中国企业对营销的理解是非理性的，而且显得盲目躁动和急于事功，也导致乳品行业混乱的无序发展。<br/>&nbsp;&nbsp;&nbsp;&nbsp;1990年5月，在全国大中城市重点垦区奶业经济技术发展研讨会上，正式成立了“全国大中城市乳业协会”（即“中国乳业协会”前身）。<br/>&nbsp;&nbsp;&nbsp;&nbsp;1992年1月，中国乳协第一次代表大会暨首届年会在北京召开。<br/>&nbsp;&nbsp;&nbsp;&nbsp;-------下拉后可以点击气泡查看详情------',
      location: {
        center: [113.586506, 34.751115],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapType: 2,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'second-map',
      alignment: 'left',
      title: '',
      hidden: true,
      image: hui,
      location: {
        center: [113.586506, 34.751115],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapType: 2,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'third-stage',
      alignment: 'fully',
      title: '21世纪后',
      hidden: false,
      image: quanqiu,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;在新世纪中，中国乳业蓬勃发展，也遇到了许多新的挑战。三聚氰胺事件使中国乳业吸取了教训，完成了从追求效益到追求质量、坚持人民至上的商业理念转型。中国乳业也在走向全球化，不仅是商品销往国外，更有与众多机构的合作、给处于危境中的国家提供帮助。<br/>&nbsp;&nbsp;&nbsp;&nbsp;世界正在看见中国乳业的力量。',
      location: {
        center: [113.586506, 34.751115],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapType: 3,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'sanyuan2',
      alignment: 'right',
      title: '三元食品领军',
      hidden: false,
      image: syss,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;1984年，三元生产出国内的第一杯工业化酸奶；<br/>&nbsp;&nbsp;&nbsp;&nbsp;1985年生产出第一块工业化奶酪，改变我国奶酪依靠进口的历史；<br/>&nbsp;&nbsp;&nbsp;&nbsp;1997年生产第一包早餐奶，乳业市场进入细分时代；<br/>&nbsp;&nbsp;&nbsp;&nbsp;1997年整合优质奶业资源和麦当劳50%权益后，北京三元食品有限公司成立，作为北京控股有限公司成员在香港上市，标志着三元食品进入了现代乳业发展新阶段。',
      location: {
        center: [116.74918, 40.842585],
        zoom: 7,
        pitch: 0,
        bearing: 0,
      },
      mapType: 3,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'sanju',
      alignment: 'left',
      title: '三聚氰胺事件',
      hidden: false,
      image: sjqa,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;2008年，三聚氰胺事件重创中国乳业，消费者对国产奶粉的信任崩塌。这次食品安全事故导致多名食用三鹿集团生产的婴幼儿奶粉的婴儿被发现患有肾结石。<br/>&nbsp;&nbsp;&nbsp;&nbsp;事件引起各国的高度关注和对乳制品安全的担忧。中国国家质检总局公布对国内的乳制品厂家生产的婴幼儿奶粉的三聚氰胺检验报告后，事件迅速恶化，包括伊利、蒙牛、光明、圣元及雅士利在内的多个厂家的奶粉都检出三聚氰胺。该事件亦重创中国制造商品信誉，多个国家禁止了中国乳制品进口。',
      location: {
        center: [114.586506, 38.151115],
        zoom: 7,
        pitch: 0,
        bearing: 0,
      },
      mapType: 3,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'international',
      alignment: 'fully',
      title: '中国乳业拥抱全球化',
      hidden: false,
      image: qqh,
      description:
        '<br/>&nbsp;&nbsp;&nbsp;&nbsp;-------下拉后可以鼠标放在迁徙线上查看详情------',
      location: {
        center: [113.586506, 34.751115],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapType: 3,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'third-map',
      alignment: 'fully',
      hidden: true,
      location: {
        center: [114.586506, 38.151115],
        zoom: 3,
        pitch: 0,
        bearing: 0,
      },
      mapType: 4,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'Thankyou',
      alignment: 'fully',
      title: '感谢观看！',
      hidden: false,
      image: thankYou,
      description:
        '&nbsp;&nbsp;&nbsp;&nbsp;百年乳业，代代传承；再创辉煌，还看今朝。<br/>&nbsp;&nbsp;&nbsp;&nbsp;时光机就到这里了，请移步其它板块继续浏览今天的中国乳业发展故事。',
      location: {
        center: [113.586506, 34.751115],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapType: 0,
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
}

export { accessToken, mapStyles, scrollInfos }
