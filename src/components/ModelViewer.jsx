import React from 'react'

const ModelViewer = (art) => {
  return (
    <div class="group relative">
      <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
        <img src={art.img} alt={art.name} class="h-full w-full object-cover object-center" />
      </div>
      <h3 class="mt-6 text-sm text-slate-500">
        <a href="#">
          <span class="absolute inset-0"></span>
          {art.type}
        </a>
      </h3>
      <p class="text-base font-semibold text-slate-900">{art.info}</p>
    </div>
  )
}

export default ModelViewer