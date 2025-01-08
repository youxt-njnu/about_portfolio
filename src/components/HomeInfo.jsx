import React from 'react';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';
import { useTranslation } from 'react-i18next';

const InfoBox = ({ text, link, btnText }) => {


  return ( //需要把下面的东西都return出来
    <div className="info-box">
      <p className="whitespace-pre-wrap font-medium sm:text-xl text-center">{text}</p>
      <Link to={link} className='neo-brutalism-white neo-btn'>
        {btnText}
        <img src={arrow} className='w-4 h-4 object-contain' />
      </Link>
    </div>
  );
};



const HomeInfo = ({ currentStage }) => {
  const { t } = useTranslation();
  const renderContent = {
    1: (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        {t("greeting")} <span className='font-semibold'>{t('name')}</span> 👏
        <br />
        {t('basicInfo')}
      </h1>
    ),
    2: (
      <InfoBox
        text={t('aboutMe.info')}
        link="/about"
        btnText={t('aboutMe.btnText')}
      />
    ),
    3: (
      <InfoBox
        text={t('projects.info')}
        link="/projects"
        btnText={t('projects.btnText')}
      />
    ),
    4: (
      <InfoBox
        text={t('contact.info')}
        link="/contact"
        btnText={t('contact.btnText')}
      />
    ),
  };

  return renderContent[currentStage] || null;
};

export default HomeInfo
