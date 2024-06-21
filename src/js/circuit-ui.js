import {ScreenElement, Vector, Actor} from 'excalibur';
import {Resources} from './resources';

class UI extends ScreenElement {
	steeringWheel;

	onInitialize(engine) {
		this.steeringWheel = new SteeringWheel(new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 200));
		this.addChild(this.steeringWheel);
	}
}

class SteeringWheel extends Actor {
	image;

	constructor(pos) {
		super({pos});
		this.image = Resources.SteeringWheel;
	}

	onInitialize() {
		this.graphics.use(this.image.toSprite());
	}

	rotate(value) {
		this.rotation = (value * Math.PI) / 2;
	}
}

export {UI};
