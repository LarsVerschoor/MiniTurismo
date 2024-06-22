import {Actor, Color, Font, Text} from 'excalibur';

class Dialog extends Actor {
	title;
	titlePos;
	titleActor;
	text;
	textPos;
	textActor;
	buttons;

	constructor(pos, title, titlePos, text, textPos, buttons) {
		super({
			pos,
			width: 800,
			height: 350,
			color: Color.fromHex('#000000'),
			opacity: 0.85
		});
		this.title = title;
		this.titlePos = titlePos;
		this.text = text;
		this.textPos = textPos;
		this.buttons = buttons;
		this.textActor = new Actor({pos: this.textPos});
	}

	onInitialize(engine) {
		console.log('initialize!');
		this.titleActor = new Actor({pos: this.titlePos});
		this.titleActor.graphics.use(
			new Text({
				text: this.title,
				font: new Font({
					size: 32,
					color: Color.fromHex('#FFFFFF'),
					bold: true,
					family: 'monospace'
				})
			})
		);
		this.addChild(this.titleActor);

		// this.textActor = new Actor({pos: this.textPos});
		this.textActor.graphics.use(
			new Text({
				text: this.text,
				font: new Font({
					size: 23,
					color: Color.fromHex('#FFFFFF'),
					bold: false,
					family: 'monospace'
				})
			})
		);
		this.addChild(this.textActor);

		this.buttons.forEach((button) => {
			const buttonActor = new Actor({pos: button.pos});
			buttonActor.graphics.use(
				new Text({
					text: button.text,
					font: new Font({
						size: 23,
						color: Color.fromHex('#FFFFFF'),
						bold: false,
						family: 'monospace'
					})
				})
			);
			buttonActor.on('pointerenter', () => {
				document.body.style.cursor = 'pointer';
			});
			buttonActor.on('pointerleave', () => {
				document.body.style.cursor = 'default';
			});
			buttonActor.on('pointerup', () => {
				engine.goToScene(button.sceneId);
			});
			this.addChild(buttonActor);
		});
	}

	changeText(text) {
		this.text = text;
		console.log(this.textActor);
		this.textActor.graphics.use(
			new Text({
				text: this.text,
				font: new Font({
					size: 23,
					color: Color.fromHex('#FFFFFF'),
					bold: false,
					family: 'monospace'
				})
			})
		);
	}
}

export {Dialog};
