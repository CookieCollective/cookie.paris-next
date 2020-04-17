
uniform sampler2D image;

varying vec2 uv;

void main ()
{
	vec3 color = vec3(0);
	float aspect = resolution.x / resolution.y;
	vec2 pos = (uv * 2. - 1.) * vec2(aspect, 1) * 1.4;
	// float lod1 = 2.;
	vec2 p = pos;
	// p = levelOfDetails(p, (resolution.y/2.));
	p.y -= sqrt(abs(p.x)+.01)*.5 - .1;
	float dist = length(p) * .3 - time * .1;// + 0.02 * random(p);
	float lod = 10.0;
	vec3 rainbow = hsv2rgb(vec3(ceil(dist * lod) / lod + floor(dist) / 10.,0.8,1.0));
	rainbow *= 0.5+0.5*smoothstep(1.0, 0.5, fract(dist * lod));
	// pos *= rotation(sin(dist) * .5);
	// pos *= 1. + .1 * sin(dist * 8.);
	// pos -= vec2(0.5);
	// vec4 map = texture2D(image, fract(pos));
	// color = mix(color, rainbow.rgb, smoothstep(0.3,0.6, map.a));
	gl_FragColor = vec4(rainbow.rgb, 1);
}