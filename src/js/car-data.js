import {Resources} from './resources';

/**
 * acceleration: px / sec
 * constantDragCoefficient: px / speed
 * linearDragCoefficient: px * speed
 * quadraticDragCoefficient: px * speed ^ 2
 * brakingDeceleration: px / sec
 * steeringWheelRotationSpeed: % / 0.01 sec
 * rotationSpeed: radians / speed / sec
 * maxRotationSpeed: radians / sec
 */

const cars = {};

class Car {
	name;
	acceleration;
	constantDragCoefficient;
	linearDragCoefficient;
	quadraticDragCoefficient;
	brakingDeceleration;
	steeringWheelRotation;
	steeringWheelRotationSpeed;
	rotationSpeed;
	maxRotationSpeed;
	image;

	constructor(name, acceleration, brakingDeceleration, rotationSpeed, maxRotationSpeed, image) {
		this.name = name;
		this.acceleration = acceleration;
		this.constantDragCoefficient = 20;
		this.linearDragCoefficient = 0.02;
		this.quadraticDragCoefficient = 0.00012;
		this.brakingDeceleration = brakingDeceleration;
		this.steeringWheelRotation = 0;
		this.steeringWheelRotationSpeed = 5;
		this.rotationSpeed = rotationSpeed;
		this.maxRotationSpeed = maxRotationSpeed;
		this.image = image;
	}
}

cars['porsche'] = new Car(
	'porsche',
	120,
	350,
	(Math.PI * 2) / 450,
	(Math.PI * 2) / 4,

	Resources.Porsche
);

export {cars};
