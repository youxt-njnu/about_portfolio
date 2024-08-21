import React from 'react';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

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

const renderContent = {
  1: (
    <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
      Hi, I am <span className='font-semibold'>Shealin</span> 👏
      <br />
      来自中国南京的研究生(现阶段...)
    </h1>
  ),
  2: (
    <InfoBox
      text="有很多的求学求职经历，也在不断修炼自己..."
      link="/about_portfolio/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="自己写过有意思的项目，也曾与多个团队携手共进..."
      link="/about_portfolio/projects"
      btnText="Visit projects"
    />
  ),
  4: (
    <InfoBox
      text="想要交流、合作或者寻求一个开发者?"
      link="/about_portfolio/contact"
      btnText="Let's talk"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo
