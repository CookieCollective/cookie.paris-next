
uniform sampler2D image;
const vec2 imageResolution = vec2(717, 492);

varying vec2 uv;

void main ()
{
	vec3 color = vec3(0);
	float aspect = resolution.x / resolution.y;
	float aspectImage = imageResolution.y / imageResolution.x;
	vec2 pos = (uv * 2. - 1.) * vec2(aspect, 1) * 1.4;
	float dist = length(pos) * .2 - time * .1 + 4. * random(uv) / resolution.y;
	float lod = 4.0;
	vec3 rainbow = hsv2rgb(vec3(ceil(dist * lod) / lod * 0.4,0.8,0.8));
	rainbow *= 0.3 / abs(sin(dist * PI * lod));
	pos *= rotation(sin(dist) * .5);
	pos *= 1. + .1 * sin(dist * 8.);
	pos.x *= aspectImage;
	pos -= vec2(0.5);
	vec4 map = texture2D(image, fract(pos));
	color = mix(color, rainbow.rgb, map.a);
	gl_FragColor = vec4(color, 1);
}