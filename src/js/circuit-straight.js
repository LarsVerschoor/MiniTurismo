import {Actor, Rectangle, Vector, Color} from 'excalibur';
import {player} from './player';

class TrackStraight extends Actor {
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
			if (e.other !== player.carActor) return;
			this.hasCar = true;
		});
		this.on('collisionend', (e) => {
			if (e.other !== player.carActor) return;
			this.hasCar = false;
		});
	}
}

class GrassStraight extends Actor {
	shape;

	constructor({pos, distance, rotation, trackWidth, grassWidth}) {
		super({
			pos,
			anchor: new Vector(0, 0.5),
			rotation
		});
		this.shape = new Rectangle({
			width: distance,
			height: trackWidth + grassWidth * 2,
			color: Color.fromHex('5ba01b')
		});
	}

	onInitialize() {
		this.graphics.use(this.shape);
	}
}

export {TrackStraight, GrassStraight};
