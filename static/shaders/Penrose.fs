//test15

precision mediump float;
uniform vec2 resolution;
uniform float time;

// Parameters
const float tile_min_size = 38.;
const float tiles_on_screen = 40.;
const vec3 color1 = vec3(123.0/255.0, 141.0/255.0, 66.0/255.0);
const vec3 color2 = vec3(105.0/255.0, 130.0/255.0, 27.0/255.0);
const float linewidth = 2.4;
const float omega = 0.000001;
const int max_depth = 7; // should be enough for all practical purposes
// ---------------------------------------
const float v = 0.618033988749894848204587;
const float w = 0.381966011250105151795413;
const float grow = 6.85410196624968454461376;
const vec2 dp0 = vec2(1.0, 0.0);
const vec2 dp1 = vec2(0.809016994374947424102293, 0.587785252292473129168706);
const vec2 dp2 = vec2(0.309016994374947424102293, 0.951056516295153572116439);
const float linestep0 = 0.5 * (linewidth - 2.4);
const float linestep1 = linestep0 + 1.2;

bool is_left(vec2 p0, vec2 p1, bool flipped)
{
	return flipped ^^ (p0.x * p1.y - p0.y * p1.x > 0.);
}

void deflate(inout vec2 p0, inout vec2 p1, inout vec2 p2, inout bool acute, inout bool flipped)
{
	if (acute) {
		vec2 q = v * p1 + w * p0;
		if (is_left(p2, q, flipped)) {
			p0 = p2;
			p2 = p1;
			p1 = q;
		} else {
			vec2 r = v * p0 + w * p2;	
			if (is_left(r, q, flipped)) {
				p0 = p2;
				p2 = r;
				p1 = q;
			} else {
				p2 = p0;
				p1 = q;
				p0 = r;
				acute = !acute;
			}
			flipped = !flipped;
		}
	} else {
		vec2 q = v * p1 + w * p2;
		if (is_left(q, p0, flipped)) {
			p2 = p1;
			p1 = p0;
			p0 = q;		
		} else {
			p1 = p0;
			p0 = p2;
			p2 = q;
			acute = !acute;
		}
	}
}

void initial_inflate(inout vec2 p1, inout vec2 p2)
{
	p1 *= grow;
	p2 *= grow;	
}

float calc_dist(vec2 p0, vec2 p1)
{
	return abs(p0.x * p1.y - p0.y * p1.x) / length(p1 - p0);
}

void main()
{
	float size = max(tile_min_size, max(resolution.x, resolution.y) / tiles_on_screen);
    vec2 offset = 6. * resolution.xy  * vec2(-0.08, -0.08);
	vec2 p0 = offset + (resolution.xy) - gl_FragCoord.xy;
	vec2 quad = vec2(sign(-p0));
	bool flipped = (quad.y < 0.);
	bool acute = true;
	vec2 p1, p2;
	if (is_left(p0 + quad * dp1, p0, quad.x * quad.y < 0.)) {
		p1 = quad * size * dp0;
		p2 = quad * size * dp1;
	} else {
		if (is_left(p0 + quad * dp2, p0, quad.x * quad.y < 0.)) {
			p1 = quad * size * dp2;
			p2 = quad * size * dp1;
			flipped = !flipped;
		} else {
			p1 = quad * size * dp2;
			p2 = quad * size * dp2 * vec2(-1., 1.);
		}
	}
	if (quad.x < 0.) {
		vec2 tmp = p2;
		p2 = p1;
		p1 = tmp;
	}
	int depth = 0;
	for (int i = 0; i < max_depth / 4; i++) {
		if (is_left(p0 + p1, p0 + p2, flipped)) break;
		initial_inflate(p1, p2);
		depth += 4;
	}
	p1 += p0;
	p2 += p0;
	for (int i = 0; i < max_depth; i++) {
		if (depth == 0) break;
		deflate(p0, p1, p2, acute, flipped);
		depth--;
	}
	vec3 color = (acute ? color1 : color2);
	if (acute) {
		color *= smoothstep(linestep0, linestep1, calc_dist(p1, p2));
		color *= smoothstep(linestep0, linestep1, calc_dist(p2, p0));
	} else {
		color *= smoothstep(linestep0, linestep1, calc_dist(p0, p1));
		color *= smoothstep(linestep0, linestep1, calc_dist(p1, p2));
	}
	gl_FragColor = vec4(color, 1.);
}