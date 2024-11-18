import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from './components/Loader';
import Navbar from "./components/Navbar";
import { arts, cssLayouts, mapboxDemos, visualizeDemos } from './constants';
import { About, Arts, Contact, Home, Projects } from "./pages";


const App = () => {

  return (
    <main className="bg-slate-300/20 h-full">
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/about_portfolio/" element={<Home />} />
            <Route path="/about_portfolio/about" element={<About />} />
            <Route path="/about_portfolio/projects" element={<Projects />} />
            <Route path="/about_portfolio/arts" element={<Arts />} />
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
            <Route path="/about_portfolio/contact" element={<Contact />} />
          </Routes>
        </Suspense>


      </Router>
    </main>
  )
}

export default App