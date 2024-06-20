import {Scene} from 'excalibur';
import {Joint} from './circuit-joint';
import {Straight} from './circuit-straight';

class Circuit extends Scene {
	name;
	jointsData;
	straightsData;
	joints = [];
	straights = [];

	constructor(name, joints, straights) {
		super();
		this.name = name;
		this.jointsData = joints;
		this.straightsData = straights;
	}

	onActivate() {
		this.createJoints();
		this.createStraights();
	}

	onDeactivate() {
		this.joints = [];
		this.straights = [];
	}

	createJoints() {
		this.jointsData.forEach((jointData) => {
			const joint = new Joint(jointData);
			this.joints.push(joint);
			this.add(joint);
		});
	}

	createStraights() {
		this.straightsData.forEach((straightData) => {
			const straight = new Straight(straightData);
			this.straights.push(straight);
			this.add(straight);
		});
	}
}

export {Circuit};
