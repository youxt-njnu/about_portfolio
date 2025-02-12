import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import arrow from '../assets/icons/arrow.svg';
import CTA from '../components/CTA';
import { experiences, projects, skills } from '../constants';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section className="max-container">
      <h1 className="head-text">
        {t("projects.fr")}<span className='blue-gradient_text font-semibold drop-shadow'> {t("projects.ed")}</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>{t("projects.basicIntro")}</p>
      </div>
      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project) => (
          <div className='lg:w=[400px] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`}></div>
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img src={project.iconUrl} alt="Project Icon" className='w-1/2 h-1/2 object-contain' />
              </div>
            </div>

            <div className="mt-5 flex flex-col">
              <h4 className='text-2xl font-poppins font-semibold'>
                {project.name}
              </h4>
              <p className='whitespace-pre-wrap mt-2 text-slate-500'>
                {project.description}
              </p>
              <div className='mt-5 flex items-center gap-2 font-poppins'>
                <Link
                  to={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='font-semibold text-blue-600'
                >
                  Live Link
                </Link>
                <img src={arrow} alt="arrow" className='w-4 h-4 object-contain' />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="py-8 flex flex-col">
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
      </div> */}

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
                  borderBottomColor: experiences.mainColor,
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

export default Projects