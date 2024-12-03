import { useEffect, useRef } from 'react';

const WebglUseage = () => {
  const canvasRef = useRef(null)
  const canvas2Ref = useRef(null)
  let gl;

  const vertexShader = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 1.0, 1.0);
    }
  `;

  const fragmentShader = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `;

  const vertexShader2 = `
    attribute vec2 position;
    varying vec3 color;
    void main() {
      color = vec3(0.5 + position, 0.0);
      gl_Position = vec4(position, 1.0, 1.0);
    }
  `;

  const fragmentShader2 = `
    precision mediump float;
    varying vec3 color;
    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  let program;
  const programSetting = (canvas, vertexShader, fragmentShader) => {
    gl = canvas.getContext('webgl');

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);
    // 错误判断
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vs));
    }
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);
    // 错误判断
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fs));
    }

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    // 错误判断
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);
    // gl.program = program;
  }

  const vertexPosition = new Float32Array([
    -1, -1,
    0, 1,
    1, -1,
  ]);

  const dataBuffer = () => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPosition, gl.STATIC_DRAW);

    const vPos = gl.getAttribLocation(program, 'position');
    gl.vertexAttribPointer(vPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPos);
  };

  const render = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, vertexPosition.length / 2);
  }
  
  useEffect(() => {
    programSetting(canvasRef.current, vertexShader, fragmentShader);
    dataBuffer();
    render();

    programSetting(canvas2Ref.current, vertexShader2, fragmentShader2);
    dataBuffer();
    render();
  }, []);

  return (
    <div className='absolute top-20 w-full flex'>
      <canvas ref={canvasRef} width={512} height={512} className='ml-3 border-2 border-black-500 border-solid'></canvas>
      <canvas ref={canvas2Ref} width={512} height={512} className='ml-3 border-2 border-black-500 border-solid'></canvas>
    </div>
  )
}

export default WebglUseage