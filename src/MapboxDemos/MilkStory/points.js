//记录气泡点要素
import bs from './images/bashi.png'
import bfg from './images/bifengtang.jpeg'
import guangMing from './images/guangming.png'
import gz from './images/guangze.png'
import hongXing from './images/hongxing.png'
import qinDao from './images/qindiao.png'
import sjqa from './images/sanjuqingan.png'
import sanYuan from './images/sanyuan.png'
import sy2 from './images/sanyuan2.jpeg'
import syss from './images/sanyuanshangshi.jpeg'
import ss from './images/shangshi.jpeg'
import song from './images/song.png'
import wds from './images/wandashan.png'
import wg from './images/weigang.png'
import wsg from './images/wushilan.jpeg'
import xxn from './images/xiaoxiniu.jpeg'
import xyc from './images/xiyuchun.png'
import yl from './images/yili.jpeg'
import yzy from './images/youzhiyou.jpeg'

var geojson1 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [120.722941, 27.793666],
      },
      properties: {
        title: '百好乳业：擒雕牌炼乳',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;创建于1926年的浙江瑞安。<br/>&nbsp;&nbsp;&nbsp;&nbsp;是中国乳品工业的旗帜，打破了外商垄断我国炼乳市场的局面。',
        image: qinDao,
        imageHeight: 170,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [116.489303, 39.923409],
      },
      properties: {
        title: '三元乳业',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;新中国成立之初，百废待兴，乳业起步维艰。北京市委、市政府把乳业列入经济发展计划，努力增加牛奶供应。<br/>&nbsp;&nbsp;&nbsp;&nbsp;1949年5月，老红军樊士成从革命老区西柏坡带着三头奶牛来到北京，这就是北京奶业的开端。<br/>&nbsp;&nbsp;&nbsp;&nbsp;1956年3月1日，国营北京市牛奶站正式成立。这就是北京三元食品股份有限公司的前身。',
        image: sanYuan,
        imageHeight: 130,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [121.419303, 30.923409],
      },
      properties: {
        title: '光明乳业：光明牌全脂奶粉',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;创建于1952年的上海。<br/>&nbsp;&nbsp;&nbsp;&nbsp;诞生于十里洋场的光明，最初为了宣传改装了一辆汽车。车头贴着“光明问世”四个大字和火炬形商标，车上的几名工人用大喇叭向路人宣传：“国营工厂是人民的工厂，请食用自己工厂的产品。”<br/>&nbsp;&nbsp;&nbsp;&nbsp;汽车缓缓开过上海的繁华路段，一举成名。',
        image: guangMing,
        imageHeight: 200,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [129.589303, 44.603409],
      },
      properties: {
        title: '红星乳业：红星奶粉',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;创建于1952年的牡丹江。<br/>&nbsp;&nbsp;&nbsp;&nbsp;上世纪50-80年代就开始出口国外，被誉为中国乳品业的摇篮。',
        image: hongXing,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [118.847752, 32.046235],
      },
      properties: {
        title: '卫岗牧场',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;1928年，国民政府在南京东郊卫岗建立了国民革命军遗族学校，由宋氏姐妹负责管理。宋氏姐妹深受孙中山先生“博爱民生”的思想影响，用行动扮演着“妈妈”的角色，把那些战争下的遗孤都当作自己的孩子。<br/>&nbsp;&nbsp;&nbsp;&nbsp;与此同时，为了给他们营造一个更好的成长与生活环境，宋氏姐妹从国外引入75头荷斯坦奶牛,以此形成了卫岗乳业的前身。<br/>&nbsp;&nbsp;&nbsp;&nbsp;作为彼时全国第一家也是唯一一家由国民政府创办的奶牛场，宋氏姐妹对卫岗牧场的创建始终亲力亲为，她们采取了许多西方的先进理念并用于牧场管理。',
        image: song,
        imageHeight: 130,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [87.419303, 43.923409],
      },
      properties: {
        title: '西域春乳业',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;创建于1955年的乌鲁木齐。<br/>&nbsp;&nbsp;&nbsp;&nbsp;初期主要是发展畜牧业，以解决首府各族人民的饮奶需要。<br/>&nbsp;&nbsp;&nbsp;&nbsp;在乌鲁木齐人记忆中，西域春牛奶几乎伴随了几代人的成长。从60年代初开始,西域春牛奶就出现在千家万户的餐桌上。',
        image: xyc,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [126.686109, 45.738561],
      },
      properties: {
        title: '完达山乳业',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;创建于1958年的完达山。<br/>&nbsp;&nbsp;&nbsp;&nbsp;当时时任农垦部部长的王震将军率10万转业官兵开发建设北大荒。根据开国领袖毛泽东“让娃娃们长高一寸”的美好愿望，1963年，在周恩来总理的帮助下从北京、上海调运了750头奶牛，在完达山脚下建立了八五一一农场奶牛养殖示范基地。',
        image: wds,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [110.9736, 41.1272],
      },
      properties: {
        title: '伊利乳业',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;创建于1956年的呼和浩特。<br/>&nbsp;&nbsp;&nbsp;&nbsp;当时成立的名称叫做呼和浩特回民区养牛合作小组，这就是伊利乳业集团的前身。',
        image: yl,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [116.308198, 39.869373],
      },
      properties: {
        title: '巴氏低温消毒奶',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;1952年,李贻赞研制出巴氏低温消毒奶。<br/>&nbsp;&nbsp;&nbsp;&nbsp;这结束了北京没有消毒牛奶的历史。这种消毒方法现仍在“三元”牛奶的加工程序中使用。',
        image: bs,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [117.318198, 39.259373],
      },
      properties: {
        title: '质量标准制订',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;1958年8月，轻工业部食品工业局颁布《乳、乳制品质量标准及检验方法》。<br/>&nbsp;&nbsp;&nbsp;&nbsp;该标准是最早的国家级部颁标准。',
        image: gz,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
  ],
}

