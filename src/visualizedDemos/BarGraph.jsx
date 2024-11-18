import React from 'react'
import './index.scss'

const BarGraph = () => {
  return (
    <div className='absolute top-20 w-full'>
      <h1 className='font-bold text-3xl text-center'>HTML+CSS  可视化</h1>
      <h2 className='font-bold text-xl pl-3'>柱状图</h2>
      <div className='barGraph'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2 className='font-bold text-xl pl-3'>饼图</h2>
      <div className='pieGraph'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default BarGraph