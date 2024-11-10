var convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = geoCoordMap[dataItem[0].name]
    var toCoord = geoCoordMap[dataItem[1].name]
    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[0].name,
        toName: dataItem[1].name,
        coords: [fromCoord, toCoord],
      })
    }
  }
  return res
}

var geoCoordMap = {
  //在地图上显示的乳业的坐标信息
  蒙牛: [111.52, 40.05],
  伊利: [111.8154, 40.2584],
  光明: [121.0823, 31.2568],
  君乐宝: [114.6992, 37.7682],
  飞鹤: [123.1162, 46.2004],
  贝因美: [123.95, 47.33],
  优然牧业: [111.5435, 41.5439],
  健合: [113.3582, 23.0701],
  新希望乳业: [103.1238, 31.1216],
  现代牧业: [118.23, 31.8],
  李子园: [99.9199, 25.4663],
  香港: [114.2, 22.14],
  甘肃: [103.27, 36.74],
  青海: [101.77, 36.32],
  乌鲁木齐: [87.9236, 43.5883],
  新西兰: [177.4648, -40.2891],
  法国: [1, 47],
  俄罗斯: [257.5, 68.2],
  澳大利亚: [117.3896, -30.6628],
  哈佛: [286.0, 42.22],
  塞拉利昂: [-10.15, 8.21],
}

var MNData1 = [[{ name: '蒙牛' }, { name: '澳大利亚', value: 66 }]]

var MNData2 = [
  [{ name: '蒙牛' }, { name: '俄罗斯', value: 66 }],
  [{ name: '蒙牛' }, { name: '新西兰', value: 66 }],
]

var XXWData1 = [
  [{ name: '新希望乳业' }, { name: '甘肃', value: 66 }],
  [{ name: '新希望乳业' }, { name: '青海', value: 66 }],
]

var JLBData1 = [[{ name: '君乐宝' }, { name: '香港', value: 66 }]]

var FHData1 = [[{ name: '飞鹤' }, { name: '哈佛', value: 66 }]]

var BYMData1 = [[{ name: '贝因美' }, { name: '塞拉利昂', value: 66 }]]

var JHData1 = [
  [{ name: '健合' }, { name: '法国', value: 66 }],
  [{ name: '健合' }, { name: '哈佛', value: 66 }],
  [{ name: '健合' }, { name: '澳大利亚', value: 66 }],
]

var color = ['#a6c84c', '#ffa022', '#46bee9', '#9933ff']
var series = []
;[
  [
    '2019年11月25日，蒙牛乳业宣布以6亿澳元（约合人民币28.7亿元）收购澳大利亚乳品和饮料公司 Lion-Dairy & Drinks 100%股份。',
    MNData1,
  ],
  [
    '2013年，健合集团控股法国90年历史的老牌乳企ISIGNY；<br/>2015年和2016年，健合集团收购美国有机婴幼儿食品品牌HealthyTimes和法国婴幼儿护理品牌Dodie；<br/>2016年，健合集团100%控股澳洲自然健康品牌Swisse。',
    JHData1,
  ],
  [
    '2007年，蒙牛产品打入俄罗斯市场，实现了国产乳品首次出口欧洲；2015年，雅士利新西兰工厂落成',
    MNData2,
  ],
  [
    '2022年5月，新乳业同时在投建自有牧场，分别在甘肃、青海投资了两个万头牧场。',
    XXWData1,
  ],
  [
    '2016年8月8日，君乐宝乳业宣布君乐宝婴幼儿配方奶粉宣进入香港市场。',
    JLBData1,
  ],
  [
    '2014年11月，飞鹤乳业联手哈佛大学医学院BIDMC医学中心在美国波士顿成立飞鹤-哈佛医学院BIDMC营养实验室',
    FHData1,
  ],
  [
    '2017年10月11日，为响应国家“一带一路”政策方针，塞拉利昂总统夫人西娅·恩亚玛·科罗马携手中国贝因美企业在塞总统府举行了隆重的捐赠仪式，<br/>向该国捐赠配方奶粉，为当地2万余名1-5岁儿童、哺乳期母亲补充营养。',
    BYMData1,
  ],
].forEach(function (item, i) {
  series.push(
    {
      name: item[0],
      type: 'lines',
      zlevel: 1,
      coordinateSystem: 'GLMap',
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#fff',
        symbolSize: 7,
      },
      lineStyle: {
        normal: {
          color: color[i % 4],
          width: 0,
          curveness: 0.2,
        },
      },
      data: convertData(item[1]),
    },
    {
      name: item[0],
      type: 'lines',
      zlevel: 2,
      coordinateSystem: 'GLMap',
      symbol: ['none', 'arrow'],
      symbolSize: 10,
      effect: {
        show: true,
        period: 6,
        trailLength: 5,
      },
      lineStyle: {
        normal: {
          color: color[i % 4],
          width: 1,
          opacity: 0.6,
          curveness: 0.2,
        },
      },
      data: convertData(item[1]),
    }
  )
})

var option = {
  GLMap: {
    roam: true,
  },
  coordinateSystem: 'GLMap',
  tooltip: {
    trigger: 'item',
  },
  geo: {
    map: 'GLMap',
    label: {
      emphasis: {
        show: false,
      },
    },
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#323c48',
        borderColor: '#404a59',
      },
      emphasis: {
        areaColor: '#2a333d',
      },
    },
  },
  series: series,
}
