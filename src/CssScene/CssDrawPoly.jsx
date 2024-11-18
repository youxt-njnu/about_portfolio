import React from 'react';

const CssDrawPoly = () => {
  const triSetting1 = {
    width: 0,
    height: 0,
    border: "80px solid",
    margin: 2,
    "border-color": "transparent transparent red",
  };
  const triSetting2 = {
    width: 0,
    height: 0,
    border: "80px solid",
    margin: 2,
    "border-color": "green yellow red",
  };
  const triSetting3 = {
    width: 0,
    height: 0,
    border: "80px solid",
    margin: 2,
    "border-color": "transparent transparent red",
    "border-left": 0,
  };
  const triSetting4 = {
    position: "relative",
    width: 0,
    height: 0,
    "border-width": "0 80px 80px",
    "border-style": "solid",
    "border-color": "transparent transparent red",
  };
  const after = {
    content: "",
    position: "absolute",
    top: "1px",
    left: "-76px",
    "border-width": "0 76px 76px",
    "border-style": "solid",
    "border-color": "transparent transparent yellow",
  };


  return (
    <div className='absolute top-20 w-full'>
      <h2 className='font-bold text-xl pl-3'>三角形</h2>
      <div className="flex">
        <div style={triSetting1}>
        </div>
        <div style={triSetting2}>
        </div>
        <div style={triSetting3}>
        </div>
        <div style={triSetting4}>
          <div style={after}></div>
        </div>
      </div>
      <h2 className='font-bold text-xl pl-3'>平行四边形</h2>
      <div className="flex">
        <div className='ml-10 w-40 h-20 bg-black -skew-x-12'>
        </div>
        <div className='ml-10 w-40 h-20 bg-black -skew-y-12'>
        </div>
      </div>
    </div>
  )
}

export default CssDrawPoly