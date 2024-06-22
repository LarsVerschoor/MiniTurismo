import {ScreenElement, Vector, Actor, Text, Font, Color} from 'excalibur';
import {Resources} from './resources';
import {Dialog} from './dialog';

class UI extends ScreenElement {
	steeringWheel;
	disqualificationDialog;
	disqualificationDialogShowing = false;
	finishDialog;
	finishDialogShowing = false;
	countdown;
	countdownShowing = false;

	constructor() {
		super();
	}

	onInitialize(engine) {
		this.steeringWheel = new SteeringWheel(new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 200));
		this.addChild(this.steeringWheel);
		this.countdown = new Countdown(new Vector(engine.drawWidth / 2, engine.drawHeight / 2));
		this.addChild(this.countdown);
		this.countdownShowing = true;

		this.disqualificationDialog = new Dialog(
			new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
			'Disqualified for exceeding track limits!',
			new Vector(0, -75),
			'Your car went completely off track!',
			new Vector(0, -15),
			[
				{
					text: 'retry',
					pos: new Vector(-100, 80),
					sceneId: 'spa-francorchamps'
				},
				{
					text: 'exit',
					pos: new Vector(100, 80),
					sceneId: 'menu'
				}
			]
		);

		this.finishDialog = new Dialog(
			new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
			'Finished!',
			new Vector(0, -75),
			'You finished in ... seconds! You earned ... credits.',
			new Vector(0, -15),
			[
				{
					text: 'retry',
					pos: new Vector(-100, 80),
					sceneId: 'spa-francorchamps'
				},
				{
					text: 'exit',
					pos: new Vector(100, 80),
					sceneId: 'menu'
				}
			]
		);
	}

	showDisqualification() {
		if (this.disqualificationDialogShowing || !this.disqualificationDialog) return;
		this.disqualificationDialogShowing = true;
		this.addChild(this.disqualificationDialog);
	}

	hideDisqualification() {
		if (!this.disqualificationDialogShowing || !this.disqualificationDialog) return;
		this.disqualificationDialogShowing = false;
		this.removeChild(this.disqualificationDialog);
	}

	showFinish(time) {
		if (this.finishDialogShowing || !this.finishDialog) return;
		this.finishDialogShowing = true;
		this.finishDialog.changeText(`You finished in ${time.toFixed(2)} seconds!`);
		this.addChild(this.finishDialog);
	}

	hideFinish() {
		if (!this.finishDialogShowing || !this.finishDialog) return;
		this.finishDialogShowing = false;
		this.removeChild(this.finishDialog);
	}

	updateCountdown(text) {
		if (this.countdown) this.countdown.changeText(text);
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

class Countdown extends Actor {
	text;

	constructor(pos) {
		super({pos, z: 1});
		this.text = '';
	}

	onInitialize() {
		this.graphics.use(
			new Text({
				text: this.text,
				font: new Font({
					size: 100,
					color: Color.fromHex('#FFFFFF'),
					bold: true,
					family: 'monospace'
				})
			})
		);
	}

	changeText(text) {
		this.text = text;
		this.graphics.use(
			new Text({
				text: this.text,
				font: new Font({
					size: 100,
					color: Color.fromHex('#FFFFFF'),
					bold: true,
					family: 'monospace'
				})
			})
		);
	}
}

export {UI};
