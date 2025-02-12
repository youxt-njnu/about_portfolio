import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();
  return (
    <section className='cta'>
      <p className="cta-text">{t("contact.info")} <br className='sm:block hidden' />{t("contact.btnText")} </p>
      <Link to="/contact" className="btn">{t("contact.title")}</Link>
    </section >
  )
}

export default CTA