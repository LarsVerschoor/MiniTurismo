class RotateCameraStrategy {
	constructor(target) {
		this.target = target;
	}

	action(target, camera) {
		const newRotation = -target.rotation;
		camera.rotation = newRotation + Math.PI / 2;
	}
}

export {RotateCameraStrategy};
