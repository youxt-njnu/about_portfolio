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

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>电话/微信：156****6857</p>
        <p>教育经历</p>
        <p>本科：南京师范大学 地理科学学院 地理信息科学</p>
        <p>研究生：南京大学 地理与海洋科学学院 地图学与地理信息系统</p>
        <p>政治面貌：预备党员</p>
        <p>英语水平：大学英语六级567分</p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">
          专业技能
        </h3>
      </div>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>软件类：Unity、ArcGIS、QGIS、Adobe Illustrator、Visio/Drawio</p>
        <p>编程类：C#、 HTML&CSS&JS、NodeJS、PostgreSQL&PostGIS、MySQL</p>
        <p>优势科目：空间数据结构(99)、空间数据库原理(96)、C++与GIS内核开发(98)、C#与GIS二次开发(97)、GIS前沿与进展(95)</p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">
          专业技能
        </h3>
      </div>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>软件类：Unity、ArcGIS、QGIS、Adobe Illustrator、Visio/Drawio</p>
        <p>编程类：C#、 HTML&CSS&JS、NodeJS、PostgreSQL&PostGIS、MySQL</p>
        <p>优势科目：空间数据结构(99)、空间数据库原理(96)、C++与GIS内核开发(98)、C#与GIS二次开发(97)、GIS前沿与进展(95)</p>
        <p>科研</p>
        <p>学校“英才培养计划”：2020-2023，主题为“发展时空动态轨迹多模态特征解析方法，揭示城市交通流的动态变化模式与规律”，参与，主要负责数据的后期整合和交通流时频域分析部分</p>
        <p>学校大学生创新创业项目：2021-2022，研究内容为“城市交通流多模态时空特征解析方法”，参与</p>
        <p>学院大学生创新创业项目：2019-2020年，研究内容为“基于AHP-熵值法的镇江市生态宜居城市评价及发展建议”，参与，主要负责方法体系的构建和求解部分</p>
        <p>SCI论文二作：Deng, Z.; You, X.; Shi, Z.; Gao, H.; Hu, X.; Yu, Z.; Yuan, L. Identification of Urban Functional Zones Based on the Spatial Specificity of Online Car-Hailing Traffic Cycle. ISPRS Int. J. Geo-Inf. 2022, 11,435.https://doi.org/10.3390/ijgi11080435</p>
        <p>软件著作权：《徐霞客的旅行世界网页开发》，共同开发，负责信息查询、路线规划及内容整合</p>
        <p>竞赛</p>
        <p>美国大学生数学建模大赛H奖（三等奖）</p>
        <p>校级：2021年超图校园赛开发组一等奖、制图组二等奖、分析组二等奖</p>
        <p>省级：2021年蓝桥杯大赛江苏省赛区，C/C++组三等奖</p>
        <p>实习</p>
        <p>2021年暑期于江苏苏海信息科技有限公司数据处理部进行实习</p>
        <p>2023年暑期于视网么公司的研发部进行实习</p>
        <p>项目</p>
        <p>徐霞客的旅行世界</p>
        <p>图说中国乳业发展</p>
        <p>清史GIS系统</p>
        <p>大国重器</p>
        <p>看镜南京</p>
        <p>艰难爬坡</p>
        <p>个人关键词</p>
        <p>GIS全栈式开发：ArcGIS/QGIS，Geoserver，PostgreSQL&PostGIS</p>
        <p>前端3D：html&css&js, nodejs, react; BootStrap, ECharts; ThreeJS, Cesium, WebGL</p>
        <p>AR：Vuforia、U3D、Mapbox SDK for Unity、Lua</p>
        <p>希望未来能说出：I have a background in GIS, Augmented Reality and front end, so … is like the perfect place for me.</p>
      </div>


      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">
          My Skills
        </h3>
        <div className="mt-16 flex flex-wrap gap-1d2">
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
        <h3 className="subhead-text">Work Experience</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500 ">
          <p>I've worked with all sorts of comanies, leveling up my skills and teaming up with smart people. Here's the rundown: </p>
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