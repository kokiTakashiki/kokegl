precision mediump float;
uniform vec2 resolution;
uniform float time;

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main(void){
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y)*0.2;
    vec2 p = vec2(pos.x-0.5,pos.y+0.1);
    
    float costam = 39000.0;
    int j = 0;
    vec2 x = vec2(-0.345, 0.654);
    vec2 y = vec2(costam * 0.000005, 0.0);
    vec2 z = p;
    for(int i = 0; i < 360; i++){
        j++;
        if(length(z) > 2.0){break;}
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + x + y;
    }

    float costam2 = 80000.0;
    float h = abs(mod(costam2 * 0.001 - float(j), 360.0) / 360.0);;
    vec3 rgb = vec3(0,h,0);//hsv(h, 1.0, 1.0);
    gl_FragColor = vec4(rgb, 1.0);
    
}