import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA';
import { experiences, skills } from '../constants'; //需要写{}才能导入文件内部的变量如skills, projects, 不写{}的话是export default 命令下的

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className='blue-gradient_text font-semibold drop-shadow'> Shealin</span>
      </h1>

      <div className="mt-2 flex flex-col gap-3 text-slate-500">
        <p>电话/微信：+86-15651736857</p>
        <p>邮箱：you_yxt@163.com</p>
        <p>政治面貌：共产党员</p>
        <p>资格证书：计算机二级（首考优秀）；GIS软件操作能力水平证书（初级）</p>
        <p>英语水平：大学英语四级（首考619分）；大学英语六级（首考567分）</p>
        <p>研究方向：城市地理、交通规划和分析、故事地图、AR地图、地理可视化</p>
        <p>个人关键词</p>
        <p>GIS开发：ArcGIS/QGIS，Geoserver，PostgreSQL&PostGIS</p>
        <p>前端3D：html&css&js, nodejs, react; BootStrap, ECharts; ThreeJS, Cesium, WebGL</p>
        <p>AR：Vuforia、U3D、Mapbox SDK for Unity、Lua</p>
        <p>希望未来能说出：I have a background in GIS, Augmented Reality and front end, so … is like the perfect place for me.</p>
      </div>
      <div className="py-8 flex flex-col">
        <h3 className="subhead-text">
          教育背景
        </h3>
      </div>
      <div className="mt-2 flex flex-col gap-3 text-slate-500">
        <h4 className='text-slate-800'>理学学士，地理科学学院，南京师范大学，GPA:4.22/5，2019.09~2023.07</h4>
        <p>专业背景：地理学大类，分流至地理信息科学专业，主修GIScience理论类和开发类课程</p>
        <p>优势科目：空间数据结构(99)、空间数据库原理(96)、C++与GIS内核开发(98)、C#与GIS二次开发(97)、GIS前沿与进展(95)</p>
        <p>获奖情况：国家励志奖学金3次、南京师范大学优秀毕业生、南京师范大学优秀学生奖学金8次、南京师范大学三好学生3次、南京师范大学优秀共青团员2次、2021年美国大学生数学建模大赛H奖、2021年蓝桥杯大赛江苏省赛区C/C++ 组三等奖</p>
        <h4 className='text-slate-800'>研究生在读，地理与海洋科学学院，南京大学，2023.09至今</h4>
        <p>专业背景：地图学与地理信息系统，偏人文历史关怀</p>
        <p>获奖情况：南京大学学业奖学金一等、2024年“星湖杯”全国地图设计大赛一等奖、2024年第12届未来设计师·全国高校数字艺术设计大赛省级一等奖（国家级在评选中）</p>
      </div>

      <div className="py-8 flex flex-col">
        <h3 className="subhead-text">
          科研成果
        </h3>
      </div>

      <div className="mt-2 flex flex-col gap-3 text-slate-500">
        <h4 className='text-slate-800'>论文</h4>
        <p>You, X., Chen, G.*, & Duan, J. (Forthcoming). Exploring Traffic Planning Networks across Multiple Scales
          Based on Urban Morphology: A Case Study of Nanjing, China. Journal of Urban Planning and Development.
          https://doi.org/10.1061/JUPDDM/UPENG-5086.</p>
        <p>Duan, J., Zhao, Z., Xu, Y., You, X., Yang, F., & Chen, G.* (2024). Spatial distribution characteristics and driving
          factors of Little Giant enterprises in China’s megacity clusters based on random forest and MGWR. Land, 13(7),
          1105. https://doi.org/10.3390/land13071105.</p>
        <p>Deng, Z., You, X., Shi, Z., Gao, H., Hu, X., Yu, Z., & Yuan, L.* (2022). Identification of urban functional zones
          based on the spatial specificity of online car-hailing traffic cycle. ISPRS International Journal of Geo-Information,
          11(8), 435. https://doi.org/10.3390/ijgi11080435.</p>
        <h4 className='text-slate-800'>专利软著</h4>
        <p>Chen, G., Xu, Y., Duan, J., You, X., Zhao, Z., & Yang, F. (2024). A method for constructing knowledge graphs
          in the biopharmaceutical industry. China Patent No. 202410712065.2. Authorized, pending issuance.</p>
        <p>软件著作权：《徐霞客的旅行世界网页开发》，共同开发，负责信息查询、路线规划及内容整合</p>
      </div>


      <div className="py-8 flex flex-col">
        <h3 className="subhead-text">
          科研项目
        </h3>
      </div>

      <div className="mt-2 flex flex-col gap-3 text-slate-500">
        <p>国家自然科学基金：2023至今，参与导师基金项目，包括城市形态学分析和 AR 地图设计。<br />
          1. 定量分析南京交通网络从20世纪80年代到2020年代使用城市形态学的演变，显示了从十字形到圆形的道路模式的转变和城市中心的南扩。<br />
          2. 对南京安全区的历史和地理背景进行了全面研究，最终设计并制作了一份 AR 故事地图。<br />
          3. 建立一个基于空间叙事、人机交互和地图对象的 AR 故事地图的叙事和互动框架。通过南京安全区的实例分析，验证了该方法的有效性。</p>
        <p>学校“英才培养计划”：2020-2023，主题为“发展时空动态轨迹多模态特征解析方法，揭示城市交通流的动态变化模式与规律”,参与并推动了时频域数据处理和交通流分析<br />
          1. 对清理后的轨迹数据进行了一系列处理步骤，包括基于网格的划分、度量聚类和可视化，从而完成了数据处理工作。<br />
          2. 应用经验模态分解将网约车交通流分解为固有模态函数，并利用平均比例法计算各模态函数的贡献，从而揭示不同地点交通流的周期特性。
        </p>
        <p>学校大学生创新创业项目：2021-2022，研究内容为“城市交通流多模态时空特征解析方法”，参与</p>
        <p>学院大学生创新创业项目：2019-2020年，研究内容为“基于AHP-熵值法的镇江市生态宜居城市评价及发展建议”，参与，主要负责方法体系的构建和求解部分</p>
      </div>

      <div className="py-8 flex flex-col">
        <h3 className="subhead-text">
          专业技能
        </h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => (
            <div className='block-container w-20 h-20'>
              <div className="btn-back rounded-xl"></div>
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img src={skill.imageUrl} alt={skill.name} className='w-1/2 h-1/2 object-contain' />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">实习工作经历</h3>
        <div className="mt-2 flex flex-col gap-3 text-slate-500 ">
          {/* <p>I've worked with all sorts of comanies, leveling up my skills and teaming up with smart people. Here's the rundown: </p> */}
        </div>

        <div className="mt-12 flex">
          <VerticalTimeline>
            {/* icon not iconStyle  */}
            {experiences.map((experiences) => (
              <VerticalTimelineElement
                key={experiences.company_name}
                date={experiences.date}
                icon={<div className='flex justify-center items-center w-full h-full'>
                  <img src={experiences.icon} alt={experiences.company_name} className="w-[60%] h-[60%] object-contain" />
                </div>}
                iconStyle={{ background: experiences.iconBg }}
                contentStyle={{
                  borderBottom: '8px',
                  borderStyle: 'solid',
                  borderBottomColor: experiences.iconBg,
                  boxShadow: 'none',
                }}
              >
                <div>
                  <h3 className="text-black text-xl font-poppins font-semibold">
                    {experiences.title}
                  </h3>
                  <p className="text-black-500 font-medium font-base" style={{ margin: 0 }}>
                    {experiences.company_name}
                  </p>
                </div>
                <ul className="my-5 list-disc ml-5 space-y-2">
                  {experiences.points.map((point, index) => (
                    <li key={`experience-point-${index}`} className='text-black-500/50 font-normal pl-1 text-sm'>
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
      <hr className="border-slate-200" />
      <CTA />
    </section>
  )
}

export default About