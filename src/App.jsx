import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from './components/Loader';
import Navbar from "./components/Navbar";
import { arts, cssLayouts, mapboxDemos, visualizeDemos } from './constants';
import { About, Arts, Contact, Home, Projects } from "./pages";
import LanguageSwitcher from './components/LanguageSwitcher';
const App = () => {

  return (
    <main className="bg-slate-300/20 h-full">
      <Router basename="/about_portfolio">
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/arts" element={<Arts />} />
            {arts.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
            {mapboxDemos.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
            {visualizeDemos.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
            {cssLayouts.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>

      </Router>
      <LanguageSwitcher />
    </main>
  )
}

export default App