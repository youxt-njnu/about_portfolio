import { useEffect, useRef } from 'react'
import rough from 'roughjs'

const ParametricEquation = () => {
  const canvasRef = useRef(null)

  const polygonOpts = {
    stroke: 'green',
    strokeWidth: 3,
    fill: 'purple',
    fillStyle: 'solid',
  }

  const lineOpts = {
    stroke: 'blue',
    strokeWidth: 3,

  }

  // 画圆弧
  const TAU = Math.PI * 2;
  const TAU_SEGMENTS = 60;
  function arc (x0, y0, radius, startAngle = 0, endAngle = TAU) {
    const ang = (endAngle - startAngle) === TAU ? TAU : (endAngle - startAngle);
    const res = [];
    for (let i = 0; i < TAU_SEGMENTS; i++) {
      let x = x0 + radius * Math.cos(startAngle + ang * i / TAU_SEGMENTS);
      let y = y0 + radius * Math.sin(startAngle + ang * i / TAU_SEGMENTS);
      res.push([x, y]);
    }
    return res;
  }

  function ellipse (x0, y0, radius0, radius1, startAngle = 0, endAngle = TAU) {
    const ang = (endAngle - startAngle) === TAU ? TAU : (endAngle - startAngle);
    const res = [];
    for (let i = 0; i <= TAU_SEGMENTS; i++) {
      let x = x0 + radius0 * Math.cos(startAngle + ang * i / TAU_SEGMENTS);
      let y = y0 + radius1 * Math.sin(startAngle + ang * i / TAU_SEGMENTS);
      res.push([x, y]);
    }
    return res;
  }

  function parabola (x0, y0, p, min, max) {
    let res = [];
    for (let i = 0; i < TAU_SEGMENTS; i++) {
      const s = i / TAU_SEGMENTS;
      const t = (1 - s) * min + s * max;
      const x = x0 + 2 * p * t * t;
      const y = y0 + 2 * p * t;
      res.push([x, y]);
    }
    return res;
  }

  // start, end: 表示关键参数范围的参数
  // seg: 表示采样点个数
  // 返回对象：points表示生成的顶点数；draw方法进行绘制

  useEffect(() => {
    const rc = rough.canvas(canvasRef.current);
    const ctx = rc.ctx;
    ctx.translate(512, 256);
    ctx.scale(1, -1);
    rc.polygon(arc(-100, 0, 50), polygonOpts);
    rc.polygon(ellipse(0, 0, 50, 30), polygonOpts);
    const resParabola = parabola(100, 0, 5, -5, 5);
    for (let i = 0; i < resParabola.length - 1; i++) {
      rc.line(resParabola[i][0], resParabola[i][1], resParabola[i + 1][0], resParabola[i + 1][1], lineOpts);
    }
  }, [])

  return (
    <div className='absolute top-20 w-full'>
      <canvas className='' width="1024" height="512" ref={canvasRef}></canvas>
    </div>
  )
}

export default ParametricEquation