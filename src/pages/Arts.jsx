import { Link } from "react-router-dom";
import CTA from '../components/CTA';
import ModelViewer from '../components/ModelViewer';
import { arts } from '../constants';
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

      <h1 className='head-text mt-6'> <span className='blue-gradient_text font-semibold drop-shadow'>Shader</span> Works </h1>

      <div className='py-10'>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 masonry-grid">
          <div className="masonry-item glslGallery" data="160313193711"></div> 
          <div className="masonry-item glslGallery" data="160313030533"></div> 
          {/* data-properties="clickRun:editor; showAuthor: false;" */}
          <div className="masonry-item glslGallery" data="160401213245"></div>
          <div className="masonry-item glslGallery" data="160304202332"></div>
          <div className="masonry-item glslGallery" data="160302022724"></div>
          <div className="masonry-item glslGallery" data="160219112614"></div>
          <div className="masonry-item glslGallery" data="160302003807"></div>
          <div className="masonry-item glslGallery" data="160302102102"></div>
          <div className="masonry-item glslGallery" data="160302101618"></div>
          </div>
        </div>
      </div>

      <CTA />
    </section>
  )
}

export default Arts