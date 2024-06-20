import {Actor, Rectangle, Vector} from 'excalibur';

class Straight extends Actor {
	shape;
	hasCar;

	constructor({pos, distance, rotation, trackWidth, color}) {
		super({
			pos,
			width: distance,
			height: trackWidth,
			anchor: new Vector(0, 0.5),
			rotation
		});
		this.shape = new Rectangle({
			width: distance,
			height: trackWidth,
			color
		});
	}

	onInitialize(engine) {
		this.graphics.use(this.shape);
		this.on('collisionstart', (e) => {
			// if (e.other !== engine.player.car) return;
			// this.hasCar = true;
		});
		this.on('collisionend', (e) => {
			// if (e.other !== engine.player.car) return;
			// this.hasCar = false;
		});
	}
}

export {Straight};
