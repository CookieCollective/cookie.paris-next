
uniform sampler2D image, frame;

varying vec2 uv;

void main ()
{
	vec3 color = vec3(0);
	float aspect = resolution.x / resolution.y;
	vec2 pos = (uv * 2. - 1.) * vec2(aspect, 1) * 1.4;
	// vec2 offset = vec2(2.*sin(time)/resolution.x, 0);
	float a = time;
	float dist = length(pos);
	vec2 offset = normalize(pos) *  mix(0.0,0.01,0.5+0.5*sin(time*3.-dist));
	// pos += vec2(cos(a),sin(a)) * 0.5 + 0.5;
	offset *= rotation(time);
	vec4 frame = texture2D(frame, uv + offset);
	vec3 rainbow = hsv2rgb(vec3(time,0.8,0.8));
	float crop = step(0.,pos.x)*step(pos.x,1.)*step(0.,pos.y)*step(pos.y,1.);
	vec4 map = texture2D(image, fract(pos));// * crop;
	color = mix(frame.rgb * 0.9, map.rgb, map.a);
	gl_FragColor = vec4(color, 1);
}