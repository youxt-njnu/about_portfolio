varying vec2 vUv;

void main() {
  gl_Position =
      projectionMatrix * modelViewMatrix *
      vec4(position,
           1.0); // 这里直接用position，应该是shader里有一个默认含义的东西
  vUv = uv;
}