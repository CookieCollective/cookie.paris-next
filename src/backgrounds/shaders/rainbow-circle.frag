
uniform sampler2D image;
const vec2 imageResolution = vec2(717, 492);

varying vec2 uv;

void main ()
{
	vec3 color = vec3(0);
	float aspect = resolution.x / resolution.y;
	float aspectImage = imageResolution.y / imageResolution.x;
	vec2 pos = (uv * 2. - 1.) * vec2(aspect, 1) * 1.4;
	float dist = length(pos) * .3 - time * .1;
	float lod = 4.0;
	vec3 rainbow = hsv2rgb(vec3(ceil(dist * lod) / lod + floor(dist) / 10.,0.8,1.0));
	pos *= rotation(sin(dist) * .5);
	pos *= 1. + .1 * sin(dist * 8.);
	pos -= vec2(0.5);
	vec4 map = texture2D(image, fract(pos));
	color = mix(color, rainbow.rgb, smoothstep(0.3,0.6, map.a));
	gl_FragColor = vec4(color, 1);
}