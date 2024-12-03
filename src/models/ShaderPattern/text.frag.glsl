precision mediump float;
#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 虽然你自己推导了，但gpt一下子就写出来了，此外参考的作者教程里面给的公式是错的
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
  return vec2(
      cos(rotation) * (uv.x - mid.x) - sin(rotation) * (uv.y - mid.y) + mid.x,
      sin(rotation) * (uv.x - mid.x) + cos(rotation) * (uv.y - mid.y) + mid.y);
}

//  Classic Perlin 2D Noise
//  by Stefan Gustavson

vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm =
      1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01),
                                                 dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
  // gl_FragColor = vec4(vUv, 1.0, 1.0);
  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.8, strength) + step(0.8, mod(vUv.x * 10.0, 1.0)); //
  // 向量加法，得到网格
  // strength = step(0.8, strength) * step( 0.8, mod(vUv.x * 10.0, 1.0)); //
  // 向量乘法，有零的地方都为0，都是1的体现为白色，所有是白色点集
  // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  // strength = step(0.2, strength);

  // float strength = random(vUv);
  // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
  // vec2 strength = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0)
  // / 10.0);
  // gl_FragColor = vec4(vec3(random(strength)), 1.0);

  vec2 rotateUv = rotate(vUv, PI / 4.0, vec2(0.5));
  // float strength =
  //     0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5),
  //                     vec2(0.5)); // +0.5的目的是为了让中心点的y为0.5
  // strength *=
  //     0.15 / distance(vec2((vUv.x - 0.5) * 5.0 + 0.5, vUv.y), vec2(0.5));
  // strength =
  //     0.15 /
  //     distance(vec2(rotateUv.x, (rotateUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)) *
  //     0.15 /
  //     distance(vec2((rotateUv.x - 0.5) * 5.0 + 0.5, rotateUv.y), vec2(0.5));

  // strength +=
  //     0.15 /
  //     distance(vec2(rotateUv.x, (rotateUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)) *
  //     0.15 /
  //     distance(vec2((rotateUv.x - 0.5) * 5.0 + 0.5, rotateUv.y), vec2(0.5));

  // float strength = step(0.02, abs(distance(vUv, vec2(0.5)) - 0.25));

  // vec2 wavedUv =
  //     vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y + sin(vUv.x * 30.0) * 0.1);
  // float strength =
  //     1.0 -
  //     step(
  //         0.02,
  //         abs(distance(wavedUv, vec2(0.5)) -
  //             0.25)); //
  //             浮点数的运算里面都要用浮点数，如果1.0写成1，效果会出不来，还会报错

  // atan(vUv.x, vUv.y) 的作用是计算从原点到由纹理坐标 vUv 指定的点 (vUv.x,
  // vUv.y) 的角度。这可以用于创建各种基于角度的视觉效果，例如：

  // 旋转纹理映射：可以用来调整纹理映射的方向，使纹理沿着不同的角度显示。
  // 径向效果：通过角度可以创建从中心向外的效果，比如径向渐变或是光晕效果。

  // float strength = atan(vUv.x, vUv.y);
  // float strength = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
  // strength = mod(strength * 20.0, 1.0);
  // strength = sin(strength * 100.0);

  // 经典柏林噪声
  // float strength = step(0.2, cnoise(vUv * 10.0));
  // gl_FragColor = vec4(vec3(strength), 1.0);

  float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));

  vec3 blackColor = vec3(0.0);
  vec3 uvColor = vec3(vUv, 0.2);
  vec3 mixColor = mix(blackColor, uvColor, strength);
  gl_FragColor = vec4(mixColor, 1.0);
}