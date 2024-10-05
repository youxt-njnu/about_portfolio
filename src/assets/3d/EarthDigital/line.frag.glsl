precision mediump float;
uniform float actionRatio;
uniform float lineLength;
uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;

#include <clipping_planes_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>

// 计算线性到sRGB的颜色转换
vec3 linearTosRGB(vec3 color) { return pow(color, vec3(1.0 / 2.2)); }

vec3 gammaCorrect(vec3 color) {
  const float gamma = 2.2;
  return pow(color, vec3(1.0 / gamma));
}

void main() {
#include <clipping_planes_fragment>

  float halfDash = dashSize * 0.5;
  float currPos = (lineLength + dashSize) * actionRatio;
  float d = (vLineDistance + halfDash) - currPos;
  if (abs(d) > halfDash)
    discard; // 只显示当前位置附近halfDash的线段

  float grad = ((vLineDistance + halfDash) - (currPos - halfDash)) / halfDash;
  vec3 outgoingLight = vec3(0.0);
  vec4 diffuseColor = vec4(diffuse, grad);
  // 这两句是针对下面注释掉的#include给到的代替方案，因为当前版本不支持这两个inlude的内容
  // outgoingLight = linearTosRGB(diffuseColor.rgb);
  // gl_FragColor = vec4(gammaCorrect(outgoingLight), 1.0);
  gl_FragColor = diffuseColor;

#include <color_fragment>
// #include <encodings_fragment>
#include <fog_fragment>
#include <logdepthbuf_fragment>
// #include <output_fragment>
#include <premultiplied_alpha_fragment>
#include <tonemapping_fragment>
}