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

	constructor(name, image) {
		this.name = name;
		this.acceleration = 130;
		this.constantDragCoefficient = 20;
		this.linearDragCoefficient = 0.02;
		this.quadraticDragCoefficient = 0.00012;
		this.brakingDeceleration = 320;
		this.steeringWheelRotation = 0;
		this.steeringWheelRotationSpeed = 5;
		this.rotationSpeed = (Math.PI * 2) / 700;
		this.maxRotationSpeed = (Math.PI * 2) / 4.2;
		this.image = image;
	}
}

cars['ford'] = new Car('ford', Resources.Ford);

cars['porsche'] = new Car('porsche', Resources.Porsche);

cars['ferrari'] = new Car('ferrari', Resources.Ferrari);

export {cars};
