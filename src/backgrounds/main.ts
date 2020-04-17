import * as twgl from 'twgl.js';
import { m4 } from 'twgl.js';

const VERTEX_SHADER = `
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
	vColor = vec4(seed.z*.5+.5);
	gl_Position = viewProjection * pos;
	gl_PointSize = 4.0;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform float time;
uniform vec4 color;

varying vec4 vColor;

void main() {
	gl_FragColor = vColor;
}
`;

const CUBE_COUNT = 100;
const CROSS_COUNT = 100;
const CIRCLE_COUNT = 100;
const CIRCLE_SEGMENT_COUNT = 16;

const CUBE_INDICES = [
	0,
	1,
	1,
	3,
	3,
	2,
	2,
	0,
	4,
	5,
	5,
	7,
	7,
	6,
	6,
	4,
	0,
	4,
	1,
	5,
	2,
	6,
	3,
	7,
];

const CUBE_POSITIONS = [
	-1,
	-1,
	-1,
	1,
	-1,
	-1,
	-1,
	1,
	-1,
	1,
	1,
	-1,
	-1,
	-1,
	1,
	1,
	-1,
	1,
	-1,
	1,
	1,
	1,
	1,
	1,
].map((p) => p * 0.75);

const CROSS_INDICES = [0, 1, 2, 3, 4, 5];

const CROSS_POSITIONS = [
	0,
	1,
	0,
	0,
	-1,
	0,
	1,
	0,
	0,
	-1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	-1,
];

let indices: number[] = [];
let position: number[] = [];
const seed: number[] = [];

const makeRandomVec3 = () => [
	Math.random() * 2 - 1,
	Math.random() * 2 - 1,
	Math.random() * 2 - 1,
];

for (let index = 0; index < CUBE_COUNT; ++index) {
	indices = indices.concat(CUBE_INDICES.map((i) => i + index * 8));
	position = position.concat(CUBE_POSITIONS);

	const random = makeRandomVec3();
	for (let i = 0; i < 8; ++i) {
		seed.push(...random, index / CUBE_COUNT);
	}
}

for (let index = 0; index < CROSS_COUNT; ++index) {
	indices = indices.concat(
		CROSS_INDICES.map((i) => i + CUBE_COUNT * 8 + index * 6)
	);
	position = position.concat(CROSS_POSITIONS);

	const random = makeRandomVec3();
	for (let i = 0; i < 6; ++i) {
		seed.push(...random, index / CROSS_COUNT);
	}
}

for (let index = 0; index < CIRCLE_COUNT; ++index) {
	const circleIndices = [];
	for (let i = 0; i < CIRCLE_SEGMENT_COUNT; ++i)
		circleIndices.push(i, (i + 1) % CIRCLE_SEGMENT_COUNT);

	for (let i = 0; i < circleIndices.length; ++i)
		circleIndices[i] +=
			CUBE_COUNT * 8 + CROSS_COUNT * 6 + index * CIRCLE_SEGMENT_COUNT;

	const circlePositions = [];
	const random = makeRandomVec3();
	for (let i = 0; i < CIRCLE_SEGMENT_COUNT; ++i) {
		const a = (Math.PI * 2 * i) / CIRCLE_SEGMENT_COUNT;
		circlePositions.push(Math.cos(a), 0, Math.sin(a));
		seed.push(...random, index / CIRCLE_COUNT);
	}

	indices = indices.concat(circleIndices);
	position = position.concat(circlePositions);
}

function actualMount(
	container: HTMLElement,
	canvas: HTMLCanvasElement,
	gl: WebGLRenderingContext
) {
	container.appendChild(canvas);

	const program = twgl.createProgramFromSources(gl, [
		VERTEX_SHADER,
		FRAGMENT_SHADER,
	]);
	const programInfo = twgl.createProgramInfoFromProgram(gl, program);

	const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
		indices: { numComponents: 2, data: indices },
		position,
		seed: { numComponents: 4, data: seed },
	});

	const cameraMatrix = m4.lookAt([0, 0, 10], [0, 0, 0], [0, 1, 0]);

	const uniforms: {
		color: [number, number, number, number];
		resolution: [number, number];
		time: number;
		viewProjection: m4.Mat4;
	} = {
		color: [1, 1, 1, 1],
		resolution: undefined as any,
		time: 0,
		viewProjection: undefined as any,
	};

	const onWindowResize = () => {
		twgl.resizeCanvasToDisplaySize(canvas);

		gl.viewport(0, 0, canvas.width, canvas.height);

		uniforms.resolution = [canvas.width, canvas.height];

		const projectionMatrix = m4.perspective(
			(50 * Math.PI) / 180,
			canvas.width / canvas.height,
			0.01,
			100.0
		);

		uniforms.viewProjection = m4.multiply(
			projectionMatrix,
			m4.inverse(cameraMatrix)
		);
	};

	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);

	gl.clearColor(0, 0, 0, 1);

	const render = (elapsed: number) => {
		elapsed /= 1000;

		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

		uniforms.time = elapsed;
		twgl.setUniforms(programInfo, uniforms);

		twgl.drawBufferInfo(gl, bufferInfo, gl.LINES);

		animationRequestId = requestAnimationFrame(render);
	};

	let animationRequestId = requestAnimationFrame(render);

	return {
		unmount: () => {
			window.removeEventListener('resize', onWindowResize!, false);

			cancelAnimationFrame(animationRequestId!);

			canvas.remove();
		},
	};
}

let cacheCanvas: HTMLCanvasElement | undefined;
let cacheGl: WebGLRenderingContext | null;

export function mount(container: HTMLElement) {
	if (!cacheCanvas || !cacheGl) {
		cacheCanvas = document.createElement('canvas');

		cacheGl = cacheCanvas.getContext('webgl');
		if (!cacheGl) {
			throw new Error('Cannot get WebGL context');
		}
	}

	return actualMount(container, cacheCanvas, cacheGl);
}
