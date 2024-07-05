import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { About, Contact, Home, Projects, Arts } from "./pages";

const App = () => {
  return (
    <main className="bg-slate-300/20 h-full">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/about_portfolio/" element={<Home />} />
          <Route path="/about_portfolio/about" element={<About />} />
          <Route path="/about_portfolio/projects" element={<Projects />} />
          <Route path="/about_portfolio/arts" element={<Arts />} />
          <Route path="/about_portfolio/contact" element={<Contact />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App