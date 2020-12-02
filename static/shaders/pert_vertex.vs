// https://takumifukasawa.hatenablog.com/entry/threejs-billboard-shader
attribute float index;
attribute vec2 offset;
attribute vec2 size;
attribute vec3 color;
varying vec2 vUv;
varying vec3 vColor;
uniform float uTime;
void main() {
  vUv = uv;
  vColor = color;
  // ローカル座標をビュー座標に変換
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
  // ビュー座標系を元に頂点位置を移動
  // 拡大縮小のアニメーションを係数として掛ける
  float anim = sin((uTime * 2. + index * 100.) / 1000.) * .5 + .5;
  mvPosition.xy += offset * vec2(size.x, size.y) * anim;
  gl_Position = projectionMatrix * mvPosition;
}