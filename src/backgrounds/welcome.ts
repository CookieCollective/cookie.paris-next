import COMMON from 'raw-loader!./shaders/common.glsl';
import FEEDBACK from 'raw-loader!./shaders/feedback.frag';
import RGB_GLITCH from 'raw-loader!./shaders/rgb-glitch.frag';
import RAINBOW_CIRCLE from 'raw-loader!./shaders/rainbow-circle.frag';
import RENDER from 'raw-loader!./shaders/render.frag';
import SCREEN from 'raw-loader!./shaders/screen.vert';
import SIMPLE from 'raw-loader!./shaders/simple.frag';
import * as twgl from 'twgl.js';

function loadMaterials<
	T extends {
		[key: string]: {
			fragment: string;
			vertex: string;
		};
	}
>(gl: WebGLRenderingContext, materialDefinition: T, commonShader?: string) {
	const materials: { [key in keyof T]: twgl.ProgramInfo } = {} as any;
	Object.keys(materialDefinition).forEach((key: keyof T) => {
		materials[key] = twgl.createProgramInfo(gl, [
			(commonShader || '') + materialDefinition[key].vertex,
			(commonShader || '') + materialDefinition[key].fragment,
		]);
	});
	return materials;
}

function actualMount(
	container: HTMLElement,
	canvas: HTMLCanvasElement,
	gl: WebGLRenderingContext
) {
	container.appendChild(canvas);

	const frames = [
		twgl.createFramebufferInfo(gl),
		twgl.createFramebufferInfo(gl),
	];
	let currentFrame = 0;

	const planeBuffer = twgl.createBufferInfoFromArrays(gl, {
		position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
	});

	const materials = loadMaterials(
		gl,
		{
			feedback: {
				fragment: FEEDBACK,
				vertex: SCREEN,
			},
			rgbGlitch: {
				fragment: RGB_GLITCH,
				vertex: SCREEN,
			},
			rainbowCircle: {
				fragment: RAINBOW_CIRCLE,
				vertex: SCREEN,
			},
			render: {
				fragment: RENDER,
				vertex: SCREEN,
			},
			simple: {
				fragment: SIMPLE,
				vertex: SCREEN,
			},
		},
		COMMON
	);

	const SEQUENCE_MATERIALS = [
		materials.rgbGlitch,
		materials.rainbowCircle,
		materials.feedback,
	];
	const SEQUENCE_DURATION_TIME = 3;

	let currentSequenceIndex = 0;
	let sequenceElapsedTime = 0;

	const uniforms: {
		frame: WebGLObject;
		image: WebGLTexture;
		resolution: [number, number];
		time: number;
	} = {
		frame: undefined as any,
		resolution: [1, 1],
		time: 0,
		tick: 0,

		// http://twgljs.org/docs/module-twgl.html#.TextureOptions
		image: twgl.createTexture(gl, {
			flipY: 1,
			src: '/cookie-collective-sdf.png',
			min: gl.LINEAR,
		}),
	};

	const onWindowResize = () => {
		twgl.resizeCanvasToDisplaySize(canvas);
		twgl.resizeFramebufferInfo(gl, frames[0]);
		twgl.resizeFramebufferInfo(gl, frames[1]);

		gl.viewport(0, 0, canvas.width, canvas.height);

		uniforms.resolution = [canvas.width, canvas.height];
	};

	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);

	const draw = (material: twgl.ProgramInfo) => {
		gl.useProgram(material.program);
		twgl.setBuffersAndAttributes(gl, material, planeBuffer);
		twgl.setUniforms(material, uniforms);
		twgl.drawBufferInfo(gl, planeBuffer, gl.TRIANGLES);
	};

	const render = (elapsed: number) => {
		elapsed /= 1000;

		const dt = elapsed - uniforms.time;
		uniforms.time = elapsed;

		gl.bindFramebuffer(gl.FRAMEBUFFER, frames[currentFrame].framebuffer);
		uniforms.frame = frames[(currentFrame + 1) % 2].attachments[0];
		draw(SEQUENCE_MATERIALS[currentSequenceIndex]);

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		draw(materials.render);

		uniforms.tick++;
		currentFrame = 1 - currentFrame;
		// if (sequenceElapsedTime > SEQUENCE_DURATION_TIME) {
		// 	sequenceElapsedTime = 0;
		// 	currentSequenceIndex =
		// 		(currentSequenceIndex + 1) % SEQUENCE_MATERIALS.length;
		// } else {
		// 	sequenceElapsedTime += dt;
		// }

		requestAnimationFrame(render);
	};

	const animationRequestId = requestAnimationFrame(render);

	return {
		element: canvas,

		unmount: () => {
			window.removeEventListener('resize', onWindowResize!, false);

			cancelAnimationFrame(animationRequestId!);

			canvas.remove();
		},
	};
}

export function mount(container: HTMLElement) {
	const canvas = document.createElement('canvas');

	const gl = canvas.getContext('webgl');
	if (!gl) {
		throw new Error('Cannot get WebGL context');
	}

	return actualMount(container, canvas, gl);
}
