import {Scene, Keys, Color} from 'excalibur';
import {TrackJoint, GrassJoint} from './circuit-joint';
import {TrackStraight, GrassStraight} from './circuit-straight';
import {player} from './player';
import {RotateCameraStrategy} from './rotate-camera';
import {UI} from './circuit-ui';

class Circuit extends Scene {
	name;
	jointsData;
	straightsData;
	joints = [];
	straights = [];
	cameraStrategy;
	ui;

	constructor(name, joints, straights) {
		super();
		this.name = name;
		this.jointsData = joints;
		this.straightsData = straights;
	}

	onInitialize() {
		this.createGrass();
		this.createJoints();
		this.createStraights();
		this.cameraStrategy = new RotateCameraStrategy(player.carActor);
		this.ui = new UI();
	}

	onActivate() {
		player.carActor.reset();
		player.carActor.pos = this.joints[0].pos;
		player.carActor.rotation = this.joints[0].rotation;
		this.add(player.carActor);
		this.add(this.ui);
		this.camera.addStrategy(this.cameraStrategy);
		this.camera.strategy.lockToActor(player.carActor);
	}

	onPreUpdate(engine) {
		if (engine.input.keyboard.wasPressed(Keys.Esc)) engine.goToScene('menu');
	}

	onPostUpdate() {
		this.ui.steeringWheel.rotate(player.carActor.steeringWheelRotation);
	}

	createGrass() {
		this.jointsData.forEach((jointData) => {
			this.add(new GrassJoint(jointData));
		});
		this.straightsData.forEach((straightData) => {
			this.add(new GrassStraight(straightData));
		});
	}

	createJoints() {
		this.jointsData.forEach((jointData) => {
			const joint = new TrackJoint(jointData);
			this.joints.push(joint);
			this.add(joint);
		});
	}

	createStraights() {
		this.straightsData.forEach((straightData) => {
			const straight = new TrackStraight(straightData);
			this.straights.push(straight);
			this.add(straight);
		});
	}
}

export {Circuit};
