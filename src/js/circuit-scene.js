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
	startIndex;
	finishIndex;
	checkpointIndexes = [];
	straights = [];
	hasCar = false;
	cameraStrategy;
	ui;
	time = 0;
	countdown = 3000;
	remainingCountdown = this.countdown;
	raceActive = false;

	constructor(name, joints, straights) {
		super();
		this.name = name;
		this.jointsData = joints;
		this.straightsData = straights;
	}

	onInitialize() {
		this.ui = new UI(this.name);

		this.createGrass();
		this.createJoints();
		this.createStraights();

		this.joints[this.finishIndex].on('collisionstart', (e) => {
			if (!this.raceActive) return;
			if (e.other !== player.carActor) return;
			let checkpointsChecked = true;
			this.checkpointIndexes.forEach((index) => {
				if (this.joints[index].visited === false) checkpointsChecked = false;
			});
			if (!checkpointsChecked) return;
			this.finish();
		});
	}

	onActivate() {
		this.cameraStrategy = new RotateCameraStrategy(player.carActor);
		player.carActor.reset();
		player.carActor.pos = this.joints[0].pos;
		player.carActor.rotation = this.joints[0].rotation;
		this.add(player.carActor);
		this.add(this.ui);
		this.camera.addStrategy(this.cameraStrategy);
		this.camera.strategy.lockToActor(player.carActor);
	}

	onDeactivate() {
		this.ui.hideDisqualification();
		this.ui.hideFinish();
		this.remove(player.carActor);
		this.joints.forEach((joint) => {
			joint.visited = false;
		});
		this.time = 0;
		this.remainingCountdown = this.countdown;
		this.deActivateRace();
		this.ui.updateCountdown('');
	}

	onPreUpdate(engine, delta) {
		if (engine.input.keyboard.wasPressed(Keys.Esc)) engine.goToScene('menu');
		if (this.remainingCountdown > 0) {
			this.remainingCountdown = Math.max(this.remainingCountdown - delta, 0);
			this.ui.updateCountdown((this.remainingCountdown / 1000).toFixed(1));
			if (this.remainingCountdown === 0) {
				this.activateRace();
				this.ui.updateCountdown('');
			}
		}
		this.time += delta;
	}

	onPostUpdate() {
		this.ui.steeringWheel.rotate(player.carActor.steeringWheelRotation);
		if (!this.checkOnTrack()) this.disqualify();
	}

	activateRace() {
		this.raceActive = true;
		player.carActor.startRacing();
	}

	deActivateRace() {
		this.raceActive = false;
		player.carActor.stopRacing();
	}

	finish() {
		this.ui.showFinish(this.time / 1000);
		this.deActivateRace();
		if (player.bestLaps[this.name] === null || this.time < player.bestLaps[this.name]) {
			player.bestLaps[this.name] = this.time;
		}
	}

	disqualify() {
		this.ui.showDisqualification();
		this.deActivateRace();
	}

	checkOnTrack() {
		if (!this.raceActive) return true;
		let onTrack = false;
		const trackPieces = this.joints.concat(this.straights);
		trackPieces.forEach((track) => {
			if (track.hasCar) onTrack = true;
		});
		return onTrack;
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
		this.jointsData.forEach((jointData, index) => {
			const joint = new TrackJoint(jointData);
			if (joint.checkpoint) this.checkpointIndexes.push(index);
			if (joint.start) this.startIndex = index;
			if (joint.finish) this.finishIndex = index;
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
