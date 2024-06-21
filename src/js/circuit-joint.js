import {Actor, Circle, CircleCollider, Color} from 'excalibur';
import {player} from './player';

class TrackJoint extends Actor {
	checkpoint;
	start;
	finish;
	shape;
	visited = false;
	hasCar = false;

	constructor({pos, rotation, checkpoint, start, finish, radius, color}) {
		super({
			pos,
			collider: new CircleCollider({radius}),
			rotation
		});
		this.checkpoint = checkpoint;
		this.start = start;
		this.finish = finish;
		this.shape = new Circle({
			radius,
			color
		});
	}

	onInitialize() {
		this.graphics.use(this.shape);
		this.on('collisionstart', (e) => {
			if (e.other !== player.carActor) return;
			this.hasCar = true;
			this.visited = true;
		});
		this.on('collisionend', (e) => {
			if (e.other !== player.carActor) return;
			this.hasCar = false;
		});
	}
}

class GrassJoint extends Actor {
	radius;
	color;
	shape;

	constructor({pos, rotation, radius, grassWidth}) {
		super({
			pos,
			rotation
		});
		this.shape = new Circle({
			radius: radius + grassWidth,
			color: Color.fromHex('5ba01b')
		});
	}

	onInitialize() {
		this.graphics.use(this.shape);
	}
}

export {TrackJoint, GrassJoint};
