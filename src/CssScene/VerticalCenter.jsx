import React from 'react';

const verticalCenter = () => {
  const plan = {
    width: '200px',
    height: '200px',
    margin: '10px',
    border: '1px solid #000',
  };
  return (
    <div className="absolute top-20 p-4 w-full h-full flex flex-wrap content-start">
      <div style={plan}>
        <p>方案1(父有宽高,子无)：flex + m-auto</p>
        <div className='flex w-24 h-24 border-4 border-solid border-red-500'>
          <div className='m-auto'>box1</div>
        </div></div>
      <div style={plan}>
        <p>方案2(父有宽高,子无)：grid + place-items-center</p>
        <div className='grid place-items-center w-24 h-24 border-4 border-solid border-red-500'>
          <div>box2</div>
        </div></div>
      <div style={plan}>
        <p>方案3(父有宽高,子无)：table-cell + align-middle</p>
        <div className='table-cell text-center align-middle w-24 h-24 border-4 border-solid border-red-500'>
          <div>box3</div>
        </div></div>
      <div style={plan}>
        <p>方案4(父有宽高,子无)：子绝父相 + transform</p>
        <div className='relative w-24 h-24 border-4 border-solid border-red-500'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>box4</div>
        </div></div>
      <div style={plan}>
        <p>方案5(父有宽高,子无)：万金油</p>
        <div className='flex justify-center items-center w-24 h-24 border-4 border-solid border-red-500'>
          <div>box5</div>
        </div>
      </div>
      <div style={plan}>
        <p>方案5-1(父无宽高,子无)：万金油</p>
        <div className='flex justify-center items-center border-4 border-solid border-red-500'>
          <div>box5</div>
        </div>
      </div>
      <div style={plan}>
        <p>方案6(父、子有宽高)：flex + m-auto</p>
        <div className='flex w-24 h-24 border-4 border-solid border-red-500'>
          <div className='w-12 h-12 border-2 border-solid border-green-500 m-auto'>box1</div>
        </div></div>
      <div style={plan}>
        <p>方案7(父、子有宽高)：grid + place-items-center</p>
        <div className='grid place-items-center w-24 h-24 border-4 border-solid border-red-500'>
          <div className='w-12 h-12 border-2 border-solid border-green-500'>box2</div>
        </div></div>
      <div style={plan}>
        <p>方案8(父、子有宽高)：table-cell + align-middle</p>
        <div className='table-cell text-center align-middle w-24 h-24 border-4 border-solid border-red-500'>
          <div className='w-12 h-12 border-2 border-solid border-green-500'>box3</div>
        </div></div>
      <div style={plan}>
        <p>方案9(父、子有宽高)：子绝父相 + transform</p>
        <div className='relative w-24 h-24 border-4 border-solid border-red-500'>
          <div className='absolute w-12 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-solid border-green-500'>box4</div>
        </div></div>
      <div style={plan}>
        <p>方案10：万金油(父、子有宽高)</p>
        <div className='flex justify-center items-center w-24 h-24 border-4 border-solid border-red-500'>
          <div className='w-12 h-12 border-2 border-solid border-green-500'>box5</div>
        </div>
      </div>
      <div style={plan}>
        <p>方案11(父、子有宽高),子top-1/2 left-1/2 -ml-一半宽 -mt-一半高</p>
        <div className='relative w-24 h-24 border-4 border-solid border-red-500'>
          <div className='absolute w-12 h-12 top-1/2 left-1/2 -ml-6 -mt-6 border-2 border-solid border-green-500'>box1</div>
        </div></div>
    </div>
  )
}

export default verticalCenter