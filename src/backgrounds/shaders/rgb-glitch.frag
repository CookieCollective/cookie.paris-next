
uniform sampler2D image, frame;

varying vec2 uv;


void main ()
{
	vec3 color = vec3(0);
	vec2 pos = (gl_FragCoord.xy - resolution.xy/2.) / min(resolution.x, resolution.y);
	float id = random(floor(pos+0.5));
	float lod = 200.;
	pos.x += 0.01*(random(vec2(id+floor((pos.y+time*0.1)*lod)/lod))*2.-1.);
	pos.x += 0.1*(random(vec2(id+floor((pos.y+time*0.1)*lod/10.)/lod/10.))*2.-1.);
	float a = 0.;
	float r = 0.01;
	vec2 offset = vec2(cos(a),sin(a))*r;
	pos += 0.5;
	float crop = step(0.,pos.x)*step(pos.x,1.)*step(0.,pos.y)*step(pos.y,1.);
	color.r += smoothstep(0.5,0.6, texture2D(image, (pos.xy)+offset).a)*crop;
	a += TAU/3.;
	offset = vec2(cos(a),sin(a))*r;
	color.g += smoothstep(0.5,0.6, texture2D(image, (pos.xy)+offset).a)*crop;
	a += TAU/3.;
	offset = vec2(cos(a),sin(a))*r;
	color.b += smoothstep(0.5,0.6, texture2D(image, (pos.xy)+offset).a)*crop;
	gl_FragColor = vec4(color, 0);
}