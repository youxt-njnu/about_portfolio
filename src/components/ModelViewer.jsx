import React from 'react'

const ModelViewer = (art) => {
  return (
    <div className="group relative">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
        <img src={art.img} alt={art.name} className="h-full w-full object-cover object-center" />
      </div>
      <h3 className="mt-1 text-sm text-slate-500">
        <div>
          <span className="absolute inset-0"></span>
          {art.type}
        </div>
      </h3>
      <p className="mb-3 text-base font-semibold text-slate-900">{art.info}</p>
    </div>
  )
}

export default ModelViewer