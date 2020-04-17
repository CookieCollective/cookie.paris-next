
uniform sampler2D image, frame;

varying vec2 uv;

const vec2 imageResolution = vec2(717, 492);

void main ()
{
	vec3 color = vec3(0);
	float aspect = resolution.x / resolution.y;
	float aspectImage = imageResolution.x / imageResolution.y;
	vec2 pos = (uv * 2. - 1.) * vec2(aspect / aspectImage, 1) * 2.5;
	const float count = 8.0;
	for (float index = count; index > 0.0; --index) {
		float ratio = (index-1.0)/(count-1.0);
		float t = sin(time + pos.x * .5);
		// pos *= rotation(0.02 * t);
		pos *= 1.0 - .1 * pow(abs(t), 4.);
		// pos = pos*0.5+0.5;
		vec4 map = texture2D(image, fract(pos+0.5));
		// float crop = step(0.,pos.x)*step(pos.x,1.)*step(0.,pos.y)*step(pos.y,1.);
		color = mix(color, hsv2rgb(vec3(ratio + 0.4, 0.8 * (index==1.0?0.0:1.0), 0.9)), map.a);
		// pos = pos*0.5+0.5;
	}
	gl_FragColor = vec4(color, 1);
}