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
    "border-color": "green yellow red black",
  };
  const triSetting3 = {
    width: 0,
    height: 0,
    border: "80px solid",
    margin: 2,
    "border-color": "transparent transparent red",
    "border-left": 0,
  };
  const triSetting31 = {
    width: '160px',
    height: '`60px',
    background: 'linear-gradient(45deg, red, red 50%, transparent 50%)',
  };
  const triSetting32 = {
    width: '160px',
    height: '120px',
    position: 'relative',
    overflow: 'hidden',
  };
  const before = {
    content: "",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    background: 'red',
    transformOrigin: 'left bottom',
    transform: 'rotate(45deg)'
  }

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

  const ti = {
    width: '160px',
    height: '120px',
    border: "0px solid transparent",
    borderTop: "60px solid red",
    borderLeft: '40px solid transparent',
  }

  return (
    <div className='absolute top-20 w-full'>
      <h2 className='font-bold text-xl pl-3'>三角形(border; linear-gradient; rotate; 子绝父相+border) </h2>
      <div className="flex">
        <div style={triSetting1}>
        </div>
        <div style={triSetting2}>
        </div>
        <div style={triSetting3}>
        </div>
        <div style={triSetting31}>
        </div>
        <div style={triSetting32}>
          <div style={before}></div>
        </div>
        <div style={triSetting4}>
          <div style={after}></div>
        </div>
      </div>
      <h2 className='font-bold text-xl pl-3'>平行四边形(skew)</h2>
      <div className="flex">
        <div className='ml-10 w-40 h-20 bg-black -skew-x-12'>
        </div>
        <div className='ml-10 w-40 h-20 bg-black -skew-y-12'>
        </div>
      </div>
      <h2 className='font-bold text-xl pl-3'>直角梯形(border; </h2>
      <div className="flex">
        <div style={ti}>
        </div>
      </div>
    </div>
  )
}

export default CssDrawPoly