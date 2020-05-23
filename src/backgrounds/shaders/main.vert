precision mediump float;

attribute vec4 position;
attribute vec4 seed;

uniform mat4 viewProjection;
uniform float time;
uniform vec2 resolution;

varying vec4 vColor;

mat2 rotation (float a) { float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }

void main () {
	vec4 pos = position;
	float t = time * 0.1 + seed.w * 3.1415 * 2.;
	float wave = mod(time * 0.05 + seed.w, 1.0);
	float fade = smoothstep(0.0,0.1,wave)*smoothstep(1.0,0.9,wave);
	pos.xz *= rotation(t);
	pos.yz *= rotation(t);
	pos.yx *= rotation(t);
	pos.xyz *= 0.15 + seed.z * 0.05;
	pos.xyz *= fade;
	pos.xyz += seed.xyz * 4. * vec3(resolution.x/resolution.y,1,1);
	vColor = vec4(vec3(seed.z*.5+.5)*.5, 1.);
	gl_Position = viewProjection * pos;
	gl_PointSize = 4.0;
}
