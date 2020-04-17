export type BackgroundKind = 'main' | 'welcome' | undefined;

export interface MountedModule {
	readonly element: HTMLElement;
	unmount(): void;
}

export interface Module {
	mount(container: HTMLElement): MountedModule;
}

export const backgroundService = {
	display(kind: BackgroundKind) {
		// Nothing.
	},
};

if (typeof window !== 'undefined') {
	const container = document.createElement('div');
	container.className = 'background';
	document.body.insertBefore(container, document.body.firstChild);

	let currentKind: BackgroundKind;
	let currentMountedModule: MountedModule | undefined;

	function unmountModule(module: MountedModule) {
		module.unmount();
	}

	function mountModule(module: Module) {
		if (currentMountedModule) {
			setTimeout(unmountModule, 400, currentMountedModule);
		}
		currentMountedModule = module.mount(container);
		currentMountedModule.element.style.transition = 'opacity 300ms linear';
		setTimeout(
			(style: CSSStyleDeclaration) => {
				style.opacity = '1';
			},
			100,
			currentMountedModule.element.style
		);
	}

	backgroundService.display = (kind) => {
		if (kind === currentKind) {
			return;
		}
		currentKind = kind;

		switch (kind) {
			case 'main':
				import('./backgrounds/main').then(mountModule);
				break;

			case 'welcome':
				import('./backgrounds/welcome').then(mountModule);
				break;

			default:
				if (currentMountedModule) {
					unmountModule(currentMountedModule);
					currentMountedModule = undefined;
				}
				break;
		}
	};
}
