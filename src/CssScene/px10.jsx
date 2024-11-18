import React from 'react';

const px10 = () => {
  const plan = {
    width: '200px',
    height: '200px',
    margin: '10px',
    border: '1px solid #000',
  };

  const fSetting = {
    "font-size": "10px"
  }
  const scaleSetting = {
    "transform": "scale(0.83)"
  }
  return (
    <div className="absolute top-20 m-4 w-screen h-full flex">
      <div style={plan}>
        <p>方案1：直接设置, 我看也行</p>
        <div style={fSetting}>box1</div>
      </div>
      <div style={plan}>
        <p>方案2：text-xs + scale(0.83),是10/12</p>
        <div className='text-xs' style={scaleSetting}>box2</div>
      </div>
      <div style={plan}>
        <p>方案3：设置全局html的font-size为100px，然后当前元素设置font-size为1rem即可</p>
      </div>
    </div>
  )
}

export default px10