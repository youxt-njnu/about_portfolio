import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <header className="header">
      <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
        <p className="blue-gradient_text">AH</p>
      </NavLink>
      <nav className="flex text-xl gap-10 font-medium shadow-text">
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
          {t("aboutMe.title")}
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
          {t("projects.title")}
        </NavLink>
        <NavLink to="/arts" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
          {t("gallery.title")}
        </NavLink>
      </nav>

    </header>

  )
}

export default Navbar