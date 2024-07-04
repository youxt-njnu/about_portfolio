import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import CTA from '../components/CTA';
import Loader from '../components/Loader';
import ModelViewer from '../components/ModelViewer';
import { arts } from '../constants';
import { Bird } from '../models';

const Arts = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'> <span className='blue-gradient_text font-semibold drop-shadow'>ThreeJS</span>技能点 </h1>

      <div className='py-10'>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {arts.map((art) => (
              <ModelViewer {...art} />
            ))}
          </div>
        </div>
      </div>
      <hr className='border-slate-200' />
      <div className='py-10'>
        <Canvas camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <Suspense fallback={<Loader />}>
            <Bird />
          </Suspense>
        </Canvas>
      </div>
      <hr className='border-slate-200' />
      <CTA />
    </section>
  )
}

export default Arts