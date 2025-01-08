import { useEffect, useRef } from 'react';
import { Vector2d } from './utils/vector2d.js';


const randomTree = () => {
  const canvasRef = useRef(null)


  const drawTree = (ctx, vStart, length, thickness, dir, bias) => {
    let vDir = new Vector2d().rotate(dir).scale(length);
    let vEnd = vStart.copy().add(vDir);
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(...vStart);
    ctx.lineTo(...vEnd);
    ctx.stroke();

    if (thickness > 2) {
      let left = Math.PI / 4 + 0.5 * (dir + 0.2) + (Math.random() - 0.5) * bias;
      drawTree(ctx, vEnd, length * 0.9, thickness * 0.8, left, bias * 0.9); // length长一些，bias大一些，下面空阔些
      let right = Math.PI / 4 + 0.5 * (dir - 0.2) + (Math.random() - 0.5) * bias;
      drawTree(ctx, vEnd, length * 0.9, thickness * 0.8, right, bias * 0.9);
    }

    if (thickness < 5 && Math.random() < 0.3) {
      ctx.save();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = Math.random() * 5;
      ctx.beginPath();
      ctx.moveTo(...vEnd);
      ctx.lineTo(vEnd.x, vEnd.y - 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.translate(0, canvasRef.current.height);
    ctx.scale(1, -1);
    ctx.lineCap = 'round';
    drawTree(ctx, new Vector2d(512, 0), 50, 10, 1, 3)
  }, [])
  return (
    <div className='absolute top-20 w-full'>
      <canvas className='' width="1024" height="512" ref={canvasRef}></canvas>
    </div>
  )
}

export default randomTree