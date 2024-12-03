import React from 'react'

const TwoBand = () => {
  const twoBand = {
    display: 'flex',
    height: '100px',
  }
  const leftBand = {
    flex: '0 0 100px',
    backgroundColor: 'red',
  }
  const rightBand = {
    flexGrow: 1,
    backgroundColor: 'yellow',
  }

  const twoBand1 = {
    display: 'table',
    width: '100%',
  }
  const leftBand1 = {
    display: 'table-cell',
    width: '100px',
    height: '100px',

    backgroundColor: 'red',
  }
  const rightBand1 = {
    display: 'table-cell',
    backgroundColor: 'yellow',
  }

  const twoBand2 = {
    display: 'grid',
    gridTemplateColumns: '100px auto',
    gridTemplateRows: '100px',
  }
  const leftBand2 = {
    backgroundColor: 'red',
  }
  const rightBand2 = {
    backgroundColor: 'yellow',
  }

  const twoBand3 = {
    width: '100%',
    overflow: 'hidden',
  }
  const leftBand3 = {
    display: 'inline-block',
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
  }
  const rightBand3 = {
    display: 'inline-block',
    width: 'calc(100% - 100px)',
    height: '100px',
    backgroundColor: 'yellow',
  }

  const twoBand4 = {
    width: '100%',
    overflow: 'hidden',
  }
  const leftBand4 = {
    display: 'inline-block',
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
  }
  const rightBand4 = {
    display: 'inline-block',
    marginLeft: '100px',
    width: 'calc(100% - 100px)',
    height: '100px',
    backgroundColor: 'yellow',
  }

  return (
    <div className='absolute w-screen top-20 '>
      <div>
        <div className='ml-8 font-sans font-bold text-lg'>father: flex; right: flex-grow = 1</div>
        <div style={twoBand}>
          <div style={leftBand}>left</div>
          <div style={rightBand}>right</div>
        </div>
      </div>
      <div>
        <div className='ml-8 font-sans font-bold text-lg'>father: grid, grid-template-rows, grid-template-cols;</div>
        <div style={twoBand2}>
          <div style={leftBand2}>left</div>
          <div style={rightBand2}>right</div>
        </div>
      </div>
      <div>
        <div className='ml-8 font-sans font-bold text-lg'>father: table,需要设置宽度; left/right: table-cell</div>
        <div style={twoBand1}>
          <div style={leftBand1}>left</div>
          <div style={rightBand1}>right</div>
        </div>
      </div>
      <div>
        <div className='ml-8 font-sans font-bold text-lg'>right: 利用calc求width</div>
        <div style={twoBand3}>
          <div style={leftBand3}>left</div>
          <div style={rightBand3}>right</div>
        </div>
      </div>
      <div>
        <div className='ml-8 font-sans font-bold text-lg'>left是absolute,right的margin-left为left的宽</div>
        <div style={twoBand4}>
          <div style={leftBand4}>left</div>
          <div style={rightBand4}>right</div>
        </div>
      </div>
    </div>
  )
}

export default TwoBand