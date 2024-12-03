#define MUN_OCTAVES 5
#define M_PI 3.1415926535897932384626433832795
precision mediump float;

varying vec3 vNormal;
varying vec3 vCamPos;
varying vec2 vUv;

uniform vec4 resolution;
uniform sampler2D perlinNoise;
uniform sampler2D sparkNoise;
uniform sampler2D waterTurbulence;
uniform sampler2D noiseText;
uniform float time;
uniform vec3 color0;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform vec3 color5;

float Rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float Noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);

  float res =
      mix(mix(Rand(ip), Rand(ip + vec2(1.0, 0.0)), u.x),
          mix(Rand(ip + vec2(0.0, 1.0)), Rand(ip + vec2(1.0, 1.0)), u.x), u.y);
  return res * res;
}

float Fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100);
  // Rotate to reduce axial bias
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < MUN_OCTAVES; ++i) {
    v += a * Noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

float SetOpacity(float r, float g, float b, float toneThreshold) {
  float tone = (r + g + b) / 3.0;
  if (tone < toneThreshold) {
    return 0.0;
  }
  return 1.0;
}

vec3 Rgbcol(vec3 col) {
  return vec3(col.r / 255.0, col.g / 255.0, col.b / 255.0);
}

// 绕着原点旋转
vec2 Rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

vec2 UnityPolarCoordinates(vec2 uv, vec2 center, float radialScale,
                           float lengthScale) {
  vec2 delta = uv - center;
  float radius = length(delta) * radialScale * 2.0;
  float angle = atan(delta.x, delta.y) * 1.0 / 6.28 * lengthScale;
  return vec2(radius, angle);
}

void main() {
  // 初始化UV坐标和纹理坐标
  vec2 oldUv = gl_FragCoord.xy / resolution.xy;
  vec2 uv = vUv;
  vec2 imgUv = uv;
  float scale = 1.0;
  oldUv *= 0.5 + time;
  oldUv.y = oldUv.y;
  vec2 p = oldUv * scale; // 对oldUv进行时间和比例变换

  // 生成噪声和纹理
  float noise = Fbm(p) * 0.04;
  vec4 txt = texture2D(perlinNoise, oldUv);
  float gradient = dot(normalize(-vCamPos), normalize(vNormal));
  float pct = distance(vUv, vec2(0.5));
  // 初始化颜色
  vec3 rgbColor0 = Rgbcol(color0);
  vec3 rgbColor1 = Rgbcol(color1);
  vec3 rgbColor2 = Rgbcol(color2);
  vec3 rgbColor3 = Rgbcol(color3);
  vec3 rgbColor4 = Rgbcol(color4);
  vec3 rgbColor5 = Rgbcol(color5);

  // 设置纯色背景
  float y = smoothstep(0.16, 0.525, pct);
  vec3 backColor = mix(rgbColor0, rgbColor5, y);
  gl_FragColor = vec4(backColor, 1.0);

  // 设置极坐标和噪声
  vec2 center = vec2(0.5);
  vec2 cor = UnityPolarCoordinates(vUv, center, 1.0, 1.0);
  vec2 newvUv = vUv - 0.5;
  vec3 noiseTextvUv =
      texture2D(perlinNoise, mod(Rotate(newvUv * 0.15 + vec2(sin(time * 0.005),
                                                             cos(time * 0.005)),
                                        time),
                                 1.0))
          .rgb; // 通过旋转和时间偏移来生成噪声纹理

  // 设置纹理
  vec2 newUv = vec2(cor.x + time, cor.x + cor.y);
  vec3 noiseText1 = texture2D(perlinNoise, mod(newUv, 1.0))
                        .rgb; // 这里改一个名字，为了避免和上面的NoiseText混淆
  vec3 noiseText2 = texture2D(sparkNoise, mod(newUv, 1.)).rgb;
  vec3 noiseText3 = texture2D(waterTurbulence, mod(newUv, 1.))
                        .rgb; // 用newUv从不同的噪声纹理中读取值

  // 设置纹理色调
  float tone0 = 1. - smoothstep(0.3, 0.6, noiseText1.r);
  float tone1 = smoothstep(0.3, 0.6, noiseText2.r);
  float tone2 = smoothstep(0.3, 0.6, noiseText3.r);

  // 设置每个色调的不透明度
  float opacity0 = SetOpacity(tone0, tone0, tone0, .29);
  float opacity1 = SetOpacity(tone1, tone1, tone1, .49);
  float opacity2 = SetOpacity(tone2, tone2, tone2, .69);

  // 建立圆形噪声
  float gradientTone = 1. - smoothstep(0.196, 0.532, pct);
  vec4 circularNoise = vec4(vec3(gradientTone) * noiseTextvUv * 1.4, 1.0);
  float gradOpacity =
      SetOpacity(circularNoise.r, circularNoise.g, circularNoise.b, 0.19);

  // 设置边缘静态闪光
  vec2 uv2 = uv;
  float iTime = time * 0.004;
  uv.y += iTime / 10.0;
  uv.x -= (sin(iTime / 10.0) / 2.0);
  uv2.x += iTime / 14.0;
  uv2.x += (sin(iTime / 10.0) / 9.0);
  float result = 0.0;
  result +=
      texture2D(noiseText, mod(uv * 0.5, 1.) * 0.6 + vec2(iTime * (-0.003)))
          .r; // 报错是因为：vec4 texture2D(sampler2D sampler, vec2 coord);
              // 第一个参数需要是sampler2D类型,我根据代码猜测这里应该是一开始传入进来的那个noiseText，然后和上面对其他三个噪声图像的处理混淆了，所以上面改成了noiseText1
  result *=
      texture2D(noiseText, mod(uv2 * 0.5, 1.) * 0.9 + vec2(iTime * 0.002)).b;
  result = pow(result, 4.0);

  // 设置最终渲染
  if (opacity2 > 0.0) {
    gl_FragColor = vec4(rgbColor4, 0.) * vec4(opacity2);
  } else if (opacity1 > 0.0) {
    gl_FragColor = vec4(rgbColor2, 0.) * vec4(opacity1);
  } else if (opacity0 > 0.0) {
    gl_FragColor = vec4(rgbColor1, 0.) * vec4(opacity0);
  }
  gl_FragColor += vec4(108.0) * result * (y * 0.02);
  gl_FragColor *= vec4(gradOpacity);
}