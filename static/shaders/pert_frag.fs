// https://takumifukasawa.hatenablog.com/entry/threejs-billboard-shader
precision mediump float;
varying vec2 vUv;
varying vec3 vColor;
void main() {
  vec4 diffuseColor = vec4(vColor, 1.);
  // 円形にフェードをつける
  vec2 p = vUv * 2. - 1.;
  diffuseColor.a = 1. - smoothstep(length(p), 0., .05);
  diffuseColor.a = clamp(diffuseColor.a, 0., 1.);
  // threejsのalphatestのコードをインクルードして引用
  #include <alphatest_fragment>
  gl_FragColor = diffuseColor;
}