var geojson2 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [111.74918, 40.842585],
      },
      properties: {
        title: '伊利股份上市',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;1996年3月12日,伊利股份在上交所挂牌上市，成为中国乳业行业首家A股上市公司。<br/>&nbsp;&nbsp;&nbsp;&nbsp;牛奶不再是“奢侈品”，走进了千家万户。',
        image: ss,
        imageHeight: 120,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [118.847752, 32.046235],
      },
      properties: {
        title: '卫岗乳业',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;在1949年至1983年期间，卫岗先后经历了部队接管、政府有关部门托管、公私合营、国营等社会主义改造，逐步由一个作坊式的企业发展成为集奶牛生产、乳品加工、市场销售为一体的牛奶专营企业。',
        image: wg,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [121.586506, 38.151115],
      },
      properties: {
        title: '广泽乳业',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;广泽乳业成立于2001年，恒牛乳业是它的前身。',
        image: gz,
        imageHeight: 170,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [116.70918, 40.142585],
      },
      properties: {
        title: '三元乳业',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;1997年整合优质奶业资源和麦当劳50%权益后北京三元食品有限公司成立，作为北京控股有限公司成员在香港上市，标志着三元食品进入了现代奶业发展新阶段；2001年改制成为北京三元食品股份有限公司；2003年在上海证券交易所挂牌上市。',
        image: sy2,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [114.70918, 30.142585],
      },
      properties: {
        title: '避风塘奶茶',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;1998年6月4日，上海避风塘茶楼有限公司在上海江宁路99号以“避风塘”为字号，开出第一家上海避风塘茶楼江宁店。<br/>&nbsp;&nbsp;&nbsp;&nbsp;这是大陆地区现代第一家连锁的奶茶店，自此，乳制品中的奶茶产品赛道正式诞生了。',
        image: bfg,
        imageHeight: 100,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [110.586506, 31.151115],
      },
      properties: {
        title: '友芝友乳业',
        description: '&nbsp;&nbsp;&nbsp;&nbsp;友芝友乳业成立于1998年。',
        image: yzy,
        imageHeight: 200,
        imageWidth: 200,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [123.586506, 23.151115],
      },
      properties: {
        title: '50岚奶茶',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;50岚，自1994年始于台南德兴路路边的一个小摊子。',
        image: wsg,
        imageHeight: 200,
        imageWidth: 180,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [101.586506, 36.751115],
      },
      properties: {
        title: '小西牛',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;青海小西牛生物乳业股份有限公司成立于2002年。',
        image: xxn,
        imageHeight: 200,
        imageWidth: 200,
      },
    },
  ],
}

var geojson3 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [114.586506, 38.151115],
      },
      properties: {
        title: '三聚氰胺事件',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;2008年，三聚氰胺事件重创中国乳业，消费者对国产奶粉的信任崩塌。这次食品安全事故导致多名食用三鹿集团生产的婴幼儿奶粉的婴儿被发现患有肾结石。<br/>&nbsp;&nbsp;&nbsp;&nbsp;事件引起各国的高度关注和对乳制品安全的担忧。中国国家质检总局公布对国内的乳制品厂家生产的婴幼儿奶粉的三聚氰胺检验报告后，事件迅速恶化，包括伊利、蒙牛、光明、圣元及雅士利在内的多个厂家的奶粉都检出三聚氰胺。该事件亦重创中国制造商品信誉，多个国家禁止了中国乳制品进口。',
        image: sjqa,
        imageHeight: 170,
        imageWidth: 220,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [116.74918, 40.842585],
      },
      properties: {
        title: '三元食品',
        description:
          '&nbsp;&nbsp;&nbsp;&nbsp;1984年，三元生产出国内的第一杯工业化酸奶；<br/>&nbsp;&nbsp;&nbsp;&nbsp;1985年生产出第一块工业化奶酪，改变我国奶酪依靠进口的历史；<br/>&nbsp;&nbsp;&nbsp;&nbsp;1997年生产第一包早餐奶，乳业市场进入细分时代；<br/>&nbsp;&nbsp;&nbsp;&nbsp;1997年整合优质奶业资源和麦当劳50%权益后，北京三元食品有限公司成立，作为北京控股有限公司成员在香港上市，标志着三元食品进入了现代乳业发展新阶段。',
        image: syss,
        imageHeight: 120,
        imageWidth: 220,
      },
    },
  ],
}

var geojson4 = {
  type: 'FeatureCollection',
  features: [],
}

const geojsonSource = [null, geojson1, geojson2, geojson3, geojson4]

export default geojsonSource
