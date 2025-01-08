import React from 'react'

const MultiLine = () => {
  return (
    <div className="absolute top-20 m-4 w-1/2 h-1/2 border-4 border-solid border-cyan-500">
      <div className="w-80 h-20 border-2 border-solid border-yellow-500">
        <p className='whitespace-nowrap overflow-hidden text-ellipsis'>mmliugeojdgasedrfdghhohjorehorgjm;ldhl;d;goiprnb'dfgd               egeeeeeeeeeeeeeeeeee         eeeeeeeeeeeddddddggga    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </div>
      <br />
      <div className="w-80 h-20 border-2 border-solid border-yellow-500">
        <p className='whitespace-normal overflow-hidden break-all'>mmliugeojdgas      edrfdghhohjorehorgjm;ldhl;d;goiprnb'dfgdegeee              eeeeeeeeeeeeeeeeeeeeeeeeeeddddddgggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </div>
      <br />
      <div className="w-80 h-20 border-2 border-solid border-yellow-500">
        <p className='overflow-hidden break-all text-ellipsis line-clamp-3'>mmliugeojdgasedrfdghhohjorehorgjm;ldhl;d;goiprnb'dfgdegeeeeeeeeeeeeeeeeeeeeeeeeeeeeeddddddgggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </div>
    </div>
  )
}

export default MultiLine