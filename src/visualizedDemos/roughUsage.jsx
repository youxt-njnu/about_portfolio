import { useEffect, useRef } from 'react'
import rough from 'roughjs'
import { Vector2d } from './utils/vector2d'

const roughUsage = () => {
  const canvasRef = useRef(null)

  const hillOpts = {
    roughness: 2.2,
    strokeWidth: 4,
    fill: 'blue',
  }
  const sunOpts = {
    stroke: 'red',
    strokeWidth: 4,
    fill: 'yellow',
    fillStyle: 'solid',
  }

  const polygonOpts = {
    stroke: 'green',
    strokeWidth: 3,
    fill: 'purple',
    fillStyle: 'solid',
  }

  const drawMultipleShapes = (edges, x, y, step) => {
    const deltaAngle = (2 * Math.PI) / edges;
    let p = new Vector2d(x, y);
    let res = [[p.x, p.y]];
    let dir = new Vector2d(step, 0);
    for (let i = 0; i < edges; i++) {
      p = p.copy().add(dir.rotate(deltaAngle));
      res.push([p.x, p.y]);
    }
    return res;
  }
  useEffect(() => {
    const rc = rough.canvas(canvasRef.current);
    const ctx = rc.ctx;
    ctx.translate(256, 256);
    ctx.scale(1, -1);

    rc.path('M-180 0L-80 100L20 0', hillOpts);
    rc.path('M-20 0L80 100L180 0', hillOpts);
    rc.circle(0, 150, 105, sunOpts);
    rc.polygon(drawMultipleShapes(5, canvasRef.current.width / 2, 0, 50), polygonOpts);
    rc.polygon(drawMultipleShapes(10, 0, 0, 20), polygonOpts);
  }, [])
  return (
    <div className='absolute top-20 w-full'>
      <canvas className='' width="1024" height="512" ref={canvasRef}></canvas>
    </div>
  )
}

export default roughUsage