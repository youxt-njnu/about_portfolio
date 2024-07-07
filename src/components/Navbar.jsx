import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink to="/about_portfolio" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
        <p className="blue-gradient_text">AH</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium shadow-text">
        <NavLink to="/about_portfolio/about" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
          About
        </NavLink>
        <NavLink to="/about_portfolio/projects" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
          Projects
        </NavLink>
        <NavLink to="/about_portfolio/arts" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
          Arts
        </NavLink>
      </nav>

    </header>

  )
}

export default Navbar