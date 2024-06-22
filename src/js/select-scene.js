import {Actor, Color, Scene, ScreenElement, Vector, Keys, Text, Font} from 'excalibur';
import {circuits} from './circuit-data';
import {player} from './player';

class Select extends Scene {
	ui;

	onInitialize() {
		this.ui = new UI();
		this.add(this.ui);
	}

	onPreUpdate(engine) {
		if (engine.input.keyboard.wasPressed(Keys.Esc)) engine.goToScene('menu');
	}

	onActivate() {
		this.ui.update();
	}
}

class UI extends ScreenElement {
	background;
	cards = [];
	quitButton;

	onInitialize(engine) {
		this.background = new Background(new Vector(engine.drawWidth / 2, engine.drawHeight / 2));
		this.addChild(this.background);

		this.quitButton = new GoButton(new Vector(100, 100), 'menu', 'quit');
		this.addChild(this.quitButton);

		Object.keys(circuits).forEach((circuitName, index) => {
			const newCard = new CircuitCard(new Vector(100, 200 + 100 * index), circuits[circuitName]);
			this.cards.push(newCard);
			this.addChild(newCard);
		});
	}

	update() {
		this.cards.forEach((card) => {
			card.update();
		});
	}
}

class Background extends Actor {
	constructor(pos) {
		super({
			width: 1440,
			height: 900,
			color: Color.fromHex('5ba01b'),
			pos
		});
	}
	onInitialize() {}
}

class CircuitCard extends Actor {
	nameText;
	bestLapText;
	circuitData;
	button;

	constructor(pos, circuitData) {
		super({pos});
		this.circuitData = circuitData;
		this.nameText = new InfoText(new Vector(100, 0), this.circuitData.name);
		this.bestLapText = new InfoText(
			new Vector(450, 0),
			`Fastest lap: ${player.bestLaps[this.circuitData.name] ? player.bestLaps[this.circuitData.name].toFixed(2) : 'not played'}`
		);
		this.button = new GoButton(new Vector(700, 0), this.circuitData.name, 'Go!');
	}

	onInitialize() {
		this.addChild(this.nameText);
		this.addChild(this.bestLapText);
		this.addChild(this.button);
	}
	update() {
		this.bestLapText.graphics.use(
			new Text({
				text: `Fastest lap: ${player.bestLaps[this.circuitData.name] ? player.bestLaps[this.circuitData.name].toFixed(2) : 'not played'}`,
				font: new Font({
					size: 23,
					color: Color.fromHex('#FFFFFF'),
					bold: true,
					family: 'monospace'
				})
			})
		);
	}
}

class InfoText extends Actor {
	text;

	constructor(pos, text) {
		super({pos});
		this.text = text;
	}

	onInitialize() {
		this.graphics.use(
			new Text({
				text: this.text,
				font: new Font({
					size: 23,
					color: Color.fromHex('#FFFFFF'),
					bold: true,
					family: 'monospace'
				})
			})
		);
	}
}

class GoButton extends Actor {
	circuit;
	text;

	constructor(pos, circuit, text) {
		super({pos});
		this.circuit = circuit;
		this.text = text;
	}

	onInitialize(engine) {
		this.graphics.use(
			new Text({
				text: this.text,
				font: new Font({
					size: 23,
					color: Color.fromHex('#FFFFFF'),
					bold: true,
					family: 'monospace'
				})
			})
		);
		this.on('pointerenter', () => {
			document.body.style.cursor = 'pointer';
		});
		this.on('pointerleave', () => {
			document.body.style.cursor = 'default';
		});
		this.on('pointerup', () => {
			engine.goToScene(this.circuit);
		});
	}
}

export {Select};
