import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setZh(lang === 'zh');
  };

  const [isZh, setZh] = useState(true);

  return (
    <button className='fixed bottom-5 right-5 rounded-lg bg-white items-center justify-center flex font-bold shadow-md px-3 py-2' onClick={() => changeLanguage(isZh ? 'en' : 'zh')}>
      <p className="blue-gradient_text">{isZh ? 'Change to English' : '切换中文'}</p>

    </button>
  )
}

export default LanguageSwitcher