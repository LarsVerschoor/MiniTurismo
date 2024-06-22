import {Actor, Vector, Keys} from 'excalibur';

class Car extends Actor {
	name;
	speed = 0;
	acceleration;
	constantDragCoefficient;
	linearDragCoefficient;
	quadraticDragCoefficient;
	brakingDeceleration;
	steeringWheelRotation = 0;
	steeringWheelRotationSpeed;
	rotationSpeed;
	maxRotationSpeed;
	image;
	racing = false;

	constructor({
		name,
		acceleration,
		constantDragCoefficient,
		linearDragCoefficient,
		quadraticDragCoefficient,
		brakingDeceleration,
		steeringWheelRotationSpeed,
		rotationSpeed,
		maxRotationSpeed,
		image
	}) {
		super({
			pos: new Vector(0, 0),
			width: 64,
			height: 32,
			anchor: new Vector(0.85, 0.5)
		});
		this.name = name;
		this.acceleration = acceleration;
		this.constantDragCoefficient = constantDragCoefficient;
		this.linearDragCoefficient = linearDragCoefficient;
		this.quadraticDragCoefficient = quadraticDragCoefficient;
		this.brakingDeceleration = brakingDeceleration;
		this.steeringWheelRotationSpeed = steeringWheelRotationSpeed;
		this.rotationSpeed = rotationSpeed;
		this.maxRotationSpeed = maxRotationSpeed;
		this.image = image;
	}

	reset() {
		this.speed = 0;
		this.rotation = 0;
		this.vel = new Vector(0, 0);
		this.pos = new Vector(0, 0);
		this.steeringWheelRotation = 0;
	}

	onInitialize() {
		this.graphics.use(this.image.toSprite());
	}

	onPreUpdate(engine, delta) {
		const deltaSeconds = delta / 1000;

		// acceleration / braking
		if (this.racing && engine.input.keyboard.isHeld(Keys.W) && this.speed <= 0) {
			this.accelerate(deltaSeconds, false);
		} else if ((engine.input.keyboard.isHeld(Keys.W) || !this.racing) && this.speed > 0) {
			this.brake(deltaSeconds, true);
		} else if (this.racing && engine.input.keyboard.isHeld(Keys.S) && this.speed >= 0) {
			this.accelerate(deltaSeconds, true);
		} else if ((engine.input.keyboard.isHeld(Keys.S) || !this.racing) && this.speed < 0) {
			this.brake(deltaSeconds, false);
		}

		// rotating steering wheel and rotating the car
		const maxRotationSpeed = this.maxRotationSpeed * deltaSeconds;
		const steeringSensitivity = Math.min(this.rotationSpeed * Math.abs(this.speed) * deltaSeconds, maxRotationSpeed);

		if (this.racing && engine.input.keyboard.isHeld(Keys.D) && !engine.input.keyboard.isHeld(Keys.A)) {
			this.steeringWheelRotation = Math.min(this.steeringWheelRotation + this.steeringWheelRotationSpeed * deltaSeconds, 1);
			if (this.speed <= 0) {
				this.rotation += steeringSensitivity * this.steeringWheelRotation;
			} else if (this.speed > 0) {
				this.rotation -= steeringSensitivity * this.steeringWheelRotation;
			}
		} else if (this.racing && engine.input.keyboard.isHeld(Keys.A) && !engine.input.keyboard.isHeld(Keys.D)) {
			this.steeringWheelRotation = Math.max(this.steeringWheelRotation - this.steeringWheelRotationSpeed * deltaSeconds, -1);
			if (this.speed <= 0) {
				this.rotation += steeringSensitivity * this.steeringWheelRotation;
			} else if (this.speed > 0) {
				this.rotation -= steeringSensitivity * this.steeringWheelRotation;
			}
		} else {
			this.straightenSteeringWheel(deltaSeconds, steeringSensitivity);
		}

		if (this.speed !== 0) this.applyEarodynamicDrag(deltaSeconds);

		this.applyNewSpeed();
	}

	startRacing() {
		this.racing = true;
	}

	stopRacing() {
		this.racing = false;
	}

	straightenSteeringWheel(deltaSeconds, steeringSensitivity) {
		if (this.steeringWheelRotation > 0 && this.speed < 0) {
			// need to steer left
			this.steeringWheelRotation = Math.max(this.steeringWheelRotation - this.steeringWheelRotationSpeed * deltaSeconds, 0);
			this.rotation += this.steeringWheelRotation * steeringSensitivity;
		} else if (this.steeringWheelRotation > 0 && this.speed > 0) {
			// need to steer left
			this.steeringWheelRotation = Math.max(this.steeringWheelRotation - this.steeringWheelRotationSpeed * deltaSeconds, 0);
			this.rotation -= this.steeringWheelRotation * steeringSensitivity;
		} else if (this.steeringWheelRotation < 0 && this.speed < 0) {
			// need to steer right
			this.steeringWheelRotation = Math.min(this.steeringWheelRotation + this.steeringWheelRotationSpeed * deltaSeconds, 0);
			this.rotation += this.steeringWheelRotation * steeringSensitivity;
		} else if (this.steeringWheelRotation < 0 && this.speed > 0) {
			// need to steer right
			this.steeringWheelRotation = Math.min(this.steeringWheelRotation + this.steeringWheelRotationSpeed * deltaSeconds, 0);
			this.rotation -= this.steeringWheelRotation * steeringSensitivity;
		}
	}

	accelerate(deltaSeconds, backwards) {
		const acceleration = this.acceleration * deltaSeconds;
		this.speed += !backwards ? -acceleration : 0.5 * acceleration;
	}

	brake(deltaSeconds, backwards) {
		const deceleration = this.brakingDeceleration * deltaSeconds;
		if (!backwards) {
			this.speed = Math.min(this.speed + deceleration, 0);
			return;
		}
		this.speed = Math.max(this.speed - deceleration, 0);
	}

	applyEarodynamicDrag(deltaSeconds) {
		const dragQuadraticPerSecond = this.quadraticDragCoefficient * Math.pow(this.speed, 2);
		const dragLinearPerSecond = this.linearDragCoefficient * Math.abs(this.speed);
		const dragConstantPerSecond = this.constantDragCoefficient;
		const dragTotal = (dragQuadraticPerSecond + dragLinearPerSecond + dragConstantPerSecond) * deltaSeconds;
		if (this.speed < 0) {
			this.speed = Math.min(this.speed + dragTotal, 0);
		} else if (this.speed > 0) {
			this.speed = Math.max(this.speed - dragTotal, 0);
		}
	}

	applyNewSpeed() {
		const speed = this.speed;
		this.vel = Vector.fromAngle(this.rotation).scale(speed);
	}
}

export {Car};
