import data from '@/assets/data/provice-city-short.json';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const CanvasDemo = () => {
  const canvas1Ref = useRef(null)
  const canvas2Ref = useRef(null)

  useEffect(() => {
    const ctx1 = canvas1Ref.current.getContext('2d');
    ctx1.save();
    const canva1Size = [canvas1Ref.current.width, canvas1Ref.current.height];
    // console.log(canva1Size); //  获取到的是canvas的画布宽高
    const sizes = [100, 100]; //rect的宽高
    ctx1.fillStyle = 'red';
    ctx1.translate(-0.5 * sizes[0], -0.5 * sizes[1]);
    ctx1.beginPath();
    ctx1.rect(0.5 * canva1Size[0], 0.5 * canva1Size[1], sizes[0], sizes[1]);
    ctx1.fill();
    ctx1.restore();

    // 获取数据示例
    // const dataSource = 'https://s5.ssl.qhres2.com/static/b0695e2dd30daa64.json';
    // fetch(dataSource)
    //   .then(res => res.json())
    //   .then(data => {
    //     const ctx2 = canvas2Ref.current.getContext('2d');
    //     const canvas2Size = [canvas2Ref.current.width, canvas2Ref.current.height];
    //     const regions = d3.hierarchy(data).sum(d => 1).sort((a, b) => b.value - a.value);
    //     console.log(regions);
    //     const pack = d3.pack().size(canvas2Size).padding(3);
    //     const root = pack(regions);
    //     const TAU = 2 * Math.PI;

    //     const draw = (ctx, node, { fillStyle = 'rgba(0,0,0,0.2)', textColor = 'white' } = {}) => {
    //       const children = node.children;
    //       ctx.fillStyle = fillStyle;
    //       ctx.beginPath();
    //       ctx.arc(node.x, node.y, node.r, 0, TAU);
    //       ctx.fill();
    //       if (children) {
    //         for (const child of children) {
    //           draw(ctx, child);
    //         }
    //       }
    //       else {
    //         const name = node.data.name;
    //         ctx.fillStyle = textColor;
    //         ctx.font = '1rem Aerial';
    //         ctx.textAlign = 'center';
    //         ctx.fillText(name, node.x, node.y);
    //       }
    //     }
    //     console.log(root.children);
    //     draw(ctx2, root);
    //   });

    // 数据要满足一定的规律，才方便解析
    const ctx2 = canvas2Ref.current.getContext('2d');
    const canvas2Size = [canvas2Ref.current.width, canvas2Ref.current.height];
    const regions = d3.hierarchy(data).sum(d => 1).sort((a, b) => b.value - a.value);
    console.log(regions);
    const pack = d3.pack().size(canvas2Size).padding(3);
    const root = pack(regions);
    const TAU = 2 * Math.PI;

    const draw = (ctx, node, { fillStyle = 'rgba(0,0,0,0.2)', textColor = 'white' } = {}) => {
      const children = node.children;
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, TAU);
      ctx.fill();
      if (children) {
        for (const child of children) {
          draw(ctx, child);
        }
      }
      else {
        const name = node.data.name;
        ctx.fillStyle = textColor;
        ctx.font = '1rem Aerial';
        ctx.textAlign = 'center';
        ctx.fillText(name, node.x, node.y);
      }
    }
    console.log(root.children);
    draw(ctx2, root);
  }, []);

  return (
    <div className='absolute top-20 w-full'>
      <h1 className='font-bold text-3xl text-center'>canvas 绘图</h1>
      <h2 className='font-bold text-xl pl-3'>填充正方形</h2>
      <canvas ref={canvas1Ref} width={512} height={512} className='ml-3 border-2 border-black-500 border-solid'></canvas>
      <h2 className='font-bold text-xl pl-3'>层次关系图(hierarchy)</h2>
      <canvas ref={canvas2Ref} width={1024} height={1024} className='ml-3 border-2 border-black-500 border-solid'></canvas>
    </div>
  )
}

export default CanvasDemo