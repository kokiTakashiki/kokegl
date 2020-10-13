//精度の指定
precision mediump float;

//modelViewMatrixの宣言
uniform mat4 modelViewMatrix;

//projectionMatrixの宣言
uniform mat4 projectionMatrix;

//positionの宣言
attribute vec3 position;

//uvの宣言
attribute vec2 uv;

varying vec2 vUv;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

    //フラグメントシェーダにuvを転送
    vUv = uv;
}