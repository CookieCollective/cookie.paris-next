
uniform sampler2D image, frame;

varying vec2 uv;

void main ()
{
	vec3 color = vec3(0);
	float aspect = resolution.x / resolution.y;
	vec2 pos = (gl_FragCoord.xy - resolution.xy/2.) / min(resolution.x, resolution.y);
	// vec2 pos = (uv * 2. - 1.) * vec2(aspect, 1) * 1.4;
	// vec2 offset = vec2(2.*sin(time)/resolution.x, 0);
	float a = time;
	float dist = length(pos);
	vec2 offset = -normalize(pos) / resolution.y;// mix(0.01,0.02,0.5+0.5*sin(time*3.-dist));
	// pos += vec2(cos(a),sin(a)) * 0.5 + 0.5;
	vec4 f = texture2D(frame, uv);
	float aa = rgb2hsv(f.rgb).x * TAU + time;
	offset += vec2(cos(aa),sin(aa)) / resolution.y;
	// offset.y -= 2./resolution.y;
	// float id = random(floor(pos));
	// offset *= rotation(time);
	vec4 frame = texture2D(frame, uv + offset);
	frame.rgb = hsv2rgb(rgb2hsv(frame.rgb)+vec3(0.002,0,-0.00));
	vec3 rainbow = hsv2rgb(vec3(tick * 0.1,0.8,1.0));
	pos += 0.5;
	float crop = step(0.,pos.x)*step(pos.x,1.)*step(0.,pos.y)*step(pos.y,1.);
	vec4 map = texture2D(image, pos) * crop;
	color = mix(frame.rgb, rainbow, smoothstep(0.9, 1.0, map.a));
	gl_FragColor = vec4(color, 1);
}