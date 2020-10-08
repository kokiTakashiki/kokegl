//test16

//精度の指定
precision mediump float;

//timeを取得
uniform float time;

//vUvを取得
varying vec2 vUv;

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main(){

    //uv座標系で、オブジェクトの中心に原点を設定
    vec2 fuv = -1.0 + 2.0 * vUv;

    // vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y)*0.3;
    // vec2 p = vec2(pos.x-0.505,pos.y+0.1);
    vec2 p = vec2(fuv.x/8.0-0.405,fuv.y/4.0-0.1);
    
    float costam = 53000.0;
    int j = 0;
    vec2 x = vec2(-0.345, 0.654);
    vec2 y = vec2(costam * 0.000005, 0.0);
    vec2 z = p;
    for(int i = 0; i < 360; i++){
        j++;
        if(length(z) > 2.0){break;}
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + x + y;
    }

    float costam2 = 60000.0;
    float h = abs(mod(costam2 * 0.001 - float(j), 360.0) / 360.0);;
    vec3 rgb = vec3(0,h-0.1,0);//hsv(h, 1.0, 1.0);
    gl_FragColor = vec4(rgb, 1.0);

    //uv座標系を使用して描画色を設定
    // float r = abs(sin(fuv.s * fuv.t + time / 5.0));
    // float g = abs(sin(fuv.s * fuv.t + time / 4.0));
    // float b = abs(sin(fuv.s * fuv.t + time / 3.0));

    // gl_FragColor = vec4(r,g,b,1.0);
}