import { Link } from "react-router-dom";
import CTA from '../components/CTA';
import ModelViewer from '../components/ModelViewer';
import { arts,mapboxDemos, cssLayouts } from '../constants';
import './Arts.css';

const Arts = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'> <span className='blue-gradient_text font-semibold drop-shadow'>ThreeJS</span> Works </h1>

      <div className='py-10'>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {arts.map((art, index) => (
              <Link to={art.path} key={index}>
                <ModelViewer {...art} /></Link>
            ))}
          </div>
        </div>
      </div>

      <hr className='border-slate-200' />
      <h1 className='head-text mt-6'> <span className='blue-gradient_text font-semibold drop-shadow'>Mapbox GL JS</span> Works </h1>
      <div className='py-10'>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-3 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {mapboxDemos.map((art, index) => (
              <Link to={art.path} key={index}>
                <ModelViewer {...art} /></Link>
            ))}
          </div>
        </div>
      </div>

      <hr className='border-slate-200' />
      <h1 className='head-text mt-6'> <span className='blue-gradient_text font-semibold drop-shadow'>CSS</span> Works </h1>
      <div className='py-10'>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-3 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {cssLayouts.map((art, index) => (
              <Link to={art.path} key={index}>
                <ModelViewer {...art} /></Link>
            ))}
          </div>
        </div>
      </div>
      <hr className='border-slate-200' />
      <CTA />
    </section>
  )
}

export default Arts