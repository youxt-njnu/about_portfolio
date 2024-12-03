varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vCamPos;

void main() {
  vUv = uv;
  vNormal = normal;
  vCamPos = cameraPosition;
  gl_Position =
      projectionMatrix * modelViewMatrix *
      vec4(position,
           1.0); // 将3D模型的顶点坐标渲染到屏幕坐标系中，就是标准的3D模型渲染
}