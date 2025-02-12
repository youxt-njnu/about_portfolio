import React from 'react';
import { useTranslation } from 'react-i18next';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { award as star } from '../assets//icons';
import CTA from '../components/CTA';
import { awards } from '../constants';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="max-container">
      <h1 className="head-text">
        {t("greeting")} <span className='blue-gradient_text font-semibold drop-shadow'> {t("name")} </span>
      </h1>

      <div className="mt-2 flex flex-col gap-3 text-slate-500">
        <p>{t("concat")} </p>
        <p>{t("email")}</p>
        <p>{t("policy")}</p>
        <p>{t("research.main")}</p>
        <p>
          <ul class="list-disc">
            <li>{t("research.gis")}</li>
            <li>{t("research.fe")}</li>
            <li>{t("research.ar")}</li>
            <li>{t("research.future")}</li>
          </ul>
        </p>
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
        <p>You, X., Chen, G.*, & Duan, J. Exploring Traffic Planning Networks across Multiple Scales
          Based on Urban Morphology: A Case Study of Nanjing, China. Journal of Urban Planning and Development.
          https://doi.org/10.1061/JUPDDM/UPENG-5086.</p>
        <p>Duan, J., Zhao, Z., Xu, Y., You, X., Yang, F., & Chen, G.* (2024). Spatial distribution characteristics and driving
          factors of Little Giant enterprises in China’s megacity clusters based on random forest and MGWR. Land, 13(7),
          1105. https://doi.org/10.3390/land13071105.</p>
        <p>Deng, Z., You, X., Shi, Z., Gao, H., Hu, X., Yu, Z., & Yuan, L.* (2022). Identification of urban functional zones
          based on the spatial specificity of online car-hailing traffic cycle. ISPRS International Journal of Geo-Information,
          11(8), 435. https://doi.org/10.3390/ijgi11080435.</p>
        <h4 className='text-slate-800'>专利软著</h4>
        <p>专利：一种生物医药产业的知识图谱的构建方法. 陈刚*,徐有恒,段鉴书,尤香婷,赵正旭,杨非凡</p>
        <p>专利：一种遥感图像目标检测模型的改进方法. 陈刚*,杨非凡,段鉴书,尤香婷,赵正旭,徐有恒,易俊帆</p>
        <p>专利：一种基于多源数据的工业一体化空间化方法.陈刚*,段鉴书,赵正旭,尤香婷,徐有恒,杨非凡</p>
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

      <div className="py-16">
        <h3 className="subhead-text">奖励证书</h3>
        <div className="mt-2 flex flex-col gap-3 text-slate-500 ">
          {/* <p>I've worked with all sorts of comanies, leveling up my skills and teaming up with smart people. Here's the rundown: </p> */}
        </div>

        <div className="mt-12 flex">
          <VerticalTimeline layout='1-column-left'>
            {awards.map((award) => (
              <VerticalTimelineElement
                key={award.name}
                date={award.date}
                icon={<div className='flex justify-center items-center w-full h-full'>
                  <img src={star} alt={award.name} className="w-[60%] h-[60%] object-contain" />
                </div>}
                iconStyle={{ background: 'white' }}
                contentStyle={{
                  borderBottom: '8px',
                  borderStyle: 'solid',
                  borderBottomColor: award.color,
                  boxShadow: 'none',
                }}
              >
                <div>
                  <h3 className="text-black text-xl font-poppins font-semibold">
                    {award.name}
                  </h3>
                  {/* <p className="text-black-500 font-medium font-base" style={{ margin: 0 }}>
                    {award.date}
                  </p> */}
                </div>

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