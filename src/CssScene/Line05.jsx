import React from 'react';
import { useEffect } from 'react';

const Line05 = () => {
  const way1 = {
    height: '1px',
    background: 'black',
    transform: 'scaleY(0.5)',
    transformOrigin: '50% 100%', // 参数的含义：x, y (相对于左上角，往右往下)
  }
  const way2 = {
    height: '1px',
    background: 'black',
    boxShadow: '0 0 0.5px  black', // 参数的含义：水平偏移量 垂直偏移量 模糊半径 颜色
  }

  // 禁止右键菜单
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => { e.preventDefault() });
    document.addEventListener('selectstart', (e) => { e.preventDefault() });
    document.addEventListener('copy', (e) => { e.preventDefault() });
    document.addEventListener('cut', (e) => { e.preventDefault() });
  }, []);

  return (
    <div className='absolute w-screen top-20 '>
      <div>
        <div className='ml-8 font-sans font-bold text-lg'>transform: scaleY(0.5)</div>
        <div style={way1}></div>
      </div>
      <div>
        <div className='ml-8 font-sans font-bold text-lg'>box-shadow</div>
        <div style={way2}></div>
      </div>
      <div>
        <div className='ml-8 font-sans font-bold text-lg'>设置了禁止：右键菜单、文本选择、复制、粘贴</div>
      </div>
    </div>
  )
}

export default Line05