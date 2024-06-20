import {Actor, Circle, CircleCollider} from 'excalibur';

class Joint extends Actor {
	checkpoint;
	start;
	finish;
	shape;
	visited = false;
	hasCar = false;

	constructor({pos, checkpoint, start, finish, radius, color}) {
		super({
			pos,
			collider: new CircleCollider({radius})
		});
		this.checkpoint = checkpoint;
		this.start = start;
		this.finish = finish;
		this.shape = new Circle({
			radius,
			color
		});
	}

	onInitialize(engine) {
		this.graphics.use(this.shape);
		this.on('collisionstart', (e) => {
			// if (e.other !== engine.player.car) return;
			// this.hasCar = true;
			// this.visited = true;
		});
		this.on('collisionend', (e) => {
			// if (e.other !== engine.player.car) return;
			// this.hasCar = false;
		});
	}
}

export {Joint};
