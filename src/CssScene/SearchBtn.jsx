import React from 'react'

const SearchBtn = () => {
  return (
    <div className='absolute top-20 m-4 w-1/2'>
      <p>实现input+button里，input自适应</p>
      <br />
      <div className="flex">
        <input className='border-2 flex-grow' type="text" />
        <button className='ml-2'>Search</button>
      </div>
    </div>
  )
}

export default SearchBtn