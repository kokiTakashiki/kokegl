precision mediump float;
uniform vec2 resolution;
uniform float time;
void main(void) {
	float t = time * 0.001 * 0.1;
	float s = abs(sin(t));
    //gl_FragColor = vec4(0.2 + s, 0.1 + s, 1.0 - s, 1.);
    //gl_FragColor = vec4( vec3(gl_FragCoord.x / resolution.x), 1.0);
    gl_FragColor = vec4(gl_FragCoord.x / resolution.x + s, 0.1 + s, 1.0 - s, 1.);
}